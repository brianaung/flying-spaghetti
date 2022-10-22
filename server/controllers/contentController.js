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
  where
} from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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
};

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
  };
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
    if (photoSnap.data().folder === 'root') {
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
    if (!userID) {
      return res.sendStatus(404);
    }
    const content = await getContentByUID(userID);
    return res.status(200).json(content);
  } catch (err) {
    next(err);
  }
};

const getUserContent = async (req, res, next) => {
  try {
    // Check if logged in as admin
    const adminID = getCurrUserID();
    if (!adminID) {
      return res.sendStatus(401);
    }
    const adminSnap = await getDoc(doc(db, 'users', adminID));
    if (adminSnap.data().role !== 'admin') {
      return res.sendStatus(401);
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
    if (!userID) {
      return res.sendStatus(404);
    }
    const folderSnap = await getDocs(
      query(collection(db, 'folders'), where('owner', '!=', userID))
    ); // already ordered by folder ID
    const photoSnap = await getDocs(
      query(collection(db, 'photos'), where('owner', '!=', userID), where('folder', '==', 'root'))
    );
    let otherFolders = [];
    let otherPhotos = [];

    folderSnap.forEach((doc) => {
      otherFolders.push(doc.id);
    });

    const photoIDs = [];
    photoSnap.forEach((doc) => {
      photoIDs.push(doc.id);
    });
    for (const id of photoIDs) {
      const photo = await getPhotoByID(id);
      otherPhotos.push(photo);
    }
    otherPhotos = otherPhotos.filter((photo) => photo !== null);

    const content = {
      folders: otherFolders,
      photos: otherPhotos
    };
    return res.status(200).send(content);
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
      return res.sendStatus(404);
    }
    return res.status(200).json(photo);
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
    const colSnap = await getDocs(
      query(collection(db, 'photos'), where('isPrivate', '==', false), orderBy('date', 'desc'))
    );
    const photoIDs = [];
    let photos = [];
    colSnap.forEach((doc) => {
      photoIDs.push(doc.id);
    });
    for (const id of photoIDs) {
      const photo = await getPhotoByID(id);
      photos.push(photo);
    }
    photos = photos.filter((photo) => photo !== null);
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
    let photos = [];
    for (const photoID of userSnap.data().liked) {
      const photo = await getPhotoByID(photoID);
      photos.push(photo);
    }
    photos = photos.filter((photo) => photo !== null);
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
    let photos = [];
    for (const photoID of folderPhotos) {
      const photo = await getPhotoByID(photoID);
      photos.push(photo);
    }
    photos = photos.filter((photo) => photo !== null);
    res.send(photos);
  } catch (err) {
    next(err);
  }
};

// Comments
const getPhotoComments = async (req, res, next) => {
  try {
    // const colSnap = await getDocs(query(collection(db, 'photos'),
    //   where('isPrivate', '==', false), orderBy('date', 'desc')));
    // const photoIDs = [];
    // const photos = [];
    // colSnap.forEach((doc) => {
    //   photoIDs.push(doc.id);
    // })
    // for (const id of photoIDs) {
    //   const photo = await getPhotoByID(id);
    //   photos.push(photo);
    // }
    // photos.filter((photo) => photo !== null);
    // res.send(photos);

    // Query newest first
    const colSnap = await getDocs(
      query(collection(db, 'photos', req.params.photoID, 'comments'), orderBy('date', 'desc'))
    );
    const comments = [];
    colSnap.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    for (const comment of comments) {
      const name = await getNameByID(comment.owner);
      comment.owner = name;
    }
    res.send(comments);
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

    await addDoc(collection(db, 'photos', req.params.photoID, 'comments'), comment);

    const name = await getNameByID(userID);
    comment.owner = name;
    res.status(201);
    res.send(comment);
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
    // const imageRef = ref(storage, `images/${req.body.name}`);
    // const metatype = { contentType: req.file.mimetype, name: req.file.originalname };
    // await uploadBytes(imageRef, req.file.buffer, metatype);

    // const imageUrl = await getDownloadURL(imageRef);

    // add a new photo in the photos collection of firestore
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }

    let isPrivate = false;

    if (req.body.isPrivate === 'true') {
      isPrivate = true;
    }

    const photo = {
      name: req.body.name,
      caption: req.body.description,
      date: Timestamp.fromDate(new Date()),
      folder: req.params.folder,
      isPrivate,
      likes: [],
      //link: imageUrl,
      owner: userID
    };

    const docRef = await addDoc(collection(db, 'photos'), photo);

    if (docRef) {
      // upload photo into storage
      const imageRef = ref(storage, `images/${docRef.id}`);
      const metatype = { contentType: req.file.mimetype, name: req.file.originalname };
      await uploadBytes(imageRef, req.file.buffer, metatype);

      const imageUrl = await getDownloadURL(imageRef);

      const photoRef = doc(db, 'photos', docRef.id);

      await updateDoc(photoRef, {
        link: imageUrl
      });

      // console.log(photo);
      //res.send({...photo, id: docRef.id});
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

    res.send({...photo, id: docRef.id});
    
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
    // // add photo id into bin array
    // await updateDoc(usersRef, {
    //   bin: arrayUnion(req.params.id)
    // }).then(() => {
    //   console.log('move photo to the bin');
    // });

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

    // delete photo in storage.
    console.log(req.body.name);
    //const imageRef = ref(storage, `images/${req.body.name}`);
    const imageRef = ref(storage, `images/${req.params.id}`);
    deleteObject(imageRef)
      .then(() => {
        console.log('Photo deleted successfully');
      })
      .catch((err) => {
        console.log('There is an error, cannot delete photo');
      });

    res.send({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const getNumLikes = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }
    const photoRef = doc(db, 'photos', req.params.id);
    const photoSnap = await getDoc(photoRef);
    const photoLikes = photoSnap.data().likes;
    const users = [];
    for (const uid of photoLikes) {
      const name = await getNameByID(uid);
      users.push(name);
    }
    const likes = {
      nameList: users,
      num: photoLikes.length
    };
    res.send(likes);
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

    const userRef = doc(db, 'users', userID);
    const photoRef = doc(db, 'photos', req.params.id);
    const userSnap = await getDoc(userRef);
    if (userSnap.data().liked.includes(req.params.id)) {
      await updateDoc(userRef, {
        liked: arrayRemove(req.params.id)
      });
      await updateDoc(photoRef, {
        likes: arrayRemove(userID)
      });
    } else {
      await updateDoc(userRef, {
        liked: arrayUnion(req.params.id)
      });
      await updateDoc(photoRef, {
        likes: arrayUnion(userID)
      });
    }
    res.sendStatus(200);
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

// NOT TESTING
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
  likePost,
  createFolder,
  moveToBin,
  moveToDifferentFolder,
  postComment,
  getUserByID,
  getNameByID,
  getOwnContent,
  getSharedContent,
  getPhotoPage,
  getNumLikes
};
