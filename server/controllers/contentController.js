import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  orderBy,
  Timestamp,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
// import { v4 } from 'uuid';

function getCurrUserID() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  });
}

const getUserById = async (req, res, next) => {
  try {
    const userRef = await getDoc(doc(db, 'users', req.params.id));
    res.send(userRef.data());
  } catch (err) {
    next(err);
  }
};

const getPhotoById = async (req, res, next) => {
  try {
    const photoSnap = await getDoc(doc(db, 'photos', req.params.id));
    if (!photoSnap.exists()) {
      res.sendStatus(404);
    }

    const photoData = photoSnap.data();
    const userID = getCurrUserID();
    let userLiked = false;

    if (userID) {
      if (photoData.isPrivate && photoData.owner !== userID) {
        res.sendStatus(404);
      } else {
        userLiked = photoData.likes.includes(userID);
      }
    } else {
      if (photoData.isPrivate) {
        res.sendStatus(404);
      }
    }
    const photo = {
      data: photoData,
      isLiked: userLiked
    };
    res.send(photo);
  } catch (err) {
    next(err);
  }
};

const comment = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }

    // make comment
    const CurrentComment = {
      owner: userID,
      text: req.body.text,
      date: Timestamp.fromDate(new Date())
    };

    const docRef = await addDoc(
      collection(db, 'photos', req.params.photoID, 'comments'),
      CurrentComment
    );
  } catch (err) {
    next(err);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comments = [];
    const snapshot = await getDocs(collection(db, 'photos', 'a0b0m8MLlV6qfqX92qR4', 'comments'));

    for (const doc in snapshot) {
      const docData = doc.data();
      const ownerRef = await getDoc(doc(db, 'users', docData.owner));
      const ownerName = ownerRef.data().firstName;
      const currentComment = {
        name: ownerName,
        text: docData.text,
        date: docData.date
      };
      comments.push(currentComment);
    }
    res.send(comments);
  } catch (err) {
    next(err);
  }
};

const getRecentPhotos = async (req, res, next) => {
  try {
    const photos = [];
    const snapshot = await getDocs(
      query(collection(db, 'photos'), orderBy('date', 'desc'), where('isPrivate', '==', false))
    );
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
    const userID = getCurrUserID();
    if (userID === null) {
      res.sendStatus(404);
    }
    const userSnap = await getDoc(doc(db, 'users', userID));
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
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }
    const userSnap = await getDoc(doc(db, 'users', userID));
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

const getUserContent = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (!userID) {
      res.sendStatus(404);
    }
    const userSnap = await getDoc(doc(db, 'users', userID));
    const userData = userSnap.data();
    const userPhotos = [];

    for (const photoID of userData.photos) {
      const photoSnap = await getDoc(doc(db, 'photos', photoID));
      if (photoSnap.data().folder === 'root') {
        userPhotos.push(photoID);
      }
    }

    const content = {
      folders: userData.folders,
      photos: userPhotos
    };
    res.send(content);
  } catch (err) {
    next(err);
  }
};

const getOtherContent = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (!userID) {
      res.sendStatus(404);
    }
    const folderSnap = await getDocs(
      query(collection(db, 'folders'), where('owner', '!=', userID))
    );
    const photoSnap = await getDocs(
      query(collection(db, 'photos'), where('owner', '!=', userID), where('folder', '==', 'root'))
    );
    const otherFolders = [];
    const otherPhotos = [];

    folderSnap.forEach((doc) => {
      otherFolders.push(doc.data());
    });
    photoSnap.forEach((doc) => {
      otherPhotos.push(doc.data());
    });

    const content = {
      folders: otherFolders,
      photos: otherPhotos
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
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }
    const photo = {
      name: req.body.name,
      caption: req.body.description,
      date: Timestamp.fromDate(new Date()),
      folder: req.params.folder,
      isPrivate: false,
      likes: [],
      link: imageUrl,
      owner: userID
    };

    const docRef = await addDoc(collection(db, 'photos'), photo);
    if (docRef) {
      // console.log(photo);
      res.send(photo);
      console.log('sending docRef');
    }

    // update users.
    await updateDoc(doc(db, 'users', userID), {
      photos: arrayUnion(docRef.id)

      // update capacity
    });

    // update folder
    if (req.params.folder != null) {
      await updateDoc(doc(db, 'folders', req.params.folder), {
        photos: arrayUnion(docRef.id)
      });
    }
  } catch (err) {
    next(err);
  }
};

const deletePhoto = async (req, res, next) => {
  try {
    // delete photo in storage.
    const imageRef = ref(storage, `images/${req.body.name}`);
    deleteObject(imageRef)
      .then(() => {
        console.log('Photo deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });

    // delete photo information in firestore.
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
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }
    const usersRef = doc(db, 'users', userID);
    await updateDoc(usersRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('update user');
    });

    // send info to frontend
    const photoDelete = {
      photoID: req.params.id,
      photoName: req.body.name
    };
    res.send(photoDelete);
  } catch (err) {
    next(err);
  }
};

const likePost = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }

    await updateDoc(doc(db, 'photos', req.params.id), {
      likes: arrayUnion(userID)
    });
  } catch (err) {
    next(err);
  }
};
export default {
  getRecentPhotos,
  getLikedPhotos,
  getUserFolders,
  getPhotosInFolder,
  getUserContent,
  getAllComments,
  uploadPhoto,
  getPhotoById,
  deletePhoto,
  likePost,
  comment,
  getUserById
};
