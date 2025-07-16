import clsx from 'clsx';
import React from 'react';
import styles from './FormButton.module.css';

interface FormButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        (disabled || loading) && styles.disabled,
        className
      )}
      onClick={onClick}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};
