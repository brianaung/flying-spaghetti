import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  query,
  orderBy,
  Timestamp,
  deleteField,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore';
import { db, storage } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { v4 } from 'uuid';

// const getPhotosFromIDs = async (photos) => {
//     const photoList = [];
//     for (let photoID of photos) {
//         const photoSnap = await getDoc(doc(db, "photos", photoID));
//         photoList.push(photoSnap.data());
//     }
//     return photoList;
// }

const getPhotoById = async (req, res, next) => {
  try {
    const snapshot = await getDoc(doc(db, 'photos', req.params.id));
    const photosnapshot = snapshot.data();

    const userLikesID = photosnapshot.likes;
    const userList = [];

    for (const userID of userLikesID) {
      const userRef = await getDoc(doc(db, 'users', userID));
      const user = userRef.data();
      const userOBJ = {
        id: userRef.id,
        user
      };
      userList.push(userOBJ);
      // Check if photo in root folder
    }

    const photo = {
      name: photosnapshot.name,
      caption: photosnapshot.caption,
      date: photosnapshot.date,
      folder: photosnapshot.folder,
      isPrivate: photosnapshot.isPrivate,
      link: photosnapshot.link,
      owner: photosnapshot.owner,
      likes: userList
    };

    res.send(photo);
  } catch (err) {
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comments = [];
    const snapshot = await getDocs(collection(db, 'photos', req.params.photoID, 'comments'));
    snapshot.forEach((doc) => {
      comments.push(doc.data());
    });
    res.send(comments);
  } catch (err) {
    next(err);
  }
};

const getRecentPhotos = async (req, res, next) => {
  try {
    const photos = [];
    const snapshot = await getDocs(query(collection(db, 'photos'), orderBy('date', 'desc')));
    snapshot.forEach((doc) => {
      photos.push(doc.data());
    });
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

const getLikedPhotos = async (req, res, next) => {
  try {
    // const user = req.user.toJSON();
    // const userSnap = await getDoc(doc(db, "users", user.username));
    const userSnap = await getDoc(doc(db, 'users', 'admin1'));
    if (!userSnap.exists()) {
      res.sendStatus(404);
    }
    const liked = userSnap.data().liked;
    const photos = [];
    for (const photoID of liked) {
      const photoSnap = await getDoc(doc(db, 'photos', photoID));
      photos.push(photoSnap.data());
    }
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

const getUserFolders = async (req, res, next) => {
  try {
    // const user = req.user.toJSON();
    // const userRef = firestore.collection('users').doc(user.username);
    // const userSnap = await getDoc(doc(db, "users", user.username));
    const userSnap = await getDoc(doc(db, 'users', 'user1'));
    if (!userSnap.exists()) {
      // res.sendStatus(404);
      res.send('none');
    }
    const folders = userSnap.data().folders;
    res.send(folders);
  } catch (err) {
    next(err);
  }
};

// get all photos in a specific folder
const getPhotosInFolder = async (req, res, next) => {
  try {
    const targetFolder = await getDoc(doc(db, 'folders', req.params.id));
    if (!targetFolder.exists()) {
      res.sendStatus(404);
    }
    const photoIDs = targetFolder.data().photos;
    const photos = [];
    for (const photoID of photoIDs) {
      const photoSnap = await getDoc(doc(db, 'photos', photoID));
      const data = photoSnap.data();
      photos.push({ photoID: photoSnap.id, ...data });
    }
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

const getContentByUser = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', 'admin1'));
    if (!userSnap.exists()) {
      res.sendStatus(404);
    }
    const folders = userSnap.data().folders;
    const photoIDs = userSnap.data().photos;
    const photoList = [];

    for (const photoID of photoIDs) {
      const photoRef = await getDoc(doc(db, 'photos', photoID));
      const photo = photoRef.data();
      // Check if photo in root folder
      if (photo.folder == null) {
        photoList.push({ ...photo, photoID });
      }
    }

    const content = {
      folders,
      photos: photoList
    };
    res.send(content);
  } catch (err) {
    next(err);
  }
};

const uploadPhoto = async (req, res, next) => {
  try {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.file);

    // upload photo into storage
    const imageRef = ref(storage, `images/${req.body.name}`);
    const metatype = { contentType: req.file.mimetype, name: req.file.originalname };
    await uploadBytes(imageRef, req.file.buffer, metatype);

    const imageUrl = await getDownloadURL(imageRef);

    // add a new photo in the photos collection of firestore

    const photo = {
      name: req.body.name,
      caption: req.body.description,
      date: Timestamp.fromDate(new Date()),
      folder: req.params.folder,
      isPrivate: false,
      likes: [],
      link: imageUrl,
      owner: 'admin1'
    };

    const docRef = await addDoc(collection(db, 'photos'), photo);
    if (docRef) {
      //console.log(photo);
      res.send(photo);
      console.log('sending docRef');
    }

    // update users.
    await updateDoc(doc(db, 'users', 'admin1'), {
      photos: arrayUnion(docRef.id)

      // update capacity
    });

    // update folder
    if (req.params.folder != null) {
      await updateDoc(doc(db, 'folders', 'animals'), {
        photos: arrayUnion(docRef.id)
      });
    }
  } catch (err) {
    next(err);
  }
};

const deletePhoto = async (req, res, next) => {
  try {
    //delete photo in storage.
    const imageRef = ref(storage, `images/${req.body.name}`);
    deleteObject(imageRef)
      .then(() => {
        console.log('Photo deleted successfully');
      })
      .catch((err) => {
        console.log('There is an error, cannot delete photo');
      });

    //delete photo information in firestore.
    // 1. update folder
    const folderRef = doc(db, 'folders', 'animals');

    await updateDoc(folderRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('update folder');
    });
    // 2. update photos
    const photosRef = doc(db, 'photos', req.params.id);
    await deleteDoc(photosRef).then(() => {
      console.log('upadate photo');
    });
    // 3. update users
    const usersRef = doc(db, 'users', 'admin1');
    await updateDoc(usersRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('update user');
    });

    //send info to frontend
    const photoDelete = {
      "photoID":req.params.id,
      "photoName":req.body.name
    }
    res.send(photoDelete);
  } catch (err) {
    next(err);
  }
};

export default {
  getRecentPhotos,
  getLikedPhotos,
  getUserFolders,
  getPhotosInFolder,
  getContentByUser,
  getAllComments,
  uploadPhoto,
  getPhotoById,
  deletePhoto
};
