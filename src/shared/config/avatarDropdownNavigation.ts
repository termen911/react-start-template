export const avatarDropdownNavigationConfig = [
  {
    label: 'navigation.profile' as const,
    path: '/profile',
    replace: true,
    disabled: false,
    isLogout: false,
  },
  {
    label: 'navigation.logout' as const,
    path: '/',
    replace: true,
    disabled: false,
    isLogout: true,
  },
] as const;

export type AvatarDropdownNavigationItem = (typeof avatarDropdownNavigationConfig)[number];
