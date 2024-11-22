export enum Category {
  DAIRY = "Dairy",
  VEGETABLE = "Vegetable",
  FRUIT = "Fruit",
  MEAT = "Meat",
  GRAIN = "Grain",
  OTHER = "Other"
}

export class Ingredient {
  id: string;
  title: string;
  quantity: number;
  category: Category;
  expiration: Date;

  constructor(id: string, title: string, quantity: number, category: Category, expiration: Date) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
    this.category = category;
    this.expiration = expiration;
  }
}