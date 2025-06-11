import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, ThemeScheme, useThemeScheme } from 'src/shared/providers/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

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
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <ThemeProvider defaultScheme={ThemeScheme.light}>
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  render: () => {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div
          style={{
            boxShadow: '1px 1px 1px 1px var(--text-color)',
            color: 'var(--text-color)',
            backgroundColor: 'var(--background-color)',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          Блок для примера темы
        </div>
        <ThemeToggle />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Переключатель темы. Используйте переключатель темы в панели инструментов Storybook для проверки работы в разных темах.',
      },
    },
  },
};
