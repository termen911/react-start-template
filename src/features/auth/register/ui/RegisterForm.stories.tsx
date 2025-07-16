import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  title: 'Features/Auth/RegisterForm',
  component: RegisterForm,
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
    error: 'Пользователь с таким email уже существует',
  },
};

export const WithValidationError: Story = {
  args: {
    loading: false,
    error: undefined,
  },
  play: async ({ canvasElement }) => {
    // Можно добавить интеракции для демонстрации валидации
  },
};
