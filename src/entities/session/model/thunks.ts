import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData } from 'src/shared';
import { storage, storageKeys } from 'src/shared/lib/storage';
import { login as apiLogin, logout as apiLogout } from '../api/sessionApi';

export const loginThunk = createAsyncThunk<string, LoginFormData, { rejectValue: string }>(
  'session/login',
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await apiLogin(credentials);
      storage.set(storageKeys.AUTH_TOKEN, response.token);
      return response.token;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'session/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiLogout();
      storage.remove(storageKeys.AUTH_TOKEN);
      return;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
