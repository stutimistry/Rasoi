import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getHistory } from "../services/mockApi";

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getHistory().then(setItems);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-3xl">
        <h1 className="font-display text-3xl font-semibold mb-1">History</h1>
        <p className="text-steel mb-8">Every recipe you've generated, most recent first.</p>

        <div className="bg-white border border-ink/10 rounded-xl divide-y divide-ink/10">
          {items.map((h) => (
            <Link
              key={h.id}
              to={`/recipes/${h.recipe.id}`}
              className="flex items-center gap-4 px-5 py-3 hover:bg-papad transition-colors"
            >
              <img
                src={h.recipe.image}
                alt={h.recipe.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{h.recipe.title}</p>
                <p className="text-xs text-steel">{h.recipe.cuisine}</p>
              </div>
              <span className="font-mono text-xs text-steel shrink-0">
                {new Date(h.generatedAt).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
