import { application, Router } from 'express';

// controller
import sampleController from '../controllers/sampleController.js';
// import login from '../login.js';

// create our Router object
const sampleRouter = Router();

sampleRouter.get('/', sampleController.getAllImage);

sampleRouter.get('/', sampleController.uploadPhoto);

sampleRouter.get('/getID:id', sampleController.getUserByID);
// sampleRouter.get('/login', login.login);

sampleRouter.get('/getFolder:id', sampleController.getFolderByID);
export default sampleRouter;
