import type { Meta, StoryObj } from '@storybook/react';
import { AddToCartButton } from './AddToCartButton';

const meta: Meta<typeof AddToCartButton> = {
  title: 'Components/E-commerce/AddToCartButton',
  component: AddToCartButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Количество товара в корзине',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddToCartButton>;

export const InitialState: Story = {
  args: {
    count: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Начальное состояние - кнопка "В корзину"',
      },
    },
  },
};
