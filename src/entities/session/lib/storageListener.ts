import { store } from 'src/app/store';
import { storageKeys } from 'src/shared/lib/storage';
import { setToken } from '../model/slice';

export const initStorageListener = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('storage', (event) => {
    if (event.key === storageKeys.AUTH_TOKEN) {
      if (event.newValue) {
        store.dispatch(setToken(event.newValue));
      } else {
        store.dispatch(setToken(null));
      }
    }
  });
};
