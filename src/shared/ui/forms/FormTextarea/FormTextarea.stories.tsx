import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTextarea } from './FormTextarea';

const FormTextareaDemo = (props: any) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return <FormTextarea register={register} error={errors[props.name]} {...props} />;
};

const meta: Meta<typeof FormTextarea> = {
  title: 'Shared/UI/Forms/FormTextarea',
  component: FormTextareaDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: { type: 'number', min: 2, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'description',
    label: 'Описание',
    placeholder: 'Введите описание...',
    rows: 4,
    required: false,
    disabled: false,
  },
};

export const Required: Story = {
  args: {
    name: 'comment',
    label: 'Комментарий',
    placeholder: 'Введите ваш комментарий...',
    rows: 3,
    required: true,
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    name: 'note',
    label: 'Заметка',
    placeholder: 'Краткая заметка...',
    rows: 2,
    required: false,
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    name: 'content',
    label: 'Содержимое',
    placeholder: 'Введите полный текст...',
    rows: 6,
    required: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    name: 'readonly',
    label: 'Только для чтения',
    placeholder: 'Этот текст нельзя редактировать',
    rows: 4,
    required: false,
    disabled: true,
  },
};
