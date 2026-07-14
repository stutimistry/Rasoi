import { DIFFICULTIES } from "../services/mockData";

export default function DifficultySelect({ value, onChange }) {
  return (
    <div>
      <label className="block font-display text-sm font-semibold text-ink mb-2">
        Difficulty
      </label>
      <div className="flex gap-2">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => onChange(d)}
            className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              value === d
                ? "bg-turmeric text-ink border-turmeric"
                : "bg-white text-ink border-ink/15 hover:border-turmeric/60"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
