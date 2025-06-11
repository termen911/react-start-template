import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/shared/styles/theme.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        'div',
        {
          className: 'theme-transition',
          style: {
            padding: '20px',
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
          },
        },
        {
          ...React.createElement(Story),
        }
      );
    },
  ],
};

export default preview;
