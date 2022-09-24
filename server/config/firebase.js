// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDQBmKxnWLNhXsl9RbZ11ZgEUJHOjVHL-M',
  authDomain: 'flying-spaghetti-60893.firebaseapp.com',
  projectId: 'flying-spaghetti-60893',
  storageBucket: 'flying-spaghetti-60893.appspot.com',
  messagingSenderId: '72375701314',
  appId: '1:72375701314:web:80f01430b952462a5d82db',
  measurementId: 'G-DSGB1ZCGCM'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(db);

export {
  db,
  storage,
  auth,
  provider
};
