import React, { FC, useCallback } from 'react';
import { AddToCartButtonProps } from '../types';
import s from './AddToCartButton.module.css';

// Паттерн: merge destructured props with other values
const DEFAULT_PROPS = {
  size: 'medium' as const,
  disabled: false,
  onAdd: () => console.log('Добавить в корзину'),
  onRemove: () => console.log('Уменьшить количество'),
  onCountChange: () => console.log('Изменить количество'),
};

export const AddToCartButton: FC<AddToCartButtonProps> = (props) => {
  // Паттерн: destructuring props + merge destructured props with other values
  const { count, onAdd, onRemove, onCountChange, disabled, size, className, ...restProps } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  // Паттерн: event switch - единая функция для обработки разных типов событий
  const handleButtonAction = useCallback(
    (action: 'add' | 'remove' | 'direct', value?: number) => {
      if (disabled) return;

      switch (action) {
        case 'add':
          onAdd();
          onCountChange(count + 1);
          break;
        case 'remove':
          if (count > 0) {
            onRemove();
            onCountChange(count - 1);
          }
          break;
        case 'direct':
          if (value !== undefined) {
            onCountChange(value);
          }
          break;
      }
    },
    [count, onAdd, onRemove, onCountChange, disabled]
  );

  // Паттерн: conditional rendering
  if (count === 0) {
    return (
      <button
        {...restProps} // Паттерн: JSX spread attributes
        className={`${s.addButton} ${s[size]} ${className || ''}`}
        onClick={() => handleButtonAction('add')}
        disabled={disabled}
      >
        В корзину
      </button>
    );
  }

  return (
    <div className={`${s.counterContainer} ${s[size]} ${className || ''}`}>
      <button
        {...restProps} // Паттерн: JSX spread attributes
        className={s.counterButton}
        onClick={() => handleButtonAction('remove')}
        disabled={disabled || count <= 0}
        aria-label="Уменьшить количество"
      >
        −
      </button>
      <div className={s.counter}>{count}</div>
      <button
        {...restProps} // Паттерн: JSX spread attributes
        className={s.counterButton}
        onClick={() => handleButtonAction('add')}
        disabled={disabled}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
};
