import { DIETS } from "../services/mockData";

export default function DietaryFilters({ selected, onChange }) {
  const toggle = (diet) => {
    if (selected.includes(diet)) {
      onChange(selected.filter((d) => d !== diet));
    } else {
      onChange([...selected, diet]);
    }
  };

  return (
    <div>
      <label className="block font-display text-sm font-semibold text-ink mb-2">
        Dietary restrictions
      </label>
      <div className="grid grid-cols-2 gap-2">
        {DIETS.map((diet) => {
          const active = selected.includes(diet);
          return (
            <button
              key={diet}
              type="button"
              onClick={() => toggle(diet)}
              className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                active
                  ? "bg-cardamom text-white border-cardamom"
                  : "bg-white text-ink border-ink/15 hover:border-cardamom/50"
              }`}
            >
              <span className="inline-block w-3.5 h-3.5 rounded-sm border mr-2 align-middle relative -top-px"
                style={{
                  borderColor: active ? "white" : "#6B7268",
                  backgroundColor: active ? "white" : "transparent",
                }}
              >
                {active && (
                  <span className="absolute inset-0 flex items-center justify-center text-cardamom text-[10px] leading-none">✓</span>
                )}
              </span>
              {diet}
            </button>
          );
        })}
      </div>
    </div>
  );
}
