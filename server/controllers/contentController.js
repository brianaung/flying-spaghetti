import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  collection,
  query,
  orderBy,
  Timestamp,
  arrayRemove,
  where,
  increment
} from 'firebase/firestore';
import { db, storage, auth } from '../config/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';

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
    const userSnap = await getDoc(doc(db, 'users', userID));
    if (userSnap.data().role === 'admin') {
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
    if (photoSnap.data() && photoSnap.data().folder === 'root') {
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
    const otherFolders = [];
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

    // order oldest to newest (so in frontend latest comment appears at the bottom and oldest at top)
    const colSnap = await getDocs(
      query(collection(db, 'photos', req.params.photoID, 'comments'), orderBy('date'))
    );
    const comments = [];
    colSnap.forEach((doc) => {
      comments.push({
        id: doc.id,
        formattedDate: doc.data().date.toDate().toDateString(),
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

// helper function to send image to the storage
// returns a promise if upload succeed
// also show more meaningful upload info in console
const getImgUrl = async (imageRef, buffer, metatype) => {
  return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(imageRef, buffer, metatype);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log("UPLOAD ERROR: " + error.code);
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(imgUrl);
        }
      );
  });
}

const uploadPhoto = async (req, res, next) => {
  try {
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
      // link: imageUrl,
      owner: userID
    };

    const docRef = await addDoc(collection(db, 'photos'), photo);

    if (docRef) {
      const imageRef = ref(storage, `images/${docRef.id}`);
      const metatype = { contentType: req.file.mimetype, name: req.file.originalname };

      // get the image url after storing in the firebase storage
      const imageUrl = await getImgUrl(imageRef, req.file.buffer, metatype);

      const imageData = await getMetadata(imageRef);

      // const imageUrl = await getDownloadURL(imageRef);
      const photoRef = doc(db, 'photos', docRef.id);

      const userRef = doc(db, 'users', userID);
      const userSnap = await getDoc(userRef);
      const used = await userSnap.get('used');
      const capacity = await userSnap.get('capacity');
      const currCap = capacity - used;
      // if capacity is less then 0, delete all updates

      if (currCap < imageData.size / 1000000) {
        console.log('there is no enough capacity');

        // delete photo in photos
        await deleteDoc(photoRef).then(() => {
          console.log('delete update in photos');

          // delete photo in storage.
          deleteObject(imageRef)
            .then(() => {
              console.log('delete update in storage');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        await updateDoc(photoRef, {
          link: imageUrl
        });
        console.log('sending docRef');
        // update users.
        await updateDoc(doc(db, 'users', userID), {
          photos: arrayUnion(docRef.id),
          // update capacity
          used: increment(imageData.size / 1000000)
        });

        // update folder
        if (req.params.folder != null) {
          await updateDoc(doc(db, 'folders', req.params.folder), {
            photos: arrayUnion(docRef.id)
          });
        }

        res.send({ ...photo, id: docRef.id });
      }
    } else {
      console.log("could not find the doc ref");
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

    

    // delete photo in storage.
    const imageRef = ref(storage, `images/${req.params.id}`);
    const imageData = await getMetadata(imageRef);
    deleteObject(imageRef)
      .then(() => {
        console.log('Photo deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });

    
    const usersRef = doc(db, 'users', userID);
    // // add photo id into bin array
    // await updateDoc(usersRef, {
    //   bin: arrayUnion(req.params.id)
    // }).then(() => {
    //   console.log('move photo to the bin');
    // });

    // delete photo id in photo array
    await updateDoc(usersRef, {
      photos: arrayRemove(req.params.id),
      used: increment(-(imageData.size / 1000000))
    }).then(() => {
      console.log('delete photo from user photos');
    });

    // delete photo from folder
    const folderRef = doc(db, 'folders', req.params.folder);

    await updateDoc(folderRef, {
      photos: arrayRemove(req.params.id)
    }).then(() => {
      console.log('delete photo from folder');
    });

    // delete photo from photos collection
    const photoRef = doc(db, 'photos', req.params.id);

    await deleteDoc(photoRef).then(() => {
      console.log('delete photo from photo collection');
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
    res.send(req.body.folderName);
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
  getNumLikes,
  getCurrUserID
};
