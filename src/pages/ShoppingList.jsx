import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getRecipes } from "../services/mockApi";

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState({});

  useEffect(() => {
    getRecipes().then((recipes) => {
      const missing = new Map();
      recipes.forEach((r) =>
        r.ingredients
          .filter((i) => !i.have)
          .forEach((i) => missing.set(i.name, (missing.get(i.name) || []).concat(r.title)))
      );
      setItems(
        Array.from(missing.entries()).map(([name, recipes]) => ({ name, recipes }))
      );
    });
  }, []);

  const toggle = (name) => setChecked((c) => ({ ...c, [name]: !c[name] }));

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold mb-1">Shopping list</h1>
        <p className="text-steel mb-8">
          Ingredients your saved recipes are missing — one click to check them off.
        </p>

        <div className="bg-white border border-ink/10 rounded-xl divide-y divide-ink/10">
          {items.map((item) => (
            <label
              key={item.name}
              className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-papad transition-colors"
            >
              <input
                type="checkbox"
                checked={!!checked[item.name]}
                onChange={() => toggle(item.name)}
                className="w-4 h-4 accent-cardamom"
              />
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    checked[item.name] ? "line-through text-steel" : "text-ink"
                  }`}
                >
                  {item.name}
                </p>
                <p className="text-xs text-steel">for {item.recipes.join(", ")}</p>
              </div>
            </label>
          ))}
          {items.length === 0 && (
            <p className="px-5 py-6 text-sm text-steel">Nothing missing right now — pantry's stocked.</p>
          )}
        </div>

        <button className="mt-5 px-4 py-2 rounded-lg bg-ink text-papad text-sm font-medium hover:bg-cardamom transition-colors">
          Save list
        </button>
      </main>
    </div>
  );
}
