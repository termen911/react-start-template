import React, { useState } from 'react';
import { Modal } from './Modal';
import s from './ModalPreview.module.css';

const ModalPreview = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleClose = () => {
    setIsOpen(false);
    setValue('');
  };

  return (
    <div className={s.container}>
      <input className={s.input} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className={s.button} onClick={() => setIsOpen(true)}>
        Открыть модальное окно
      </button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <span>{value ? `Текст из поля ввода: ${value}` : 'Поле для ввода пустое'}</span>
      </Modal>
    </div>
  );
};

export default ModalPreview;
