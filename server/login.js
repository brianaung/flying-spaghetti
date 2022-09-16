import React from 'react';
import {auth, provider} from "../config/firebase.js";
import {signInWithPopup} from "firebase/auth";

function login({setIsAuth}) {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result)=> {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
        });
    };
    return (
        <div className ="loginPage">
            <p>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google 
            </button>
        </div>
    );
}

export default login;