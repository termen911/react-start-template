import React, { FC } from 'react';
import { AddToCartButtonProps } from '../types';
import s from './AddToCartButton.module.css';

export const AddToCartButton: FC<AddToCartButtonProps> = ({ count }) => {
  if (count === 0) {
    return (
      <button className={s.addButton} onClick={() => alert('Добавить в корзину')}>
        В корзину
      </button>
    );
  }

  return (
    <div className={s.counterContainer}>
      <button
        className={s.counterButton}
        onClick={() => alert('Уменьшить количество')}
        aria-label="Уменьшить количество"
      >
        −
      </button>
      <div className={s.counter}>{count}</div>
      <button
        className={s.counterButton}
        onClick={() => alert('Увеличить количество')}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
};
