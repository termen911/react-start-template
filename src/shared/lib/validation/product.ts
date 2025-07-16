import * as yup from 'yup';

// Схема валидации для формы товара
export const productValidationSchema = yup.object({
  name: yup
    .string()
    .required('Название товара обязательно')
    .min(2, 'Название должно содержать минимум 2 символа')
    .max(100, 'Название не должно превышать 100 символов'),
  description: yup
    .string()
    .required('Описание товара обязательно')
    .min(10, 'Описание должно содержать минимум 10 символов')
    .max(500, 'Описание не должно превышать 500 символов'),
  price: yup
    .number()
    .required('Цена обязательна')
    .positive('Цена должна быть положительным числом')
    .min(0.01, 'Минимальная цена 0.01')
    .max(1000000, 'Максимальная цена 1,000,000'),
  category: yup
    .string()
    .required('Категория обязательна')
    .min(2, 'Категория должна содержать минимум 2 символа')
    .max(50, 'Категория не должна превышать 50 символов'),
  image: yup.string().required('Изображение обязательно').url('Изображение должно быть валидным URL'),
});

// Тип для TypeScript
export type ProductFormData = yup.InferType<typeof productValidationSchema>;
