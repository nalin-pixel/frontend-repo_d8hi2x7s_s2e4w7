import React, { useState, useEffect } from 'react';

function GoalSettings({ goalMl, setGoalMl, intervalMinutes, setIntervalMinutes }) {
  const [localGoal, setLocalGoal] = useState(goalMl);
  const [units, setUnits] = useState(goalMl >= 1000 ? 'L' : 'ml');
  const [localInterval, setLocalInterval] = useState(intervalMinutes);

  useEffect(() => {
    setLocalGoal(goalMl);
    setLocalInterval(intervalMinutes);
  }, [goalMl, intervalMinutes]);

  const convertToMl = (value, u) => {
    const v = parseFloat(value);
    if (Number.isNaN(v) || v <= 0) return 0;
    return u === 'L' ? Math.round(v * 1000) : Math.round(v);
  };

  const displayValue = () => {
    if (units === 'L') return (localGoal / 1000).toString();
    return localGoal.toString();
  };

  const handleSave = () => {
    const ml = convertToMl(localGoal, units);
    if (ml > 0) setGoalMl(ml);
    const minutes = Math.max(5, Math.min(240, parseInt(localInterval || 0)));
    setIntervalMinutes(minutes);
  };

  return (
    <section className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Daily Goal & Reminders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-2">Daily goal</label>
          <div className="flex">
            <input
              type="number"
              min="0"
              step={units === 'L' ? '0.1' : '50'}
              value={displayValue()}
              onChange={(e) => setLocalGoal(e.target.value)}
              className="flex-1 rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="rounded-r-lg border border-l-0 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-slate-800 dark:text-slate-100"
            >
              <option value="ml">ml</option>
              <option value="L">L</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-2">Reminder every</label>
          <div className="relative">
            <input
              type="number"
              min="5"
              step="5"
              value={localInterval}
              onChange={(e) => setLocalInterval(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">min</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition"
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default GoalSettings;
