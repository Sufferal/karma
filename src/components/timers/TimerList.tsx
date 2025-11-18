import { SOUNDPACK } from '../../assets/audio';
import {
  PRIMARY_SHORTCUTS_TIMER,
  SECONDARY_SHORTCUTS_TIMER,
} from '../../constants';
import { Timer } from './Timer';

export const TimerList = () => {
  return (
    <>
      <Timer
        title="Work"
        defaultTimer="50:00"
        shortcuts={PRIMARY_SHORTCUTS_TIMER}
        endSound={SOUNDPACK.sfxMissionComplete}
      />
      <Timer
        title="Eye break"
        defaultTimer="25:00"
        shortcuts={SECONDARY_SHORTCUTS_TIMER}
        endSound={SOUNDPACK.sfxAmongUsReveal}
      />
    </>
  );
};
