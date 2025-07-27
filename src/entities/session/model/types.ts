import { Profile, SliceStatus } from 'src/shared';
import { ServerErrors } from 'src/shared/api/types/error';

export interface LoginResponse {
  token: string;
}

export interface SessionState {
  token: string | null;
  isInitialized: boolean;
  user: Profile | null;
  lastRedirect: string | null;
  status: SliceStatus;
  error: ServerErrors | null;
}
