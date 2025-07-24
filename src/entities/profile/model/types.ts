import { Profile, SliceStatus } from 'src/shared';

export interface ProfileState {
  user: Profile | null;
  status: SliceStatus;
  error: string | null;
}
