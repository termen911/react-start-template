import type { Meta, StoryObj } from '@storybook/react';

import { TransactionFull } from './TransactionFull';

const meta: Meta<typeof TransactionFull> = {
  title: 'Components/Finance/Transaction/TransactionFull',
  component: TransactionFull,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TransactionFull>;

export const IncomeTransaction: Story = {
  args: {
    amount: 45000,
    category: 'Зарплата',
    title: 'Заработная плата за ноябрь',
    description:
      'Основная заработная плата за ноябрь 2024 года, включая премию за выполнение KPI и дополнительные бонусы.',
    date: '2024-11-30',
  },
};

export const ExpenseTransaction: Story = {
  args: {
    amount: -25000,
    category: 'Техника',
    title: 'MacBook Pro 14" M3',
    description:
      'Покупка нового ноутбука MacBook Pro 14 дюймов с чипом M3, 16 ГБ оперативной памяти и SSD накопителем на 512 ГБ. Покупка была сделана в официальном магазине Apple с расширенной гарантией AppleCare+ на 3 года. Ноутбук предназначен для работы и развития в области программирования.',
    date: '2024-11-25',
  },
};
