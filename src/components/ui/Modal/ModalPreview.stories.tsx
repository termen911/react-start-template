import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import ModalPreview from './ModalPreview';

const meta: Meta<typeof ModalPreview> = {
  title: 'Components/UI/ModalPreview',
  component: ModalPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {},
};
