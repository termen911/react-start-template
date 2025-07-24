export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface Profile {
  id: string;
  nickname: string;
  about: string;
  role: UserRole;
}
