import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, ThemeScheme } from 'src/shared/providers/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

import 'src/shared/styles/theme.scss';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/UI/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Переключатель темы приложения. Отображает иконку солнца для темной темы и луны для светлой темы.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Определяем тему по названию истории или используем светлую по умолчанию
      const defaultScheme = context.name === 'Dark Theme' ? ThemeScheme.dark : ThemeScheme.light;

      return (
        <ThemeProvider defaultScheme={defaultScheme}>
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => {
    return (
      <ThemeProvider>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div
            style={{
              boxShadow: '1px 1px 1px 1px var(--text-color)',
              color: 'var(--text-color)',
              backgroundColor: 'var(--background-color)',
              padding: '10px',
            }}
          >
            Блок для примера
          </div>
          <ThemeToggle />
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Переключатель темы в светлом режиме. Нажмите, чтобы переключить на темную тему.',
      },
    },
  },
};
