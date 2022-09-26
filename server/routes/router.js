import { application, Router } from 'express';

// controller
import adminController from '../controllers/adminController.js';
import contentController from '../controllers/contentController.js';
// import login from '../login.js';

// create our Router object
const router = Router();

// Add sample user to firestore
router.get('/sampleUser', adminController.sampleUser);

router.get('/', contentController.getContentByUser);

router.get('/folder/:id', contentController.getPhotosInFolder);

router.get('/getFolders', contentController.getUserFolders);

router.get('/getLiked', contentController.getLikedPhotos);

router.get('/recents', contentController.getRecentPhotos);

export default router;
