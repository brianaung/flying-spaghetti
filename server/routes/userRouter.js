import { application, Router } from 'express';

// controller
import userController from '../controllers/userController.js';
import photoController from '../controllers/photoController.js';
// import login from '../login.js';

// create our Router object
const userRouter = Router();

userRouter.get('/', userController.getRecentPhotos);
userRouter.get('/findUser:id', userController.getUser);

userRouter.get('/getID:id', userController.getContentByUser);
// sampleRouter.get('/login', login.login);

userRouter.get('/getFolder:id', userController.getFolderByID);

userRouter.get('/sampleUser', userController.sampleUser);

userRouter.post('/dashboard', photoController.uploadPhoto);

export default userRouter;
