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

// Photos and folders

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
