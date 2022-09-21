import firebase from '../config/firebase.js';

import sampleData from '../models/SampleModel.js';
import User from '../models/User.js';
import Photo from '../models/Photo.js';
import Folder from '../models/Folder.js';
import Comment from '../models/Comment.js';

const { firestore } = firebase.firestore;
const { storage } = firebase.storage;

// Add this to all classes
// this.dateCreated = firestore.Timestamp.fromDate(new Date());

// User controllers
const createUser = async (req, res, next) => {
  try {
    const userInfo = new User(
      req.body.firstname,
      req.body.lastname,
      req.body.role,
      req.body.capacity
    );
    
    // Add a new user in collection
    const user = await firestore.collection('users').doc(req.body.username).set(userInfo);
    // Do something else with user?
  } catch (err) {
    next(err);
  }
}

const banUser = async (req, res, next) => {
  try {
    const user = await firestore.collection('users').doc(req.params.username).update({
      role: 'banned'
    });
    // Inform user they got banned and for what reason?
  } catch (err) {
    next(err);
  }
}

// Photos and folders
const getRecentPhotos = async (req, res, next) => {
  try {
    const photos = []
    const snapshot = firestore.collection('photos').orderBy('dateCreated','desc').get();
    snapshot.docs.forEach(doc => {
      photos.push(doc.data().id);
    });
    res.send(photos);
  } catch (err) {
    next(err);
  }
}

const getLikedPhotos = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    const userRef = firestore.collection('users').doc(user.username);
    if (!user.exists) {
      res.sendStatus(404);
    }
    const liked = userRef.data().liked;
    res.send(liked);
  } catch (err) {
    next(err);
  }
}

const getUserFolders = async (req, res, next) => {
  try {
    const user = req.user.toJSON();
    const userRef = firestore.collection('users').doc(user.username);
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

  } catch (err) {
    next(err);
  }
}

const getUserfolder = (req, res) => {
  try {
    // const userData = sampleData
    // const photos = [];
    // for (let user of userData) {
    //     for (let folder of user.folders) {
    //         for (let photo of ) {
    //         }
    //     }
    // }
    res.send(sampleData[0].folders); // send all folders from all users
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFolderByID = (req, res) => {

    try {
        const userfolder = sampleData[0].folders
        const target = userfolder.find((folder) => folder.id === req.params.id)
        res.send(target.photos); 
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const getAllImage = (req, res) => {
  try {
    const userData = sampleData;
    const photos = [];
    for (const user of userData) {
      for (const folder of user.folders) {
        photos.push(folder.photos);
      }
    }
    res.send(photos); // send all photos from all users
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserByID = (req, res) => {
  try {
    const user = sampleData.find((user) => user.id === req.params.id);
    if (user) {
      res.send(user);
    } else {
      // You can decide what to do if the data is not found.
      // Currently, an empty list will be returned.
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//get comment


//get no. likes

//get folder

//get photos


export default {
  getUserfolder,
  getUserByID,
  getAllImage,
  getFolderByID
};
