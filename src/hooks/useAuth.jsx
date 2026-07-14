import { createContext, useContext, useState } from "react";
import { mockUser } from "../services/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Mock session — real version stores/reads a JWT and calls /login, /register.
  const [user, setUser] = useState(null);

  const login = async (email, _password) => {
    await new Promise((r) => setTimeout(r, 500));
    setUser({ ...mockUser, email });
    return true;
  };

  const register = async (name, email, _password) => {
    await new Promise((r) => setTimeout(r, 500));
    setUser({ ...mockUser, name, email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
