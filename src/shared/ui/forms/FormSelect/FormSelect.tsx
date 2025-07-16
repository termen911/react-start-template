import clsx from 'clsx';
import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from './FormSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  register,
  error,
  required,
  disabled,
  className,
}: FormSelectProps<T>) => {
  return (
    <div className={clsx(styles.formSelect, className)}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={name}
        disabled={disabled}
        className={clsx(styles.select, error && styles.selectError, disabled && styles.selectDisabled)}
        {...register(name)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
