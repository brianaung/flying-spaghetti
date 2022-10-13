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
  onSnapshot
} from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

const getCurrUserID = () => {
  const user = auth.currentUser;
  if (user != null) {
    return user.uid;
  } else {
    return null;
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', req.params.id));
    res.send(userSnap.data());
  } catch (err) {
    next(err);
  }
};

const getNameByID = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', req.params.id));
    const userData = userSnap.data();
    res.send(userData.firstName + ' ' + userData.lastName);
  } catch (err) {
    next(err);
  }
};

const getPhotoByID = async (req, res, next) => {
  try {
    const photoSnap = await getDoc(doc(db, 'photos', req.params.id));
    if (!photoSnap.exists()) {
      res.sendStatus(404);
    }

    const photoData = photoSnap.data();
    const userID = getCurrUserID();
    let userLiked = false;

    // Check if photo is private or liked by user
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

const postComment = async (req, res, next) => {
  try {
    const userID = getCurrUserID();
    if (userID == null) {
      res.sendStatus(404);
    }

    const comment = {
      owner: userID,
      text: req.body.text,
      date: Timestamp.fromDate(new Date())
    };

    await addDoc(collection(db, 'photos', req.params.photoID, 'comments'), comment);
  } catch (err) {
    next(err);
  }
};

const getPhotoComments = async (req, res, next) => {
  try {
    // Query newest first
    const colRef = query(
      collection(db, 'photos', req.params.photoID, 'comments'),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const comments = [];
      snapshot.forEach((doc) => {
        comments.push(doc.data());
      });
      res.send(comments);
    });

    // Stop listening to changes
    unsubscribe();

    // const comments = [];
    // const snapshot = await getDocs(collection(db, 'photos', req.params.photoID, 'comments'));

    // for (var doc in snapshot) {
    //   var docData = doc.data();
    //   var ownerRef = await getDoc(doc(db, 'users', docData.owner));
    //   var ownerName = ownerRef.data().firstName;
    //   var currentComment = {
    //     name: ownerName,
    //     text: docData.text,
    //     date: docData.date,
    //   }
    //   comments.push(currentComment);
    // }
    // res.send(comments);
  } catch (err) {
    next(err);
  }
};

const getRecentPhotos = async (req, res, next) => {
  try {
    // Query newest first
    const colRef = query(
      collection(db, 'photos'),
      orderBy('date', 'desc'),
      where('isPrivate', '==', false)
    );
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const photos = [];
      snapshot.forEach((doc) => {
        photos.push(doc.data());
      });
      res.send(photos);
    });

    // Stop listening to changes
    unsubscribe();
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

/* NOTE: this is very similar to getUserContent
         we could actually refactor these into one to use it for every folders
         but will need to update urls and routes (too much work ughh)
*/
// Get user content a specific folder (there will just be photos no more folders)
const getPhotosInFolder = async (req, res, next) => {
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
      if (photoSnap.data().folder == req.params.id) {
        userPhotos.push({ ...photoSnap.data(), photoID });
      }
    }

    res.send(userPhotos);
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
      if (photoSnap.data().folder == 'root') {
        userPhotos.push({ ...photoSnap.data(), photoID });
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
    res.send({ photoID: req.params.id });
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
    const userID = getCurUserID();
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
    const userID = getCurUserID();
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
  getNameByID
};
