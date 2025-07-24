import { Profile } from 'src/shared';
import { baseApi } from 'src/shared/api/apiClients/baseApi';

export const fetchProfile = async (): Promise<Profile> => {
  const response = await baseApi.get<Profile>('/profile');
  return response.data;
};
