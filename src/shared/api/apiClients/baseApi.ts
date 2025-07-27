import axios from 'axios';
import { storage, storageKeys } from 'src/shared/lib/storage';

export const baseApi = axios.create({
  baseURL: 'http://19429ba06ff2.vps.myjino.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

baseApi.interceptors.request.use((config) => {
  const token = storage.get(storageKeys.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});
