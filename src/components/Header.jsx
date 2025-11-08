import React from 'react';
import { Droplet, Bell, Sun, Moon } from 'lucide-react';

function Header({ darkMode, onToggleTheme, onRequestNotification }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
          <Droplet className="w-5 h-5" />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          AquaBuddy
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRequestNotification}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          title="Enable notifications"
        >
          <Bell className="w-4 h-4" />
          Notify me
        </button>
        <button
          onClick={onToggleTheme}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 w-10 h-10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          title="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}

export default Header;
