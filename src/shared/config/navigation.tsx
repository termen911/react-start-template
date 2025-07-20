export const navigationConfig = [
  {
    label: 'navigation.profile',
    path: '/profile',
    replace: true,
  },
  {
    label: 'navigation.products',
    path: '/products',
    replace: true,
  },
  {
    label: 'navigation.transactions',
    path: '/transactions',
    replace: true,
  },
] as const;

export type NavigationItem = (typeof navigationConfig)[number];
export type TranslationKey = NavigationItem['label'];
