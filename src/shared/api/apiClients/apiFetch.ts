import { storage, storageKeys } from 'src/shared/lib/storage';
import { ErrorCode, ServerErrors } from '../types/error';

const getAuthToken = () => storage.get(storageKeys.AUTH_TOKEN);

const createApiHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const apiFetch = async <R>(endpoint: string, options: RequestInit = {}): Promise<R> => {
  const url = `https://19429ba06ff2.vps.myjino.ru/api${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      ...createApiHeaders(),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (response.status === 404) {
    throw {
      errors: [
        {
          extensions: {
            code: ErrorCode.ERR_NOT_FOUND,
          },
          name: 'Not Found',
          stack: 'Not Found',
          message: 'Not Found',
        },
      ],
    } as unknown as ServerErrors;
  }

  const data = await response.json();

  if (response.status === 401) {
    storage.remove(storageKeys.AUTH_TOKEN);
  }

  if (response.status >= 400) {
    throw data as unknown as ServerErrors;
  }

  return data;
};

export const GET = <R>(endpoint: string): Promise<R> => apiFetch(endpoint, { method: 'GET' });
export const POST = <T, R>(endpoint: string, data?: T): Promise<R> =>
  apiFetch(endpoint, { method: 'POST', body: JSON.stringify(data) });
export const PUT = <T, R>(endpoint: string, data?: T): Promise<R> =>
  apiFetch(endpoint, { method: 'PUT', body: JSON.stringify(data) });
export const PATCH = <T, R>(endpoint: string, data?: T): Promise<R> =>
  apiFetch(endpoint, { method: 'PATCH', body: JSON.stringify(data) });
export const DELETE = <R>(endpoint: string): Promise<R> => apiFetch(endpoint, { method: 'DELETE' });
