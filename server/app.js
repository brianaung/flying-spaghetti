import express from 'express';
import cors from 'cors';

// const [isAuth, setIsAuth] = userState(false);

// import userRouter from './routes/userRouter.js';
import router from './routes/router.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`message arrived: ${req.method} ${req.path}`);
  next();
});

app.use('/', router);

/** ************************************* */

const server = app.listen(process.env.PORT || 9000, () => {
  console.log('our app is listening on port %d', server.address().port);
});

export { app };
