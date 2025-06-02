import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Layout } from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: React.createElement('div', {}, [
      React.createElement('h1', { key: 'title' }, 'Добро пожаловать на OTUS'),
      React.createElement(
        'p',
        { key: 'desc1' },
        'Это основной контент страницы. Layout автоматически включает Header с Logo.'
      ),
      React.createElement('p', { key: 'desc2' }, 'Header прилипает к верху страницы при прокрутке.'),
    ]),
  },
};

export const LongContent: Story = {
  args: {
    children: React.createElement('div', {}, [
      React.createElement('h1', { key: 'title' }, 'Длинная страница'),
      React.createElement(
        'p',
        { key: 'desc' },
        'Эта страница демонстрирует sticky поведение хедера при прокрутке длинного контента.'
      ),
      ...Array.from({ length: 20 }, (_, i) =>
        React.createElement(
          'div',
          {
            key: `section-${i}`,
            style: {
              margin: '40px 0',
              padding: '20px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
          },
          [
            React.createElement('h2', { key: 'title' }, `Секция ${i + 1}`),
            React.createElement(
              'p',
              { key: 'text' },
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
            ),
          ]
        )
      ),
    ]),
  },
};
