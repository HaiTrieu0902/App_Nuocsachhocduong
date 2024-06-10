/* eslint-disable @typescript-eslint/no-unused-vars */
import { AsyncThunk, createSlice } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setAuthToken } = authSlice.actions;

export default authSlice.reducer;
