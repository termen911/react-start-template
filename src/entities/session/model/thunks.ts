import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginFormData, SignupFormData } from 'src/shared';
import { signup } from 'src/shared/api/services/auth.api';
import { ServerErrors } from 'src/shared/api/types/error';
import { UNKNOWN_ERROR_MESSAGE } from 'src/shared/lib/consts/api.consts';
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

export const signupThunk = createAsyncThunk<string, SignupFormData, { rejectValue: ServerErrors }>(
  'session/signup',
  async (credentials: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await signup(credentials);
      if (response.ok) {
        const data = await response.json();
        storage.set(storageKeys.AUTH_TOKEN, data.token);
        return data.token;
      } else {
        const error = await response.json();
        return rejectWithValue(error);
      }
    } catch (error) {
      if (error.toString().includes('Unknown error')) {
        return rejectWithValue({
          errors: [UNKNOWN_ERROR_MESSAGE],
        });
      } else {
        return rejectWithValue(error as ServerErrors);
      }
    }
  }
);
