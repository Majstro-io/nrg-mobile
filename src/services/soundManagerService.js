import Sound from 'react-native-sound';
import audioFocusService from './audioFocusService';

import log from '../config/logger';

const playSound = async (audio, setSound) => {
  await audioFocusService.requestAudioFocus();

  Sound.setCategory('Playback', true);

  const newSound = new Sound(audio, Sound.MAIN_BUNDLE, error => {
    if (error) {
      log.error('Failed to load the sound', error);
      return;
    }
    newSound.play(success => {
      if (success) {
        audioFocusService.abandonAudioFocus();
      } else {
        log.error('Failed to play the sound');
      }
    });
  });
  setSound(newSound);
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
