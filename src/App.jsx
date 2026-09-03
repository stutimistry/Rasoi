// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./hooks/useAuth";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import RecipeDetails from "./pages/RecipeDetails";
// import Favorites from "./pages/Favorites";
// import History from "./pages/History";
// import ShoppingList from "./pages/ShoppingList";
// import MealPlanner from "./pages/MealPlanner";
// import Profile from "./pages/Profile";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/recipes/:id" element={<RecipeDetails />} />
//           <Route path="/favorites" element={<Favorites />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/shopping-list" element={<ShoppingList />} />
//           <Route path="/meal-planner" element={<MealPlanner />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import ShoppingList from "./pages/ShoppingList";
import MealPlanner from "./pages/MealPlanner";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/shopping-list" element={<ProtectedRoute><ShoppingList /></ProtectedRoute>} />
          <Route path="/meal-planner" element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}