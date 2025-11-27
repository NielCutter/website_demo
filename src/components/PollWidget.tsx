import { useMemo, useState } from "react";
import { usePollSystem } from "../hooks/usePollSystem";

export function PollWidget() {
  const { poll, loading, error, vote, userVote } = usePollSystem();
  const [submitting, setSubmitting] = useState<string | null>(null);

  const totalVotes = useMemo(
    () => poll?.options.reduce((sum, option) => sum + (option.votes ?? 0), 0) ?? 0,
    [poll]
  );

  const handleVote = async (optionId: string) => {
    setSubmitting(optionId);
    try {
      await vote(optionId);
    } catch (voteError) {
      alert((voteError as Error).message);
    } finally {
      setSubmitting(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-gray-400 animate-pulse">Loading poll...</p>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <p className="text-sm text-gray-400">
          {error ?? "Poll not available right now."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
          Community poll
        </p>
        <h3 className="text-2xl font-semibold mt-2">{poll.question}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {poll.isActive
            ? "Vote on what we should release next."
            : "Poll is paused. Results below."}
        </p>
      </div>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const voteCount = option.votes ?? 0;
          const percentage =
            totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
          const isVotedFor = userVote === option.id;

          return (
            <button
              key={option.id}
              disabled={!!userVote || !poll.isActive}
              onClick={() => handleVote(option.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                isVotedFor
                  ? "border-[#00FFE5]"
                  : "border-white/10 hover:border-[#00FFE5]"
              } ${!poll.isActive ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{option.label}</span>
                <span className="text-gray-400">{voteCount} votes</span>
              </div>
              {(userVote || !poll.isActive) && (
                <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
              {poll.isActive && !userVote && (
                <p className="text-xs text-gray-500 mt-1">
                  {submitting === option.id ? "Submitting..." : "Tap to vote"}
                </p>
              )}
              {userVote === option.id && (
                <p className="text-xs text-[#00FFE5] mt-1">Your choice</p>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
        Total votes: {totalVotes}
      </p>
    </div>
  );
}

