import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { LocalizationProvider, LocalizationScheme } from 'src/shared/providers/LangProvider';
import 'src/shared/styles/theme.scss';
import { Logo } from '../Logo';
import { Sizes } from '../types';
import { LocalizationToggle } from './LocalizationToggle';

const meta: Meta<typeof LocalizationToggle> = {
  title: 'Components/UI/LocalizationToggle',
  component: LocalizationToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Переключатель языка приложения. Отображает название текущего языка и одну переменную из переводов.',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <LocalizationProvider defaultScheme={LocalizationScheme.ru}>
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </LocalizationProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof LocalizationToggle>;

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <LocalizationProvider>
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </LocalizationProvider>
      );
    },
  ],
  render: () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Logo size={Sizes.medium} />
        <LocalizationToggle />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Переключатель языка в русском режиме. Нажмите, чтобы переключить на английский язык.',
      },
    },
  },
};
