import { doc, addDoc, collection, arrayUnion, query, orderBy } from 'firebase/firestore';
import { db, storage } from '../config/firebase.js';
import User from '../models/User.js';
import Photo from '../models/Photo.js';
import Folder from '../models/Folder.js';
import Comment from '../models/Comment.js';
import { ref, uploadBytes } from 'firebase/storage';
// import { v4 } from 'uuid';

// const { firestore } = firebase.firestore;
// const { storage } = firebase.storage;

const getRecentPhotos = async (req, res, next) => {
  try {
    const photos = [];
    const snapshot = query(collection(db, 'photos'), orderBy('date', 'desc'));
    //   const snapshot = firestore.collection('photos').orderBy('dateCreated','desc').get();
    snapshot.docs.forEach((doc) => {
      photos.push(doc.data());
    });
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

const getLikedPhotos = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    const userSnap = getDoc(doc(db, 'users', user.username));
    // const userRef = firestore.collection('users').doc(user.username);
    if (!userSnap.exists()) {
      res.sendStatus(404);
    }
    const liked = userSnap.data().liked;
    res.send(liked);
  } catch (err) {
    next(err);
  }
};

const getUserFolders = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    // const userRef = firestore.collection('users').doc(user.username);
    const userSnap = getDoc(doc(db, 'users', user.username));
    if (!user.exists) {
      res.sendStatus(404);
    }
    const folders = userRef.data().folders;
    res.send(folders);
  } catch (err) {
    next(err);
  }
};

const uploadPhoto = async (req, res, next) => {
  try {
    const imageRef = ref(storage, `images/${req.body.selectImage.name + v4()}`);
    uploadBytes(imageRef, file).then(() => {
      alert('Image upload');
    });

    // photo object
    const docRef = await addDoc(collection(db, 'photos', req.body.photoName), {
      caption: req.body.caption,
      owner: req.body.owner,
      isPrivate: req.body.isPrivate,
      // capacity: req.body.capacity,
      date: Timestamp.fromDate(new Date()),
      folder: req.body.folder,
      link: imageRef,
      likes: []
    });

    // update users.
    await updateDoc(doc(db, 'users', "admin1"), {
      images: arrayUnion(docRef.id)
      // update capcity
    });

    // update folder
    await updateDoc(doc(db, 'folders', req.params.folder), {
      photos: arrayUnion(docRef.id)
    });
    // const photo = new Photo(
    // req.user.username,
    // req.body.caption

    // )

    // if (photo == null) return;
  } catch (err) {
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    userID = req.params.id;
    const userSnap = getDoc(doc(db, 'users', userID));
    const commentIDs = userSnap.doc().Comment;
    const comments = [];
    for (const comment in commentIDs) {
      const commentOBJ = getDoc(doc(db));
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getRecentPhotos,
  getLikedPhotos,
  getUserFolders,
  uploadPhoto
};
