// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9cmoyQI9uEGJaPS3iE5hroHXDGkNlbUc",
    authDomain: "nibble-9b182.firebaseapp.com",
    projectId: "nibble-9b182",
    storageBucket: "nibble-9b182.firebasestorage.app",
    messagingSenderId: "754763201945",
    appId: "1:754763201945:web:2181f5477396a6f1276708"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = firebase.auth();