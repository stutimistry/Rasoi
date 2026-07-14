// Mock data standing in for the PostgreSQL + AI-generated backend responses.
// Shape mirrors the planned Recipe / Nutrition schema so swapping in the real
// /generate and /recipes endpoints later is a drop-in replacement.

export const CUISINES = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "South Indian",
  "Gujarati",
];

export const DIETS = [
  "Vegetarian",
  "Vegan",
  "Jain",
  "Gluten Free",
  "Dairy Free",
  "High Protein",
  "Keto",
  "Low Carb",
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const mockUser = {
  id: "u1",
  name: "Stuti",
  email: "stuti@example.com",
};

export const mockRecipes = [
  {
    id: "r1",
    title: "Paneer Tomato Masala",
    cuisine: "Indian",
    diet: ["Vegetarian", "Gluten Free"],
    difficulty: "Easy",
    time: 30,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80",
    ingredients: [
      { name: "Paneer", have: true },
      { name: "Tomato", have: true },
      { name: "Onion", have: true },
      { name: "Garlic", have: true },
      { name: "Capsicum", have: false },
      { name: "Cream", have: false },
    ],
    instructions: [
      "Cube the paneer and lightly pan-fry until golden, then set aside.",
      "Saute onion and garlic until translucent.",
      "Add chopped tomato and cook down into a thick masala base.",
      "Fold in capsicum and paneer, simmer 5 minutes.",
      "Finish with a splash of cream and serve hot.",
    ],
    nutrition: { calories: 420, protein: 22, carbs: 18, fat: 28, fiber: 4, sugar: 7 },
    servingSize: "2 servings",
    tips: "Swap paneer for firm tofu to make this vegan — press it first to remove excess water.",
    favorite: true,
  },
  {
    id: "r2",
    title: "Garlic Fried Rice",
    cuisine: "Chinese",
    diet: ["Vegetarian", "Dairy Free"],
    difficulty: "Easy",
    time: 20,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    ingredients: [
      { name: "Rice", have: true },
      { name: "Garlic", have: true },
      { name: "Onion", have: true },
      { name: "Spring Onion", have: false },
      { name: "Soy Sauce", have: false },
    ],
    instructions: [
      "Use day-old rice so the grains stay separate.",
      "Fry minced garlic in oil until fragrant, add onion.",
      "Toss in rice and soy sauce, stir-fry on high heat.",
      "Top with spring onion and serve.",
    ],
    nutrition: { calories: 310, protein: 6, carbs: 58, fat: 7, fiber: 2, sugar: 2 },
    servingSize: "2 servings",
    tips: "A splash of sesame oil at the end adds a lot of aroma for very little effort.",
    favorite: false,
  },
  {
    id: "r3",
    title: "Gujarati Kadhi",
    cuisine: "Gujarati",
    diet: ["Vegetarian", "Gluten Free", "Jain"],
    difficulty: "Medium",
    time: 40,
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80",
    ingredients: [
      { name: "Yogurt", have: false },
      { name: "Gram Flour", have: false },
      { name: "Ginger", have: true },
      { name: "Curry Leaves", have: false },
    ],
    instructions: [
      "Whisk yogurt with gram flour and water until smooth.",
      "Temper mustard seeds and curry leaves in ghee.",
      "Pour in the yogurt mixture, simmer gently while stirring.",
      "Cook until slightly thickened, season with a little jaggery and salt.",
    ],
    nutrition: { calories: 180, protein: 7, carbs: 20, fat: 6, fiber: 2, sugar: 9 },
    servingSize: "3 servings",
    tips: "Keep the flame low once the yogurt goes in, or it can split.",
    favorite: false,
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Ananya Shah",
    role: "Home cook, Ahmedabad",
    quote:
      "I stopped throwing away half-used vegetables. I just type in whatever's left in the fridge and get something genuinely good to cook.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Busy parent",
    quote:
      "The 30-minute filter is what sold me. Dinner used to be the most stressful part of my day — now it's actually kind of fun.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Jain diet",
    quote:
      "Most recipe apps completely ignore Jain restrictions. This is the first one that gets it right without me having to double-check every ingredient.",
    rating: 4,
  },
];

export const mockHistory = [
  { id: "h1", recipeId: "r1", generatedAt: "2026-07-08T18:20:00Z" },
  { id: "h2", recipeId: "r2", generatedAt: "2026-07-09T12:05:00Z" },
  { id: "h3", recipeId: "r1", generatedAt: "2026-07-09T19:40:00Z" },
];
