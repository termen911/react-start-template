import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { transactionValidationSchema } from '../../../../shared/lib/validation/transaction';
import { FormButton, FormField, FormSelect, FormTextarea } from '../../../../shared/ui/forms';
import { TRANSACTION_CATEGORIES } from '../model/constants';
import { TransactionFormData, TransactionFormProps } from '../model/types';
import styles from './TransactionForm.module.css';

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  initialData,
  loading = false,
  error,
  mode = 'create',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionValidationSchema) as any,
    mode: 'onChange',
    defaultValues: {
      ...initialData,
      date: initialData?.date || new Date().toISOString().split('T')[0],
    },
  });

  const handleFormSubmit = (data: TransactionFormData) => {
    console.log('TransactionForm submit data', data);
    onSubmit(data);
  };

  const title = mode === 'create' ? 'Добавить операцию' : 'Редактировать операцию';
  const submitText = mode === 'create' ? 'Добавить' : 'Сохранить';

  return (
    <div className={styles.transactionForm}>
      <h2 className={styles.title}>{title}</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <FormField
          name="title"
          label="Заголовок операции"
          type="text"
          placeholder="Введите заголовок операции"
          register={register}
          error={errors.title}
          required
        />

        <FormTextarea
          name="description"
          label="Описание операции"
          placeholder="Введите описание операции"
          register={register}
          error={errors.description}
          required
          rows={3}
        />

        <div className={styles.row}>
          <FormField
            name="amount"
            label="Сумма"
            type="number"
            placeholder="0.00"
            register={register}
            error={errors.amount}
            required
            className={styles.amountField}
          />

          <FormField
            name="date"
            label="Дата операции"
            type="date"
            register={register}
            error={errors.date}
            required
            className={styles.dateField}
          />
        </div>

        <FormSelect
          name="category"
          label="Категория"
          options={TRANSACTION_CATEGORIES}
          placeholder="Выберите категорию"
          register={register}
          error={errors.category}
          required
        />

        <div className={styles.buttonGroup}>
          <FormButton type="submit" variant="primary" size="large" disabled={!isValid || loading} loading={loading}>
            {submitText}
          </FormButton>

          <FormButton type="button" variant="secondary" size="large" disabled={loading}>
            Отмена
          </FormButton>
        </div>
      </form>
    </div>
  );
};
