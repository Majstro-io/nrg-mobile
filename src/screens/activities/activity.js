import { Box, Button, Center, Flex, HStack, Image, Text, View, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import BackgroundTimer from 'react-native-background-timer';

import audioManagerService from "../../services/soundManagerService";
import log from "../../config/logger";
import playerConstants from "../../constants/playerConstants";
import soundData from "../../data/soundData.json"
import conversionUtils from "../../utils/conversionUtils";
import NrgTitleAppBar from "../../components/appbars/nrgTitleAppBar";
import navigationconstants from "../../constants/navigationConstants";
import activitiesStyles from "./activity.styles";


const Activity = ({ route }) => {
    const { id, activityName, image } = route.params;

    const [seconds, setSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [sound, setSound] = useState(null);
    const [audioTracks, setAudioTracks] = useState([])
    const currentTrack = useRef(0);

    const handleStartStop = () => {
        if (!isRunning) {
            setIsRunning(true)
        } else {
            stopPlaying();
            setIsRunning(false);
            setSound(null);
            currentTrack.current = 0;
            setSeconds(0);
        }
    };

    const handlePauseResume = () => {
        if (!isRunning) {
            setIsRunning(true)
        } else {
            stopPlaying();
        }
        setIsRunning(!isRunning);
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
    };

    const fetchActivityData = () => {
        const audioData = soundData.content.find(data => data.activityId == id)
        setAudioTracks(audioData.media)
    }

    useEffect(() => {
        fetchActivityData();
    }, [id])

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    useEffect(() => {
        if (isRunning) {
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
    }, [isRunning]);

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
                        <Text fontSize="6xl">{conversionUtils.formatTime(seconds)}</Text>
                    </Box>
                    <Button
                        size="lg"
                        rounded="full"
                        onPress={handleStartStop}
                        _text={{ fontSize: '4xl' }}
                    >
                        {isRunning ? "Stop" : "Start"}
                    </Button>
                    <Button
                        size="sm"
                        rounded="full"
                        onPress={handlePauseResume}
                        _text={{ fontSize: '2xl' }}
                        isDisabled={!isRunning}
                    >
                        Pause
                    </Button>
                </VStack>
            </Center>
        </View>
    );
};

export default Activity;
