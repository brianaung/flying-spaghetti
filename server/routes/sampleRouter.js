import { application, Router } from 'express';

// create our Router object
const sampleRouter = Router();

// controller
import sampleController from '../controllers/sampleController.js';

sampleRouter.get('/', sampleController.getUserfolder);

sampleRouter.get('/get:id', sampleController.getUserByID);

export default sampleRouter;
