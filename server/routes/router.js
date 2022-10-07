import { application, Router } from 'express';

import adminController from '../controllers/adminController.js';
import contentController from '../controllers/contentController.js';
import authController from '../controllers/authController.js';
// import login from '../login.js';

import multer from 'multer';
//import authController from '../controllers/authController.js';
// const upload = multer({ dest: './public/data/uploads/' });

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

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

router.get('/comments/:photoID', contentController.getAllComments);

router.delete('/:folder/:id', contentController.deletePhoto);

router.get('/ban/:uid/:key', adminController.banUser);

router.get('/accept/:uid/:key', adminController.acceptUser);

router.get('/isLogin', authController.isLogIn);

router.post(
  '/dashboard/upload_photo/:folder',
  upload.single('selectedImage'),
  contentController.uploadPhoto
);

// router.get(
//   '/dashboard/upload_photo',
//   upload.single('selectedImage'),
//   contentController.uploadPhoto
// );

router.post(
  '/folder/:folder',
  upload.single('selectedImage'),
  contentController.uploadPhoto
);

router.post('/register', authController.registerUser);
router.post('/login', authController.signInUser);
router.post('/logout', authController.signOutUser);
router.post('/like/:id', contentController.likePost);

export default router;
