import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TransactionBrief, TransactionFull } from '../../finance';
import { Transaction, TransactionFull as TransactionFullType } from '../../finance/types';
import s from './ProductList.module.css';
import { generateTransactions, mockTransactions, randomDate } from './mockData';

interface TransactionWithId extends Transaction {
  id: string;
  date: string;
}

interface ProductListProps {
  transactions?: Transaction[];
  displayMode?: 'brief' | 'full';
  maxDescriptionLength?: number;
}

export const ProductList: FC<ProductListProps> = ({
  transactions = mockTransactions,
  displayMode = 'brief',
  maxDescriptionLength = 50,
}) => {
  const [localTransactions, setLocalTransactions] = useState<TransactionWithId[]>([]);
  const [isLoadingNewTransactions, setIsLoadingNewTransactions] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const endMarkerRef = useRef<HTMLDivElement>(null);

  const normalization = (transactions: Transaction[]): TransactionWithId[] => {
    return transactions.map((t) => ({
      ...t,
      id: uuidv4(),
      date: randomDate(),
    }));
  };

  useEffect(() => {
    if (!transactions) {
      setLocalTransactions(normalization(transactions));
    }
  }, [transactions]);

  const loadMoreTransactions = useCallback(() => {
    setIsLoadingNewTransactions(true);
    setTimeout(() => {
      setLocalTransactions((prev) => [...prev, ...normalization(generateTransactions(5))]);
      setIsLoadingNewTransactions(false);
    }, 500);
  }, []);

  // Отслеживание конца списка
  useEffect(() => {
    const endElement = endMarkerRef.current;

    if (!endElement) return;

    const endObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreTransactions();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '300px', // Срабатывать за 50px до появления маркера
      }
    );

    endObserver.observe(endElement);

    return () => {
      endObserver.disconnect();
    };
  }, [loadMoreTransactions, localTransactions.length]); // Зависимость от количества элементов

  const incomeMemo = useMemo(() => {
    return `+${localTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
      .toLocaleString('ru-RU')} ₽`;
  }, [localTransactions]);

  const expenseMemo = useMemo(() => {
    return `-${Math.abs(
      localTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)
    ).toLocaleString('ru-RU')} ₽`;
  }, [localTransactions]);

  return (
    <div className={s.productList}>
      <div className={s.header}>
        <h2 className={s.title}>Список операций ({localTransactions.length})</h2>
        <div className={s.stats}>
          <div className={s.stat}>
            <span className={s.statLabel}>Доходы:</span>
            <span className={s.statValue + ' ' + s.income}>{incomeMemo}</span>
          </div>
          <div className={s.stat}>
            <span className={s.statLabel}>Расходы:</span>
            <span className={s.statValue + ' ' + s.expense}>{expenseMemo}</span>
          </div>
        </div>
      </div>

      <div className={s.list} ref={listRef}>
        {localTransactions.map((transaction) => (
          <div key={transaction.id} className={s.listItem}>
            {displayMode === 'full' ? (
              <TransactionFull {...(transaction as TransactionFullType)} />
            ) : (
              <TransactionBrief {...transaction} maxDescriptionLength={maxDescriptionLength} />
            )}
          </div>
        ))}

        {/* Элемент-маркер для отслеживания конца списка */}
        <div
          ref={endMarkerRef}
          style={{
            height: '1px',
            width: '100%',
            backgroundColor: 'transparent',
          }}
          aria-hidden="true"
        />
      </div>

      {isLoadingNewTransactions && <div className={s.loading}>Загрузка новых операций...</div>}
    </div>
  );
};
