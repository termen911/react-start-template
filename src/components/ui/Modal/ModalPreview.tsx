import React, { useState } from 'react';
import { Modal } from './Modal';
import s from './ModalPreview.module.css';

const ModalPreview = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleClose = () => {
    setVisible(false);
    setValue('');
  };

  return (
    <div className={s.container}>
      <input className={s.input} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button className={s.button} onClick={() => setVisible(true)}>
        Открыть модальное окно
      </button>
      <Modal visible={visible} onClose={handleClose}>
        <span>{value ? `Текст из поля ввода: ${value}` : 'Поле для ввода пустое'}</span>
      </Modal>
    </div>
  );
};

export default ModalPreview;
