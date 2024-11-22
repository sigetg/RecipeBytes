// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9pzD8dpfQX1xcPnvIgOG37GK4HuI5qak",
  authDomain: "recipe-bytes.firebaseapp.com",
  projectId: "recipe-bytes",
  storageBucket: "recipe-bytes.firebasestorage.app",
  messagingSenderId: "866180005060",
  appId: "1:866180005060:web:f1bf00f94460a3f974dd91",
  measurementId: "G-9K8KCLM3Z6"
};



// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;