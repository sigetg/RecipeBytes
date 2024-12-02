export class Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;

  constructor(id: string, title: string, ingredients: string[], instructions: string) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}