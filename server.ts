import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('OK!!!');
});

app.get('*', (req, res) => {
  res.send({});
});

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

export {};
