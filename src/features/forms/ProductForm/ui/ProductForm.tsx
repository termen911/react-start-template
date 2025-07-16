import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { productValidationSchema } from '../../../../shared/lib/validation/product';
import { FormButton, FormField, FormSelect, FormTextarea } from '../../../../shared/ui/forms';
import { PRODUCT_CATEGORIES } from '../model/constants';
import { ProductFormData, ProductFormProps } from '../model/types';
import styles from './ProductForm.module.css';

export const ProductForm: React.FC<ProductFormProps> = ({
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
  } = useForm<ProductFormData>({
    resolver: yupResolver(productValidationSchema) as any,
    mode: 'onChange',
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: ProductFormData) => {
    console.log('ProductForm submit data', data);
    onSubmit(data);
  };

  const title = mode === 'create' ? 'Добавить товар' : 'Редактировать товар';
  const submitText = mode === 'create' ? 'Добавить' : 'Сохранить';

  return (
    <div className={styles.productForm}>
      <h2 className={styles.title}>{title}</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <FormField
          name="name"
          label="Название товара"
          type="text"
          placeholder="Введите название товара"
          register={register}
          error={errors.name}
          required
        />

        <FormTextarea
          name="description"
          label="Описание товара"
          placeholder="Введите описание товара"
          register={register}
          error={errors.description}
          required
          rows={4}
        />

        <div className={styles.row}>
          <FormField
            name="price"
            label="Цена"
            type="number"
            placeholder="0.00"
            register={register}
            error={errors.price}
            required
            className={styles.priceField}
          />

          <FormSelect
            name="category"
            label="Категория"
            options={PRODUCT_CATEGORIES}
            placeholder="Выберите категорию"
            register={register}
            error={errors.category}
            required
            className={styles.categoryField}
          />
        </div>

        <FormField
          name="image"
          label="Изображение товара"
          type="url"
          placeholder="https://example.com/image.jpg"
          register={register}
          error={errors.image}
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
