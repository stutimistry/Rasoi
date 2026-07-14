import { useState } from "react";

// Ingredients render as little pantry-jar tags rather than a plain list —
// matches the app's "label" visual language.

export default function IngredientInput({ ingredients, onChange }) {
  const [draft, setDraft] = useState("");

  const addIngredient = (raw) => {
    const parts = raw
      .split(/[,\n]/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const merged = [...ingredients];
    for (const p of parts) {
      if (!merged.some((m) => m.toLowerCase() === p.toLowerCase())) merged.push(p);
    }
    onChange(merged);
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(draft);
    }
  };

  const removeIngredient = (name) => {
    onChange(ingredients.filter((i) => i !== name));
  };

  return (
    <div>
      <label className="block font-display text-sm font-semibold text-ink mb-2">
        What's in your kitchen?
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {ingredients.map((ing) => (
          <span
            key={ing}
            className="group inline-flex items-center gap-1.5 bg-cardamom/10 border border-cardamom/30 text-cardamom rounded-full pl-3 pr-1.5 py-1 text-sm font-medium"
          >
            {ing}
            <button
              type="button"
              onClick={() => removeIngredient(ing)}
              aria-label={`Remove ${ing}`}
              className="w-4 h-4 rounded-full flex items-center justify-center text-cardamom/70 hover:bg-cardamom hover:text-white transition-colors"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tomato, onion, rice… press Enter to add"
          className="flex-1 border border-ink/20 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-turmeric/60"
        />
        <button
          type="button"
          onClick={() => addIngredient(draft)}
          className="px-4 py-2 rounded-lg bg-ink text-papad text-sm font-medium hover:bg-cardamom transition-colors"
        >
          Add
        </button>
      </div>
      <p className="text-xs text-steel mt-1.5">
        Add one at a time, or paste a comma-separated list.
      </p>
    </div>
  );
}
