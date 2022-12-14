import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase.js';
import { v4 } from 'uuid';
import { createTransport } from 'nodemailer';

// Create a new account and tested
const registerUser = async (req, res, next) => {
  try {
    // console.log(req.body.email);
    // console.log(req.body.password);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    await signOut(auth);

    // Add new Firestore doc in users collection
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'pending',
      capacity: 100,
      used: 0,
      date: Timestamp.fromDate(new Date()),
      folders: [],
      photos: [],
      liked: [],
      secretKey: v4(),
      email: req.body.email
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), newUser);

    // Send confirmation email to admin(s) with approve/deny links
    const mailTransport = createTransport({
      service: 'gmail',
      auth: {
        user: 'admn1flying@gmail.com',
        pass: 'pgxzirsraggfdxvh'
      }
    });

    const emailText = `
      Hi Admin,\n\n
      The following user has requested to register an account in your website:\n
      Email: ${req.body.email}\n
      Full name: ${req.body.firstName} ${req.body.lastName}\n\n
      Approve/reject account access for this user (for single-use only):\n
      Click here to approve: http://localhost:9000/accept/${userCredential.user.uid}/${newUser.secretKey}\n
      Click here to reject (ban): http://localhost:9000/ban/${userCredential.user.uid}/${newUser.secretKey}\n
      Please do not share the link to anyone else.\n\n
      Thanks,\n
      Dev Team
      `;

    const content = {
      from: 'admn1flying@gmail.com',
      to: 'admn1flying@gmail.com',
      subject: 'New user request',
      text: emailText
    };

    mailTransport.sendMail(content, (err) => {
      if (err) {
        return res.status(404); // console.log('Unable to send email', err);
      } else {
        // console.log('Email sent to admin.');
      }
    });
    return res.status(200);
  } catch (err) {
    res.send(err);
    next(err);
  }
};

// testing in progress
const signInUser = async (req, res, next) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );

    const user = await getDoc(doc(db, 'users', userCredential.user.uid));
    const role = user.data().role;

    if (role !== 'user' && role !== 'admin') {
      if (role === 'banned') {
        // res.send({code: 'You have been banned from accessing your account.'});
        // console.log('You have been banned from accessing your account.');
      } else if (role === 'pending') {
        // res.send({code:'Please wait until an admin approves your account.'});
        // console.log('Please wait until an admin approves your account.');
      }

      await signOut(auth);

      return res.status(200).send(null);
    }
    return res.status(200).json(user.data());
  } catch (error) {
    // next(error);
    console.log(error);
  }
};

const signOutUser = async (req, res, next) => {
  try {
    if (!auth.currentUser) {
      return res.sendStatus(401);
    }
    await signOut(auth);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  signInUser,
  signOutUser
};
