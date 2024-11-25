// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9pzD8dpfQX1xcPnvIgOG37GK4HuI5qak",
  authDomain: "recipe-bytes.firebaseapp.com",
  projectId: "recipe-bytes",
  storageBucket: "recipe-bytes.firebasestorage.app",
  messagingSenderId: "866180005060",
  appId: "1:866180005060:web:f1bf00f94460a3f974dd91",
  measurementId: "G-9K8KCLM3Z6"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const analytics: Analytics = getAnalytics(app);

export { app, db, analytics };