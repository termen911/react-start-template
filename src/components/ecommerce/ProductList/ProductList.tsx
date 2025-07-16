import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TransactionBrief, TransactionFull } from '../../finance';
import { Transaction, TransactionFull as TransactionFullType } from '../../finance/types';
import s from './ProductList.module.css';
import { generateTransactions, mockTransactions, randomDate } from './mockData';

interface TransactionWithId extends Transaction {
  id: string;
  date: string;
}

// Паттерн: Higher-order component для управления загрузкой
interface WithLoadingProps {
  isLoading: boolean;
  loadingText?: string;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & WithLoadingProps) => {
    const { isLoading, loadingText = 'Загрузка...', ...restProps } = props;

    if (isLoading) {
      return <div className={s.loading}>{loadingText}</div>;
    }

    return <Component {...(restProps as P)} />;
  };
};

// Паттерн: Render prop - компонент для настройки отображения элементов
interface ListItemRendererProps {
  item: TransactionWithId;
  index: number;
  displayMode: 'brief' | 'full';
  maxDescriptionLength: number;
}

interface ListRendererProps {
  items: TransactionWithId[];
  displayMode: 'brief' | 'full';
  maxDescriptionLength: number;
  renderItem?: (props: ListItemRendererProps) => ReactNode;
  className?: string;
}

const ListRenderer: FC<ListRendererProps> = ({
  items,
  displayMode,
  maxDescriptionLength,
  renderItem,
  className = '',
}) => {
  const defaultRenderItem = ({ item, displayMode, maxDescriptionLength }: ListItemRendererProps) => (
    <div key={item.id} className={s.listItem}>
      {displayMode === 'full' ? (
        <TransactionFull {...(item as TransactionFullType)} />
      ) : (
        <TransactionBrief {...item} maxDescriptionLength={maxDescriptionLength} />
      )}
    </div>
  );

  const itemRenderer = renderItem || defaultRenderItem;

  return (
    <div className={`${s.list} ${className}`}>
      {items.map((item, index) => itemRenderer({ item, index, displayMode, maxDescriptionLength }))}
    </div>
  );
};

// Паттерн: Function as children - поддержка функции как children
interface StatsRendererProps {
  income: string;
  expense: string;
  totalCount: number;
}

interface ProductListProps {
  transactions?: Transaction[];
  displayMode?: 'brief' | 'full';
  maxDescriptionLength?: number;
  renderStats?: (props: StatsRendererProps) => ReactNode;
  renderItem?: (props: ListItemRendererProps) => ReactNode;
  children?: ReactNode | ((props: StatsRendererProps) => ReactNode);
  className?: string;
  autoLoad?: boolean;
}

const ProductListBase: FC<ProductListProps> = ({
  transactions = mockTransactions,
  displayMode = 'brief',
  maxDescriptionLength = 50,
  renderStats,
  renderItem,
  children,
  className = '',
  autoLoad = true,
}) => {
  const [localTransactions, setLocalTransactions] = useState<TransactionWithId[]>([]);
  const [isLoadingNewTransactions, setIsLoadingNewTransactions] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const endMarkerRef = useRef<HTMLDivElement>(null);

  // Паттерн: State hoisting - функция нормализации вынесена наверх
  const normalization = useCallback((transactions: Transaction[]): TransactionWithId[] => {
    return transactions.map((t) => ({
      ...t,
      id: uuidv4(),
      date: randomDate(),
    }));
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      setLocalTransactions(normalization(transactions));
    }
  }, [transactions, normalization]);

  const loadMoreTransactions = useCallback(() => {
    if (!autoLoad) return;

    setIsLoadingNewTransactions(true);
    setTimeout(() => {
      setLocalTransactions((prev) => [...prev, ...normalization(generateTransactions(5))]);
      setIsLoadingNewTransactions(false);
    }, 500);
  }, [autoLoad, normalization]);

  // Отслеживание конца списка
  useEffect(() => {
    const endElement = endMarkerRef.current;

    if (!endElement || !autoLoad) return;

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
        rootMargin: '300px',
      }
    );

    endObserver.observe(endElement);

    return () => {
      endObserver.disconnect();
    };
  }, [loadMoreTransactions, localTransactions.length, autoLoad]);

  const statsData = useMemo(() => {
    const income = `+${localTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
      .toLocaleString('ru-RU')} ₽`;

    const expense = `-${Math.abs(
      localTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)
    ).toLocaleString('ru-RU')} ₽`;

    return { income, expense, totalCount: localTransactions.length };
  }, [localTransactions]);

  // Паттерн: Function as children - рендер статистики
  const renderStatsContent = () => {
    if (typeof children === 'function') {
      return children(statsData);
    }

    if (renderStats) {
      return renderStats(statsData);
    }

    // Дефолтный рендер статистики
    return (
      <div className={s.stats}>
        <div className={s.stat}>
          <span className={s.statLabel}>Доходы:</span>
          <span className={s.statValue + ' ' + s.income}>{statsData.income}</span>
        </div>
        <div className={s.stat}>
          <span className={s.statLabel}>Расходы:</span>
          <span className={s.statValue + ' ' + s.expense}>{statsData.expense}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`${s.productList} ${className}`}>
      <div className={s.header}>
        <h2 className={s.title}>Список операций ({statsData.totalCount})</h2>
        {renderStatsContent()}
      </div>

      <div ref={listRef}>
        <ListRenderer
          items={localTransactions}
          displayMode={displayMode}
          maxDescriptionLength={maxDescriptionLength}
          renderItem={renderItem}
        />

        {/* Паттерн: Array as children - поддержка дополнительных элементов */}
        {Array.isArray(children) && children.map((child, index) => <div key={index}>{child}</div>)}

        {/* Паттерн: Children pass-through - обычные children */}
        {children && typeof children !== 'function' && !Array.isArray(children) && <div>{children}</div>}

        {/* Элемент-маркер для отслеживания конца списка */}
        {autoLoad && (
          <div
            ref={endMarkerRef}
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: 'transparent',
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {isLoadingNewTransactions && <div className={s.loading}>Загрузка новых операций...</div>}
    </div>
  );
};

// Паттерн: Higher-order component - применение HOC
export const ProductList = withLoading(ProductListBase);
