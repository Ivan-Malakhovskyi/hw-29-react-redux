// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTIwUBkxXuk36M3eOdIkOPWZJT-gG75h4",
  authDomain: "users-api-3e590.firebaseapp.com",
  projectId: "users-api-3e590",
  storageBucket: "users-api-3e590.firebasestorage.app",
  messagingSenderId: "321922137363",
  appId: "1:321922137363:web:fd02edfb1aa6a84a086ee6",
  measurementId: "G-C6RPTDZRVV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
