export const navigationConfig = [
  {
    label: 'navigation.transactions' as const,
    path: '/transactions',
    replace: true,
  },
] as const;

export type NavigationItem = (typeof navigationConfig)[number];
