import { ResultSetHeader } from 'mysql2';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';
import isEqual from 'date-fns/isEqual';

import { pool } from './db';
import { Category as CategoryType, CategorySummary, CategoryWithoutId } from '../types';

export default class Category {
  static async get(userId: number) {
    const categories = await pool.query(`
      SELECT category.id, category.title, category.description, category.color,
      (SELECT COUNT(*) FROM transaction WHERE transaction.category_id = category.id) AS total
      FROM category
      WHERE ?? = ?
      ORDER BY total DESC`,
      ['category.client_id', userId]
    ) as unknown as [CategoryType[]];
    return categories[0];
  }

  static async getById(id: number) {
    const category = await pool.query(`
      SELECT id, title, color, description FROM category 
      WHERE ?? = ?`,
      ['id', id]
    ) as unknown as [[CategoryType]];
    return category[0][0];
  }

  static async add({ title, color, description, userId }: CategoryWithoutId & { userId: number }) {
    const resultList = await pool.query(`
      INSERT INTO category (title, color, description, client_id)
      VALUES (?, ?, ?, ?)`,
      [title, color, description, userId],
    );
    const result = resultList[0] as ResultSetHeader;
    const category = await this.getById(result.insertId);
    return category;
  }

  static async delete(id: number, userId: number) {
    const res = await pool.query(`
      DELETE FROM category
      WHERE id = ? AND client_id = ?`,
      [id, userId],
    );
    return res;
  }

  static async edit({ id, title, description, color, userId }: CategoryType & { userId: number }) {
    await pool.query(`
      UPDATE category SET title = ?, description = ?, color = ?
      WHERE id = ? AND client_id = ?`,
      [title, description, color, id, userId],
    );
    const category = await this.getById(id);
    return category;
  }

  static async showStatistic(month: number, year: number, userId: number) {
    const result = await pool.query(`
      SELECT SUM(transaction.price) as sum, category.id, category.color, category.title, category.description FROM transaction
      LEFT JOIN category ON transaction.category_id = category.id
      WHERE transaction.client_id = ?
      AND MONTH(transaction.date) = ?
      AND YEAR(transaction.date) = ?
      GROUP BY category.id, category.color, category.title, category.description
      ORDER BY sum DESC`,
      [userId, month, year],
    ) as unknown as [CategorySummary[]];
    return result[0];
  }

  static async getAllStatisticsByDays(userId: number) {
    const end = new Date();
    end.setHours(0,0,0,0);
    const start = subDays(end, 13);
    const interval = eachDayOfInterval({ start, end });

    const result = await pool.query(`
      SELECT DATE(transaction.date) as date, SUM(transaction.price) as sum, category.id, category.color, category.title, category.description FROM transaction
      LEFT JOIN category ON transaction.category_id = category.id
      WHERE transaction.client_id = ?
      AND transaction.date >= ?
      GROUP BY DATE(transaction.date), category.id
      ORDER BY DATE(transaction.date)`,
      [userId, format(start, 'yyyy-MM-dd')],
    ) as unknown as [(CategorySummary & { date: string })[]];

    const data = result[0];


    const groups: (CategoryType & { data: {sum: number; date: Date}[] })[] = [];
    data?.forEach((item) => {
      const foundedGroup = groups.find(group => group.id === item.id);
      if (!foundedGroup) {
        groups.push({
          id: item.id,
          description: item.description,
          title: item.title,
          color: item.color,
          data: interval.map(date => ({ date, sum: 0 })),
        });
      }
    });

    data?.forEach((item) => {
      const foundedGroup = groups.find(group => group.id === item.id);
      const foundedDataItem = foundedGroup.data.find(dataItem => isEqual(dataItem.date, new Date(item.date)));
      foundedDataItem.sum = +item.sum;
    });

    return groups.map(group => ({
      ...group,
      data: group.data.map(item => item.sum),
    }));
  }

  static async getCategoryStatisticsByDays(categoryId: number, userId: number) {
    const end = new Date();
    end.setHours(0,0,0,0);

    const range = await pool.query(`
      SELECT MIN(transaction.date) as min
      FROM transaction
      WHERE transaction.client_id = ?`,
      [userId],
    ) as unknown as [[{ min: string }]];

    const min = range[0][0].min;
    const startDate = new Date(min);

    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();
    const start = new Date(Date.UTC(year, month, day))

    const interval = eachDayOfInterval({ start, end }).map(item => {
      const year = item.getFullYear();
      const month = item.getMonth();
      const day = item.getDate();
      return new Date(Date.UTC(year, month, day))
    });

    const result = await pool.query(`
      SELECT DATE(transaction.date) as date, SUM(transaction.price) as sum, category.id, category.color, category.title, category.description FROM transaction
      LEFT JOIN category ON transaction.category_id = category.id
      WHERE transaction.client_id = ?
      AND category.id = ?
      GROUP BY DATE(transaction.date), category.id
      ORDER BY DATE(transaction.date)`,
      [userId, categoryId],
    ) as unknown as [(CategorySummary & { date: string })[]];

    const dataFromServer = result[0].map(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return {
        ...item,
        date: new Date(Date.UTC(year, month, day)),
      }
    });

    return {
      title: dataFromServer[0]?.title,
      description: dataFromServer[0]?.description,
      data: interval.map(date => {
        const foundedItem = dataFromServer.find(dataItem => isEqual(new Date(dataItem.date), date));

        if (foundedItem) {
          return {
            value: +foundedItem.sum,
            date,
          }
        }
        return {
          value: 0,
          date,
        };
      }),
    }
  }
}

