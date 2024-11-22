import { db } from '../firebase'; // Ensure this path is correct
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Ingredient } from '../models/Ingredient';

// Add a new ingredient
export const addIngredient = async (ingredient: Ingredient): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, 'ingredients'), ingredient);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all ingredients
export const getIngredients = async (): Promise<Ingredient[]> => {
  const querySnapshot = await getDocs(collection(db, 'ingredients'));
  const ingredients = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ingredient[];
  return ingredients;
};

// Get a single ingredient
export const getSingleIngredient = async (id: string): Promise<Ingredient | null> => {
  const docRef = doc(db, 'ingredients', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Ingredient;
  } else {
    console.log("No such document!");
    return null;
  }
};

// Update an ingredient
export const updateIngredient = async (id: string, updatedData: Partial<Ingredient>): Promise<void> => {
  const docRef = doc(db, 'ingredients', id);
  await updateDoc(docRef, updatedData);
};

// Delete an ingredient
export const deleteIngredient = async (id: string): Promise<void> => {
  const docRef = doc(db, 'ingredients', id);
  await deleteDoc(docRef);
};