import type { Meta, StoryObj } from '@storybook/react';
import { ProductBrief } from './ProductBrief';

const meta: Meta<typeof ProductBrief> = {
  title: 'Components/E-commerce/ProductBrief',
  component: ProductBrief,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    maxDescriptionLength: {
      control: { type: 'number', min: 20, max: 200, step: 10 },
      description: 'Максимальная длина описания',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductBrief>;

export const Smartphone: Story = {
  args: {
    product: {
      name: 'iPhone 15 Pro',
      description:
        'Новый iPhone 15 Pro с титановым корпусом, чипом A17 Pro и улучшенной камерой. Доступен в четырех потрясающих цветах.',
      price: 89990,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      category: 'Смартфоны',
    },
    maxDescriptionLength: 80,
  },
};
