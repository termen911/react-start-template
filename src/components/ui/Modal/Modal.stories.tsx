import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Управляет видимостью модального окна',
    },
    onClose: {
      action: 'closed',
      description: 'Функция вызываемая при закрытии модального окна',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    visible: true,
    children: 'Это содержимое модального окна',
  },
};
