import { LoginFormData } from 'src/shared';
import { LoginResponse } from '../model';

export const login = async (credentials: LoginFormData): Promise<LoginResponse> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'admin') {
        if (credentials.password === '123456') {
          resolve({ token: 'fake-jwt-token-admin' });
        } else {
          reject(new Error('Не верный логин или пароль'));
        }
      } else if (credentials.username && credentials.password) {
        resolve({ token: 'fake-jwt-token-user' });
      } else {
        reject(new Error('Не верный логин или пароль'));
      }
    }, 300);
  });
};

export const logout = async (): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};
