import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser(data.name, data.email, data.password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-2xl font-semibold text-ink block mb-8 text-center">
          Rasoi
        </Link>
        <div className="bg-white border border-ink/10 rounded-xl p-7">
          <h1 className="font-display text-xl font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-steel mb-6">Save recipes and build your history.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
              />
              {errors.name && <p className="text-xs text-chili mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
              />
              {errors.email && <p className="text-xs text-chili mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
              />
              {errors.password && (
                <p className="text-xs text-chili mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) => v === watch("password") || "Passwords don't match",
                })}
                className="w-full border border-ink/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turmeric/60"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-chili mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-cardamom text-white text-sm font-medium hover:bg-cardamom-light transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Creating account…" : "Sign up"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-steel mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-cardamom font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
