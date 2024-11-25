import { db } from '../firebase';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Add a new document
export const addData = async (userId, collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/${collectionName}`), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all documents from a collection
export const getData = async (userId, collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/${collectionName}`));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
};

// Get a single document from a collection
export const getSingleData = async (userId, collectionName, id) => {
  try {
    const docRef = doc(db, `users/${userId}/${collectionName}`, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};

// Update a document
export const updateData = async (userId, collectionName, id, updatedData) => {
  try {
    const docRef = doc(db, `users/${userId}/${collectionName}`, id);
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a document
export const deleteData = async (userId, collectionName, id) => {
  try {
    const docRef = doc(db, `users/${userId}/${collectionName}`, id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};