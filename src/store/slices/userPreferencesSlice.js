import { createSlice } from '@reduxjs/toolkit';
import userPrefs from "../../data/userPreferences.json"

const initialState = {
  favourites: null,
  favouriteIds: [],
  assistant: "MALE",
  theme: userPrefs.theme,
  id: null,
};

const userPreferencesSlice = createSlice({
  name: 'userPreferencesSlice',
  initialState,
  reducers: {
    addUserFavouriteActivity: (state, action) => {
      const index = state.favouriteIds.findIndex(favourite => favourite == action.payload)
      if (index == -1) {
        state.favouriteIds.push(action.payload);
      } else {
        state.favouriteIds.splice(index, 1);
      }
    },
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
    setPreferences: (state, action) => {
      state.favourites = action.payload?.favoriteActivities || []
      state.favouriteIds = action.payload?.favoriteActivities?.map(item => item.id) || []
      state.assistant = action.payload?.voice
      state.id = action.payload?.id
    },
    setAssistantVoice: (state, action) => {
      state.assistant = action.payload

    },
  },
});


export const { addUserFavouriteActivity, updateTheme, setPreferences, setAssistantVoice } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
