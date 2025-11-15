import { HOUR_TO_SEC, MIN_TO_SEC } from '../constants';

export type Timer = {
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export const validateTimer = (
  timerInput: string = '',
  delimiter: string = ':'
) => {
  if (typeof timerInput !== 'string')
    return { isValid: false, errorMsg: 'The value must be a string.' };

  const timerRegex = /^[0-9:]+$/g;
  if (!timerRegex.test(timerInput))
    return {
      isValid: false,
      errorMsg: 'It must contain only numbers and colon :',
    };

  const time = timerInput.split(delimiter);
  if (!time.length || time.length > 3) {
    return {
      isValid: false,
      errorMsg: 'Only 3 values are allowed (hh:mm:ss)',
    };
  }
  const invalidTimes = time?.filter(el => Number(el) >= 60);
  if (invalidTimes.length) {
    return {
      isValid: false,
      errorMsg: 'The values must be lower than 60',
    };
  }
  const allZeros = time?.every(el => Number(el) === 0);
  if (allZeros) {
    return {
      isValid: false,
      errorMsg: 'Cannot set the timer to 0 seconds',
    };
  }

  return { isValid: true, message: 'Timer is valid' };
};

const getRandomTimerFinishedMessage = () => {
  const messages = [
    'YEET',
    'bruh, the grind stops here',
    'big oof',
    'vibing time',
    'ok boomer',
    'time to rest fr fr',
    'nap incoming',
    "sheesh, timer's done",
    'chill mode',
    'rest time',
    'no cap, take a breather',
    'skrrt skrrt, exit grind',
    'fr fr',
    'no cap, relax',
    'mood: chill vibes',
    "sus? nah, it's chill time",
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

export const formatTimer = (timer: Timer = {}) => {
  if (!Object.keys(timer).length) {
    throw new Error('Cannot display an empty timer');
  }

  const paddedHours = String(timer.hours).padStart(2, '0');
  const paddedMinutes = String(timer.minutes).padStart(2, '0');
  const paddedSeconds = String(timer.seconds).padStart(2, '0');

  if (!timer.hours && !timer.minutes && !timer.seconds) {
    return getRandomTimerFinishedMessage();
  }

  if (!timer.hours && !timer.minutes) {
    return `${paddedSeconds}`;
  }

  if (!timer.hours) {
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

export const secondsToTimer = (seconds: number) => {
  return {
    hours: Math.floor(seconds / HOUR_TO_SEC),
    minutes: Math.floor((seconds % HOUR_TO_SEC) / 60),
    seconds: seconds % 60,
  };
};

export const stringToTimer = (str: string = '') => {
  if (typeof str !== 'string' || !str.length) return '';
  const parts = str.split(':').map(Number);
  // Array destructuring then pulls the values from the reversed array.
  // If a value doesn't exist at a certain position (e.g., no hours part),
  // it automatically uses the default value you provided (= 0).
  return parts.reverse();
};

export const getTotalSeconds = (
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
) => {
  return hours * HOUR_TO_SEC + minutes * MIN_TO_SEC + seconds;
};

export const getNextTickTimer = (timer: Timer = {}) => {
  if (!timer) {
    throw new Error('Cannot start an empty timer');
  }

  if (
    timer.hours !== undefined &&
    timer.hours > 0 &&
    !timer.seconds &&
    !timer.seconds
  ) {
    return {
      hours: timer.hours - 1,
      minutes: 59,
      seconds: 59,
    };
  }

  if (timer.minutes !== undefined && timer.minutes > 0 && !timer.seconds) {
    return {
      ...timer,
      minutes: timer.minutes - 1,
      seconds: 59,
    };
  }

  if (timer.seconds !== undefined) {
    return {
      ...timer,
      seconds: timer.seconds - 1,
    };
  }
};

export const startTimer = (
  initialSeconds: number = 0,
  timer: Timer = {},
  setTimer: React.Dispatch<React.SetStateAction<Timer>>
) => {
  if (!timer) {
    throw new Error('Cannot start an empty timer');
  }

  const endTime = Date.now() + initialSeconds * 1000 + 1000;

  const intervalId = setInterval(() => {
    const now = Date.now();
    const remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));
    setTimer(secondsToTimer(remainingSeconds));
  }, 500);

  return intervalId;
};

export type IntervalId = ReturnType<typeof setInterval>;
export const stopTimer = (timerId: IntervalId | null) => {
  if (timerId) {
    clearInterval(timerId);
  }
};
