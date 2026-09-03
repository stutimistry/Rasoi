// // import { createContext, useContext, useState } from "react";
// // import { mockUser } from "../services/mockData";

// // const AuthContext = createContext(null);

// // export function AuthProvider({ children }) {
// //   // Mock session — real version stores/reads a JWT and calls /login, /register.
// //   const [user, setUser] = useState(null);

// //   const login = async (email, _password) => {
// //     await new Promise((r) => setTimeout(r, 500));
// //     setUser({ ...mockUser, email });
// //     return true;
// //   };

// //   const register = async (name, email, _password) => {
// //     await new Promise((r) => setTimeout(r, 500));
// //     setUser({ ...mockUser, name, email });
// //     return true;
// //   };

// //   const logout = () => setUser(null);

// //   return (
// //     <AuthContext.Provider value={{ user, login, register, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const ctx = useContext(AuthContext);
// //   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
// //   return ctx;
// // }



// import { useForm } from "react-hook-form";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/dashboard";
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     await login(data.email, data.password);
//     navigate(from, { replace: true });
//   };
// }





import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Module-level mock "database" of registered users. This stands in for the
// users table — it lives outside the component so it survives across
// navigation within the same session (but resets on a full page reload,
// same as any other in-memory mock here). Swap this whole file's internals
// for real POST /register, /login, /forgot-password calls later; the
// login/register/forgotPassword function signatures below won't need to change.
let mockUsers = [
  { name: "Stuti", email: "stuti@example.com", password: "password123" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    const normalizedEmail = email.trim().toLowerCase();
    const existing = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!existing) {
      throw new Error("No account found with that email. Try signing up first.");
    }
    if (existing.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    setUser({ name: existing.name, email: existing.email });
    return true;
  };

  const register = async (name, email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    const normalizedEmail = email.trim().toLowerCase();

    if (mockUsers.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error("An account with that email already exists. Try logging in instead.");
    }

    const newUser = { name, email, password };
    mockUsers = [...mockUsers, newUser];
    setUser({ name, email });
    return true;
  };

  const forgotPassword = async (email) => {
    await new Promise((r) => setTimeout(r, 500));
    const normalizedEmail = email.trim().toLowerCase();
    const existing = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!existing) {
      throw new Error("No account found with that email.");
    }
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}