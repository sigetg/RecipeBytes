// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

const API_KEY = process.env.FIREBASE_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "recipe-bytes.firebaseapp.com",
  projectId: "recipe-bytes",
  storageBucket: "recipe-bytes.firebasestorage.app",
  messagingSenderId: "866180005060",
  appId: "1:866180005060:web:f1bf00f94460a3f974dd91",
  measurementId: "G-9K8KCLM3Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };