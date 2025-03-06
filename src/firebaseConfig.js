// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAL9dWlWRgERklhE0RB44yTOwVcNp30kiA",
    authDomain: "appdulich-c23b1.firebaseapp.com",
    projectId: "appdulich-c23b1",
    storageBucket: "appdulich-c23b1.firebasestorage.app",
    messagingSenderId: "342609704701",
    appId: "1:342609704701:web:f7b7fc33bc342f23ef3094",
    measurementId: "G-257F07SE75"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
