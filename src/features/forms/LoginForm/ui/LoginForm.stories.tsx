import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Features/Forms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    error: undefined,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    loading: false,
    error: 'Неверный email или пароль',
  },
};

export const WithValidationError: Story = {
  args: {
    loading: false,
    error: undefined,
  },
};
