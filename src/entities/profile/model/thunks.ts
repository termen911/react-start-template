import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from 'src/shared';
import { fetchProfile } from '../api/fetchProfile';

export const fetchProfileThunk = createAsyncThunk<Profile, void, { rejectValue: string }>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProfile();
      return response;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);
