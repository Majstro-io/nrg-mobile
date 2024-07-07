import { createSlice } from '@reduxjs/toolkit';
import userPrefs from "../../data/userPreferences.json"

const initialState = {
  favourites: userPrefs.favourites,
  assistant: userPrefs.assistant
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
  },
});

export const { addUserFavouriteActivity } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
