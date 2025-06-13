import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwUk13xCH7caL8XcnCjltMprSC1kIbSIc",
  authDomain: "proyecto-final-bc50d.firebaseapp.com",
  databaseURL: "https://proyecto-final-bc50d-default-rtdb.firebaseio.com",
  projectId: "proyecto-final-bc50d",
  storageBucket: "proyecto-final-bc50d.firebasestorage.app",
  messagingSenderId: "775137769592",
  appId: "1:775137769592:web:658411d18c2ed99d82158d",
  measurementId: "G-1NXJCZPW18"
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
