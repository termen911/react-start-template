import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ServerErrors } from 'src/shared/api/types/error';
import { storage, storageKeys } from 'src/shared/lib/storage';
import { loginThunk, logoutThunk, signupThunk } from './thunks';
import type { SessionState } from './types';

const initialState: SessionState = {
  token: storage.get(storageKeys.AUTH_TOKEN),
  isInitialized: false,
  user: null,
  status: 'idle',
  error: null,
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
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setLastRedirect: (state, action: PayloadAction<string | null>) => {
      state.lastRedirect = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        storage.set(storageKeys.AUTH_TOKEN, action.payload);
        state.status = 'fulfilled';
      })
      .addCase(loginThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'rejected';
        // state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
        storage.remove(storageKeys.AUTH_TOKEN);
        state.status = 'fulfilled';
      })
      .addCase(logoutThunk.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'rejected';
        // state.error = action.payload;
      })
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        storage.set(storageKeys.AUTH_TOKEN, action.payload);
        state.status = 'fulfilled';
      })
      .addCase(signupThunk.rejected, (state, action: PayloadAction<ServerErrors>) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { setInitialized, setToken, setLastRedirect } = sessionSlice.actions;
export default sessionSlice.reducer;
