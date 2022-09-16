import { application, Router } from 'express';

// controller
import sampleController from '../controllers/sampleController.js';
//import login from '../login.js';

// create our Router object
const sampleRouter = Router();

sampleRouter.get('/', sampleController.getAllImage);

sampleRouter.get('/get:id', sampleController.getUserByID);
//sampleRouter.get('/login', login.login);
export default sampleRouter;
