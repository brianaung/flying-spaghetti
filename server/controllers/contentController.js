import { doc, getDoc, getDocs, collection, query, orderBy } from "firebase/firestore"
import { db } from '../config/firebase.js';

// const getPhotosFromIDs = async (photos) => {
//     const photoList = [];
//     for (let photoID of photos) {
//         const photoSnap = await getDoc(doc(db, "photos", photoID));
//         photoList.push(photoSnap.data());
//     }
//     return photoList;
// }

const getRecentPhotos = async (req, res, next) => {
    try {
        const photos = []
        const snapshot = await getDocs(query(collection(db, "photos"), orderBy("date", "desc")));
        snapshot.forEach(doc => {
            photos.push(doc.data());
        });
        res.send(photos);
    } catch (err) {
        next(err);
    }
}

const getLikedPhotos = async (req, res, next) => {
    try {
        // const user = req.user.toJSON();
        // const userSnap = await getDoc(doc(db, "users", user.username));
        const userSnap = await getDoc(doc(db, "users", "admin1"));
        if (!userSnap.exists()) {
            res.sendStatus(404);
        }
        const liked = userSnap.data().liked;
        const photos = [];
        for (let photoID of liked) {
            const photoSnap = await getDoc(doc(db, "photos", photoID));
            photos.push(photoSnap.data());
        }
        res.send(photos);
    } catch (err) {
        next(err);
    }
}
  
const getUserFolders = async (req, res, next) => {
    try {
        // const user = req.user.toJSON();
        // const userRef = firestore.collection('users').doc(user.username);
        // const userSnap = await getDoc(doc(db, "users", user.username));
        const userSnap = await getDoc(doc(db, "users", "user1"));
        if (!userSnap.exists()) {
            // res.sendStatus(404);
            res.send('none');
        }
        const folders = userSnap.data().folders;
        res.send(folders);
    } catch (err) {
        next(err);
    }
}

// get all photos in a specific folder
const getPhotosInFolder = async (req, res, next) => {
    try {
      const targetFolder = await getDoc(doc(db, "folders", req.params.id))
      if (!targetFolder.exists()) {
        res.sendStatus(404);
      }
      const photoIDs = targetFolder.data().photos;
      const photos = [];
      for (let photoID of photoIDs) {
        const photoSnap = await getDoc(doc(db, "photos", photoID));
        photos.push(photoSnap.data());
    }
      res.send(photos);
    } catch (err) {
      next(err);
    }
  }

const getContentByUser = async (req, res, next) => {
    try {
        const userSnap = await getDoc(doc(db, "users", "admin1"));
        if (!userSnap.exists()) {
            res.sendStatus(404);
        }
        const folders = userSnap.data().folders;
        const photoIDs = userSnap.data().photos;
        const photoList = []

        for (let photoID of photoIDs) {
            const photoRef = await getDoc(doc(db, "photos", photoID));
            const photo = photoRef.data();
            // Check if photo in root folder
            if (photo.folder == null) {
                photoList.push(photo);
            }
        }

        var content = {
            "folders": folders,
            "photos": photoList
        };
        res.send(content);
    } catch (err) {
        next(err);
    }
}

// incomplete
  const uploadPhoto = async (req, res, next) => {
    try {
    //   const photo = new Photo(
    //     req.user.username,
    //     req.body.caption
    //   )
    } catch (err) {
      next(err);
    }
  }
  
export default {
    getRecentPhotos,
    getLikedPhotos,
    getUserFolders,
    getPhotosInFolder,
    getContentByUser,
    uploadPhoto
}