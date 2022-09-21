import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.js';
import { provider } from '../config/firebase.js';
//import firebase from 'firebase/app';

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((userCred) => {
      console.log(userCred);
      //setIsAuth(true);
    });
  };

  return (
    <>
      <div>
        <h1>Login Page</h1>
      </div>
      <div className="loginPage">
        <p> Sign In With Google to Continue</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </>
  );
};

export default Login;
