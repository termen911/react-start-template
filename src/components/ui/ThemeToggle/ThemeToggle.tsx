import React, { useCallback } from 'react';
import { ThemeScheme, useThemeScheme } from 'src/shared/providers/ThemeProvider';
import s from './ThemeToggle.module.css';

// Паттерн: State hoisting - интерфейс для контролируемого компонента
interface ThemeToggleProps {
  theme?: ThemeScheme;
  onThemeChange?: (theme: ThemeScheme) => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'minimal' | 'rounded';
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Паттерн: merge destructured props with other values
const DEFAULT_PROPS = {
  size: 'medium' as const,
  variant: 'default' as const,
  showLabel: false,
  disabled: false,
};

const ThemeToggleBase: React.FC<ThemeToggleProps> = (props) => {
  // Паттерн: destructuring props + merge destructured props with other values
  const {
    theme: controlledTheme,
    onThemeChange,
    size,
    variant,
    showLabel,
    disabled,
    className = '',
    style = {},
    ...restProps
  } = { ...DEFAULT_PROPS, ...props };

  // Паттерн: State hoisting - используем внешнее состояние или внутреннее
  const { themeScheme: internalTheme, toggleThemeScheme } = useThemeScheme();

  // Паттерн: Controlled input - если передан controlledTheme, используем его
  const currentTheme = controlledTheme !== undefined ? controlledTheme : internalTheme;

  // Паттерн: Event switch - обработка разных типов событий
  const handleToggle = useCallback(
    (action: 'toggle' | 'set', newTheme?: ThemeScheme) => {
      if (disabled) return;

      let targetTheme: ThemeScheme;

      switch (action) {
        case 'toggle':
          targetTheme = currentTheme === ThemeScheme.light ? ThemeScheme.dark : ThemeScheme.light;
          break;
        case 'set':
          targetTheme = newTheme || ThemeScheme.light;
          break;
        default:
          return;
      }

      if (onThemeChange) {
        onThemeChange(targetTheme);
      } else {
        toggleThemeScheme();
      }
    },
    [currentTheme, disabled, onThemeChange, toggleThemeScheme]
  );

  const handleClick = useCallback(() => {
    handleToggle('toggle');
  }, [handleToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle('toggle');
      }
    },
    [handleToggle]
  );

  // Получаем иконку для текущей темы
  const getIcon = (theme: ThemeScheme) => {
    return theme === ThemeScheme.light ? '🌙' : '☀️';
  };

  // Получаем текст для текущей темы
  const getLabel = (theme: ThemeScheme) => {
    return theme === ThemeScheme.light ? 'Темная тема' : 'Светлая тема';
  };

  const sizeClass = s[size] || s.medium;
  const variantClass = s[variant] || s.default;

  return (
    <button
      {...restProps} // Паттерн: JSX spread attributes
      className={`${s.themeToggle} ${sizeClass} ${variantClass} ${className}`}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={getLabel(currentTheme)}
      title={getLabel(currentTheme)}
    >
      <span className={s.icon}>{getIcon(currentTheme)}</span>
      {/* Паттерн: Conditional rendering */}
      {showLabel && <span className={s.label}>{getLabel(currentTheme)}</span>}
    </button>
  );
};

// Паттерн: Proxy component - компонент-обертка для удобства использования
export const ThemeToggle: React.FC<Omit<ThemeToggleProps, 'theme' | 'onThemeChange'>> = (props) => {
  return <ThemeToggleBase {...props} />;
};

// Паттерн: Controlled input - экспортируем также контролируемую версию
export const ControlledThemeToggle: React.FC<ThemeToggleProps> = ThemeToggleBase;
