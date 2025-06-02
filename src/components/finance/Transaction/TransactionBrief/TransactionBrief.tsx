import React, { FC } from 'react';
import s from './TransactionBrief.module.css';
import { TransactionBrief as TransactionBriefProps } from '../../types';

export const TransactionBrief: FC<TransactionBriefProps> = ({
  amount,
  category,
  title,
  description,
  maxDescriptionLength = 50,
}) => {
  const truncatedDescription =
    description.length > maxDescriptionLength ? `${description.slice(0, maxDescriptionLength)}...` : description;

  return (
    <div className={s.transactionBrief}>
      <div className={s.header}>
        <div className={s.titleSection}>
          <h3 className={s.title}>{title}</h3>
          <span className={s.category}>{category}</span>
        </div>
        <div className={`${s.amount} ${amount > 0 ? s.income : s.expense}`}>
          {amount > 0 ? '+' : '-'}
          {Math.abs(amount).toLocaleString('ru-RU')} ₽
        </div>
      </div>
      {description && <p className={s.description}>{truncatedDescription}</p>}
    </div>
  );
};
