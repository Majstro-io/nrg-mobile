import { Box, Button, Center, Flex, HStack, Image, Text, View, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import BackgroundTimer from 'react-native-background-timer';

import audioManagerService from "../../services/soundManagerService";
import log from "../../config/logger";
import playerConstants from "../../constants/playerConstants";
import conversionUtils from "../../utils/conversionUtils";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import activitiesStyles from "./activity.styles";

import soundData from "../../data/soundData.json"
import userPreferences from "../../data/userPreferences.json"
import notificationData from "../../data/notificationData.json"
import notifications from "../../config/notification";
import { AppState } from "react-native";


const Activity = ({ route }) => {
    const { id, activityName, image } = route.params;

    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerState, setPlayerState] = useState(playerConstants.PLAYER_STATES.stopped)
    const [sound, setSound] = useState(null);
    const [audioTracks, setAudioTracks] = useState([])
    const [appState, setAppState] = useState(AppState.currentState);

    const currentTrack = useRef(0);

    const handleStartStop = () => {
        if (playerState == playerConstants.PLAYER_STATES.stopped) {
            setNotificationTrigger();
            setPlayerState(playerConstants.PLAYER_STATES.playing)
            currentTrack.current = 0;
            setTimer(0);
        } else {
            stopPlaying();
            setPlayerState(playerConstants.PLAYER_STATES.stopped)
            setSound(null);
            currentTrack.current = 0;
            setTimer(0);
        }
    };

    const handlePauseResume = () => {
        if (playerState == playerConstants.PLAYER_STATES.paused) {
            setPlayerState(playerConstants.PLAYER_STATES.playing)
        } else {
            setPlayerState(playerConstants.PLAYER_STATES.paused)
            stopPlaying();
        }
    };

    const playAudio = async (soundPath) => {
        try {
            if (!isPlaying) {
                setIsPlaying(true)
                await audioManagerService.playSound(soundPath, setSound)
                setIsPlaying(false)
            }
        } catch (error) {
            log.error('Error requesting audio focus:', error);
        }
    };

    const stopPlaying = () => {
        BackgroundTimer.stopBackgroundTimer();
        audioManagerService.stopSound(sound, setSound);
        cancelNotificationTrigger();
    };

    const fetchActivityData = () => {
        const audioData = soundData.content.find(data => data.activityId == id)
        setAudioTracks(audioData.media)
    }

    const setNotificationTrigger = () => {
        notifications.setNotification(
            notificationData.remindIdle.title,
            notificationData.remindIdle.message,
            userPreferences.idleReminderTimeout,
            notificationData.remindIdle.id
        )
    }

    const cancelNotificationTrigger = () => {
        notifications.cancelNotification(notificationData.remindIdle.id)
    }

    useEffect(() => {
        fetchActivityData();
    }, [id])

    // handle idle notifications when app is in background and timer is running
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                // app has come to foreground
                //cancel idle notification trigger on stop
                if (playerState == playerConstants.PLAYER_STATES.playing) {
                    cancelNotificationTrigger();
                }

            } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
                //app has gone to the background
                // set notification to prompt to check if user is still using the app at given timeout
                if (playerState == playerConstants.PLAYER_STATES.playing) {
                    setNotificationTrigger();
                }
            }
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [appState]);

    // timer 
    useEffect(() => {
        let interval = null;
        if (playerState == playerConstants.PLAYER_STATES.playing) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (playerState != playerConstants.PLAYER_STATES.playing && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer, playerState]);

    // background job which will keep running to play audio at time intervals
    useEffect(() => {
        if (playerState == playerConstants.PLAYER_STATES.playing) {
            BackgroundTimer.runBackgroundTimer(() => {
                const nextTrack = currentTrack.current >= audioTracks.length - 1 ? 0 : currentTrack.current + 1
                currentTrack.current = nextTrack;
                playAudio(audioTracks[currentTrack.current]);
            }, playerConstants.AUDIO_PLAY_INTERVAL);
        } else {
            BackgroundTimer.stopBackgroundTimer();
        }
        return () => {
            BackgroundTimer.stopBackgroundTimer();
        };
    }, [playerState]);

    return (

        <View style={{ flex: 1 }}>
            <NrgTitleAppBar backNavigateTo={navigationconstants.PAGES.activities} title={activityName} />

            <Center flex={1}>
                <Flex>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Image
                            source={{ uri: image }}
                            alt={`${activityName} Image`}
                            style={activitiesStyles.image}
                        />
                    </HStack>
                </Flex>
                <VStack space={10} alignItems="center">
                    <Box>
                        <Text fontSize="6xl">{conversionUtils.formatTime(timer)}</Text>
                    </Box>
                    <Button
                        size="lg"
                        rounded="full"
                        onPress={handleStartStop}
                        _text={{ fontSize: '4xl' }}
                    >
                        {playerState == playerConstants.PLAYER_STATES.stopped ? "Start" : "Stop"}
                    </Button>
                    <Button
                        size="sm"
                        rounded="full"
                        onPress={handlePauseResume}
                        _text={{ fontSize: '2xl' }}
                        isDisabled={playerState == playerConstants.PLAYER_STATES.stopped}
                    >
                        {playerState == playerConstants.PLAYER_STATES.paused ? "Resume" : "Pause"}
                    </Button>
                </VStack>
            </Center>
        </View>
    );
};

export default Activity;
