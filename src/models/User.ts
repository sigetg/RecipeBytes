// src/models/User.ts

export class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  recipes: string[]; // List of recipe IDs or names
  groceryList: string[]; // List of ingredients for the grocery list
  pantryList: string[]; // List of ingredients for the pantry list

  constructor(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    recipes: string[],
    groceryList: string[],
    pantryList: string[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.recipes = recipes;
    this.groceryList = groceryList;
    this.pantryList = pantryList;
  }
}