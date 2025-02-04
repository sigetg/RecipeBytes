import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
//Use this file to add any other auth methods, such as google Oauth.

const auth = getAuth(app);

export const signInUser = async (email, password) => {
  try {
    // Return the user object
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // Rethrow the error for handling elsewhere
    console.error("Error signing in:", error.message);
    throw error;
  }
};