import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-ink/10 bg-papad/95 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Rasoi
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/login" className="text-ink/80 hover:text-ink">
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-cardamom text-white hover:bg-cardamom-light transition-colors"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
