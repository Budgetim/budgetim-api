import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes';

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use('/', router);

app.get('*', (req, res) => {
  res.send({});
});

async function start() {
  try {
    await mongoose.connect('mongodb+srv://pavlenkovit:111213@cluster0.csccq.mongodb.net/transactions', {});
    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

export {};
