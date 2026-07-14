import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export default function RecipeCard({ recipe, onToggleFavorite }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="group block bg-white border border-ink/10 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-40 overflow-hidden bg-papad-dark">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton
            active={recipe.favorite}
            size="sm"
            onToggle={() => onToggleFavorite?.(recipe.id)}
          />
        </div>
        <span className="absolute bottom-2 left-2 bg-ink/80 text-papad text-xs font-mono px-2 py-0.5 rounded">
          {recipe.time} min
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-mono uppercase tracking-wide text-cardamom mb-1">
          {recipe.cuisine} · {recipe.difficulty}
        </p>
        <h3 className="font-display text-lg font-semibold leading-snug mb-1.5">
          {recipe.title}
        </h3>
        <p className="text-xs text-steel line-clamp-1">
          {recipe.ingredients.map((i) => i.name).join(", ")}
        </p>
      </div>
    </Link>
  );
}
