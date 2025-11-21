import { motion, AnimatePresence } from 'motion/react';
import { createContext, ReactNode, useCallback, useState } from 'react';

export const AnimationContext = createContext({
  triggerFlash: (color: string, text?: string, duration?: number) => {},
});

type AnimationProviderProps = {
  children: ReactNode;
};

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const [flashColor, setFlashColor] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationText, setAnimationText] = useState('');
  const [animationDurationMS, setAnimationDurationMS] = useState(700);

  const triggerFlash = useCallback(
    (color: string, text?: string, duration?: number) => {
      setFlashColor(color);
      if (text) setAnimationText(text);
      if (duration) setAnimationDurationMS(duration);
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        setFlashColor('');
        setAnimationText('');
      }, animationDurationMS);
    },
    [animationDurationMS]
  );

  return (
    <AnimationContext.Provider value={{ triggerFlash }}>
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            key={animationDurationMS}
            initial={{ opacity: 0, backgroundColor: flashColor }}
            animate={{
              opacity: [0, 1, 1, 0],
              backgroundColor: [flashColor, '#000000', flashColor],
            }}
            transition={{
              duration: animationDurationMS / 1000,
              ease: 'easeIn',
              times: [0, 0.2, 0.7, 1],
            }}
            className={`w-screen h-screen text-white flex justify-center items-center text-7xl`}
          >
            {animationText && <h1>{animationText}</h1>}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </AnimationContext.Provider>
  );
};
