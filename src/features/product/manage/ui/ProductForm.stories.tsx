import type { Meta, StoryObj } from '@storybook/react';
import { ProductForm } from './ProductForm';

const meta: Meta<typeof ProductForm> = {
  title: 'Features/Product/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
    mode: {
      control: 'select',
      options: ['create', 'edit'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    mode: 'create',
    loading: false,
    error: undefined,
  },
};

export const Edit: Story = {
  args: {
    mode: 'edit',
    loading: false,
    error: undefined,
    initialData: {
      name: 'iPhone 15 Pro',
      description: 'Новый смартфон Apple с революционной камерой и мощным процессором A17 Pro',
      price: 99999,
      category: 'electronics',
      image: 'https://example.com/iphone-15-pro.jpg',
    },
  },
};

export const Loading: Story = {
  args: {
    mode: 'create',
    loading: true,
    error: undefined,
  },
};

export const WithError: Story = {
  args: {
    mode: 'create',
    loading: false,
    error: 'Не удалось сохранить товар. Попробуйте еще раз.',
  },
};

export const EditWithError: Story = {
  args: {
    mode: 'edit',
    loading: false,
    error: 'Товар с таким названием уже существует',
    initialData: {
      name: 'MacBook Pro',
      description: 'Мощный ноутбук для профессионалов',
      price: 199999,
      category: 'electronics',
      image: 'https://example.com/macbook-pro.jpg',
    },
  },
};
