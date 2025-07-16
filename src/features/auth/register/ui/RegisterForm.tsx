import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { registerValidationSchema } from '../../../../shared/lib/validation/auth';
import { FormButton, FormField } from '../../../../shared/ui/forms';
import { RegisterFormData, RegisterFormProps } from '../model/types';
import styles from './RegisterForm.module.css';

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading = false, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerValidationSchema) as any,
    mode: 'onChange',
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    onSubmit(data);
  };

  return (
    <div className={styles.registerForm}>
      <h2 className={styles.title}>Регистрация</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <div className={styles.nameFields}>
          <FormField
            name="firstName"
            label="Имя"
            type="text"
            placeholder="Введите ваше имя"
            register={register}
            error={errors.firstName}
            required
            className={styles.nameField}
          />

          <FormField
            name="lastName"
            label="Фамилия"
            type="text"
            placeholder="Введите вашу фамилию"
            register={register}
            error={errors.lastName}
            required
            className={styles.nameField}
          />
        </div>

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="Введите ваш email"
          register={register}
          error={errors.email}
          required
        />

        <FormField
          name="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          register={register}
          error={errors.password}
          required
        />

        <FormField
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          placeholder="Подтвердите пароль"
          register={register}
          error={errors.confirmPassword}
          required
        />

        <FormButton
          type="submit"
          variant="primary"
          size="large"
          disabled={!isValid || loading}
          loading={loading}
          className={styles.submitButton}
        >
          Зарегистрироваться
        </FormButton>
      </form>
    </div>
  );
};
