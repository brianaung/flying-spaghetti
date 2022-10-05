// import * as fs from "firebase/firestore";
import { setDoc, updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase.js';
import { v4 } from 'uuid';
import { createTransport } from 'nodemailer';

const getUser = async (req, res, next) => {
  try {
    // const userID = req.params.id;
    const userSnap = await getDoc(doc(db, 'users', req.params.id));
    if (!userSnap.exists) {
      res.sendStatus(404);
    }
    res.send(userSnap.data());
  } catch (err) {
    next(err);
  }
};

// Fields not updated, use registerUser
const sampleUser = async (req, res, next) => {
  try {
    await setDoc(doc(db, 'users', 'user1'), {
      firstName: 'Tom',
      lastName: 'Hanks',
      role: 'user',
      capacity: 3,
      date: Timestamp.fromDate(new Date()),
      folders: [],
      photos: [],
      liked: []
    });
    res.send('success');
  } catch (err) {
    next(err);
  }
};

// Use registerUser instead
const createUser = async (req, res, next) => {
    await setDoc(doc(db, 'users', req.body.username), {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      role: req.body.role,
      capacity: req.body.capacity,
      date: Timestamp.fromDate(new Date()),
      folders: [],
      photos: [],
      liked: []
    });
};

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
    if (userData.role != 'pending' || req.params.key !== userData.secretKey) {
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

    const emailText =
      `
      Hi ${userData.firstName},\n\n
      Congratulations, your account has been approved and you can now login with your email and password.\n\n
      Enjoy,\n
      Dev Team
      `

    const content = {
      from: 'admn1flying@gmail.com',
      to: 'admn1flying@gmail.com',
      subject: 'Your account has been activated!',
      text: emailText
    }

    mailTransport.sendMail(content, (err) => {
      if (err) {
        console.log('Unable to send email', err);
      } else {
        console.log('send email to admin');
      }
    })
  } catch (err) {
    next(err);
  }
};

export default {
  getUser,
  createUser,
  banUser,
  acceptUser,
  sampleUser
};
