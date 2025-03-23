const BASE = "/RecipeBytes";

const NAVBAR = {
   BASE: BASE,
   EMPTY: `/`,
   LOGIN: `/login`,
   HOME: `/home`,
   PROFILE: `/profile`,
   RECIPES: `/recipes`, // e.g., /recipe/123
   PANTRY: `/pantry`,
   GROCERY: `/grocery`,
   SIGNUP: `/signup`,
   FORGOT_PASSWORD: `/forgot-password`,
   LOGOUT: `/logout`
};

const RECIPE_ROUTES = {
   RECIPE_STEP: `/recipe/:id/step:stepNumber`,
   RECIPE: `/recipe/:id`
}

export {NAVBAR, RECIPE_ROUTES};