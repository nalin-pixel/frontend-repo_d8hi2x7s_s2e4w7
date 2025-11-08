import React, { useMemo } from 'react';
import { Plus, Minus, CupSoda } from 'lucide-react';

const PRESETS = [150, 200, 250, 300, 350, 500];

function WaterControls({ stepMl, setStepMl, onAdd, onUndo }) {
  const options = useMemo(() => PRESETS, []);

  return (
    <section className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Log Intake</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2">
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-2">Glass size</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {options.map((ml) => (
              <button
                key={ml}
                onClick={() => setStepMl(ml)}
                className={`px-3 py-2 rounded-lg border text-sm transition ${stepMl === ml ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {ml} ml
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-300 mb-2">Actions</label>
          <div className="flex gap-2">
            <button
              onClick={() => onAdd(stepMl)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 transition flex-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
            <button
              onClick={onUndo}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-2 transition"
              title="Undo last"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
        <CupSoda className="w-4 h-4" /> Each tap adds your selected glass size.
      </div>
    </section>
  );
}

export default WaterControls;
