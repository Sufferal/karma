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

  const toggleAppMode = (newMode: AppMode) => {
    setAppMode(prevMode =>
      prevMode === AppMode.default ? newMode : AppMode.default
    );
  };

  const handleAppModeChange = () => {
    const hasUserConfirmed = window.confirm(
      'Are you sure you want to switch the app mode? All unsaved data will be lost.'
    );
    if (hasUserConfirmed) {
      toggleAppMode(AppMode.focus);
    }
  };

  // TODO: Add other modes later on (only timer, only todos and both)
  // useKeyboardShortcut(KEYS.F, handleAppModeChange);

  useEffect(() => {
    setLocalStorageItem(LS_APP_MODE, appMode);
  }, [appMode]);

  if (appMode === AppMode.focus) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
        <TimerList />
      </div>
    );
  }

  return (
    <main>
      <section className="w-screen h-screen flex justify-center items-center">
        {/* TODO: Add this later */}
        {/* <div className="mt-10 ml-10 flex gap-10">
          <Stack />
        </div> */}
        <div className="flex flex-col gap-10">
          <TimerList />
        </div>
      </section>
    </main>
  );
}

export default App;
