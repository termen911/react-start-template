import type { Meta, StoryObj } from '@storybook/react';
import { ProductList } from './ProductList';
import { mockTransactions } from './mockData';

const meta: Meta<typeof ProductList> = {
  title: 'Components/E-commerce/ProductList',
  component: ProductList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    displayMode: {
      control: { type: 'radio' },
      options: ['brief', 'full'],
      description: 'Режим отображения операций',
    },
    maxDescriptionLength: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
      description: 'Максимальная длина описания для краткого режима',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const AllTransactionsBrief: Story = {
  args: {
    transactions: mockTransactions,
    displayMode: 'brief',
    maxDescriptionLength: 60,
  },
};

export const AllTransactionsFull: Story = {
  args: {
    transactions: mockTransactions,
    displayMode: 'full',
    maxDescriptionLength: 100,
  },
};
