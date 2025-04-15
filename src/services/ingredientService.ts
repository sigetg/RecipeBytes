import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Ingredient } from "../types/ingredient";

const getIngredientRef = (
  userId: string,
  collectionName: "grocery" | "pantry"
) => collection(db, `users/${userId}/${collectionName}`);

// Add an ingredient
export const addIngredient = async (
  userId: string,
  collectionName: "grocery" | "pantry",
  ingredient: Omit<Ingredient, "id">
) => {
  const ref = getIngredientRef(userId, collectionName);
  await addDoc(ref, ingredient);
};

// Get all ingredients
export const getIngredients = async (
  userId: string,
  collectionName: "grocery" | "pantry"
): Promise<Ingredient[]> => {
  const ref = getIngredientRef(userId, collectionName);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      expiration: data.expiration?.toDate?.() ?? new Date(),
    } as Ingredient;
  });
};

// Get a single ingredient
export const getIngredient = async (
  userId: string,
  collectionName: "grocery" | "pantry",
  id: string
): Promise<Ingredient | null> => {
  const ref = doc(db, `users/${userId}/${collectionName}`, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    expiration: data.expiration?.toDate?.() ?? new Date(),
  } as Ingredient;
};

// Update an ingredient
export const updateIngredient = async (
  userId: string,
  collectionName: "grocery" | "pantry",
  id: string,
  updatedData: Partial<Omit<Ingredient, "id">>
) => {
  const ref = doc(db, `users/${userId}/${collectionName}`, id);
  await updateDoc(ref, updatedData);
};

// Delete an ingredient
export const deleteIngredient = async (
  userId: string,
  collectionName: "grocery" | "pantry",
  id: string
) => {
  const ref = doc(db, `users/${userId}/${collectionName}`, id);
  await deleteDoc(ref);
};
