const express = require("express");
const app = express();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDQBmKxnWLNhXsl9RbZ11ZgEUJHOjVHL-M",
//   authDomain: "flying-spaghetti-60893.firebaseapp.com",
//   projectId: "flying-spaghetti-60893",
//   storageBucket: "flying-spaghetti-60893.appspot.com",
//   messagingSenderId: "72375701314",
//   appId: "1:72375701314:web:80f01430b952462a5d82db",
//   measurementId: "G-DSGB1ZCGCM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

app.get('/', (req, res) => { 
    res.send('Our demo app is working!') 
});

app.get('/about', (req, res) => { 
    res.send('this is about page') 
});

app.get('/user:id', (req, res) => { 
    res.send("<p>this is user" + req.params.id + "page!"+"</p>")
     
});

app.get('/login', (req, res) => { 
    res.send('this is login page') 
});

app.get('/register', (req, res) => { 
    res.send('this is register page!') 
});

app.get('/upload', (req, res) => { 
    res.send('this is upload page!') 
});

app.get('/photo', (req, res) => { 
    res.send('this is photo page') 
});




app.listen(3000, () => { 
    console.log('Demo app is listening on port 3000!') 
});