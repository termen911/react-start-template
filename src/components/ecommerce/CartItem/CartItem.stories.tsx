import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'Components/E-commerce/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const SingleItem: Story = {
  args: {
    item: {
      name: 'iPhone 15 Pro',
      description: 'Новый iPhone 15 Pro с титановым корпусом, чипом A17 Pro и улучшенной камерой.',
      price: 89990,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
      category: 'Смартфоны',
      quantity: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Один товар в корзине',
      },
    },
  },
};
