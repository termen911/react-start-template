import type { Meta, StoryObj } from '@storybook/react';
import { TransactionForm } from './TransactionForm';

const meta: Meta<typeof TransactionForm> = {
  title: 'Features/Forms/TransactionForm',
  component: TransactionForm,
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
      title: 'Покупка продуктов',
      description: 'Еженедельная покупка продуктов в супермаркете',
      amount: -2500,
      category: 'food',
      date: '2024-01-15',
    },
  },
};

export const EditIncome: Story = {
  args: {
    mode: 'edit',
    loading: false,
    error: undefined,
    initialData: {
      title: 'Зарплата за январь',
      description: 'Основная зарплата за январь 2024',
      amount: 75000,
      category: 'salary',
      date: '2024-01-31',
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
    error: 'Не удалось сохранить операцию. Проверьте подключение к интернету.',
  },
};

export const EditWithError: Story = {
  args: {
    mode: 'edit',
    loading: false,
    error: 'Операция не найдена или была удалена',
    initialData: {
      title: 'Оплата коммунальных услуг',
      description: 'Ежемесячная оплата за электричество и воду',
      amount: -3200,
      category: 'housing',
      date: '2024-01-10',
    },
  },
};
