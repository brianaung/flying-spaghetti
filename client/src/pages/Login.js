import React from 'react';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase.js';
import { provider } from '../config/firebase.js';
//import firebase from 'firebase/app';

const [regesterEmail, setRegesterEmail] = useState("");
const [regesterPassword, setRegesterPassword] = useState("");
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((userCred) => {
      console.log(userCred);
      //setIsAuth(true);
    });
  };
  console.log(regesterEmail);
  console.log(regesterPassword);
  console.log(loginEmail);
  console.log(loginPassword);

  return (
    <>
      <div>
        <h1>Login Page</h1>
      </div>
      <div className="loginPage">
        <div>
          <p> Sign In With Google to Continue</p>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>

        <div>
          <h3>Register user</h3>
          <input 
            placeholder='Emial...' 
            onChange={(event)=> {
              setRegesterEmail(event.target.value);
            }}
          />
          <input 
            placeholder='Password...'
            onChange={(event)=> {
              setRegesterPassword(event.target.value);
            }}
          />
          <button>Create User</button>
        </div>

        <div>
          <h3>Login</h3>
          <input 
            placeholder='Emial...'
            onChange={(event)=> {
              setLoginEmail(event.target.value);
            }}
          />
          <input 
            placeholder='Password...'
            onChange={(event)=> {
              setLoginPassword(event.target.value);
            }}
          />
          <button>Login</button>
        </div>

        <button>Sign Out</button>
      </div>
    </>
  );
};

export default Login;
