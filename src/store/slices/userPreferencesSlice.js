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
      const index = state.favourites.findIndex(favourite => favourite.activityId == action.payload.activityId)
      if (index == -1) {
        state.favourites.push(action.payload);
      } else {
        state.favourites.splice(index, 1);
      }
    },
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
  },
});

export const { addUserFavouriteActivity, updateTheme } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
