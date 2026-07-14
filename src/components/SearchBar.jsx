import { useState } from "react";

const MODES = ["Name", "Ingredient", "Cuisine"];

export default function SearchBar({ onSearch }) {
  const [mode, setMode] = useState("Name");
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ mode, query });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border border-ink/20 rounded-lg px-2 py-2 text-sm bg-white"
      >
        {MODES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch({ mode, query: e.target.value });
        }}
        placeholder={`Search by ${mode.toLowerCase()}…`}
        className="flex-1 border border-ink/20 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-turmeric/60"
      />
    </form>
  );
}
