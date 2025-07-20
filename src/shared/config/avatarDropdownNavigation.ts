export const avatarDropdownNavigationConfig = [
  {
    label: 'navigation.profile' as const,
    path: '/profile',
    replace: true,
    disabled: false,
  },
  {
    label: 'navigation.logout' as const,
    path: '/logout',
    replace: true,
    disabled: true,
  },
] as const;

export type AvatarDropdownNavigationItem = (typeof avatarDropdownNavigationConfig)[number];
