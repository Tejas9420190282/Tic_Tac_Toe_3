// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtHlaxV-w3_z4xkwm93XHI1Yg6OLuTuHw",
    authDomain: "tic-tac-toe-3-b3e3f.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-3-b3e3f-default-rtdb.firebaseio.com",
    projectId: "tic-tac-toe-3-b3e3f",
    storageBucket: "tic-tac-toe-3-b3e3f.appspot.com",
    messagingSenderId: "613060319500",
    appId: "1:613060319500:web:4863065f88549d2dd6d129",
    measurementId: "G-C2T3P5M5E2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
