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
router.get('/dashboard/folders', contentController.getOwnContent);
router.get('/dashboard/shared', contentController.getSharedContent);
router.get('/dashboard/liked', contentController.getLikedPhotos);
// router.get('/recent', contentController.getRecentPhotos);

// router.get('/dashboard/user/:id', contentController.getUserContent); // admin only
router.get('/photo/:id', contentController.getPhotoPage);
router.get('/folder/:id', contentController.getPhotosInFolder);

// router.get('/user/:id', contentController.getUserByID);
// router.get('/folders', contentController.getUserFolders);

router.get('/comments/:photoID', contentController.getPhotoComments);
router.post('/comments/:photoID', contentController.postComment);
router.get('/bin/:folder/:id', contentController.moveToBin);
router.get('/like/:id', contentController.getNumLikes);
router.patch('/like/:id', contentController.likePost);
// router.delete('emptyBin/:folder/:id', contentController.deletePhoto);

router.post('/createFolder', contentController.createFolder);
router.post('/moveFolder/:folder/:id', contentController.moveToDifferentFolder);

// upload photo
router.post('/folder/:folder', upload.single('selectedImage'), contentController.uploadPhoto);

// Admin
router.get('/accept/:uid/:key', adminController.acceptUser);
router.get('/ban/:uid/:key', adminController.banUser);
router.post('/adminban', adminController.banAllSpecUser);
router.post('/addCapacity', adminController.addCapacity);
router.get('/dashboard/users', adminController.getAllUsers);

// Authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.signInUser);
router.post('/logout', authController.signOutUser);

export default router;
