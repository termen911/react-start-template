import type { RootState } from 'src/app/store';

export const selectSessionToken = (state: RootState) => state.session.token;
export const selectSessionIsAuthenticated = (state: RootState) => !!state.session.token;
export const selectSessionIsInitialized = (state: RootState) => state.session.isInitialized;
export const selectSessionError = (state: RootState) => state.session.error;
export const selectSessionLastRedirect = (state: RootState) => state.session.lastRedirect;
