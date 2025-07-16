import * as yup from 'yup';

// Схема валидации для формы операции
export const transactionValidationSchema = yup.object({
  title: yup
    .string()
    .required('Заголовок операции обязателен')
    .min(2, 'Заголовок должен содержать минимум 2 символа')
    .max(100, 'Заголовок не должен превышать 100 символов'),
  description: yup
    .string()
    .required('Описание операции обязательно')
    .min(5, 'Описание должно содержать минимум 5 символов')
    .max(300, 'Описание не должно превышать 300 символов'),
  amount: yup
    .number()
    .required('Сумма обязательна')
    .test('not-zero', 'Сумма не может быть равна нулю', (value) => value !== 0)
    .min(-1000000, 'Минимальная сумма -1,000,000')
    .max(1000000, 'Максимальная сумма 1,000,000'),
  category: yup
    .string()
    .required('Категория обязательна')
    .min(2, 'Категория должна содержать минимум 2 символа')
    .max(50, 'Категория не должна превышать 50 символов'),
  date: yup
    .string()
    .required('Дата операции обязательна')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата должна быть в формате YYYY-MM-DD'),
});

// Тип для TypeScript
export type TransactionFormData = yup.InferType<typeof transactionValidationSchema>;
