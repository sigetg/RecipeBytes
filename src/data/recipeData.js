import ChocolateChipCookieImage from '../assets/ChocolateChipCookieImage.jpg';
import SnickerdoodleImage from '../assets/SnickerdodleImage.webp';
import SugarCookieImage from '../assets/SugarCookieImage.jpg';


export const recipeData = [
  {
    "title": "The Best Chocolate Chip Cookie Recipe Ever",
    "author": "Laura",
    "date": "October 26, 2024",
    "rating": 4.99,
    "votes": 11552,
    "description": "This is the best chocolate chip cookies recipe ever! No funny ingredients, no chilling time, etc. Just a simple, straightforward, amazingly delicious, doughy yet still fully cooked, chocolate chip cookie that turns out perfectly every single time!",
    "is_favorite": true,
    "ingredients": [
      { "name": "Salted Butter", "quantity": "1 cup", "note": "softened" },
      { "name": "Granulated Sugar", "quantity": "1 cup", "note": "" },
      { "name": "Light Brown Sugar", "quantity": "1 cup", "note": "packed" },
      { "name": "Pure Vanilla Extract", "quantity": "2 teaspoons", "note": "" },
      { "name": "Large Eggs", "quantity": "2", "note": "" },
      { "name": "All-Purpose Flour", "quantity": "3 cups", "note": "" },
      { "name": "Baking Soda", "quantity": "1 teaspoon", "note": "" },
      { "name": "Baking Powder", "quantity": "1/2 teaspoon", "note": "" },
      { "name": "Sea Salt", "quantity": "1 teaspoon", "note": "" },
      { "name": "Chocolate Chips", "quantity": "2 cups", "note": "(14 oz)" }
    ],
    "instructions": [
      "Preheat oven to 375 degrees F. Line three baking sheets with parchment paper.",
      "Mix flour, baking soda, baking powder, and salt in a medium bowl.",
      "Cream together butter and sugars until combined. Beat in eggs and vanilla.",
      "Mix dry ingredients into the wet ingredients until combined. Add chocolate chips.",
      "Roll dough into balls (2-3 tablespoons each) and place on the baking sheet.",
      "Bake for 8-10 minutes. Remove while cookies still look slightly doughy.",
      "Cool on the baking sheet for 5 minutes before transferring to a wire rack."
    ],
    "image": ChocolateChipCookieImage,
    "additional_info": {
      "prep_time": "10 minutes",
      "cook_time": "8 minutes",
      "total_time": "30 minutes",
      "servings": 36,
      "calories_per_serving": 183,
      "nutrition": {
        "carbohydrates": "26g",
        "protein": "2g",
        "fat": "8g",
        "saturated_fat": "5g",
        "sugar": "18g",
        "cholesterol": "27mg",
        "sodium": "153mg"
      },
      "tips": [
        "Do not overbake the cookies; they should appear slightly underdone.",
        "Store cookies in an airtight container for up to 5 days."
      ]
    }
  },
  {
    "title": "Grandma Ruth's Easy Snickerdoodle Cookies",
    "author": "David Beveridge",
    "date": "November 7, 2024",
    "rating": 4.9,
    "votes": 489,
    "description": "This easy snickerdoodle recipe that everyone loves is from my great-grandma! The cookies are soft and full of cinnamon flavor.",
    "is_favorite": false,
    "ingredients": [
        { "name": "White Sugar", "quantity": "1 ½ cups", "note": "" },
        { "name": "Butter", "quantity": "1 cup", "note": "softened" },
        { "name": "Eggs", "quantity": "2 large", "note": "" },
        { "name": "All-Purpose Flour", "quantity": "2 ¾ cups", "note": "" },
        { "name": "Cream of Tartar", "quantity": "2 teaspoons", "note": "" },
        { "name": "Baking Soda", "quantity": "1 teaspoon", "note": "" },
        { "name": "Salt", "quantity": "¼ teaspoon", "note": "" },
        { "name": "White Sugar", "quantity": "2 tablespoons", "note": "" },
        { "name": "Ground Cinnamon", "quantity": "2 teaspoons", "note": "" }  
    ],
    "instructions": [
      "Preheat oven to 400 degrees F. Line a baking sheet with parchment paper.",
      "Beat sugar, butter, and eggs together until smooth and creamy.",
      "Combine flour, cream of tartar, baking soda, and salt in a separate bowl. Stir into creamed mixture.",
      "Mix sugar and cinnamon in a small bowl for the coating.",
      "Roll dough into balls (2 teaspoons each) and coat in the cinnamon-sugar mixture.",
      "Place dough balls 2 inches apart on the prepared baking sheet.",
      "Bake for 7 minutes. Let cookies cool on the baking sheet for 5 minutes before transferring to a wire rack."
    ],
    "image": SnickerdoodleImage,
    "additional_info": {
      "prep_time": "20 minutes",
      "cook_time": "10 minutes",
      "total_time": "35 minutes",
      "servings": 36,
      "calories_per_serving": 120,
      "nutrition": {
        "carbohydrates": "17g",
        "protein": "1g",
        "fat": "6g",
        "saturated_fat": "3g",
        "sugar": "12g",
        "cholesterol": "20mg",
        "sodium": "80mg"
      },
      "tips": [
        "Store cookies with 1-2 slices of bread to keep them soft.",
        "Chilling the dough can help with shaping and texture."
      ]
    }
  },
  {
    title: "Easy Sugar Cookies",
    author: "Stephanie",
    date: "October 25, 2024",
    rating: 4.5,
    votes: 8732,
    description: "This sugar cookie recipe is quick and easy to make with simple ingredients. They are delicious as-is or with candies mixed in.",
    is_favorite: false,
    ingredients: [
      { name: "All-Purpose Flour", quantity: "2 ¾ cups", note: "" },
      { name: "Baking Soda", quantity: "1 teaspoon", note: "" },
      { name: "Baking Powder", quantity: "½ teaspoon", note: "" },
      { name: "Butter", quantity: "1 cup", note: "softened" },
      { name: "White Sugar", quantity: "1 ½ cups", note: "" },
      { name: "Egg", quantity: "1", note: "" },
      { name: "Vanilla Extract", quantity: "1 teaspoon", note: "" }
    ],
    instructions: [
      "Preheat oven to 375 degrees F (190 degrees C).",
      "Stir flour, baking soda, and baking powder together in a small bowl.",
      "Beat sugar and butter together in a large bowl with an electric mixer until smooth.",
      "Beat in egg and vanilla.",
      "Gradually blend in flour mixture.",
      "Roll dough into walnut-sized balls and place 2 inches apart onto ungreased baking sheets.",
      "Bake until edges are golden, 8 to 10 minutes. Cool on the baking sheets briefly before transferring to a wire rack to cool completely."
    ],
    image: SugarCookieImage,
    additional_info: {
      prep_time: "20 minutes",
      cook_time: "10 minutes",
      total_time: "30 minutes",
      servings: 48,
      calories_per_serving: 86,
      nutrition: {
        carbohydrates: "12g",
        protein: "1g",
        fat: "4g"
      },
      tips: [
        "Store cookies in an airtight container for a few days at room temperature.",
        "You can freeze baked sugar cookies or cookie dough for up to two months."
      ]
    }
  }
];
