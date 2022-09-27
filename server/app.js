import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// import userRouter from './routes/userRouter.js';
// import router from './routes/router.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const [isAuth, setIsAuth] = userState(false);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`message arrived: ${req.method} ${req.path}`);
  next();
});

// get the frontend build for deployment
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
  res.json({ message: '👋 from Express!' });
});

// catch all requests and return the static index.html file from react frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

/*
app.use('/', router);

// app.get('/', (req, res) => {
//   res.send('Our demo app is working!');
// });

app.get('/about', (req, res) => {
  res.send('this is about page');
});

app.get('/login', (req, res) => {
  res.send('this is login page');
});

app.get('/signup', (req, res) => {
  res.send('this is signup page!');
});

app.get('/upload', (req, res) => {
  res.send('this is upload page!');
});

app.get('/photo', (req, res) => {
  res.send('this is photo page');
});
*/

/** ************************************* */

const server = app.listen(process.env.PORT || 9000, () => {
  console.log('our app is listening on port %d', server.address().port);
});
