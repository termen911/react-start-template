import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormField } from './FormField';

const FormFieldDemo = (props: any) => {
  const { register, formState: { errors } } = useForm();

  return (
    <FormField
      register={register}
      error={errors[props.name]}
      {...props}
    />
  );
};

const meta: Meta<typeof FormField> = {
  title: 'Shared/UI/Forms/FormField',
  component: FormFieldDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'username',
    label: 'Имя пользователя',
    placeholder: 'Введите имя пользователя',
    type: 'text',
    required: false,
    disabled: false,
  },
};

export const Required: Story = {
  args: {
    name: 'email',
    label: 'Email',
    placeholder: 'Введите email',
    type: 'email',
    required: true,
    disabled: false,
  },
};

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    type: 'password',
    required: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    label: 'Заблокированное поле',
    placeholder: 'Недоступно',
    type: 'text',
    required: false,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    name: 'error',
    label: 'Поле с ошибкой',
    placeholder: 'Введите значение',
    type: 'text',
    required: true,
    disabled: false,
  },
};
