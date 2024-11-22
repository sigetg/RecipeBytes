import { db } from '../firebase';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Recipe } from '../models/Recipe';

// Add a new recipe
export const addRecipe = async (recipe: Recipe): Promise<void> => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipe);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all recipes
export const getRecipes = async (): Promise<Recipe[]> => {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  const recipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Recipe[];
  return recipes;
};

// Get a single recipe
export const getSingleRecipe = async (id: string): Promise<Recipe | null> => {
  const docRef = doc(db, 'recipes', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Recipe;
  } else {
    console.log("No such document!");
    return null;
  }
};

// Update a recipe
export const updateRecipe = async (id: string, updatedData: Partial<Recipe>): Promise<void> => {
  const docRef = doc(db, 'recipes', id);
  await updateDoc(docRef, updatedData);
};

// Delete a recipe
export const deleteRecipe = async (id: string): Promise<void> => {
  const docRef = doc(db, 'recipes', id);
  await deleteDoc(docRef);
};