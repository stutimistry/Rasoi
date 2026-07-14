export default function TimeSlider({ value, onChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="font-display text-sm font-semibold text-ink">
          Cooking time
        </label>
        <span className="font-mono text-sm text-cardamom font-medium">
          {value} min
        </span>
      </div>
      <input
        type="range"
        min={15}
        max={60}
        step={15}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cardamom"
      />
      <div className="flex justify-between text-xs text-steel font-mono mt-1">
        <span>15</span>
        <span>30</span>
        <span>45</span>
        <span>60</span>
      </div>
    </div>
  );
}
