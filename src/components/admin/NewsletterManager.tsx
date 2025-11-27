import { useMemo } from "react";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";

interface NewsletterEntry {
  id: string;
  email: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

const formatDate = (timestamp?: { seconds: number; nanoseconds: number }) => {
  if (!timestamp) return "Pending";
  return new Date(timestamp.seconds * 1000).toLocaleString();
};

export function NewsletterManager() {
  const { data: entries, loading } = useFirestoreCollection<NewsletterEntry>(
    "newsletter",
    {
      orderByField: "createdAt",
      orderDirection: "desc",
    }
  );

  const exportCsv = () => {
    if (!entries.length) return;
    const header = "email,createdAt\\n";
    const rows = entries
      .map(
        (entry) =>
          `${entry.email},${formatDate(entry.createdAt)
            .replace(/,/g, "")
            .replace(/\\s+/g, " ")}`
      )
      .join("\\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "newsletter-subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalSubscribers = useMemo(() => entries.length, [entries]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">Total subscribers</p>
          <p className="text-3xl font-bold">{totalSubscribers}</p>
        </div>
        <button
          onClick={exportCsv}
          disabled={!entries.length}
          className="rounded-full border border-white/20 px-6 py-2 text-sm disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 px-4 py-3 text-xs uppercase tracking-[0.3em] text-gray-500 border-b border-white/5">
          <span>Email</span>
          <span>Subscribed</span>
        </div>
        <div className="divide-y divide-white/5">
          {loading && (
            <p className="px-4 py-4 text-sm text-gray-400">Loading emails...</p>
          )}
          {!loading && !entries.length && (
            <p className="px-4 py-4 text-sm text-gray-400">
              No newsletter submissions yet.
            </p>
          )}
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-2 px-4 py-3 text-sm text-gray-100"
            >
              <span>{entry.email}</span>
              <span className="text-gray-400">{formatDate(entry.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

