// import * as fs from "firebase/firestore";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore"
import { db } from '../config/firebase.js';
import User from '../models/User.js';
import Photo from '../models/Photo.js';
import Folder from '../models/Folder.js';
import Comment from '../models/Comment.js';

// const { firestore } = firebase.firestore;
// const { storage } = firebase.storage;

const sampleUser = async (req, res, next) => {
  try {
    await setDoc(doc(db, "users", "user1"), {
      firstName: "Tom",
      lastName: "Hanks",
      role: "user",
      capacity: 3,
      date: Timestamp.fromDate(new Date()),
      folders: [],
      images: [],
      liked: []
    });
    res.send('success');
    // await firestore.collection('users').doc('firstUser').set(userInfo);
  } catch (err) {
    next(err);
  }
}

const createUser = async (req, res, next) => {
  try {
    await setDoc(doc(db, "users", req.body.username), {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      role: req.body.role,
      capacity: req.body.capacity,
      date: Timestamp.fromDate(new Date()),
      folders: [],
      images: [],
      liked: []
    });
    // const user = await firestore.collection('users').doc(req.body.username).set(userInfo);
  } catch (err) {
    next(err);
  }
}

const banUser = async (req, res, next) => {
  try {
    await updateDoc(doc(db, "users", req.params.username), {
      role: "banned"
    });
    // await firestore.collection('users').doc(req.params.username).update({
    //   role: 'banned'
    // });
    // Inform user they got banned and for what reason?
  } catch (err) {
    next(err);
  }
}

// get all photos in a specific folder
const getFolderByID = async (req, res, next) => {
  try {
      const photos = [];
      const id = req.params.id;
      const targetFolder = await firestore.collection("folders").doc(id)

      if (!targetFolder.exists) {
          res.sendStatus(404);
        }
      const folder = targetFolder.data().photos;
      folder.forEach(photoID => {
          const photo = firestore.collection("photos").doc(photoID);
          photos.push(photo);
      })
      res.send(photos);

    // Do something else with user?
  } catch (err) {
    next(err);
  }
}

  const getContentByUser = async (req, res, next) => {
    try {
      const user = await firestore.collection("users").doc("admin1")
      if (!user.exists) {
        res.sendStatus(404);
      }
      const photoList = []
      var folders = user.data().folders
      var photos = user.data().images
      photos.forEach(photoID => {
        const photo = firestore.collection("photos").doc(photoID);
        photoList.push(photo);
    })

      var content = {
        "folders": folders,
        "photos": photoList
      }
      res.send(content);

      // Do something else with user?
    } catch (err) {
      next(err);
    }
  }

export default {
  createUser,
  banUser,
  getFolderByID,
  getContentByUser,
  sampleUser
};
