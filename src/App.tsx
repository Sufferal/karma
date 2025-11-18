import { useState, useEffect } from 'react';
import { KEYS, LS_APP_MODE } from './constants';
import { Stack } from './components/stack/Stack';
import useKeyboardShortcut from './hooks/useKeyboardShortcut';
import { getLocalStorageItem, setLocalStorageItem } from './utils/localStorage';
import { TimerList } from './components/timers/TimerList';

const AppMode = {
  default: 'default',
  focus: 'focus',
  plan: 'plan',
} as const;
type AppMode = (typeof AppMode)[keyof typeof AppMode];

function App() {
  const [appMode, setAppMode] = useState<AppMode>(
    getLocalStorageItem(LS_APP_MODE) || AppMode.default
  );

  const handleAppModeChange = (newMode: AppMode) => {
    if (appMode === newMode) return;

    // No need to confirm it when there are no timers
    if (appMode === AppMode.plan) {
      setAppMode(newMode);
      return;
    }

    const hasUserConfirmed = window.confirm(
      'Are you sure you want to switch the app mode? Timer data will be lost.'
    );

    if (hasUserConfirmed) {
      setAppMode(newMode);
    }
  };

  useKeyboardShortcut(KEYS.D, () => handleAppModeChange(AppMode.default));
  useKeyboardShortcut(KEYS.F, () => handleAppModeChange(AppMode.focus));
  useKeyboardShortcut(KEYS.S, () => handleAppModeChange(AppMode.plan));

  useEffect(() => {
    setLocalStorageItem(LS_APP_MODE, appMode);
  }, [appMode]);

  if (appMode === AppMode.focus) {
    return (
      <div className="w-screen min-h-screen flex flex-col justify-center items-center gap-10">
        <TimerList />
      </div>
    );
  }

  if (appMode === AppMode.plan) {
    return (
      <div className="w-screen min-h-screen flex flex-col justify-center items-center mt-5">
        <Stack />
      </div>
    );
  }

  return (
    <main>
      <section className="w-screen min-h-screen flex justify-center gap-20">
        <div className="flex gap-10 mt-10">
          <Stack />
        </div>
        <div className="flex flex-col gap-10 mt-4">
          <TimerList />
        </div>
      </section>
    </main>
  );
}

export default App;
