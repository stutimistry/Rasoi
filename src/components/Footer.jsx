import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Meal planner", to: "/meal-planner" },
      { label: "Favorites", to: "/favorites" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Blog", to: "/" },
      { label: "Careers", to: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-papad">
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl font-semibold mb-2">Rasoi</p>
          <p className="text-sm text-papad/60 max-w-xs">
            Cook from what's already in your kitchen — recipes, nutrition, and a
            shopping list, generated on the fly.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold mb-3">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-papad/60 hover:text-papad transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-papad/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-papad/50">
          <p>© {new Date().getFullYear()} Rasoi. All rights reserved.</p>
          <p className="font-mono">Made for people who cook with what they have.</p>
        </div>
      </div>
    </footer>
  );
}
