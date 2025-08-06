import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { DropdownMenu } from './DropdownMenu';

export const UserAvatarMenu = () => {
  return (
    <DropdownMenu>
      <Avatar size={20} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </DropdownMenu>
  );
};
