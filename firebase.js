// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4eN3lECa397OtAdr_-3tNAjnkEya_0gc",
  authDomain: "support-ai-42985.firebaseapp.com",
  projectId: "support-ai-42985",
  storageBucket: "support-ai-42985.appspot.com",
  messagingSenderId: "600969170647",
  appId: "1:600969170647:web:039d5bcc14d855364a6a92",
  measurementId: "G-EHNDJSFJXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {analytics, firestore, auth}