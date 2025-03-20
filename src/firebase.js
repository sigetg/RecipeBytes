// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

<<<<<<< HEAD
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9pzD8dpfQX1xcPnvIgOG37GK4HuI5qak",
=======
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
>>>>>>> linda-origin/main
  authDomain: "recipe-bytes.firebaseapp.com",
  projectId: "recipe-bytes",
  storageBucket: "recipe-bytes.firebasestorage.app",
  messagingSenderId: "866180005060",
  appId: "1:866180005060:web:f1bf00f94460a3f974dd91",
  measurementId: "G-9K8KCLM3Z6"
};

// Initialize Firebase
<<<<<<< HEAD
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const analytics: Analytics = getAnalytics(app);
=======
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
>>>>>>> linda-origin/main

export { app, db, analytics };