import { LibraryManager } from "./LibraryManager";
import { PollManager } from "./PollManager";
import { NewsletterManager } from "./NewsletterManager";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export function AdminDashboard() {
  const { user, logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
              New Culture Trends®
            </p>
            <h1 className="text-3xl font-bold">Admin Control Center</h1>
            {user && (
              <p className="text-sm text-gray-400">Signed in as {user.email}</p>
            )}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-full border border-white/20 hover:border-[#FF00B3] transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        <section className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <LibraryManager />
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Poll Manager</h2>
          <PollManager />
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Newsletter</h2>
          <NewsletterManager />
        </section>
      </main>
    </div>
  );
}
