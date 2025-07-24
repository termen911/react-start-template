import type { RootState } from 'src/app/store';
import { UserRole } from 'src/shared';

export const selectProfileUser = (state: RootState) => state.profile.user;
export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectProfileIsAdmin = (state: RootState) => state.profile?.user?.role === UserRole.ADMIN;
