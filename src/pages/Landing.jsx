import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RecipeSlider from "../components/RecipeSlider";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { mockRecipes } from "../services/mockData";

export default function Landing() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cardamom mb-4">
            Tomato · Onion · Rice · Paneer
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-semibold text-ink mb-5">
            Cook from what's already in your kitchen.
          </h1>
          <p className="text-steel text-lg mb-8 max-w-md">
            List the ingredients you have on hand. Rasoi builds a real recipe
            around them — with the nutrition facts worked out for you.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tomato, onion, paneer…"
              className="flex-1 border border-ink/20 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-turmeric/60"
            />
            <button className="px-5 py-3 rounded-lg bg-cardamom text-white text-sm font-medium hover:bg-cardamom-light transition-colors">
              Generate
            </button>
          </form>
        </div>

        <div className="bg-white border border-ink/10 rounded-xl p-5 rotate-1 shadow-lg">
          <p className="font-mono text-xs text-steel mb-3">Nutrition Facts (preview)</p>
          <div className="label-rule" />
          {[
            ["Calories", "420"],
            ["Protein", "22g"],
            ["Carbs", "18g"],
            ["Fat", "28g"],
          ].map(([label, value], i) => (
            <div key={label} className="flex justify-between py-1.5 label-rule-thin">
              <span className="text-sm">{label}</span>
              <span className="font-mono text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <h2 className="font-display text-2xl font-semibold mb-6 max-w-6xl mx-auto px-6">
          Popular this week
        </h2>
        <RecipeSlider recipes={mockRecipes} />
      </section>

      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
