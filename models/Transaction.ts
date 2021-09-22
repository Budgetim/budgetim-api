import { Schema, model } from 'mongoose';

export interface TransactionUnit {
  title: string;
  category: string;
  price: number;
  date: Date;
}

const schema = new Schema<TransactionUnit>({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default model<TransactionUnit>('transaction', schema);
