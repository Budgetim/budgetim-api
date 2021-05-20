import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import { logSession } from './middlewares'

const port = 3001;
const app = express();

const sessionMiddleware = session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  },
});

app.use(cors());
app.use(sessionMiddleware);
app.use(logSession);

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', router);

app.get('*', (req, res) => {
  res.send({})
});

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

export {};
