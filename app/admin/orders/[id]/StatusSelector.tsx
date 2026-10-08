"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"] as const;
type Status = (typeof STATUSES)[number];

type Props = { orderId: number; currentStatus: string };

export default function StatusSelector({ orderId, currentStatus }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Status>(currentStatus as Status);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selected }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setSaved(true);
      router.refresh();
    } catch {
      setError("Failed to save — please try again");
      setSelected(currentStatus as Status);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select
        value={selected}
        onChange={(e) => { setSelected(e.target.value as Status); setSaved(false); setError(null); }}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        onClick={handleSave}
        disabled={saving || selected === currentStatus}
        className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        {saving ? "Saving…" : "Save"}
      </button>

      {saved && (
        <span className="text-xs text-emerald-600 font-medium">Saved ✓</span>
      )}
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
