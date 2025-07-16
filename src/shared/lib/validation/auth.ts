import * as yup from 'yup';

// Схема валидации для формы входа
export const loginValidationSchema = yup.object({
  email: yup.string().required('Email обязателен').email('Некорректный email адрес'),
  password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен содержать минимум 6 символов'),
});

// Схема валидации для формы регистрации
export const registerValidationSchema = yup.object({
  firstName: yup
    .string()
    .required('Имя обязательно')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов'),
  lastName: yup
    .string()
    .required('Фамилия обязательна')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия не должна превышать 50 символов'),
  email: yup.string().required('Email обязателен').email('Некорректный email адрес'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'
    ),
  confirmPassword: yup
    .string()
    .required('Подтверждение пароля обязательно')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

// Типы для TypeScript
export type LoginFormData = yup.InferType<typeof loginValidationSchema>;
export type RegisterFormData = yup.InferType<typeof registerValidationSchema>;
