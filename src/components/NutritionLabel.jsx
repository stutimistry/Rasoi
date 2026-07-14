// The recurring "signature" visual: nutrition data styled like the back of
// a packaged food label — hairline rules, mono figures, no decoration.

export default function NutritionLabel({ nutrition, servingSize }) {
  const rows = [
    { label: "Calories", value: nutrition.calories, unit: "" },
    { label: "Protein", value: nutrition.protein, unit: "g" },
    { label: "Carbs", value: nutrition.carbs, unit: "g" },
    { label: "Fat", value: nutrition.fat, unit: "g" },
    { label: "Fiber", value: nutrition.fiber, unit: "g" },
    { label: "Sugar", value: nutrition.sugar, unit: "g" },
  ];

  return (
    <div className="bg-white border border-ink/20 p-4 max-w-xs">
      <p className="font-display text-lg font-semibold tracking-tight">
        Nutrition Facts
      </p>
      <p className="font-mono text-xs text-steel mb-2">
        Serving size {servingSize}
      </p>
      <div className="label-rule" />
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-baseline justify-between py-1.5 ${
            i !== rows.length - 1 ? "label-rule-thin" : ""
          }`}
        >
          <span className="font-body text-sm">{row.label}</span>
          <span className="font-mono text-sm font-medium">
            {row.value}
            {row.unit}
          </span>
        </div>
      ))}
    </div>
  );
}
