import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RecipeCard from "../components/RecipeCard";
import { getFavorites, toggleFavorite } from "../services/mockApi";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const load = () => getFavorites().then(setFavorites);

  useEffect(() => {
    load();
  }, []);

  const handleFavorite = async (id) => {
    await toggleFavorite(id);
    load();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-5xl">
        <h1 className="font-display text-3xl font-semibold mb-1">Favorites</h1>
        <p className="text-steel mb-8">Recipes you've hearted, all in one place.</p>

        {favorites.length === 0 ? (
          <p className="text-steel text-sm">
            Nothing here yet — tap the ♡ on any recipe to save it.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((r) => (
              <RecipeCard key={r.id} recipe={r} onToggleFavorite={handleFavorite} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
