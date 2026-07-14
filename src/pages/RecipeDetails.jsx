import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NutritionLabel from "../components/NutritionLabel";
import FavoriteButton from "../components/FavoriteButton";
import ChatWidget from "../components/ChatWidget";
import { getRecipeById, toggleFavorite, getMissingIngredients } from "../services/mockApi";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id).then(setRecipe);
  }, [id]);

  const handleFavorite = async () => {
    const updated = await toggleFavorite(id);
    setRecipe(updated);
  };

  if (!recipe) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-8 py-8">
          <p className="text-steel">Loading recipe…</p>
        </main>
      </div>
    );
  }

  const missing = getMissingIngredients(
    recipe.ingredients.filter((i) => i.have).map((i) => i.name),
    recipe
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-4xl">
        <Link to="/dashboard" className="text-sm text-cardamom hover:underline mb-4 inline-block">
          ← Back to dashboard
        </Link>

        <div className="relative rounded-xl overflow-hidden h-64 mb-6 bg-papad-dark">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4">
            <FavoriteButton active={recipe.favorite} onToggle={handleFavorite} />
          </div>
        </div>

        <p className="font-mono text-xs uppercase tracking-wide text-cardamom mb-1">
          {recipe.cuisine} · {recipe.difficulty} · {recipe.time} min
        </p>
        <h1 className="font-display text-3xl font-semibold mb-6">{recipe.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-lg font-semibold mb-3">Ingredients</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ing) => (
                  <li
                    key={ing.name}
                    className={`text-sm px-3 py-2 rounded-lg border ${
                      ing.have
                        ? "border-cardamom/30 bg-cardamom/5 text-ink"
                        : "border-chili/30 bg-chili/5 text-ink"
                    }`}
                  >
                    {ing.have ? "✓" : "＋"} {ing.name}
                  </li>
                ))}
              </ul>
              {missing.length > 0 && (
                <p className="text-xs text-steel mt-2">
                  Missing: {missing.map((m) => m.name).join(", ")} — add these to your{" "}
                  <Link to="/shopping-list" className="text-cardamom hover:underline">
                    shopping list
                  </Link>
                  .
                </p>
              )}
            </section>

            <section>
              <h2 className="font-display text-lg font-semibold mb-3">Cooking steps</h2>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-mono text-cardamom shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="bg-turmeric/10 border border-turmeric/30 rounded-lg p-4">
              <h2 className="font-display text-sm font-semibold mb-1">Cooking tip</h2>
              <p className="text-sm text-ink">{recipe.tips}</p>
            </section>
          </div>

          <div>
            <NutritionLabel nutrition={recipe.nutrition} servingSize={recipe.servingSize} />
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
