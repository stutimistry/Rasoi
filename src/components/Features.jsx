const FEATURES = [
  {
    icon: "🥘",
    title: "AI-generated recipes",
    text: "Type in what's on your counter and get a full recipe back — not just a list of matches.",
  },
  {
    icon: "🩺",
    title: "Nutrition, worked out",
    text: "Calories, protein, carbs, and fat calculated automatically for every recipe.",
  },
  {
    icon: "🥗",
    title: "Diet-aware",
    text: "Vegetarian, Jain, vegan, keto, gluten-free — filters that actually respect the restriction.",
  },
  {
    icon: "🛒",
    title: "Smart shopping list",
    text: "Missing an ingredient? It's added to your list automatically, one tap to save.",
  },
  {
    icon: "📅",
    title: "Meal planning",
    text: "Generate a full day — breakfast, lunch, and dinner — built around what you already have.",
  },
  {
    icon: "💬",
    title: "Ask the chef",
    text: "\"Can I use tofu instead of paneer?\" Ask anything mid-recipe and get a real answer.",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-cardamom mb-3 text-center">
        Everything you need
      </p>
      <h2 className="font-display text-3xl font-semibold text-center mb-12">
        Cooking, minus the guesswork
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-ink/10 rounded-xl p-6 hover:border-cardamom/40 transition-colors"
          >
            <span className="text-2xl">{f.icon}</span>
            <h3 className="font-display text-lg font-semibold mt-3 mb-1.5">{f.title}</h3>
            <p className="text-sm text-steel leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
