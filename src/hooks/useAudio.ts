import { useContext } from 'react';
import { AudioContext } from '../store/AudioContext';

function useAudio() {
  return useContext(AudioContext);
}

export default useAudio;
