import { Router } from 'express';

import adminController from '../controllers/adminController.js';
import contentController from '../controllers/contentController.js';
import authController from '../controllers/authController.js';

import multer from 'multer';
// const upload = multer({ dest: './public/data/uploads/' });

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

const router = Router();

// Content (photos and folders)
router.get('/', contentController.getUserContent);
router.get('/photo/:id', contentController.getPhotoByID);
router.get('/folder/:id', contentController.getPhotosInFolder);

router.get('/user/:id', contentController.getUserByID);
router.get('/folders', contentController.getUserFolders);
router.get('/liked', contentController.getLikedPhotos);
router.get('/recents', contentController.getRecentPhotos);

router.get('/comments/:photoID', contentController.getPhotoComments);
router.post('/comments/:photoID', contentController.postComment);
router.get('/bin/:folder/:id', contentController.moveToBin);
router.get('/like/:id', contentController.likePost);
router.delete('/:folder/:id', contentController.deletePhoto);

router.post('/createFolder', contentController.createFolder);
router.post('/moveFolder/:folder/:id', contentController.moveToDifferentFolder);

router.post(
  '/dashboard/upload_photo/:folder',
  upload.single('selectedImage'),
  contentController.uploadPhoto
);

router.post(
  '/folder/:folder',
  upload.single('selectedImage'),
  contentController.uploadPhoto
);

// Admin
router.get('/accept/:uid/:key', adminController.acceptUser);
router.get('/ban/:uid/:key', adminController.banUser);

// Authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.signInUser);
router.post('/logout', authController.signOutUser);

export default router;