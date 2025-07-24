export const storageKeys = {
  AUTH_TOKEN: 'authToken',
} as const;

export const storage = {
  set: (key: string, value: string): void => {
    console.log('storage set', key, value);
    localStorage.setItem(key, value);
  },

  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  remove: (key: string): void => {
    console.log('storage remove', key);
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
