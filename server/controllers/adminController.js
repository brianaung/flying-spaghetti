import {
  query,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  collection,
  orderBy
} from 'firebase/firestore';
import { db, auth } from '../config/firebase.js';
import { v4 } from 'uuid';
import { createTransport } from 'nodemailer';

const banUser = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', req.params.uid));
    if (!userSnap.exists() || req.params.key !== userSnap.data().secretKey) {
      res.sendStatus(404);
    }
    // const key = userSnap.data().secretKey;

    // Ban user and generate new key
    await updateDoc(doc(db, 'users', req.params.uid), {
      role: 'banned',
      secretKey: v4()
    });
    // Inform user they got rejected and banned, provide admin's email to appeal
    // Email user they got accepted and account is activated
    const mailTransport = createTransport({
      service: 'gmail',
      auth: {
        user: 'admn1flying@gmail.com',
        pass: 'pgxzirsraggfdxvh'
      }
    });

    const emailText = `
      Hi ${userSnap.data().firstName},\n\n
      Your current account has been baned by the admin\n
      Dev Team
      `;

    const content = {
      from: 'admn1flying@gmail.com',
      to: 'admn1flying@gmail.com',
      subject: 'Your account has been baned!',
      text: emailText
    };

    mailTransport.sendMail(content, (err) => {
      if (err) {
        console.log('Unable to send email', err);
      } else {
        console.log('send email to admin');
      }
    });
  } catch (err) {
    next(err);
  }
};

const acceptUser = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', req.params.uid));
    if (!userSnap.exists()) {
      res.sendStatus(404);
    }

    const userData = userSnap.data();
    if (userData.role !== 'pending' || req.params.key !== userData.secretKey) {
      res.sendStatus(404);
    }

    // Allow user access and generate new key
    await updateDoc(doc(db, 'users', req.params.uid), {
      role: 'user',
      secretKey: v4()
    });

    // Email user they got accepted and account is activated
    const mailTransport = createTransport({
      service: 'gmail',
      auth: {
        user: 'admn1flying@gmail.com',
        pass: 'pgxzirsraggfdxvh'
      }
    });

    const emailText = `
      Hi ${userData.firstName},\n\n
      Congratulations, your account has been approved and you can now login with your email and password.\n\n
      Enjoy,\n
      Dev Team
      `;

    const content = {
      from: 'admn1flying@gmail.com',
      to: 'admn1flying@gmail.com',
      subject: 'Your account has been activated!',
      text: emailText
    };

    mailTransport.sendMail(content, (err) => {
      if (err) {
        console.log('Unable to send email', err);
      } else {
        console.log('send email to admin');
      }
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const usersSnap = query(collection(db, 'users'), orderBy('lastName', 'asc'));
    const users = [];
    usersSnap.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data()
      });
    });
    return users;
  } catch (err) {
    next(err);
  }
};

// const getPhotoForAdmin = async (photoID) => {
//   const userID = getCurrUserID();
//   const userSnap = await getDoc(doc(db, 'users', userID));
//   const userData = userSnap.data();
//   if (userData.role !== 'admin') {
//     return null;
//   }
//   const photoSnap = await getDoc(doc(db, 'photos', photoID));
//   if (!photoSnap.exists()) {
//     return null;
//   }

//   const photoData = photoSnap.data();
//   let userLiked = false;

//   // Check if photo is private or liked by user
//   if (userID) {
//     userLiked = photoData.likes.includes(userID);
//   }
//   const photo = {
//     id: photoSnap.id,
//     data: photoData,
//     isLiked: userLiked
//   }
//   return photo;
// };

// const getOtherDashboard = async (req, res, next) => {
//   try {
//     const userSnap = await getDoc(doc(db, 'users', req.params.id));
//     const userData = userSnap.data();
//     const userPhotos = [];

//     for (const photoID of userData.photos) {
//       if (photoSnap.data().folder === "root") {
//         userPhotos.push(getPhotoForAdmin(photoID));
//       }
//     }

//     const content = {
//       folders: userData.folders,
//       photos: userPhotos
//     };

//     res.send(content);
//   } catch (err) {
//     next(err);
//   }
// };

export default {
  banUser,
  acceptUser,
  getAllUsers
};
