import { db } from "../firebase";
import {
  getDoc,
  onSnapshot,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { UserProfile } from "../types/user";
import { DietaryRestrictions } from "../types/user";

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
};

export const subscribeDietaryRestrictions = (
  uid: string,
  cb: (r: DietaryRestrictions | null) => void //Callback called when the data changes
) => {
  const ref = doc(db, `users/${uid}/restrictions`, "main");
  // Listen for changes in the dietary restrictions document
  // and call the callback with the new data
  return onSnapshot(ref, (snap) =>
    cb(snap.exists() ? (snap.data() as DietaryRestrictions) : null)
  );
};

export const addRestriction = async (
  uid: string,
  field: string,
  value: string
) => {
  const ref = doc(db, "users", uid, "restrictions", "main");
  await setDoc(ref, { [field]: arrayUnion(value) }, { merge: true });
};

export const removeRestriction = async (
  uid: string,
  field: string,
  value: string
) => {
  const ref = doc(db, "users", uid, "restrictions", "main");
  await setDoc(ref, { [field]: arrayRemove(value) }, { merge: true });
};
