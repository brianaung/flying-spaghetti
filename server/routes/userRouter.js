import { application, Router } from 'express';

// controller
import userController from '../controllers/userController.js';
import photoController from '../controllers/photoController.js';
//import login from '../login.js';

// create our Router object
const userRouter = Router();

// userRouter.get('/', userController.getRecentPhotos);

userRouter.get('/getID:id', userController.getContentByUser);
//sampleRouter.get('/login', login.login);

userRouter.get('/getFolder:id', userController.getFolderByID);

userRouter.get('/sampleUser', userController.sampleUser);

export default userRouter;