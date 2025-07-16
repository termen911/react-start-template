import clsx from 'clsx';
import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from './FormTextarea.module.css';

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const FormTextarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  error,
  required,
  disabled,
  rows = 4,
  className,
}: FormTextareaProps<T>) => {
  return (
    <div className={clsx(styles.formTextarea, className)}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(styles.textarea, error && styles.textareaError, disabled && styles.textareaDisabled)}
        {...register(name)}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
