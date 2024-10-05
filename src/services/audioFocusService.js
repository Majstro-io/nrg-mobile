import {NativeModules} from 'react-native';
import log from '../config/logger';

const {AudioFocusManager} = NativeModules;

const requestAudioFocus = () => {
  return new Promise((resolve, reject) => {
    AudioFocusManager.requestAudioFocus()
      .then(granted => {
        if (granted) {
          log.debug('Audio focus granted');
          resolve();
        } else {
          log.error('Failed to gain audio focus');
          reject(new Error('Failed to gain audio focus'));
        }
      })
      .catch(error => {
        log.error('Error requesting audio focus:', error);
      });
  });
};

const abandonAudioFocus = () => {
  return new Promise((resolve, reject) => {
    AudioFocusManager.abandonAudioFocus()
      .then(granted => {
        if (granted) {
          log.debug('Audio focus abandoned');
          resolve();
        } else {
          log.error('Failed to abandon audio focus');
          reject(new Error('Failed to abandon audio focus'));
        }
      })
      .catch(error => {
        log.error('Error abandoning audio focus:', error);
      });
  });
};

const audioFocusService = {
  requestAudioFocus,
  abandonAudioFocus,
};

export default audioFocusService;
