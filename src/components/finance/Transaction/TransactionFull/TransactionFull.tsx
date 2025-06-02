import React, { FC } from 'react';
import s from './TransactionFull.module.css';
import { TransactionFull as TransactionFullProps } from '../../types';

export const TransactionFull: FC<TransactionFullProps> = ({ amount, category, title, description, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={s.transactionFull}>
      <div className={s.header}>
        <div className={s.titleSection}>
          <h2 className={s.title}>{title}</h2>
          <div className={s.meta}>
            <span className={s.category}>{category}</span>
            <span className={s.date}>{formattedDate}</span>
          </div>
        </div>
        <div className={s.amountSection}>
          <div className={`${s.amount} ${amount > 0 ? s.income : s.expense}`}>
            {amount > 0 ? '+' : '-'}
            {Math.abs(amount).toLocaleString('ru-RU')} ₽
          </div>
          <button
            className={s.editButton}
            onClick={() => alert('Редактировать операцию')}
            title="Редактировать операцию"
          >
            ✏️
          </button>
        </div>
      </div>
      {description && (
        <div className={s.descriptionSection}>
          <h4 className={s.descriptionTitle}>Описание:</h4>
          <p className={s.descriptionText}>{description}</p>
        </div>
      )}
    </div>
  );
};
