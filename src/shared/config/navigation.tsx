export const navigationConfig = [
  {
    label: 'Операции',
    path: '/operations',
    replace: true,
  },
] as const;

export type NavigationItem = (typeof navigationConfig)[number];
