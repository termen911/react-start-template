import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const FormSelectDemo = (props: any) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return <FormSelect register={register} error={errors[props.name]} {...props} />;
};

const meta: Meta<typeof FormSelect> = {
  title: 'Shared/UI/Forms/FormSelect',
  component: FormSelectDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const categoryOptions = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'clothing', label: 'Одежда' },
  { value: 'books', label: 'Книги' },
  { value: 'home', label: 'Дом и сад' },
];

const priorityOptions = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
  { value: 'urgent', label: 'Срочный' },
];

export const Default: Story = {
  args: {
    name: 'category',
    label: 'Категория',
    options: categoryOptions,
    placeholder: 'Выберите категорию',
    required: false,
    disabled: false,
  },
};

export const Required: Story = {
  args: {
    name: 'priority',
    label: 'Приоритет',
    options: priorityOptions,
    placeholder: 'Выберите приоритет',
    required: true,
    disabled: false,
  },
};

export const WithoutPlaceholder: Story = {
  args: {
    name: 'status',
    label: 'Статус',
    options: [
      { value: 'active', label: 'Активный' },
      { value: 'inactive', label: 'Неактивный' },
      { value: 'pending', label: 'Ожидает' },
    ],
    required: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    name: 'readonly',
    label: 'Только для чтения',
    options: categoryOptions,
    placeholder: 'Недоступно для выбора',
    required: false,
    disabled: true,
  },
};

export const ManyOptions: Story = {
  args: {
    name: 'country',
    label: 'Страна',
    options: [
      { value: 'ru', label: 'Россия' },
      { value: 'us', label: 'США' },
      { value: 'uk', label: 'Великобритания' },
      { value: 'de', label: 'Германия' },
      { value: 'fr', label: 'Франция' },
      { value: 'it', label: 'Италия' },
      { value: 'es', label: 'Испания' },
      { value: 'cn', label: 'Китай' },
      { value: 'jp', label: 'Япония' },
      { value: 'kr', label: 'Южная Корея' },
    ],
    placeholder: 'Выберите страну',
    required: true,
    disabled: false,
  },
};
