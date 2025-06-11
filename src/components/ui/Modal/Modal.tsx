import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../types';
import s from './Modal.module.css';

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(visible);
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Создаем элемент портала при монтировании
    const element = document.createElement('div');
    element.id = 'modal-portal';
    document.body.appendChild(element);
    setPortalElement(element);

    // Удаляем элемент портала при размонтировании
    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, []);

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const modalContent = (
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

  // Используем портал для рендеринга в body, если элемент портала создан
  return portalElement ? createPortal(modalContent, portalElement) : null;
};
