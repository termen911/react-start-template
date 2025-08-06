import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'src/shared';
import { storage, storageKeys } from 'src/shared/lib/storage';
import type { SessionState } from './types';

const initialState: SessionState = {
  token: storage.get(storageKeys.AUTH_TOKEN),
  isInitialized: false,
  user: null,
  lastRedirect: null,
};

const sessionSlice = createSlice({
  name: '@@app/session',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        storage.set(storageKeys.AUTH_TOKEN, action.payload);
      } else {
        storage.remove(storageKeys.AUTH_TOKEN);
      }
    },
    setUser: (state, action: PayloadAction<Profile | null>) => {
      state.user = action.payload;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setLastRedirect: (state, action: PayloadAction<string | null>) => {
      state.lastRedirect = action.payload;
    },
  },
});

export const { setInitialized, setToken, setLastRedirect, setUser } = sessionSlice.actions;
export default sessionSlice.reducer;
