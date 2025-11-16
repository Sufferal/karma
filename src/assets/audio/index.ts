// Amogus
import amongUsReveal from './amogus/among_us_reveal.mp3';

// Brain rot
import alarm from './brainrot/alarm.mp3';
import patapim from './brainrot/brrr-brrr-patapim.mp3';
import hotlineBling from './brainrot/hotline_bling.mp3';

// Dota
import firstBlood from './dota/01_firstblood.mp3';
import doubleKill from './dota/02_doublekill.mp3';
import killingSpree from './dota/03_killingspree.mp3';
import tripleKill from './dota/04_triplekill.mp3';
import megaKill from './dota/05_megakill.mp3';
import ultraKill from './dota/06_ultrakill.mp3';
import ownage from './dota/07_ownage.mp3';
import dominating from './dota/08_dominating.mp3';
import unstoppable from './dota/09_unstoppable.mp3';
import wickedSick from './dota/10_wickedsick.mp3';
import monsterKill from './dota/11_monsterkill.mp3';
import godLike from './dota/12_godlike.mp3';
import holyShit from './dota/13_holyshit.mp3';
import rampage from './dota/14_rampage.mp3';
import axeUlt from './dota/axe_attacks.mp3';

// Hollow Knight
import hollowKnightWah from './hollow_knight/HK_wah_mushroom.mp3';

// Sekiro
import sekiroChill from './sekiro/sekiro_chill.mp3';
import sekiroDeathblow from './sekiro/sekiro_deathblow.mp3';

// Random SFX
import churchBell from './sfx/church_bell.mp3';
import ding from './sfx/ding.mp3';
import missionComplete from './sfx/mission_complete.mp3';
import romanianSensors from './sfx/romanian_sensors.mp3';
import macTrashSound from './sfx/mac_trash.mp3';

// Songs
import aroundTheWorld from './songs/around_the_world_la_la_la.mp3';
import portalRadio from './songs/portal_radio.mp3';

export const SOUNDPACK = {
  soundEffect1: firstBlood,
  soundEffect2: doubleKill,
  soundEffect3: killingSpree,
  soundEffect4: tripleKill,
  soundEffect5: megaKill,
  soundEffect6: wickedSick,
  soundEffect7: ownage,
  soundEffect8: dominating,
  soundEffect9: unstoppable,
  soundEffect10: monsterKill,
  soundEffect11: ultraKill,
  soundEffect12: godLike,
  soundEffect13: rampage,
  soundEffect14: holyShit,
  sfxMissionComplete: missionComplete,
  sfxDeathblow: sekiroDeathblow,
  sfxChill: sekiroChill,
  sfxAlarm: alarm,
  sfxPatapim: patapim,
  sfxRomanianSensors: romanianSensors,
  sfxDing: ding,
  sfxHotlineBling: hotlineBling,
  sfxChurchBell: churchBell,
  sfxPortalRadio: portalRadio,
  sfxAmongUsReveal: amongUsReveal,
  sfxAxeUlt: axeUlt,
  sfxAroundTheWorld: aroundTheWorld,
  sfxHollowKnightWah: hollowKnightWah,
  sfxMacTrash: macTrashSound,
};

export const SOUNDPACK_LENGTH = Object.keys(SOUNDPACK).length;

// Helper function to get a random sound from SOUNDPACK (excluding timerFinished)
export const getRandomSound = () => {
  const keys = Object.keys(SOUNDPACK).filter(
    (key): key is keyof typeof SOUNDPACK => key !== 'timerFinished'
  );

  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return SOUNDPACK[randomKey];
};

export const getSoundByKey = (key: keyof typeof SOUNDPACK) => {
  return SOUNDPACK[key] || SOUNDPACK.sfxDeathblow;
};
