export type DietaryRestrictions = {
  allergies: string[];
  intolerances: string[];
  avoidIngredients: string[];
  dietaryTags: string[];
  requiredTags: string[];
  calorieLimitPerMeal?: number;
  notes?: string;
};

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  dietaryRestrictions: DietaryRestrictions;
  photoURL?: string;
};
