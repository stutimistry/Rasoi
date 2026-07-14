// Stand-in for the real backend (Express + Prisma + OpenAI/Claude API).
// Every function returns a Promise so pages can be wired to axios calls
// later without changing their component logic — just swap the body.

import { mockRecipes, mockHistory } from "./mockData";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let recipes = [...mockRecipes];
let history = [...mockHistory];

// POST /generate
export async function generateRecipe({ ingredients, diet, cuisine, time, difficulty }) {
  await delay(900);
  const have = ingredients.map((i) => i.trim()).filter(Boolean);

  // In production this becomes the OpenAI/Claude API call using the prompt
  // template from the spec. Here we synthesize a plausible result so the UI
  // has something real to render.
  const generated = {
    id: `r${Date.now()}`,
    title: have.length ? `${have[0]} ${cuisine || "Fusion"} Bowl` : "Pantry Surprise Bowl",
    cuisine: cuisine || "Indian",
    diet: diet?.length ? diet : ["Vegetarian"],
    difficulty: difficulty || "Easy",
    time: Number(time) || 30,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    ingredients: have.map((name) => ({ name, have: true })),
    instructions: [
      `Prep and roughly chop ${have.join(", ") || "your ingredients"}.`,
      "Heat oil in a pan and build your base aromatics first.",
      "Add the remaining ingredients in order of cook time needed.",
      "Season, taste, and adjust before plating.",
    ],
    nutrition: { calories: 380, protein: 16, carbs: 42, fat: 14, fiber: 5, sugar: 6 },
    servingSize: "2 servings",
    tips: "This is a mock result — connect the /generate endpoint to get real AI-authored recipes.",
    favorite: false,
  };

  recipes = [generated, ...recipes];
  history = [{ id: `h${Date.now()}`, recipeId: generated.id, generatedAt: new Date().toISOString() }, ...history];
  return generated;
}

// GET /recipes
export async function getRecipes() {
  await delay(300);
  return recipes;
}

// GET /recipes/:id
export async function getRecipeById(id) {
  await delay(200);
  return recipes.find((r) => r.id === id) || null;
}

// DELETE /recipes/:id
export async function deleteRecipe(id) {
  await delay(200);
  recipes = recipes.filter((r) => r.id !== id);
  return true;
}

// POST /favorite, DELETE /favorite/:id
export async function toggleFavorite(id) {
  await delay(150);
  recipes = recipes.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r));
  return recipes.find((r) => r.id === id);
}

// GET /favorites
export async function getFavorites() {
  await delay(200);
  return recipes.filter((r) => r.favorite);
}

// GET history
export async function getHistory() {
  await delay(200);
  return history
    .map((h) => ({ ...h, recipe: recipes.find((r) => r.id === h.recipeId) }))
    .filter((h) => h.recipe);
}

// "You are only missing X" smart suggestion helper
export function getMissingIngredients(haveList, recipe) {
  const have = new Set(haveList.map((i) => i.toLowerCase().trim()));
  return recipe.ingredients.filter((i) => !have.has(i.name.toLowerCase()));
}

// POST /meal-plan — generates a full day built around what's on hand
export async function generateMealPlan(haveIngredients) {
  await delay(900);
  const have = haveIngredients.filter(Boolean);
  const base = (mealName, title, image, nutrition) => ({
    id: `${mealName}-${Date.now()}`,
    meal: mealName,
    title,
    image,
    time: mealName === "Breakfast" ? 15 : mealName === "Lunch" ? 25 : 35,
    nutrition,
  });

  return [
    base(
      "Breakfast",
      have.length ? `${have[0]} Veggie Poha` : "Vegetable Poha",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
      { calories: 260, protein: 6, carbs: 45, fat: 7 }
    ),
    base(
      "Lunch",
      have.length ? `${have[Math.min(1, have.length - 1)]} Dal & Rice` : "Dal & Rice",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
      { calories: 420, protein: 18, carbs: 60, fat: 10 }
    ),
    base(
      "Dinner",
      have.length ? `${have[have.length - 1]} Masala Curry` : "Mixed Veg Masala Curry",
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
      { calories: 380, protein: 20, carbs: 30, fat: 18 }
    ),
  ];
}

// Mock AI chat — POST /chat
export async function askAi(question) {
  await delay(700);
  if (/tofu/i.test(question) && /paneer/i.test(question)) {
    return "Yes — firm or extra-firm tofu works well in place of paneer. Press it for 15 minutes to remove excess water first, then pan-fry the same way. Texture is a little softer, but it holds up fine in a masala or curry.";
  }
  return "Good question — connect the AI chat endpoint to get a live answer from the model. For now here's a placeholder response while you build the UI.";
}
