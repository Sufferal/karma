import { useContext } from 'react';
import { AnimationContext } from '../store/contexts/AnimationContext';

function useAnimation() {
  return useContext(AnimationContext);
}

export default useAnimation;
