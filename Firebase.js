// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu0t5ZAFoF8oKGdoretlTZfmZ0XQXmgok",
  authDomain: "stillthedubb.firebaseapp.com",
  projectId: "stillthedubb",
  storageBucket: "stillthedubb.appspot.com",
  messagingSenderId: "288933808521",
  appId: "1:288933808521:web:034c2d8feda74e3f1cb958",
  measurementId: "G-RHGH17SH5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app)
const STORAGE = getStorage(app)


export default app
export { AUTH, DATABASE, STORAGE };

