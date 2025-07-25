import { Profile, UserRole } from 'src/shared';

export const fetchProfile = async (): Promise<Profile> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        nickname: 'admin',
        about:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        role: UserRole.ADMIN,
      });
    }, 300);
  });
};
