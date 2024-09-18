import Sound from 'react-native-sound';
import audioFocusService from './audioFocusService';

import log from '../config/logger';

const activeSounds = [];

const playSound = async (audio, setSound) => {
  try {
    await audioFocusService.requestAudioFocus();
    let isSuccess = false;
    Sound.setCategory('Playback', true);

    const newSound = new Sound(audio, Sound.MAIN_BUNDLE, error => {
      if (error) {
        log.error('Failed to load the sound', error);
        audioFocusService.abandonAudioFocus();
      } else {
        newSound.play(success => {
          if (success) {
            audioFocusService.abandonAudioFocus();
            isSuccess = true;
          } else {
            log.error('Failed to play the sound');
            audioFocusService.abandonAudioFocus();
          }
        });
      }
    });
    activeSounds.push(newSound);
    newSound.release();
    setSound(newSound);
    return isSuccess;
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

const clearAllSounds = () => {
  activeSounds.forEach((sound) => {
    sound.stop(() => {
      sound.release();
    });
  });
  log.info("All quote queue cleared from sound manager")
  activeSounds.length = 0;
};


const audioManagerService = {
  playSound,
  stopSound,
  clearAllSounds
};

export default audioManagerService;
