import { application, Router } from 'express';

// controller
import sampleController from '../controllers/sampleController.js';

// create our Router object
const sampleRouter = Router();

sampleRouter.get('/', sampleController.getAllImage);

sampleRouter.get('/get:id', sampleController.getUserByID);

export default sampleRouter;
