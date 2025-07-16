import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ResponsiveContainer from './ResponsiveContainer';

const meta: Meta<typeof ResponsiveContainer> = {
  title: 'Components/UI/ResponsiveContainer',
  component: ResponsiveContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Адаптивный контейнер с поддержкой ResizeObserver. Автоматически изменяет макет в зависимости от размера контейнера.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    renderMode: {
      control: { type: 'select' },
      options: ['grid', 'list', 'cards'],
      description: 'Режим отображения содержимого',
    },
    gap: {
      control: { type: 'number', min: 0, max: 50, step: 2 },
      description: 'Расстояние между элементами в пикселях',
    },
    breakpoints: {
      control: { type: 'object' },
      description: 'Точки перехода для разных размеров экрана',
    },
    columns: {
      control: { type: 'object' },
      description: 'Количество колонок для каждого размера',
    },
    minHeight: {
      control: { type: 'number' },
      description: 'Минимальная высота контейнера',
    },
    maxHeight: {
      control: { type: 'number' },
      description: 'Максимальная высота контейнера',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для демонстрации
const SampleCard = ({ title, content }: { title: string; content: string }) => (
  <div
    style={{
      padding: '16px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{content}</p>
  </div>
);

const sampleData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Карточка ${i + 1}`,
  content: `Содержимое карточки ${i + 1}. Это пример адаптивного контейнера с ResizeObserver.`,
}));

export const Default: Story = {
  args: {
    renderMode: 'grid',
    gap: 16,
    children: sampleData.map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};

export const GridMode: Story = {
  args: {
    renderMode: 'grid',
    gap: 20,
    columns: { small: 1, medium: 2, large: 4 },
    children: sampleData
      .slice(0, 8)
      .map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};

export const ListMode: Story = {
  args: {
    renderMode: 'list',
    gap: 12,
    children: sampleData
      .slice(0, 6)
      .map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};

export const CardsMode: Story = {
  args: {
    renderMode: 'cards',
    gap: 16,
    children: sampleData
      .slice(0, 9)
      .map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};

export const WithCustomBreakpoints: Story = {
  args: {
    renderMode: 'grid',
    gap: 16,
    breakpoints: { small: 320, medium: 600, large: 900 },
    columns: { small: 1, medium: 3, large: 5 },
    children: sampleData
      .slice(0, 10)
      .map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};

export const WithHeightConstraints: Story = {
  args: {
    renderMode: 'grid',
    gap: 16,
    minHeight: 200,
    maxHeight: 400,
    children: sampleData
      .slice(0, 4)
      .map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};

export const WithResizeCallback: Story = {
  args: {
    renderMode: 'grid',
    gap: 16,
    onResize: (width: number, height: number) => {
      console.log(`Container resized to: ${width}x${height}`);
    },
    children: sampleData
      .slice(0, 6)
      .map((item) => <SampleCard key={item.id} title={item.title} content={item.content} />),
  },
};
