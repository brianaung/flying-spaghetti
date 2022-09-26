// import * as fs from "firebase/firestore";
import { setDoc, updateDoc, doc, getDoc, Timestamp } from "firebase/firestore"
import { db } from '../config/firebase.js';

const sampleUser = async (req, res, next) => {
  try {
    await setDoc(doc(db, "users", "user1"), {
      firstName: "Tom",
      lastName: "Hanks",
      role: "user",
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
}

const createUser = async (req, res, next) => {
  try {
    await setDoc(doc(db, "users", req.body.username), {
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
}

const banUser = async (req, res, next) => {
  try {
    await updateDoc(doc(db, "users", req.params.username), {
      role: "banned"
    });
    // Inform user they got banned and for what reason?
  } catch (err) {
    next(err);
  }
}

export default {
  createUser,
  banUser,
  sampleUser
};
