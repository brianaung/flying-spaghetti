import { application, Router } from 'express';

// controller
import adminController from '../controllers/adminController.js';
import contentController from '../controllers/contentController.js';
// import login from '../login.js';

import multer from 'multer';
const upload = multer({ dest: './public/data/uploads/' })

// create our Router object
const router = Router();

// Add sample user to firestore
router.get('/sampleUser', adminController.sampleUser);

// Get user object by ID
router.get('/user/:id', adminController.getUser);

router.get('/', contentController.getContentByUser);

router.get('/folder/:id', contentController.getPhotosInFolder);

router.get('/getFolders', contentController.getUserFolders);

router.get('/getLiked', contentController.getLikedPhotos);

router.get('/recents', contentController.getRecentPhotos);
router.get('/getPhoto/:id', contentController.getPhotoById);

router.post('/dashboard/upload_photo', upload.single('selectedImage'),contentController.uploadPhoto);

export default router;