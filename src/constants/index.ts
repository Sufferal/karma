export const LS_APP_MODE = 'appMode';
export const LS_TODOS = 'todos';

export const UNCHECKED = 'Uncheck';
export const COMPLETED = 'Complete';

export const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
export const NUMBER_SPECIAL_KEYS = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
];
export const KEYS = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => {
    const char = String.fromCharCode(65 + i); // 'A' to 'Z'
    return [char, char.toLowerCase()];
  })
);
export const SPECIAL_KEYS = {
  SEMICOLON: ';',
};

export type TimerShortcuts = {
  start: string;
  pause: string;
  reset: string;
  focus: string;
};
export const PRIMARY_SHORTCUTS_TIMER: TimerShortcuts = {
  start: KEYS.K,
  pause: KEYS.J,
  reset: KEYS.L,
  focus: SPECIAL_KEYS.SEMICOLON,
};
export const SECONDARY_SHORTCUTS_TIMER: TimerShortcuts = {
  start: KEYS.I,
  pause: KEYS.U,
  reset: KEYS.O,
  focus: KEYS.P,
};

export const KEY_DOWN = 'keydown';
export const BLOCKED_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

export const HOUR_TO_SEC = 3600;
export const MIN_TO_SEC = 60;
