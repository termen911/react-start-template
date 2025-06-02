import type { Meta, StoryObj } from '@storybook/react';
import { TransactionBrief } from './TransactionBrief';

const meta: Meta<typeof TransactionBrief> = {
  title: 'Components/Finance/Transaction/TransactionBrief',
  component: TransactionBrief,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    maxDescriptionLength: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
      description: 'Максимальная длина описания',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionBrief>;

export const IncomeTransaction: Story = {
  args: {
    amount: 45000,
    category: 'Зарплата',
    title: 'Заработная плата за ноябрь',
    description:
      'Основная заработная плата за ноябрь 2024 года, включая премию за выполнение KPI и дополнительные бонусы.',
    maxDescriptionLength: 50,
  },
};

export const ExpenseTransaction: Story = {
  args: {
    amount: -25000,
    category: 'Техника',
    title: 'MacBook Pro 14" M3',
    description:
      'Покупка нового ноутбука MacBook Pro 14 дюймов с чипом M3, 16 ГБ оперативной памяти и SSD накопителем на 512 ГБ. Покупка была сделана в официальном магазине Apple с расширенной гарантией AppleCare+ на 3 года. Ноутбук предназначен для работы и развития в области программирования.',
    maxDescriptionLength: 50,
  },
};
