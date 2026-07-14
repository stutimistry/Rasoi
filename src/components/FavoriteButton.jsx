export default function FavoriteButton({ active, onToggle, size = "md" }) {
  const dims = size === "sm" ? "w-8 h-8 text-base" : "w-10 h-10 text-lg";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className={`${dims} rounded-full flex items-center justify-center border transition-colors ${
        active
          ? "bg-chili text-white border-chili"
          : "bg-white/90 text-chili border-chili/30 hover:bg-chili/10"
      }`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
