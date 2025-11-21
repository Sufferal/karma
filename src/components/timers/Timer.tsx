import { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '../common/inputs/Input';
import {
  formatTimer,
  getRandomTimerFinishedMessage,
  getTotalSeconds,
  IntervalId,
  secondsToTimer,
  startTimer,
  stopTimer,
  stringToTimer,
  Timer as TimerType,
  validateTimer,
} from '../../utils/timer';
import useAudio from '../../hooks/useAudio';
import { SOUNDPACK } from '../../assets/audio';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../common/buttons/Button';
import { PRIMARY_SHORTCUTS_TIMER, TimerShortcuts } from '../../constants';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import { ButtonVariants, tailWindColors } from '../../constants/styles';
import { PauseIcon, ResetIcon, ResumeIcon, StartIcon } from '../common/icons';
import useAnimation from '../../hooks/useAnimation';
import { getRandomCompleteMessage } from '../../utils/todo';

type TimerProps = {
  title: string;
  defaultTimer: string;
  shortcuts: TimerShortcuts;
  endSound: string;
};

export const Timer = ({
  title,
  defaultTimer = '10:00',
  shortcuts = PRIMARY_SHORTCUTS_TIMER,
  endSound = SOUNDPACK.sfxMissionComplete,
}: TimerProps) => {
  const [defaultSeconds = 0, defaultMinutes = 0, defaultHours = 0] =
    stringToTimer(defaultTimer);
  const [timer, setTimer] = useState<TimerType>({
    hours: +defaultHours,
    minutes: +defaultMinutes,
    seconds: +defaultSeconds,
  });
  const initialTimerRef = useRef(1);
  const timerIntervalRef = useRef<IntervalId | null>(null);
  const [timerInput, setTimerInput] = useState(defaultTimer);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const { playSound } = useAudio();
  const currentTimerSeconds = getTotalSeconds(
    timer.hours,
    timer.minutes,
    timer.seconds
  );
  const progressRatio = currentTimerSeconds / initialTimerRef.current;
  const hasTimerStarted = !(progressRatio === currentTimerSeconds);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    start: startKey,
    pause: pauseKey,
    reset: resetKey,
    focus: focusKey,
  } = shortcuts;
  const formattedTimer = useMemo(() => formatTimer(timer), [timer]);
  const { triggerFlash } = useAnimation();

  // CSS
  const [currentTimerColor, setCurrentTimerColor] = useState({
    bg: 'bg-slate-900',
    border: 'border-slate-900',
  });
  const styles = getComputedStyle(document.documentElement);
  const backgroundColor = '#fff';
  const accentColor = styles.getPropertyValue('--color-slate-900');
  const iconDimensions = {
    width: '18px',
    height: '18px',
  };

  const revertTimer = (initialTimer: TimerType) => {
    const resumedTimer = secondsToTimer(initialTimerRef.current);
    const currentTimer = initialTimer || resumedTimer;
    setTimer(currentTimer);
    initialTimerRef.current = getTotalSeconds(
      currentTimer.hours,
      currentTimer.minutes,
      currentTimer.seconds
    );
    timerIntervalRef.current = startTimer(
      initialTimerRef.current,
      timer,
      setTimer
    );
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    stopTimer(timerIntervalRef.current);
    const { isValid, errorMsg } = validateTimer(timerInput);

    if (isValid) {
      setError('');
      const [seconds = 0, minutes = 0, hours = 0] = stringToTimer(timerInput);
      setIsTimerPaused(false);
      setTimer({ hours: +hours, minutes: +minutes, seconds: +seconds });
      initialTimerRef.current = getTotalSeconds(+hours, +minutes, +seconds);
      timerIntervalRef.current = startTimer(
        initialTimerRef.current,
        timer,
        setTimer
      );
    } else {
      setError(errorMsg);
    }
  };

  const handleTogglePause = () => {
    if (!isTimerPaused) {
      initialTimerRef.current = getTotalSeconds(
        timer.hours,
        timer.minutes,
        timer.seconds
      );
      stopTimer(timerIntervalRef.current);
    }

    if (isTimerPaused) {
      const resumedTimer = secondsToTimer(initialTimerRef.current);
      setTimer(resumedTimer);
      initialTimerRef.current = getTotalSeconds(
        resumedTimer.hours,
        resumedTimer.minutes,
        resumedTimer.seconds
      );
      timerIntervalRef.current = startTimer(
        initialTimerRef.current,
        timer,
        setTimer
      );
    }

    setIsTimerPaused(prev => !prev);
  };

  const handleReset = () => {
    stopTimer(timerIntervalRef.current);
    setIsTimerPaused(false);
    revertTimer({
      hours: +defaultHours,
      minutes: +defaultMinutes,
      seconds: +defaultSeconds,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerInput(e.target.value);
  };

  useEffect(() => {
    if (!timer.hours && !timer.minutes && !timer.seconds) {
      stopTimer(timerIntervalRef.current);
      playSound(endSound);
      triggerFlash(tailWindColors['blue-600'], getRandomTimerFinishedMessage());
    }
  }, [timer]);

  useEffect(() => {
    return () => stopTimer(timerIntervalRef.current);
  }, []);

  useEffect(() => {
    if (isTimerPaused) {
      setCurrentTimerColor({
        bg: 'bg-yellow-500',
        border: 'border-yellow-500',
      });
    } else {
      setCurrentTimerColor({
        bg: 'bg-slate-900',
        border: 'border-slate-900',
      });
    }
  }, [isTimerPaused]);

  useKeyboardShortcut(focusKey, () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  useKeyboardShortcut(startKey, handleSubmit);
  useKeyboardShortcut(
    pauseKey,
    hasTimerStarted ? handleTogglePause : undefined
  );
  useKeyboardShortcut(resetKey, hasTimerStarted ? handleReset : undefined);

  return (
    <div className="inline-flex flex-col w-96">
      <h2 className="font-semibold text-4xl mb-4 text-center">{title}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          id={uuidv4()}
          value={timerInput}
          onChange={handleChange}
          placeholder="hh:mm:ss"
          error={error}
          required
          autoComplete="off"
        />
      </form>
      <p
        className={`mt-5 ${currentTimerColor.bg} text-white px-2 py-1 rounded-md text-center text-3xl rounded-b-none`}
      >
        {formattedTimer}
      </p>
      <div
        className={`w-full bg-stone-50 rounded-md h-8 flex items-center ${currentTimerColor.border} border-2 rounded-t-none`}
      >
        <div
          className={`${currentTimerColor.bg} h-3 rounded-full mx-1 transition-all duration-500`}
          style={{ width: `${(progressRatio * 100).toFixed(2)}%` }}
        ></div>
      </div>
      {!hasTimerStarted && (
        <div className="mt-3">
          <Button
            onClick={e => {
              e.preventDefault();
              handleSubmit();
            }}
            fullWidth
            variant={ButtonVariants.outline}
          >
            <StartIcon width={'20px'} height={'20px'} color={accentColor} />
            Start
          </Button>
        </div>
      )}
      {hasTimerStarted && (
        <div className="mt-2 flex gap-3">
          <Button
            className={`${!isTimerPaused ? 'bg-yellow-500!' : ''}`}
            onClick={handleTogglePause}
            fullWidth
          >
            {isTimerPaused ? (
              <ResumeIcon
                width={iconDimensions.width}
                height={iconDimensions.height}
                color={backgroundColor}
              />
            ) : (
              <PauseIcon
                width={iconDimensions.width}
                height={iconDimensions.height}
                color={backgroundColor}
              />
            )}
            {isTimerPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            onClick={handleReset}
            variant={ButtonVariants.danger}
            fullWidth
          >
            <ResetIcon
              width={iconDimensions.width}
              height={iconDimensions.height}
              color={backgroundColor}
            />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};
