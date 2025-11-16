import { useContext } from 'react';
import { AudioContext } from '../store/contexts/AudioContext';

function useAudio() {
  return useContext(AudioContext);
}

export default useAudio;
