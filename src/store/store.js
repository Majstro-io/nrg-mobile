import { configureStore } from '@reduxjs/toolkit';
import userPreferencesSlice from './slices/userPreferencesSlice'; 
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        userPreferences: userPreferencesSlice,
        userData: userSlice,
    },
});

export default store;
