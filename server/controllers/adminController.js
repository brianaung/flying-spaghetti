// import * as fs from "firebase/firestore";
import { setDoc, updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { async } from '@firebase/util';

const getUser = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const userSnap = await getDoc(doc(db, 'users', userID));
    if (!userSnap.exists) {
      res.sendStatus(404);
    }
    res.send(userSnap.data());
  } catch (err) {
    next(err);
  }
};

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

const createUser = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

const banUser = async (req, res, next) => {
  try {
    await updateDoc(doc(db, 'users', req.params.username), {
      role: 'banned'
    });
    // Inform user they got banned and for what reason?
  } catch (err) {
    next(err);
  }
};

//creat a new account
const regester = async(req, res, next) => {
  try {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential)=> {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error)=> {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  } catch (err) {
    next(err);
  }
}

//sign in
const signInController = async(req, res, next) => {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.email, req.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error)=> {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  } catch (error) {
    next(error);
  }
}

const signOutController = async(req, res, next) => {
  try {
    const auth = getAuth()
    signOut(auth).then(()=> {

    }).catch((error) => {

    });
  } catch (error) {
    next(error);
  }
}

export default {
  getUser,
  createUser,
  banUser,
  sampleUser,
  regester,
  signInController,
  signOutController
};
