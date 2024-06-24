import React, {useEffect, useState} from 'react';
import {View, Button, BackHandler} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import log from '../config/logger';
import audioManagerService from '../services/soundManagerService';
import playerConstants from '../constants/playerConstants';

const AudioPlayerComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const playAudio = async () => {
    try {
      const soundPath =
        'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg';
      await audioManagerService.playSound(soundPath, setSound);
    } catch (error) {
      log.error('Error requesting audio focus:', error);
    }
  };

  const stopPlaying = () => {
    BackgroundTimer.stopBackgroundTimer();
    setIsPlaying(false);
    audioManagerService.stopSound(sound, setSound);
  };

  const startPlaying = () => {
    setIsPlaying(true);
    BackHandler.exitApp();
  };

  useEffect(() => {
    if (isPlaying) {
      BackgroundTimer.runBackgroundTimer(() => {
        playAudio();
      }, playerConstants.AUDIO_PLAY_INTERVAL);
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isPlaying]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Start" onPress={startPlaying} />
      <Button title="Stop" onPress={stopPlaying} />
    </View>
  );
};

export default AudioPlayerComponent;
