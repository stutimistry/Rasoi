import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "◧" },
  { to: "/favorites", label: "Favorites", icon: "♥" },
  { to: "/history", label: "History", icon: "↺" },
  { to: "/meal-planner", label: "Meal planner", icon: "📅" },
  { to: "/shopping-list", label: "Shopping list", icon: "▤" },
  { to: "/profile", label: "Profile", icon: "◐" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-56 shrink-0 border-r border-ink/10 bg-white/60 flex flex-col justify-between min-h-screen sticky top-0">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-ink/10">
          <span className="font-display text-xl font-semibold text-ink">Rasoi</span>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cardamom text-white"
                    : "text-ink/80 hover:bg-cardamom/10"
                }`
              }
            >
              <span className="w-4 text-center">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-ink/10">
        <p className="text-sm font-medium text-ink">{user?.name || "Guest"}</p>
        <p className="text-xs text-steel mb-3 truncate">{user?.email}</p>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="text-xs font-medium text-chili hover:underline"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
