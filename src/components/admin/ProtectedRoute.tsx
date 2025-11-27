import { ReactNode, useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, error, login, allowedEmails } = useAdminAuth();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await login(formState.email, formState.password);
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-lg animate-pulse">Loading admin portal...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0f] px-4">
        <div className="w-full max-w-md bg-black/60 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-semibold text-white mb-2">Admin Login</h1>
          <p className="text-sm text-gray-400 mb-6">
            Only approved team members can access the dashboard. Allowed emails:
            <span className="block text-white font-medium">
              {allowedEmails.join(", ")}
            </span>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="text-sm text-gray-300 mb-2 block"
                htmlFor="admin-email"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#00FFE5]"
                value={formState.email}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
            <div>
              <label
                className="text-sm text-gray-300 mb-2 block"
                htmlFor="admin-password"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FF00B3]"
                value={formState.password}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
            </div>
            {(formError || error) && (
              <p className="text-sm text-red-400">{formError || error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#0b0b0f] font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
