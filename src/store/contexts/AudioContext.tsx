import { createContext, ReactNode, useState } from 'react';

export const AudioContext = createContext({
  playSound: (src: string) => {},
});

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<HTMLAudioElement | null>(null);

  const playSound = (src: string) => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0; // Set the time to the beggining
    }

    const sound = new Audio(src);
    sound.play();

    setCurrentlyPlaying(sound);
  };

  return (
    <AudioContext.Provider value={{ playSound }}>
      {children}
    </AudioContext.Provider>
  );
};
