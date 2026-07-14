import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-2xl font-semibold text-ink block mb-8 text-center">
          Rasoi
        </Link>
        <div className="bg-white border border-ink/10 rounded-xl p-7">
          <h1 className="font-display text-xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-steel mb-6">Log in to your saved recipes.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
              />
              {errors.email && (
                <p className="text-xs text-chili mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
              />
              {errors.password && (
                <p className="text-xs text-chili mt-1">{errors.password.message}</p>
              )}
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-cardamom hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-cardamom text-white text-sm font-medium hover:bg-cardamom-light transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Logging in…" : "Log in"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-steel mt-5">
          New here?{" "}
          <Link to="/register" className="text-cardamom font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
