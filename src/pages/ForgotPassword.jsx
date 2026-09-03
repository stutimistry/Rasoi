import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [authError, setAuthError] = useState("");
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setAuthError("");
    try {
      await forgotPassword(data.email);
      setSent(true);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-2xl font-semibold text-ink block mb-8 text-center">
          Rasoi
        </Link>
        <div className="bg-white border border-ink/10 rounded-xl p-7">
          {sent ? (
            <>
              <h1 className="font-display text-xl font-semibold mb-1">Check your email</h1>
              <p className="text-sm text-steel">
                If an account exists for <span className="font-medium text-ink">{getValues("email")}</span>,
                we've sent a link to reset your password.
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display text-xl font-semibold mb-1">Reset your password</h1>
              <p className="text-sm text-steel mb-6">
                Enter the email on your account and we'll send you a reset link.
              </p>

              {authError && (
                <div className="bg-chili/10 border border-chili/30 text-chili text-sm rounded-lg px-3 py-2 mb-4">
                  {authError}
                </div>
              )}

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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-cardamom text-white text-sm font-medium hover:bg-cardamom-light transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send reset link"}
                </button>
              </form>
            </>
          )}
        </div>
        <p className="text-center text-sm text-steel mt-5">
          <Link to="/login" className="text-cardamom font-medium hover:underline">
            ← Back to log in
          </Link>
        </p>
      </div>
    </div>
  );
}