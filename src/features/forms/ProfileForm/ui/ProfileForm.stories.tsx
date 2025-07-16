import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileFormValues } from '../model/types';
import { ProfileForm } from './ProfileForm';

// Мок для formik formManager
// Создает упрощенный объект, имитирующий поведение Formik для отображения в Storybook
const createMockFormManager = (values: ProfileFormValues, errors: any = {}, touched: any = {}) =>
  ({
    values,
    errors,
    touched,
    submitCount: 0,
    handleBlur: () => {
      /* Mock handler */
    },
    handleChange: () => {
      /* Mock handler */
    },
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted with values:', values);
    },
  } as any);

const meta: Meta<typeof ProfileForm> = {
  title: 'Features/Forms/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Отключает форму',
    },
    className: {
      control: 'text',
      description: 'CSS класс для стилизации',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {
  args: {
    formManager: createMockFormManager({
      name: '',
      about: '',
    }),
    disabled: false,
  },
};

export const Filled: Story = {
  args: {
    formManager: createMockFormManager({
      name: 'Иван Петров',
      about:
        'Опытный разработчик React с 5-летним стажем. Увлекаюсь современными технологиями и созданием качественных пользовательских интерфейсов.',
    }),
    disabled: false,
  },
};

export const WithErrors: Story = {
  args: {
    formManager: createMockFormManager(
      {
        name: '',
        about: '',
      },
      {
        name: 'Имя обязательно для заполнения',
        about: 'Расскажите о себе',
      },
      {
        name: true,
        about: true,
      }
    ),
    disabled: false,
  },
};

export const PartiallyTouched: Story = {
  args: {
    formManager: createMockFormManager(
      {
        name: 'Анна',
        about: '',
      },
      {
        about: 'Поле "О себе" обязательно для заполнения',
      },
      {
        name: true,
        about: true,
      }
    ),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    formManager: createMockFormManager({
      name: 'Сергей Иванов',
      about: 'Это пример заполненной, но отключенной формы профиля.',
    }),
    disabled: true,
  },
};

export const LongContent: Story = {
  args: {
    formManager: createMockFormManager({
      name: 'Очень длинное имя пользователя которое может не помещаться в поле',
      about:
        'Это очень длинное описание пользователя, которое содержит много информации о его профессиональной деятельности, увлечениях, образовании и других важных аспектах жизни. Такой текст может потребовать прокрутки или специальной обработки в интерфейсе.',
    }),
    disabled: false,
  },
};

export const WithSubmitCount: Story = {
  args: {
    formManager: {
      ...createMockFormManager(
        {
          name: '',
          about: '',
        },
        {
          name: 'Имя обязательно для заполнения',
          about: 'Расскажите о себе',
        },
        {
          name: false,
          about: false,
        }
      ),
      submitCount: 2,
    },
    disabled: false,
  },
};
