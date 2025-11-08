import React from 'react';

function formatMl(ml) {
  if (ml >= 1000) return `${(ml / 1000).toFixed(1)} L`;
  return `${ml} ml`;
}

function DailySummary({ goalMl, consumedMl, historyCount, nextReminderAt }) {
  const remaining = Math.max(goalMl - consumedMl, 0);
  return (
    <section className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Daily Summary</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Goal</div>
          <div className="text-slate-900 dark:text-slate-100 font-medium">{formatMl(goalMl)}</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Consumed</div>
          <div className="text-slate-900 dark:text-slate-100 font-medium">{formatMl(consumedMl)}</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Remaining</div>
          <div className="text-slate-900 dark:text-slate-100 font-medium">{formatMl(remaining)}</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Entries</div>
          <div className="text-slate-900 dark:text-slate-100 font-medium">{historyCount}</div>
        </div>
      </div>
      {nextReminderAt && (
        <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">Next reminder at {new Date(nextReminderAt).toLocaleTimeString()}</div>
      )}
    </section>
  );
}

export default DailySummary;
