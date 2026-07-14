import { Link } from "react-router-dom";

// Seamless infinite marquee: the recipe list is duplicated once so the CSS
// animation can loop from -50% back to 0 without a visible seam.

export default function RecipeSlider({ recipes }) {
  const loop = [...recipes, ...recipes];

  return (
    <div className="overflow-hidden relative py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]">
        {loop.map((r, i) => (
          <Link
            key={`${r.id}-${i}`}
            to={`/recipes/${r.id}`}
            className="group w-56 shrink-0 bg-white border border-ink/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-36 overflow-hidden bg-papad-dark">
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-mono uppercase tracking-wide text-cardamom mb-0.5">
                {r.cuisine}
              </p>
              <p className="font-display text-sm font-semibold leading-snug truncate">
                {r.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  );
}
