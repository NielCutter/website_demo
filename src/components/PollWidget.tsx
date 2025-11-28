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
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-500">
          Community poll
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold mt-2">{poll.question}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          {poll.isActive
            ? "Vote on what we should release next. You can change your vote anytime."
            : "Poll is paused. Results below."}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {poll.options.map((option) => {
          const voteCount = option.votes ?? 0;
          const percentage =
            totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
          const isVotedFor = userVote === option.id;

          return (
            <button
              key={option.id}
              disabled={!poll.isActive || submitting !== null}
              onClick={() => handleVote(option.id)}
              className={`w-full rounded-xl sm:rounded-2xl border px-3 sm:px-4 py-3 sm:py-3.5 text-left transition-all min-h-[44px] touch-manipulation ${
                isVotedFor
                  ? "border-[#00FFE5] bg-[#00FFE5]/10"
                  : "border-white/10 hover:border-[#00FFE5] active:bg-white/5"
              } ${!poll.isActive ? "opacity-60 cursor-not-allowed" : ""} ${submitting !== null ? "opacity-50 cursor-wait" : ""}`}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-sm sm:text-base">{option.label}</span>
                <span className="text-gray-400 text-xs sm:text-sm">{voteCount} votes</span>
              </div>
              {(userVote || !poll.isActive) && (
                <div className="mt-2 h-1.5 sm:h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
              {poll.isActive && (
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  {submitting === option.id ? "Submitting..." : isVotedFor ? "Your choice - Tap to change" : "Tap to vote"}
                </p>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500">
        Total votes: {totalVotes}
      </p>
    </div>
  );
}

