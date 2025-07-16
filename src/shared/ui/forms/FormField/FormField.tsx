import clsx from 'clsx';
import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from './FormField.module.css';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormField = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  required,
  disabled,
  className,
}: FormFieldProps<T>) => {
  return (
    <div className={clsx(styles.formField, className)}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(styles.input, error && styles.inputError, disabled && styles.inputDisabled)}
        {...register(name)}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
