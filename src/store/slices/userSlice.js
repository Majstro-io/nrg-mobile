import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    },
    updateUserDataField: (state, action) => {
      const { key, value } = action.payload;
      if (state.data && state.data.hasOwnProperty(key)) {
        state.data[key] = value;
      }
    },
  },
});

export const { setUserData, updateUserDataField } = userSlice.actions;
export default userSlice.reducer;
