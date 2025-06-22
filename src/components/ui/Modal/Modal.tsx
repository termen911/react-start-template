import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../types';
import s from './Modal.module.css';

export const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={s.overlay}>
      <div className={s.window}>
        <button className={s.closeButton} type="button" onClick={onClose}>
          ×
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
