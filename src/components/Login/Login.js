import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './configFirebase';
import { UserContext } from "../../App"
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    firebase.apps.length===0 && firebase.initializeApp(firebaseConfig);

    const [isLoggedIn , setIsLoggedIn] = useContext(UserContext)

    
    const history=useHistory();
    const location =useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

   const googleSingInHandler=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=> {
            var {displayName , email} = res.user;
            const nUser ={name:displayName, email:email};
            setIsLoggedIn(nUser)
            setToken()
            history.push(from)
        }).catch(error=> {
            var errorMessage = error.message;
            var email = error.email;
            
        });
    }

    const setToken =()=>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token' ,idToken)
          }).catch(function(error) {
            // Handle error
          });
    }
   
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={googleSingInHandler}>Google Sign in</button>
        </div>
    );
};

export default Login;