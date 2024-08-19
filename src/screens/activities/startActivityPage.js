import { AppState } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Alert, Box, Center, Heading, HStack, IconButton, Image, PresenceTransition, Progress, ScrollView, Text, View, VStack } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import BackgroundService from 'react-native-background-actions';

import audioManagerService from "../../services/soundManagerService";
import log from "../../config/logger";
import playerConstants from "../../constants/playerConstants";
import conversionUtils from "../../utils/conversionUtils";
import navigationconstants from "../../constants/navigationConstants";
import notifications from "../../config/notification";
import activitiesService from "../../services/activitiesService";

import userPreferenceSettings from "../../data/userPreferences.json"
import notificationData from "../../data/notificationData.json"

import mic from "../../resources/mic.png";
import pause from "../../resources/pause.png";

const StartActivityPage = ({ route }) => {
    const navigation = useNavigation();
    const { id, activityName, image, description } = route.params;
    const userPreferences = useSelector((state) => state.userPreferences);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerState, setPlayerState] = useState(playerConstants.PLAYER_STATES.playing)
    const [sound, setSound] = useState(null);
    const [scheduleList, setScheduleList] = useState([])
    const [appState, setAppState] = useState(AppState.currentState);
    const [showPauseAlert, setShowPauseAlert] = useState(false);
    const playerStateRef = useRef(playerState);
    const currentTrack = useRef(0);
    const currentSchedule = useRef(0);
    const currentQuotes = useRef([]);
    const currentVoice = useRef(userPreferences.assistant);
    const secondsToPlayNextQuote = useRef(0);
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

    const ShowPauseAlert = async () => {
        setShowPauseAlert(true);
        setTimeout(() => {
            setShowPauseAlert(false);
        }, 5000);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
            setShowPauseAlert(false);
            await handleStop();
        });
        return () => {
            unsubscribe();
        };
    }, [navigation]);


    const handleStart = () => {
        setNotificationTrigger();
        setPlayerState(playerConstants.PLAYER_STATES.playing)
        currentTrack.current = 0;
        secondsToPlayNextQuote.current = 0;
    }

    const handleStop = async () => {
        setPlayerState(playerConstants.PLAYER_STATES.stopped)
        await stopPlaying();
        setSound(null);
        currentTrack.current = 0;
        secondsToPlayNextQuote.current = 0;
        setTimer(0);
    }

    const handlePauseResume = async () => {
        setPlayerState(playerConstants.PLAYER_STATES.paused)
        await stopPlaying();

    };

    const handleNavigate = async () => {
        navigation.navigate(navigationconstants.PAGES.pause, { id, activityName, image, description, timer })
        handlePauseResume();
        setShowPauseAlert(false);
    }

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

    const stopPlaying = async () => {
        await BackgroundService.stop();
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
        if (scheduleList && scheduleList.length > 0) {
            currentQuotes.current = (scheduleList[currentSchedule.current]?.quoates)
        }
    }, [scheduleList])

    useFocusEffect(
        useCallback(() => {
            fetchDetailedActivityData(id);
            handleStart();
        }, [id])
    )

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

    const options = {
        taskName: 'NRG Remix',
        taskTitle: 'NRG Remix',
        taskDesc: `You are running NRG Remix app`,
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#6B46C1',
        parameters: {
            delay: 1000,
        },
    };

    // background process to play quotes
    const backgroundProcess = async () => {
        while (true) {
            if (playerStateRef.current != playerConstants.PLAYER_STATES.playing) {
                break;
            }
            await sleep(1000);
            try {
                if (secondsToPlayNextQuote.current > currentQuotes.current[currentTrack.current]?.gap) {
                    const nextTrack = handleNextTrack()
                    currentTrack.current = nextTrack;
                    playAudio(currentQuotes.current[currentTrack.current]?.voiceFiles[currentVoice.current]);
                    secondsToPlayNextQuote.current = 0;
                }
                setTimer((prevSeconds) => prevSeconds + 1);
                secondsToPlayNextQuote.current = secondsToPlayNextQuote.current + 1;
            } catch (err) {
                log.error("error in background timer")
            }
        }
    }


    useEffect(() => {
        const startBackgroundService = async () => {
            try {
                await BackgroundService.start(backgroundProcess, options);
            } catch (error) {
                log.error('Error starting background service:', error);
            }
        };

        const stopBackgroundService = async () => {
            try {
                await BackgroundService.stop();
            } catch (error) {
                log.error('Error stopping background service:', error);
            }
        };

        if (playerState === playerConstants.PLAYER_STATES.playing) {
            startBackgroundService();
            playerStateRef.current = playerConstants.PLAYER_STATES.playing;
        } else {
            stopBackgroundService();
            playerStateRef.current = playerConstants.PLAYER_STATES.stopped;
        }

        return () => {
            stopBackgroundService();
        };
    }, [playerState]);


    return (

        <View style={{ flex: 1 }} bg="yellow.400" >
            <ScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <Center padding={10}>
                    <VStack space={5} alignItems="center">
                        <HStack space={"48"} justifyContent="space-between" alignItems="center" mt="3">
                            <Text fontSize="xl" textAlign="center"  >- -{`\n`}BPM</Text>
                            <Text fontSize="xl" textAlign="center"  >- -{`\n`}Km</Text>
                        </HStack>
                        <Box mt="24" alignItems="center">
                            <Heading fontSize="7xl" mb="2">{conversionUtils.formatTime(timer)}</Heading >
                            <Progress
                                width="72"
                                value={timer}
                                _filledTrack={{ bgColor: "black.800" }}
                                bgColor="black.100"
                                size="sm"
                            />
                            <HStack space={6} justifyContent="space-between" alignItems="center" mt={1}>
                                <Text fontSize="xs" textAlign="center">0 km</Text>
                                <Text fontSize="xs" textAlign="center">1 km</Text>
                                <Text fontSize="xs" textAlign="center">2 km</Text>
                                <Text fontSize="xs" textAlign="center">3 km</Text>
                                <Text fontSize="xs" textAlign="center">4 km</Text>
                                <Text fontSize="xs" textAlign="center">5 km</Text>
                            </HStack>
                        </Box>


                        <VStack space={5} alignItems="center" mt="20">
                            <HStack justifyContent="space-between" alignItems="center">
                                <Box flex={1} />
                                <IconButton
                                    mt={20}
                                    _icon={{
                                        as: () => (
                                            <Image
                                                source={mic}
                                                alt="Custom Icon"
                                                size="6"
                                            />
                                        ),
                                    }}
                                    bgColor="black.100"
                                    size="16"
                                    width="16"
                                    rounded="full"
                                    onPress={() => navigation.navigate(navigationconstants.PAGES.pause, { id, activityName, image, description })}
                                    _text={{ fontSize: '4xl' }}
                                />

                                <Box flex={1} />

                                <VStack space={5}>
                                    <PresenceTransition
                                        visible={showPauseAlert}
                                        initial={{
                                            opacity: 0,
                                            scale: 0
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                                duration: 250
                                            }
                                        }}
                                    >
                                        <Center w="100%" mt="1">
                                            <Alert bgColor="black.50" justifyContent="center" w="100%" borderRadius={25} p={4}>
                                                <Text fontSize="sm" textAlign="center">Hold to pause</Text>
                                            </Alert>
                                        </Center>
                                    </PresenceTransition>
                                    <IconButton
                                        onLongPress={handleNavigate}
                                        onPress={ShowPauseAlert}
                                        _icon={
                                            <Image
                                                source={pause}
                                                alt="Custom Icon"
                                                size="20"
                                            />
                                        }
                                        bgColor="black.800"
                                        size="32"
                                        width="32"
                                        rounded="full"
                                        _text={{ fontSize: '4xl' }}
                                        _pressed={{ bgColor: "black.800" }}

                                    />
                                </VStack>
                                <Box flex={4} />
                            </HStack>
                        </VStack>
                    </VStack>
                </Center>
            </ScrollView>
        </View>
    );
};

export default StartActivityPage;
