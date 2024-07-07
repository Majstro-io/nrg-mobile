import { configureStore } from '@reduxjs/toolkit';
import userPreferencesSlice from './slices/userPreferencesSlice'; 

const store = configureStore({
    reducer: {
        userPreferences: userPreferencesSlice,
    },
});

export default store;
