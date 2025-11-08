import React from 'react';
import { Droplet } from 'lucide-react';

function formatMl(ml) {
  if (ml >= 1000) return `${(ml / 1000).toFixed(1)} L`;
  return `${ml} ml`;
}

function ProgressTracker({ goalMl, consumedMl }) {
  const pct = Math.min(100, Math.round((consumedMl / Math.max(goalMl || 1, 1)) * 100));
  const remaining = Math.max(goalMl - consumedMl, 0);

  return (
    <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Today's Progress</h2>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${pct >= 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
          <Droplet className="w-4 h-4" />
          {pct}%
        </div>
      </div>

      <div className="w-full h-4 bg-white/70 dark:bg-slate-800 rounded-full overflow-hidden border border-blue-200 dark:border-slate-700">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Consumed</div>
          <div className="text-slate-900 dark:text-slate-100 font-medium">{formatMl(consumedMl)}</div>
        </div>
        <div className="text-right">
          <div className="text-slate-500 dark:text-slate-400">Remaining</div>
          <div className="text-slate-900 dark:text-slate-100 font-medium">{formatMl(remaining)}</div>
        </div>
      </div>
    </section>
  );
}

export default ProgressTracker;
