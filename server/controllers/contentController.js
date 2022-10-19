import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  query,
  orderBy,
  Timestamp,
  arrayRemove,
  deleteDoc,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
// import { KillOthers } from 'concurrently';
// import { onAuthStateChanged } from 'firebase/auth';

// Helper functions
const getCurrUserID = () => {
  const user = auth.currentUser;
  if (user !== null) {
    return user.uid;
  } else {
    return null;
  }
};

const getNameByID = async (userID) => {
  const userSnap = await getDoc(doc(db, 'users', userID));
  if (!userSnap.exists()) {
    return null;
  }
  const userData = userSnap.data();
  return userData.firstName + ' ' + userData.lastName;
}

const getPhotoByID = async (photoID) => {
  const photoSnap = await getDoc(doc(db, 'photos', photoID));
  if (!photoSnap.exists()) {
    return null;
  }
  const photoData = photoSnap.data();
  const userID = getCurrUserID();
  let userLiked = false;

  // Check if photo needs to be hidden
  if (userID) {
    const userRole = await getDoc(doc(db, 'users', userID));
    if (userRole === 'admin') {
      // Admin can see private photos
      userLiked = photoData.likes.includes(userID);
    } else {
      // Check if user viewing other user private photo
      if (photoData.isPrivate && photoData.owner !== userID) {
        return null;
      } else {
        userLiked = photoData.likes.includes(userID);
      }
    }
  } else {
    if (photoData.isPrivate) {
      return null;
    }
  }
  const photo = {
    id: photoID,
    isLiked: userLiked,
    ...photoData
  }
  // console.log(photoData)
  return photo;
};

const getUserByID = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', req.params.id));
    res.send(userSnap.data());
  } catch (err) {
    next(err);
  }
};

const getContentByUID = async (userID) => {
  const userSnap = await getDoc(doc(db, 'users', userID));
  const userData = userSnap.data();
  const userPhotos = [];

  for (const photoID of userData.photos) {
    const photoSnap = await getDoc(doc(db, 'photos', photoID));
    if (photoSnap.data().folder === "root") {
      const photo = await getPhotoByID(photoID);
      userPhotos.push(photo);
    }
  }
  const content = {
    folders: userData.folders,
    photos: userPhotos
  };

  return content;
};

/************************************************************/

// Content (photos and folders)
const getOwnContent = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    // const userID = 'qMxsw4rNtCYmsaDzjskwZ2iqBmh1';
    if (!userID) {
      res.sendStatus(404);
    }
    const content = await getContentByUID(userID);
    res.send(content);
  } catch (err) {
    next(err);
  }
};

const getUserContent = async (req, res, next) => {
  try {
    // Check if logged in as admin
    const adminID = getCurrUserID();
    // const adminID = 'fvJJwk61OmMiIITjFm7SkRhaYcF2';
    if (!adminID) {
      res.sendStatus(404);
    }
    const adminSnap = await getDoc(doc(db, 'users', adminID));
    if (adminSnap.data().role !== 'admin') {
      res.sendStatus(404);
    }
    const content = await getContentByUID(req.params.id);
    res.send(content);
  } catch (err) {
    next(err);
  }
};

const getSharedContent = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    // const userID = 'qMxsw4rNtCYmsaDzjskwZ2iqBmh1';
    if (!userID) {
      res.sendStatus(404);
    }
    const folderSnap = await getDocs(query(collection(db, 'folders'),
      where('owner', '!=', userID)));       // already ordered by folder ID
    const photoSnap = await getDocs(query(collection(db, 'photos'),
      where('owner', '!=', userID), where('folder', '==', 'root')));
    const otherFolders = [];
    const otherPhotos = [];

    folderSnap.forEach((doc) => {
      otherFolders.push(doc.id);
    });

    const photoIDs = []
    photoSnap.forEach((doc) => {
      photoIDs.push(doc.id);
    });
    for (const id of photoIDs) {
      const photo = await getPhotoByID(id);
      otherPhotos.push(photo);
    }
    otherPhotos.filter((photo) => photo !== null);

    const content = {
      folders: otherFolders,
      photos: otherPhotos
    };
    res.send(content);
  } catch (err) {
    next(err);
  }
};

/************************************************************/

// View photos
const getPhotoPage = async (req, res, next) => {
  try {
    const photo = await getPhotoByID(req.params.id);
    if (photo === null) {
      res.sendStatus(404);
    }
    res.send(photo);
  } catch (err) {
    next(err);
  }
};

const getRecentPhotos = async (req, res, next) => {
  try {
    // Query newest first
    // const colRef = query(collection(db, 'photos'), orderBy('date', 'desc'), where('isPrivate', '==', false));
    // const unsubscribe = onSnapshot(colRef, (snapshot) => {
    //   const photos = [];
    //   snapshot.forEach(async (doc) => {
    //     const photo = await getPhotoByID(doc.id);
    //     photos.push(photo);
    //   })
    //   photos.filter((photo) => photo !== null);
    //   res.send(photos);
    // });
    
        
    // Stop listening to changes
    // unsubscribe();
    const colSnap = await getDocs(query(collection(db, 'photos'),
      where('isPrivate', '==', false), orderBy('date', 'desc')));
    const photoIDs = [];
    const photos = [];
    colSnap.forEach((doc) => {
      photoIDs.push(doc.id);
    })
    for (const id of photoIDs) {
      const photo = await getPhotoByID(id);
      photos.push(photo);
    }
    photos.filter((photo) => photo !== null);
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

const getLikedPhotos = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (!userID) {
      res.sendStatus(404);
    }

    const userSnap = await getDoc(doc(db, 'users', userID));
    const photos = [];
    for (const photoID of userSnap.data().liked) {
      const photo = await getPhotoByID(photoID);
      photos.push(photo);
    }
    photos.filter((photo) => photo !== null);
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

const getPhotosInFolder = async (req, res, next) => {
  try {
    const folderSnap = await getDoc(doc(db, 'folders', req.params.id));
    if (!folderSnap.exists()) {
      res.sendStatus(404);
    }

    const folderPhotos = folderSnap.data().photos;
    const photos = []
    for (let photoID of folderPhotos) {
      const photo = await getPhotoByID(photoID);
      photos.push(photo);
    }
    photos.filter((photo) => photo !== null);
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

// Comments
const getPhotoComments = async (req, res, next) => {
  try {
    // Query newest first
    const colRef = query(collection(db, 'photos', req.params.photoID, 'comments'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const comments = [];
      snapshot.forEach(async (doc) => {
        const commentData = doc.data();
        const fullName = await getNameByID(commentData.owner);
        const comment = {
          name: fullName,
          text: commentData.text
        }

        comments.push(comment);
      })
      res.send(comments);
    });
        
    // Stop listening to changes
    unsubscribe();
  } catch (err) {
    next(err);
  }
};

const postComment = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(401);
    }

    const comment = {
      owner: userID,
      text: req.body.text,
      date: Timestamp.fromDate(new Date())
    };
    console.log(comment);

    res.sendStatus(200);
    await addDoc(collection(db, 'photos', req.params.photoID, 'comments'), comment);
  } catch (err) {
    next(err);
  }
};


// View folders
const getUserFolders = async (req, res, next) => {
  try {
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
      isPrivate: req.body.isPrivate,
      likes: [],
      link: imageUrl,
      owner: userID,
    };

    const docRef = await addDoc(collection(db, 'photos'), photo);
    if (docRef) {
      // console.log(photo);
      res.send({...photo, id: docRef.id});
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

const moveToBin = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }
    const usersRef = doc(db, 'users', userID);
    // add photo id into bin array
    await updateDoc(usersRef, {
      bin: arrayUnion(req.params.id)
    }).then(() => {
      console.log('move photo to the bin');
    });

    // delete photo id in photo array
    await updateDoc(usersRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('delete photo from photos');
    });

    // delete photo from folder
    const folderRef = doc(db, 'folders', req.params.folder);

    await updateDoc(folderRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('delete photo from folder');
    });
    res.send({ id: req.params.id });
  } catch (error) {
    next(error);
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
        console.log('There is an error, cannot delete photo');
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
    // 2. update users
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }
    const usersRef = doc(db, 'users', userID);
    await updateDoc(usersRef, {
      bin: arrayRemove(req.params.id)
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

    await updateDoc(doc(db, 'users', userID), {
      liked: arrayUnion(req.params.id)
    });
    await updateDoc(doc(db, 'photos', req.params.id), {
      likes: arrayUnion(userID)
    });
  } catch (err) {
    next(err);
  }
};

const createFolder = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }

    // 1.update user
    const usersRef = doc(db, 'users', userID);
    await updateDoc(usersRef, {
      folders: arrayUnion(req.body.folderName)
    }).then(() => {
      console.log('update new folder in user');
    });
    // 2.update folders
    const folder = {
      date: Timestamp.fromDate(new Date()),
      owner: userID,
      photos: []
    };
    await setDoc(doc(db, 'folders', req.body.folderName), folder);
  } catch (error) {
    next(error);
  }
};

const moveToDifferentFolder = async (req, res, next) => {
  try {
    // 1. add photo to different folder
    await updateDoc(doc(db, 'folders', req.body.moveTo), {
      photos: arrayUnion(req.params.id)
    }).then(() => {
      console.log('photo moves into this folder');
    });
    // 2. delete photo in current folder
    const folderRef = doc(db, 'folders', req.params.folder);
    await updateDoc(folderRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('delete photo from folder');
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getRecentPhotos,
  getLikedPhotos,
  getUserFolders,
  getPhotosInFolder,
  getUserContent,
  getPhotoComments,
  uploadPhoto,
  getPhotoByID,
  deletePhoto,
  likePost,
  createFolder,
  moveToBin,
  moveToDifferentFolder,
  postComment,
  getUserByID,
  getNameByID,
  getOwnContent,
  getSharedContent,
  getPhotoPage
};
