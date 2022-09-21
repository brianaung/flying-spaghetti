import express from 'express';
import cors from 'cors';

/** ******* TODO: move routes *********** */

// import userRouter from './routes/userRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
//const [isAuth, setIsAuth] = userState(false);
app.use(cors());

app.use((req, res, next) => {
  console.log(`message arrived: ${req.method} ${req.path}`);
  next();
});

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Our demo app is working!');
});

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
/** ************************************* */

const server = app.listen(process.env.PORT || 9000, () => {
  console.log('our app is listening on port %d', server.address().port);
});
