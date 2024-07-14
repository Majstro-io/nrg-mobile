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
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
