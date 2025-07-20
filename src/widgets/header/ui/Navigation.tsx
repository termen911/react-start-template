import { Menu, type MenuProps } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppTranslation } from 'src/app/providers/i18n';
import { navigationConfig, NavigationItem } from 'src/shared/config';

type MenuItem = Required<MenuProps>['items'][number];

export const Navigation = () => {
  const { t } = useAppTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const items: MenuItem[] = navigationConfig.map((item: NavigationItem) => ({
    key: item.path,
    label: t(item.label),
  }));

  const handleClick: MenuProps['onClick'] = (item) => {
    navigate(item.key as string);
  };

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
      items={items}
      style={{ flex: 1, minWidth: 0, borderBottom: 'none' }}
      onClick={handleClick}
    />
  );
};
