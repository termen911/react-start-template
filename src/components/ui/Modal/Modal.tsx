import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, Sizes } from '../types';
import s from './Modal.module.css';

// Паттерн: Style component - компонент для стилизации overlay
interface StyledOverlayProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const StyledOverlay: FC<StyledOverlayProps> = ({ children, onClick, className = '', style = {} }) => (
  <div className={`${s.overlay} ${className}`} style={style} onClick={onClick}>
    {children}
  </div>
);

// Паттерн: Style component - компонент для стилизации окна
interface StyledModalWindowProps {
  children: ReactNode;
  size: Sizes;
  className?: string;
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent) => void;
}

const StyledModalWindow: FC<StyledModalWindowProps> = ({ children, size, className = '', style = {}, onClick }) => {
  const sizeClass = s[size] || s.medium;

  return (
    <div className={`${s.window} ${sizeClass} ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

// Паттерн: Children pass-through - компонент для заголовка
interface ModalHeaderProps {
  title?: string;
  showCloseButton: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title, showCloseButton, onClose, children }) => {
  if (!title && !showCloseButton && !children) return null;

  return (
    <div className={s.header}>
      {title && <h2 className={s.title}>{title}</h2>}
      {/* Паттерн: Children pass-through */}
      {children}
      {/* Паттерн: Conditional rendering */}
      {showCloseButton && (
        <button className={s.closeButton} type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
      )}
    </div>
  );
};

// Паттерн: merge destructured props with other values
const DEFAULT_PROPS = {
  size: Sizes.medium,
  showCloseButton: true,
  closeOnOverlayClick: true,
};

export const Modal: FC<ModalProps> = (props) => {
  // Паттерн: destructuring props + merge destructured props with other values
  const {
    isOpen,
    children,
    onClose,
    size,
    title,
    showCloseButton,
    closeOnOverlayClick,
    className = '',
    overlayClassName = '',
    contentClassName = '',
    style = {},
    overlayStyle = {},
    contentStyle = {},
    ...restProps
  } = { ...DEFAULT_PROPS, ...props };

  // Обработка ESC для закрытия модалки
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокируем скролл body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  const handleWindowClick = useCallback((e: React.MouseEvent) => {
    // Предотвращаем закрытие при клике внутри модалки
    e.stopPropagation();
  }, []);

  // Паттерн: Children types - рендер разных типов children
  const renderChildren = useCallback(() => {
    if (typeof children === 'function') {
      return children(onClose);
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => <div key={index}>{child}</div>);
    }

    return children;
  }, [children, onClose]);

  // Паттерн: Conditional rendering
  if (!isOpen) return null;

  return createPortal(
    <StyledOverlay onClick={handleOverlayClick} className={overlayClassName} style={overlayStyle}>
      <StyledModalWindow
        size={size}
        className={className}
        style={style}
        onClick={handleWindowClick}
        {...restProps} // Паттерн: JSX spread attributes
      >
        <ModalHeader title={title} showCloseButton={showCloseButton} onClose={onClose} />

        <div className={`${s.content} ${contentClassName}`} style={contentStyle}>
          {/* Паттерн: Children pass-through */}
          {renderChildren()}
        </div>
      </StyledModalWindow>
    </StyledOverlay>,
    document.body
  );
};
