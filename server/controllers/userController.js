import firebase from '../config/firebase.js';
import User from '../models/User.js';
import Photo from '../models/Photo.js';
import Folder from '../models/Folder.js';
import Comment from '../models/Comment.js';

const { firestore } = firebase.firestore;
const { storage } = firebase.storage;


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

  export default {
    getFolderByID,
  };