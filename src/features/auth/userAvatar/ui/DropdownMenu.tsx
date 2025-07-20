import { Dropdown, theme, Typography, type MenuProps } from 'antd';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppTranslation } from 'src/app/providers/i18n';
import { avatarDropdownNavigationConfig } from 'src/shared/config/avatarDropdownNavigation';

type DropdownMenuProps = {
  children: React.ReactNode;
};

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { t } = useAppTranslation();
  const { token } = theme.useToken();
  const location = useLocation();

  const items: MenuProps['items'] = avatarDropdownNavigationConfig.map((item) => ({
    key: item.path,
    label: (
      <NavLink to={item.path}>
        <Typography.Text
          style={{
            color: location.pathname === item.path ? token.colorPrimary : 'inherit',
          }}
        >
          {t(item.label)}
        </Typography.Text>
      </NavLink>
    ),
    disabled: item.disabled ?? false,
  }));

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']}>
      {children}
    </Dropdown>
  );
};
