import { application, Router } from 'express';

// controller
import userController from '../controllers/userController.js';
//import login from '../login.js';

// create our Router object
const userRouter = Router();

userRouter.get('/', userController.getRecentPhotos);

userRouter.get('/getID:id', userController.getUserByID);
//sampleRouter.get('/login', login.login);

userRouter.get('/getFolder:id', userController.getFolderByID);
export default userRouter;
