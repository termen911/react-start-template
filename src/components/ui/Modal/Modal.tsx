import React, { FC, ReactNode } from 'react';
import s from './Modal.module.css';

interface ModalProps {
  visible: boolean;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ visible, children }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={s.overlay}>
      <div className={s.window}>
        <button className={s.closeButton} type="button">
          ×
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
