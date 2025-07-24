import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'src/shared';
import { fetchProfileThunk } from './thunks';
import { ProfileState } from './types';

const initialState: ProfileState = {
  user: null,
  status: 'idle',
  error: null,
};

const profileSlice = createSlice({
  name: '@@app/session',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.user = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchProfileThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
