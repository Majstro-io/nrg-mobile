import userPreferences from "../data/userPreferences.json"

const AUDIO_PLAY_INTERVAL = userPreferences.AudioPlayFrequency;

const PLAYER_STATES = {
  playing: "playing",
  paused: "paused",
  stopped: "stopped"
}

const playerConstants = {
  AUDIO_PLAY_INTERVAL,
  PLAYER_STATES
};

export default playerConstants;
