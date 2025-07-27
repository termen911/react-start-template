import { storage, storageKeys } from 'src/shared/lib/storage';

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

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `https://19429ba06ff2.vps.myjino.ru/api${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      ...createApiHeaders(),
      ...options.headers,
    },
  };

  return await fetch(url, config);
};

export const GET = (endpoint: string): Promise<Response> => apiFetch(endpoint, { method: 'GET' });
export const POST = <T>(endpoint: string, data?: T): Promise<Response> =>
  apiFetch(endpoint, { method: 'POST', body: JSON.stringify(data) });
export const PUT = <T>(endpoint: string, data?: T): Promise<Response> =>
  apiFetch(endpoint, { method: 'PUT', body: JSON.stringify(data) });
export const DELETE = (endpoint: string): Promise<Response> => apiFetch(endpoint, { method: 'DELETE' });
