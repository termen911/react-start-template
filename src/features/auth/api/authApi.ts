import { POST } from 'src/shared/api/apiClients/apiFetch';
import { SigninDto, SigninResponse, SignupDto, SignupResponse } from '../model/types';

export const signup = async (data: SignupDto): Promise<SignupResponse> => {
  return await POST<SignupDto, SignupResponse>('/signup', data);
};

export const signin = async (data: SigninDto): Promise<SigninResponse> => {
  return await POST<SigninDto, SigninResponse>('/signin', data);
};
