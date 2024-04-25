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
  apiKey: "AIzaSyCZDTiFjc5Ip2AQS-wptbDddmYRHPpSygA",
  authDomain: "opulence-71da4.firebaseapp.com",
  projectId: "opulence-71da4",
  storageBucket: "opulence-71da4.appspot.com",
  messagingSenderId: "398680761603",
  appId: "1:398680761603:web:2eca0402ef2ab8d070b536",
  measurementId: "G-FSBY5Y740T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app)
const STORAGE = getStorage(app)


export default app
export { AUTH, DATABASE, STORAGE };

