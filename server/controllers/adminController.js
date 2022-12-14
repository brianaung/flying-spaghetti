import {
  query,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  collection,
  orderBy,
  increment
} from 'firebase/firestore';
import { db, auth } from '../config/firebase.js';
import { v4 } from 'uuid';
import { createTransport } from 'nodemailer';

const banneSpecUser = async (userID, sKey) => {
  const userSnap = await getDoc(doc(db, 'users', userID));
  if (!userSnap.exists() || sKey !== userSnap.data().secretKey) {
    return null;
  }
  // Ban user and generate new key
  await updateDoc(doc(db, 'users', userID), {
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

  const userEmail = userSnap.data().email;
  console.log(userEmail);
  const content = {
    from: 'admn1flying@gmail.com',
    //to: 'admn1flying@gmail.com',
    to: userEmail,
    subject: 'Your account has been baned!',
    text: emailText
  };

  mailTransport.sendMail(content, (err) => {
    if (err) {
      // console.log('Unable to send email', err);
    } else {
      // console.log('send email to admin');
    }
  });
};

const banAllSpecUser = async (req, res, next) => {
  try {
    const allBan = req.body.data;
    allBan.forEach((doc) => {
      banneSpecUser(doc.id, doc.sk);
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const banUser = async (req, res, next) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', req.params.uid));
    if (!userSnap.exists() || req.params.key !== userSnap.data().secretKey) {
      return res.sendStatus(401);
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

    const userEmail = userSnap.data().email;
    console.log(userEmail);
    const content = {
      from: 'admn1flying@gmail.com',
      //to: 'admn1flying@gmail.com',
      to: userEmail,
      subject: 'Your account has been baned!',
      text: emailText
    };

    mailTransport.sendMail(content, (err) => {
      if (err) {
        // console.log('Unable to send email', err);
      } else {
        // console.log('send email to admin');
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
    const user = {
      role: 'user',
      secretKey: v4()
    };
    await updateDoc(doc(db, 'users', req.params.uid), user);
    res.sendStatus(200);
    // .json(user);
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

    const userEmail = userSnap.data().email;
    console.log(userEmail);
    const content = {
      from: 'admn1flying@gmail.com',
      //to: 'admn1flying@gmail.com',
      to: userEmail,
      subject: 'Your account has been activated!',
      text: emailText
    };

    mailTransport.sendMail(content, (err) => {
      if (err) {
        // console.log('Unable to send email', err);
      } else {
        // console.log('send email to admin');
      }
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    // Check if logged in as admin
    if (!auth.currentUser) {
      return res.sendStatus(401);
    }
    const userID = auth.currentUser.uid;
    const adminSnap = await getDoc(doc(db, 'users', userID));
    if (adminSnap.data().role !== 'admin') {
      return res.sendStatus(401);
    }

    const usersSnap = await getDocs(query(collection(db, 'users'), orderBy('lastName', 'asc')));
    const users = [];
    usersSnap.forEach((doc) => {
      if (doc.data().role !== 'admin') {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      }
    });
    return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const addCapacity = async (req, res, next) => {
  // check if current user is admin
  if (!auth.currentUser) {
    return res.sendStatus(401);
  }
  // add capacity to the user
  const usersRef = doc(db, 'users', req.body.userID);
  await updateDoc(usersRef, {
    capacity: increment(100)
  }).then(() => {
    console.log('update capacity');
  });
};

export default {
  banUser,
  acceptUser,
  getAllUsers,
  addCapacity,
  banAllSpecUser
};
