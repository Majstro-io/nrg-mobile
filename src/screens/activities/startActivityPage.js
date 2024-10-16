import { AppState } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Alert, Box, Center, Heading, HStack, IconButton, Image, PresenceTransition, ScrollView, Text, View, VStack } from "native-base";
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

import muted from "../../resources/playerIcons/muted.png";
import unmuted from "../../resources/playerIcons/unmuted.png";
import pause from "../../resources/playerIcons/pause.png";
import ErrorModal from "../../components/modals/errorModal";

const StartActivityPage = ({ route }) => {
    const navigation = useNavigation();
    const { id, activityName, image, description } = route.params;
    const userPreferences = useSelector((state) => state.userPreferences);

    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerState, setPlayerState] = useState(playerConstants.PLAYER_STATES.stopped)
    const [sound, setSound] = useState(null);
    const [scheduleList, setScheduleList] = useState(null)
    const [appState, setAppState] = useState(AppState.currentState);
    const [showPauseAlert, setShowPauseAlert] = useState(false);
    const [muteIcon, setMuteIcon] = useState(unmuted);

    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    const playerStateRef = useRef(playerState);
    const currentTrack = useRef(0);
    const isMuted = useRef(false);
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

    const handleMute = () => {
        isMuted.current = !isMuted.current;
        if (isMuted.current) {
            setMuteIcon(muted)
        } else {
            setMuteIcon(unmuted)
        }
    }

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
        try {
            if (scheduleList) {
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

        } catch (err) {
            log.error("error in playing next track", err)
            return currentTrack.current;
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
        const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
            setShowPauseAlert(false);
            await handleStop();
        });
        return () => {
            unsubscribe();
        };
    }, [navigation]);

    useEffect(() => {
        if (scheduleList) {
            if (scheduleList.length > 0) {
                currentQuotes.current = (scheduleList[currentSchedule.current]?.quoates)
                handleStart();
            } else {
                setIsErrorModalVisible(true)
            }
        }
    }, [scheduleList])

    useFocusEffect(
        useCallback(() => {
            fetchDetailedActivityData(id);
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
        color: 'yellow.500',
        parameters: {
            delay: 1000,
        },
    };

    // background process to play quotes
    const backgroundProcess = async () => {
        while (true) {
            // if not player state is playing, break the loop and stop the timer
            if (playerStateRef.current != playerConstants.PLAYER_STATES.playing) {
                break;
            }
            // proceed with 1 second interval
            await sleep(1000);
            try {
                if (secondsToPlayNextQuote.current > currentQuotes.current[currentTrack.current]?.gap) {
                    const nextTrack = handleNextTrack()
                    currentTrack.current = nextTrack;
                    if (!isMuted.current) {
                        playAudio(currentQuotes.current[currentTrack.current]?.voiceFiles[currentVoice.current]);
                    }
                    secondsToPlayNextQuote.current = 0;
                }
                setTimer((prevSeconds) => prevSeconds + 1);
                secondsToPlayNextQuote.current = secondsToPlayNextQuote.current + 1;
            } catch (err) {
                log.error("error in background timer", err)
            }
        }
    }


    // handle play, stop and pause through the background service based on the player state
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
            <ErrorModal
                errorDescription={"This Activity do not have any quotes configured"}
                errorTitle={"No Quotes for this Activity"}
                setVisible={setIsErrorModalVisible}
                visible={isErrorModalVisible}
            />

            <ScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            >
                <Center padding={10}>
                    <VStack space={5} alignItems="center">
                        <HStack space={"48"} justifyContent="space-between" alignItems="center" mt="3">
                            {/* Display when BPM and km is tracked */}
                            {/* <Text fontSize="xl" textAlign="center"  >- -{`\n`}BPM</Text> */}
                            {/* <Text fontSize="xl" textAlign="center"  >- -{`\n`}Km</Text> */}
                            <Text fontSize="5xl" textAlign="left"  >{activityName}</Text>
                        </HStack>
                        <Box mt="24" alignItems="center">
                            <Heading fontSize="7xl" mb="2">{conversionUtils.formatTime(timer)}</Heading >
                            {/* display when total time for activity is tracked, TODO: move this to a component */}
                            {/* <Progress
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
                            </HStack> */}
                        </Box>


                        <VStack space={5} alignItems="center" mt="20">
                            <HStack justifyContent="space-between" alignItems="center">
                                <Box flex={1} />
                                <IconButton
                                    mt={20}

                                    _icon={{
                                        as: Image,
                                        source: muteIcon,
                                        alt: "Pause",
                                        size: "8",
                                    }}
                                    bgColor="black.10"
                                    size="16"
                                    width="16"
                                    rounded="full"
                                    onPress={handleMute}
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
                                        onPress={ShowPauseAlert}
                                        onLongPress={handleNavigate}
                                        bgColor="black.800"
                                        size="32"
                                        width="32"
                                        rounded="full"
                                        _text={{ fontSize: '4xl' }}
                                        _pressed={{ bgColor: "black.800" }}
                                        _icon={{
                                            as: Image,
                                            source: pause,
                                            alt: "Pause",
                                            size: "100",
                                        }} />
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
