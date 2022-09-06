// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQBmKxnWLNhXsl9RbZ11ZgEUJHOjVHL-M",
  authDomain: "flying-spaghetti-60893.firebaseapp.com",
  projectId: "flying-spaghetti-60893",
  storageBucket: "flying-spaghetti-60893.appspot.com",
  messagingSenderId: "72375701314",
  appId: "1:72375701314:web:80f01430b952462a5d82db",
  measurementId: "G-DSGB1ZCGCM"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
const analytics = getAnalytics(db);

module.exports = db;