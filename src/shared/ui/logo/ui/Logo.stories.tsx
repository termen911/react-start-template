import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Размер логотипа',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  render: () => <Logo />,
};
