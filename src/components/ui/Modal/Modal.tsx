import React, { FC } from 'react';
import { ModalProps } from '../types';
import s from './Modal.module.css';

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
