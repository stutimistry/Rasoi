import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { getRecipes, getHistory } from "../services/mockApi";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ saved: 0, history: 0 });

  useEffect(() => {
    Promise.all([getRecipes(), getHistory()]).then(([recipes, history]) =>
      setStats({ saved: recipes.length, history: history.length })
    );
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 py-8 max-w-xl">
        <h1 className="font-display text-3xl font-semibold mb-8">Profile</h1>

        <div className="bg-white border border-ink/10 rounded-xl p-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-cardamom text-white flex items-center justify-center font-display text-2xl mb-4">
            {user?.name?.[0] || "?"}
          </div>
          <p className="font-display text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-steel">{user?.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-ink/10 rounded-xl p-4 text-center">
            <p className="font-mono text-2xl font-semibold text-cardamom">{stats.saved}</p>
            <p className="text-xs text-steel">Saved recipes</p>
          </div>
          <div className="bg-white border border-ink/10 rounded-xl p-4 text-center">
            <p className="font-mono text-2xl font-semibold text-cardamom">{stats.history}</p>
            <p className="text-xs text-steel">Recipes generated</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full py-2.5 rounded-lg border border-chili text-chili text-sm font-medium hover:bg-chili/5 transition-colors"
        >
          Log out
        </button>
      </main>
    </div>
  );
}
