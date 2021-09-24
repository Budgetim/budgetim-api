import mysql2 from 'mysql2';
import { options } from '../config/mysql';

export const pool = mysql2.createPool(options).promise();
