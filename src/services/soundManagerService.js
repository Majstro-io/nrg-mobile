import Sound from 'react-native-sound';
import audioFocusService from './audioFocusService';

import log from '../config/logger';

const playSound = async (audio, setSound) => {
  try {
    await audioFocusService.requestAudioFocus();

    Sound.setCategory('Playback', true);

    const newSound = new Sound(audio, Sound.MAIN_BUNDLE, error => {
      if (error) {
        log.error('Failed to load the sound', error);
        audioFocusService.abandonAudioFocus();
        throw error
      }
      newSound.play(success => {
        if (success) {
          audioFocusService.abandonAudioFocus();
        } else {
          log.error('Failed to play the sound');
          audioFocusService.abandonAudioFocus();
        }
      });
    });
    newSound.release();
    setSound(newSound);
  } catch (error) {
    log.error("Error in playing sound", error);
    throw error;
  }

};

const stopSound = (sound, setSound) => {
  audioFocusService.abandonAudioFocus();
  if (sound) {
    sound.stop(() => {
      sound.release();
      setSound(null);
    });
  }
};

const audioManagerService = {
  playSound,
  stopSound,
};

export default audioManagerService;
