import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import GoalSettings from './components/GoalSettings';
import ProgressTracker from './components/ProgressTracker';
import WaterControls from './components/WaterControls';
import DailySummary from './components/DailySummary';
import { Sparkles } from 'lucide-react';

const TIPS = [
  'Sip water regularly instead of chugging.',
  'Add a slice of lemon for flavor and vitamin C.',
  'Start your morning with a glass of water.',
  'Carry a reusable bottle to track intake.',
  'Drink a glass before each meal.',
  'Hydration supports focus and energy.',
];

const STORAGE_KEY = 'aquabuddy:v1';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('aquabuddy:theme');
    if (stored) return stored === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      goalMl: 2000,
      consumedMl: 0,
      stepMl: 250,
      intervalMinutes: 60,
      history: [], // {ml, at}
      nextReminderAt: null,
      lastResetDate: new Date().toDateString(),
    };
  });

  // Persist theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('aquabuddy:theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Daily reset at midnight
  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastResetDate !== today) {
      setState((s) => ({ ...s, consumedMl: 0, history: [], lastResetDate: today }));
    }
  }, []);

  // Persist main state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Notification permission
  const requestNotification = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Enable notifications to receive reminders.');
    }
  };

  // Reminder scheduler
  useEffect(() => {
    let timerId;

    const schedule = () => {
      if (!state.intervalMinutes) return;
      const now = Date.now();
      const next = now + state.intervalMinutes * 60 * 1000;
      setState((s) => ({ ...s, nextReminderAt: next }));
      timerId = setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Time to hydrate 💧', {
            body: 'Take a sip and log your water intake!',
          });
        } else {
          alert('Time to hydrate! Take a sip and log your water intake.');
        }
        schedule();
      }, state.intervalMinutes * 60 * 1000);
    };

    schedule();
    return () => clearTimeout(timerId);
  }, [state.intervalMinutes]);

  const addWater = (ml) => {
    setState((s) => ({
      ...s,
      consumedMl: s.consumedMl + ml,
      history: [...s.history, { ml, at: Date.now() }],
    }));

    // Show rotating tip
    const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
    if (tip) {
      setTipMessage(tip);
      setTimeout(() => setTipMessage(''), 3500);
    }
  };

  const undoLast = () => {
    setState((s) => {
      if (!s.history.length) return s;
      const last = s.history[s.history.length - 1];
      const newHistory = s.history.slice(0, -1);
      return {
        ...s,
        consumedMl: Math.max(0, s.consumedMl - last.ml),
        history: newHistory,
      };
    });
  };

  const [tipMessage, setTipMessage] = useState('');

  const hydrated = useMemo(() => state.consumedMl >= state.goalMl && state.goalMl > 0, [state.consumedMl, state.goalMl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((v) => !v)}
        onRequestNotification={requestNotification}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-6">
        <ProgressTracker goalMl={state.goalMl} consumedMl={state.consumedMl} />

        <GoalSettings
          goalMl={state.goalMl}
          setGoalMl={(goalMl) => setState((s) => ({ ...s, goalMl }))}
          intervalMinutes={state.intervalMinutes}
          setIntervalMinutes={(intervalMinutes) => setState((s) => ({ ...s, intervalMinutes }))}
        />

        <WaterControls
          stepMl={state.stepMl}
          setStepMl={(stepMl) => setState((s) => ({ ...s, stepMl }))}
          onAdd={addWater}
          onUndo={undoLast}
        />

        <DailySummary
          goalMl={state.goalMl}
          consumedMl={state.consumedMl}
          historyCount={state.history.length}
          nextReminderAt={state.nextReminderAt}
        />

        {tipMessage && (
          <div className="rounded-xl border border-blue-200 dark:border-slate-800 bg-blue-50 dark:bg-blue-900/30 px-4 py-3 text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {tipMessage}
          </div>
        )}

        {hydrated && (
          <div className="rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-800 dark:text-green-200">
            Goal achieved! Great job staying hydrated today.
          </div>
        )}

        <footer className="pt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          Built with care • Stay hydrated 💧
        </footer>
      </main>
    </div>
  );
}

export default App;
