import { Profile } from 'src/shared';

export interface LoginResponse {
  token: string;
}

export interface SessionState {
  token: string | null;
  isInitialized: boolean;
  user: Profile | null;
  lastRedirect: string | null;
}
