import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Product } from '../types';
import { ProductFull } from './ProductFull';

const meta: Meta<typeof ProductFull> = {
  title: 'Components/E-commerce/ProductFull',
  component: ProductFull,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProductFull>;

export const Smartphone: Story = {
  args: {
    product: {
      name: 'iPhone 15 Pro',
      description:
        'Новый iPhone 15 Pro с титановым корпусом представляет собой вершину технологий Apple. Оснащен мощным чипом A17 Pro, который обеспечивает невероятную производительность и энергоэффективность. Улучшенная тройная камерная система с новым 48-мегапиксельным основным датчиком позволяет создавать профессиональные фотографии и видео. Доступен в четырех потрясающих цветах: натуральный титан, голубой титан, белый титан и черный титан.',
      price: 89990,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      category: 'Смартфоны',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Детальная страница смартфона с полным описанием',
      },
    },
  },
};
