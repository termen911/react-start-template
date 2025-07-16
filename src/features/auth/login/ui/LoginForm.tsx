import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { loginValidationSchema } from '../../../../shared/lib/validation/auth';
import { FormButton, FormField } from '../../../../shared/ui/forms';
import { LoginFormData, LoginFormProps } from '../model/types';
import styles from './LoginForm.module.css';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema) as any,
    mode: 'onChange',
  });

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>Вход в систему</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
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
          placeholder="Введите ваш пароль"
          register={register}
          error={errors.password}
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
          Войти
        </FormButton>
      </form>
    </div>
  );
};
