import type { RootState } from 'src/app/store';

export const selectSessionToken = (state: RootState) => state.session.token;
export const selectSessionIsAuthenticated = (state: RootState) => !!state.session.token;
export const selectSessionIsInitialized = (state: RootState) => state.session.isInitialized;
export const selectSessionLastRedirect = (state: RootState) => state.session.lastRedirect;
export const selectSessionUser = (state: RootState) => state.session.user;
