import React, { FC, useEffect, useState } from 'react';
import { ModalProps } from '../types';
import s from './Modal.module.css';

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(visible);

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      {isOpen ? (
        <div className={s.overlay}>
          <div className={s.window}>
            <button className={s.closeButton} type="button" onClick={handleClose}>
              ×
            </button>
            <div className={s.content}>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
