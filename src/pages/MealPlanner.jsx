import { useState } from "react";
import Sidebar from "../components/Sidebar";
import IngredientInput from "../components/IngredientInput";
import { generateMealPlan } from "../services/mockApi";

export default function MealPlanner() {
  const [ingredients, setIngredients] = useState(["Tomato", "Onion", "Rice"]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateMealPlan(ingredients);
    setPlan(result);
    setLoading(false);
  };

  const totals = plan
    ? plan.reduce(
        (acc, m) => ({
          calories: acc.calories + m.nutrition.calories,
          protein: acc.protein + m.nutrition.protein,
          carbs: acc.carbs + m.nutrition.carbs,
          fat: acc.fat + m.nutrition.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      )
    : null;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-4xl">
        <h1 className="font-display text-3xl font-semibold mb-1">Meal planner</h1>
        <p className="text-steel mb-8">
          Build a full day — breakfast, lunch, and dinner — around what you have.
        </p>

        <div className="bg-white border border-ink/10 rounded-xl p-6 mb-8">
          <IngredientInput ingredients={ingredients} onChange={setIngredients} />
          <button
            onClick={handleGenerate}
            disabled={loading || ingredients.length === 0}
            className="mt-5 w-full py-3 rounded-lg bg-cardamom text-white font-medium hover:bg-cardamom-light transition-colors disabled:opacity-60"
          >
            {loading ? "Planning your day…" : "Generate meal plan"}
          </button>
        </div>

        {plan && (
          <>
            <div className="grid sm:grid-cols-3 gap-5 mb-6">
              {plan.map((m) => (
                <div key={m.id} className="bg-white border border-ink/10 rounded-xl overflow-hidden">
                  <div className="h-32 bg-papad-dark overflow-hidden">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-mono uppercase tracking-wide text-cardamom mb-1">
                      {m.meal} · {m.time} min
                    </p>
                    <h3 className="font-display text-base font-semibold mb-2">{m.title}</h3>
                    <p className="font-mono text-xs text-steel">
                      {m.nutrition.calories} cal · {m.nutrition.protein}g protein
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-ink/10 rounded-xl p-5 max-w-xs">
              <p className="font-display font-semibold text-sm mb-2">Daily total</p>
              <div className="label-rule" />
              {[
                ["Calories", totals.calories],
                ["Protein", `${totals.protein}g`],
                ["Carbs", `${totals.carbs}g`],
                ["Fat", `${totals.fat}g`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1.5 label-rule-thin text-sm">
                  <span>{label}</span>
                  <span className="font-mono font-medium">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
