import { AppState } from "react-native";
import { Box, Button, Center, Flex, HStack, Image, Text, View, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import BackgroundTimer from 'react-native-background-timer';

import audioManagerService from "../../services/soundManagerService";
import log from "../../config/logger";
import playerConstants from "../../constants/playerConstants";
import conversionUtils from "../../utils/conversionUtils";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import notifications from "../../config/notification";
import activitiesService from "../../services/activitiesService";

import userPreferenceSettings from "../../data/userPreferences.json"
import notificationData from "../../data/notificationData.json"

const Activity = ({ route }) => {
    const { id, activityName, image } = route.params;
    const userPreferences = useSelector((state) => state.userPreferences);

    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerState, setPlayerState] = useState(playerConstants.PLAYER_STATES.stopped)
    const [sound, setSound] = useState(null);
    const [scheduleList, setScheduleList] = useState([])

    const [appState, setAppState] = useState(AppState.currentState);

    const currentTrack = useRef(0);
    const currentSchedule = useRef(0);
    const currentQuotes = useRef([]);
    const currentVoice = useRef(userPreferences.assistant);
    const secondsToPlayNextQuote = useRef(0);

    const handleStartStop = () => {
        if (playerState == playerConstants.PLAYER_STATES.stopped) {
            setNotificationTrigger();
            setPlayerState(playerConstants.PLAYER_STATES.playing)
            currentTrack.current = 0;
            secondsToPlayNextQuote.current = 0;
            setTimer(0);
        } else {
            stopPlaying();
            setPlayerState(playerConstants.PLAYER_STATES.stopped)
            setSound(null);
            currentTrack.current = 0;
            secondsToPlayNextQuote.current = 0;
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

    const setNotificationTrigger = () => {
        notifications.setNotification(
            notificationData.remindIdle.title,
            notificationData.remindIdle.message,
            userPreferenceSettings.idleReminderTimeout,
            notificationData.remindIdle.id
        )
    }

    const cancelNotificationTrigger = () => {
        notifications.cancelNotification(notificationData.remindIdle.id)
    }

    const handleNextTrack = () => {
        // check if current quotes has finished playing
        if (currentTrack.current >= currentQuotes.current.length - 1) {
            // check if there is a next schedule, if so play next schedule quotes, else play the first schedule again
            const nextSchedule = currentSchedule.current >= scheduleList.length - 1 ? 0 : currentSchedule.current + 1
            currentSchedule.current = (nextSchedule);
            // set the first quote of the new schedule
            currentQuotes.current = (scheduleList[currentSchedule.current]?.quoates)
            return 0;
        } else {
            // if current quotes list has more quotes, play the next quote
            return currentTrack.current + 1;
        }
    }

    const fetchDetailedActivityData = async (activityId) => {
        activitiesService.getDetailedActivityById(activityId).then(res => {
            setScheduleList(res.data?.schedules)
        }).catch(error => {
            log.error("Failed to fetch all schedules for activity", error)
        })
    }

    useEffect(() => {
        if (scheduleList) {
            currentQuotes.current = (scheduleList[currentSchedule.current]?.quoates)
        }
    }, [scheduleList])

    useEffect(() => {
        fetchDetailedActivityData(id);
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


    // background job which will keep running to play audio at time intervals
    useEffect(() => {
        if (playerState == playerConstants.PLAYER_STATES.playing) {
            BackgroundTimer.runBackgroundTimer(() => {
                // check if specified interval has reached to play the quote, if so proceed
                if (secondsToPlayNextQuote.current > currentQuotes.current[currentTrack.current].gap) {
                    const nextTrack = handleNextTrack()
                    currentTrack.current = nextTrack;
                    playAudio(currentQuotes.current[currentTrack.current].voiceFiles[currentVoice.current]);
                    secondsToPlayNextQuote.current = 0;
                }
                setTimer((prevSeconds) => prevSeconds + 1);
                secondsToPlayNextQuote.current = secondsToPlayNextQuote.current + 1;
            }, 1000);
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
                            height={125}
                            width={125}
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
