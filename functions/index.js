/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cheerio = require("cheerio");


// Initialize Firebase Admin SDK
admin.initializeApp();
// const db = admin.firestore();


exports.scrapeRecipe = functions.https.onCall(async (data, context) => {
  const url = data.url;

  try {
    // Fetch the webpage content
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Scrape Title
    const title = $("title").text().trim() || "Untitled Recipe";

    // Scrape Ingredients (Update selectors based on target website)
    const ingredients = [];
    $("ul[class*='ingredient']").each((i, el) => {
      $(el).find("li").each((j, li) => {
        ingredients.push($(li).text().trim());
      });
    });

    // Scrape Steps
    const steps = [];
    $("ol[class*='step'], ol[class*='instruction']").each((i, el) => {
      $(el).find("li").each((j, li) => {
        steps.push($(li).text().trim());
      });
    });

    // Format as Recipe Object
    const recipe = {
      title: title,
      ingredients: ingredients.length ? ingredients : ["No ingredients found"],
      steps: steps.length ? steps : ["No steps found"],
    };

    return recipe;
  } catch (error) {
    console.error("Error scraping the recipe:", error.message);
    throw new functions.https.HttpsError(
        "internal",
        "Unable to scrape the recipe. Please ensure the URL is correct.",
    );
  }
});
