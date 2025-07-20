import { RegisterOptions } from 'react-hook-form';
import { TransactionFormData } from './types';

export const createTransactionValidationRules = (t: (key: string) => string) => {
  const rules: Record<keyof TransactionFormData, RegisterOptions> = {
    type: {
      required: t('transaction.form.validation.typeRequired'),
    },
    amount: {
      required: t('transaction.form.validation.amountRequired'),
      min: {
        value: 0.01,
        message: t('transaction.form.validation.amountMin'),
      },
      max: {
        value: 1000000000,
        message: t('transaction.form.validation.amountMax'),
      },
    },
    title: {
      required: t('transaction.form.validation.titleRequired'),
      minLength: {
        value: 3,
        message: t('transaction.form.validation.titleMinLength'),
      },
      maxLength: {
        value: 100,
        message: t('transaction.form.validation.titleMaxLength'),
      },
    },
    description: {
      maxLength: {
        value: 500,
        message: t('transaction.form.validation.descriptionMaxLength'),
      },
    },
    categoryName: {
      required: t('transaction.form.validation.categoryRequired'),
    },
    categoryIcon: {
      required: t('transaction.form.validation.categoryRequired'),
    },
    categoryColor: {
      required: t('transaction.form.validation.categoryRequired'),
    },
    date: {
      required: t('transaction.form.validation.dateRequired'),
      validate: (value: string) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Устанавливаем конец дня

        if (selectedDate > today) {
          return t('transaction.form.validation.dateFuture');
        }
        return true;
      },
    },
    tags: {
      validate: (value?: string[]) => {
        if (!value) return true;
        if (value.length > 10) {
          return t('transaction.form.validation.tagsMaxCount');
        }
        for (const tag of value) {
          if (tag.length > 20) {
            return t('transaction.form.validation.tagMaxLength');
          }
        }
        return true;
      },
    },
  };

  return rules;
};
