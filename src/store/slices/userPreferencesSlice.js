import { createSlice } from '@reduxjs/toolkit';
import userPrefs from "../../data/userPreferences.json"

const initialState = {
  favourites: userPrefs.favourites,
  assistant: userPrefs.assistant,
  theme: userPrefs.theme
};

const userPreferencesSlice = createSlice({
  name: 'userPreferencesSlice',
  initialState,
  reducers: {
    addUserFavouriteActivity: (state, action) => {
      const isExist = state.favourites.find(favourite => favourite.activityId == action.payload.activityId)
      if (!isExist) {
        state.favourites.push(action.payload);
      }
    },
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
  },
});

export const { addUserFavouriteActivity, updateTheme } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
