import { doc, getDoc, collection, query, orderBy } from "firebase/firestore"
import { db } from '../config/firebase.js';
import User from '../models/User.js';
import Photo from '../models/Photo.js';
import Folder from '../models/Folder.js';
import Comment from '../models/Comment.js';
import { storage } from '../config/firebase.js';
import { ref, uploadBytes } from 'firebase/storage';
//import { v4 } from 'uuid';


// const { firestore } = firebase.firestore;
//const { storage } = firebase.storage;

const getRecentPhotos = async (req, res, next) => {
    try {
        const photos = []
        const snapshot = query(collection(db, "photos"), orderBy("date", "desc"));
    //   const snapshot = firestore.collection('photos').orderBy('dateCreated','desc').get();
        snapshot.docs.forEach(doc => {
            photos.push(doc.data());
        });
        res.send(photos);
    } catch (err) {
        next(err);
    }
}

const getLikedPhotos = async (req, res, next) => {
    try {
        const user = req.user.toJSON();
        const userSnap = getDoc(doc(db, "users", user.username))
        // const userRef = firestore.collection('users').doc(user.username);
        if (!userSnap.exists()) {
            res.sendStatus(404);
        }
        const liked = userSnap.data().liked;
        res.send(liked);
    } catch (err) {
        next(err);
    }
}
  
const getUserFolders = async (req, res, next) => {
    try {
        const user = req.user.toJSON();
        // const userRef = firestore.collection('users').doc(user.username);
        const userSnap = getDoc(doc(db, "users", user.username))
        if (!user.exists) {
            res.sendStatus(404);
        }
        const folders = userRef.data().folders;
        res.send(folders);
    } catch (err) {
        next(err);
    }
}
  
  const uploadPhoto = async (req, res, next) => {
    try {
        const imageRef = ref(storage, `images/${req.body.upload-form.selectedImage.name + v4()}`);
        uploadBytes(imageRef, photo).then(() => {
            alert('Image upload');
        });
        
        await setDoc(doc(db, "photos", req.body.username), {
            caption: req.body.caption,
            owner: req.body.owner,
            isPrivate: req.body.isPrivate,
            capacity: req.body.capacity,
            date: Timestamp.fromDate(new Date()),
            folder: req.body.folder,
            link: imageRef,
            likes: []
        });
        
        // const photo = new Photo(
        // req.user.username,
        // req.body.caption
        
      //)
      
      
    if (photo == null) return;
    
      
    } catch (err) {
      next(err);
    }
  }

  const getAllComments = async (req, res, next) => {
    try {
        userID = req.params.id;
        const userSnap = getDoc(doc(db, "users", userID));
        const commentIDs = userSnap.doc().Comment;
        var comments = [];
        for (var comment in commentIDs) {
            var commentOBJ = getDoc(doc(db, ))
        }
    } catch (err) {
        next(err);
    }
  }
  
export default {
    getRecentPhotos,
    getLikedPhotos,
    getUserFolders,
    uploadPhoto
}