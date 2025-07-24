import { LoginFormData } from 'src/shared';
import { baseApi } from 'src/shared/api/apiClients/baseApi';
import { LoginResponse } from '../model';

export const login = async (credentials: LoginFormData): Promise<LoginResponse> => {
  const response = await baseApi.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await baseApi.post('/auth/logout');
};
