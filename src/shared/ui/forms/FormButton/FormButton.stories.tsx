import type { Meta, StoryObj } from '@storybook/react';
import { FormButton } from './FormButton';

const meta: Meta<typeof FormButton> = {
  title: 'Shared/UI/Forms/FormButton',
  component: FormButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['submit', 'button', 'reset'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Основная кнопка',
    disabled: false,
    loading: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Вторичная кнопка',
    disabled: false,
    loading: false,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'medium',
    children: 'Удалить',
    disabled: false,
    loading: false,
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Маленькая кнопка',
    disabled: false,
    loading: false,
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Большая кнопка',
    disabled: false,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Загрузка...',
    disabled: false,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Заблокированная кнопка',
    disabled: true,
    loading: false,
  },
};

export const Submit: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    type: 'submit',
    children: 'Отправить форму',
    disabled: false,
    loading: false,
  },
};
