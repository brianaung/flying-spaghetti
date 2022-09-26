import { doc, addDoc, getDoc, getDocs, collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { db, storage } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
    // const userID = req.params.id;
    const userSnap = await query(collection(db, 'photos', '2iGpNGwey6sItnF3o5uR', 'comments'));
    if (!userSnap.exists) {
      res.sendStatus(404);
    }
    const commentIDs = userSnap;

    const comments = [];
    for (const comment in commentIDs) {
      const commentOBJ = getDoc(doc(db, 'photos', '2iGpNGwey6sItnF3o5uR', 'comments', comment));
      comments.push((await commentOBJ).data());
    }

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
      const photo = {
        id: photoSnap.id,
        data: photoSnap.data()
      };
      photos.push(photo);
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
        photoList.push(photo);
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

// incomplete
const uploadPhoto = async (req, res, next) => {
  try {
    console.log(req.body.name);
    console.log(req.body.description);
    console.log(req.file);
    
        const imageRef = ref(storage, `images/${req.body.name}`);
        //console.log(getDownloadURL(imageRef));
        const metatype = { contentType: req.file.mimetype, name: req.file.originalname };
        uploadBytes(imageRef, req.file.buffer, metatype).then(() => {
            res.send('Image upload');
        });
        
        const docRef = await addDoc(collection(db, 'photos'), {
          caption: req.body.description,
          date: Timestamp.fromDate(new Date()),
          folder: "coffee",
          
          isPrivate: false,
          
          likes: [],
          link: `gs://flying-spaghetti-60893.appspot.com/images/${req.body.name}`,
          //link: `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`,
          owner: "admin1",
          
          
          
        });
        
        // const photo = new Photo(
        // req.user.username,
        // req.body.caption
        
      //)
      
      
    //if (photo == null) return;
    
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
  getPhotoById
};
