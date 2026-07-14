import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import IngredientInput from "../components/IngredientInput";
import DietaryFilters from "../components/DietaryFilters";
import CuisineSelect from "../components/CuisineSelect";
import TimeSlider from "../components/TimeSlider";
import DifficultySelect from "../components/DifficultySelect";
import RecipeCard from "../components/RecipeCard";
import ChatWidget from "../components/ChatWidget";
import { useAuth } from "../hooks/useAuth";
import { generateRecipe, getRecipes, toggleFavorite } from "../services/mockApi";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState(["Tomato", "Onion", "Rice"]);
  const [diet, setDiet] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [time, setTime] = useState(30);
  const [difficulty, setDifficulty] = useState("Easy");
  const [generating, setGenerating] = useState(false);

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getRecipes().then((r) => setRecent(r.slice(0, 3)));
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    const recipe = await generateRecipe({ ingredients, diet, cuisine, time, difficulty });
    setGenerating(false);
    navigate(`/recipes/${recipe.id}`);
  };

  const handleFavorite = async (id) => {
    await toggleFavorite(id);
    const all = await getRecipes();
    setRecent(all.slice(0, 3));
  };

  // Smart suggestion — a hardcoded example matching the spec ("only missing Paneer")
  const showSuggestion =
    ingredients.some((i) => /tomato/i.test(i)) &&
    ingredients.some((i) => /onion/i.test(i)) &&
    ingredients.some((i) => /rice/i.test(i)) &&
    !ingredients.some((i) => /paneer/i.test(i));

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-5xl">
        <h1 className="font-display text-3xl font-semibold mb-1">Hello {user?.name || "there"}</h1>
        <p className="text-steel mb-8">What's in your kitchen today?</p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-ink/10 rounded-xl p-6 space-y-6">
            <IngredientInput ingredients={ingredients} onChange={setIngredients} />

            {showSuggestion && (
              <div className="bg-turmeric/15 border border-turmeric/40 rounded-lg px-4 py-3 text-sm text-ink">
                💡 You're only missing <span className="font-semibold">Paneer</span> for a
                classic paneer masala.
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <CuisineSelect value={cuisine} onChange={setCuisine} />
              <DifficultySelect value={difficulty} onChange={setDifficulty} />
            </div>

            <TimeSlider value={time} onChange={setTime} />
            <DietaryFilters selected={diet} onChange={setDiet} />

            <button
              onClick={handleGenerate}
              disabled={generating || ingredients.length === 0}
              className="w-full py-3 rounded-lg bg-cardamom text-white font-medium hover:bg-cardamom-light transition-colors disabled:opacity-60"
            >
              {generating ? "Cooking up ideas…" : "Generate recipe"}
            </button>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold mb-3">Recent recipes</h2>
            <div className="space-y-4">
              {recent.map((r) => (
                <RecipeCard key={r.id} recipe={r} onToggleFavorite={handleFavorite} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
