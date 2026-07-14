import { CUISINES } from "../services/mockData";

export default function CuisineSelect({ value, onChange }) {
  return (
    <div>
      <label className="block font-display text-sm font-semibold text-ink mb-2">
        Cuisine
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-turmeric/60"
      >
        <option value="">Any cuisine</option>
        {CUISINES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
