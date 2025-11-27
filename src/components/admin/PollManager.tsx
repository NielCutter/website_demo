import { useEffect, useMemo, useState } from "react";
import { usePollSystem, PollOption } from "../../hooks/usePollSystem";

const defaultOptionLabels = ["Headwear", "Pants", "Jacket", "Hoodie"];

const buildOption = (label: string, index: number): PollOption => ({
  id: `option-${index}`,
  label,
  votes: 0,
});

export function PollManager() {
  const { poll, loading, error, admin } = usePollSystem();
  const [question, setQuestion] = useState("What should we release next?");
  const [options, setOptions] = useState<PollOption[]>(
    defaultOptionLabels.map(buildOption)
  );
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (poll) {
      setQuestion(poll.question);
      setOptions(
        poll.options.length
          ? poll.options
          : defaultOptionLabels.map(buildOption)
      );
    } else {
      setQuestion("What should we release next?");
      setOptions(defaultOptionLabels.map(buildOption));
    }
  }, [poll]);

  const totalVotes = useMemo(
    () => poll?.options.reduce((sum, option) => sum + (option.votes ?? 0), 0) ?? 0,
    [poll]
  );

  const handleLabelChange = (index: number, value: string) => {
    setOptions((prev) =>
      prev.map((option, idx) =>
        idx === index
          ? {
              ...option,
              label: value,
              id: `option-${idx}-${value.toLowerCase().replace(/\\s+/g, "-")}`,
            }
          : option
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const filteredOptions = options
        .filter((option) => option.label.trim().length > 0)
        .map((option, index) => ({
          id: option.id || `option-${index}`,
          label: option.label.trim(),
          votes: 0,
        }));

      await admin.updatePoll(question.trim(), filteredOptions);
      setStatusMessage("Poll updated and activated.");
    } catch (saveError) {
      setStatusMessage((saveError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async () => {
    if (!poll) return;
    await admin.togglePoll(!poll.isActive);
  };

  const handleReset = async () => {
    await admin.resetPoll();
  };

  return (
    <div className="space-y-6">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="space-y-4">
        <label className="text-sm text-gray-300">Poll question</label>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00FFE5]"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-300">Poll options</p>
        {options.map((option, index) => (
          <input
            key={option.id || index}
            type="text"
            value={option.label}
            onChange={(event) => handleLabelChange(index, event.target.value)}
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-2 focus:outline-none focus:border-[#FF00B3]"
            placeholder={`Option ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] text-[#050506] font-semibold px-6 py-2 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save & Activate Poll"}
        </button>
        <button
          onClick={handleToggle}
          disabled={!poll}
          className="rounded-full border border-white/20 px-6 py-2 text-sm"
        >
          {poll?.isActive ? "Disable Poll" : "Enable Poll"}
        </button>
        <button
          onClick={handleReset}
          className="rounded-full border border-red-400/40 text-red-300 px-6 py-2 text-sm"
        >
          Reset Votes
        </button>
      </div>
      {statusMessage && <p className="text-sm text-gray-400">{statusMessage}</p>}

      <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Current status</p>
            <p className="text-lg font-semibold">
              {poll?.isActive ? "Poll is live" : "Poll is paused"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total votes</p>
            <p className="text-2xl font-bold">{totalVotes}</p>
          </div>
        </div>
        {poll && (
          <div className="grid gap-3">
            {poll.options.map((option) => (
              <div key={option.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{option.label}</span>
                  <span>{option.votes ?? 0} votes</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] transition-all"
                    style={{
                      width: `${
                        totalVotes === 0
                          ? 0
                          : Math.round(((option.votes ?? 0) / totalVotes) * 100)
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {loading && <p className="text-sm text-gray-400">Loading poll...</p>}
      </div>
    </div>
  );
}

