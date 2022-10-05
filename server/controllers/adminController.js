// import * as fs from "firebase/firestore";
import { setDoc, updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '../config/firebase.js';
import { v4 } from 'uuid';

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
    if (!userSnap.exists() || req.params.key !== userSnap.data().secretKey) {
      res.sendStatus(404);
    }
    // const key = userSnap.data().uniqueKey;

    // Allow user access and generate new key
    await updateDoc(doc(db, 'users', req.params.username), {
      role: 'user',
      secretKey: v4()
    });
    // Email user they got accepted and account is activated
  } catch (err) {
    next(err);
  }
};

// Create a new account
const registerUser = async(req, res, next) => {
  try {
    console.log(req.body.email);
    console.log(req.body.password);
    
    // const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    
    //create new user in databse
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'pending',
      capacity: 10,
      date: Timestamp.fromDate(new Date()),
      folders: [],
      photos: [],
      liked: [],
      secretKey: v4()
    }
    await setDoc(doc(db, 'users', userCredential.user.uid), newUser);

    console.log(userCredential.user);
    // res.send(userCredential.user);
    
    // Send confirmation email to admin(s) with approve/deny links
  } catch (err) {
    next(err);
  }
}

const signIn = async(req, res, next) => {
  try {
    const auth = getAuth();
    const userCredential =  await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    console.log(userCredential.user);
    res.send(userCredential.user);
  } catch (error) {
    next(error);
  }
}

const signOut = async(req, res, next) => {
  try {
    const auth = getAuth();
    auth.signOut()
    .then(()=> {
      console.log("user sign out");
    });
    const user = {
      "email": req.body.email,
    };
    res.send(user);
  } catch (error) {
    next(error);
  }
}

export default {
  getUser,
  createUser,
  banUser,
  acceptUser,
  sampleUser,
  registerUser,
  signIn,
  signOut
};
