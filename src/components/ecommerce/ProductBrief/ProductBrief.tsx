import React, { FC, ReactNode } from 'react';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { ProductBriefProps } from '../types';
import s from './ProductBrief.module.css';

// Паттерн: Style component - компонент для стилизации
interface StyledProductBriefProps {
  children: ReactNode;
  variant: 'default' | 'compact' | 'detailed';
  className?: string;
  style?: React.CSSProperties;
}

const StyledProductBrief: FC<StyledProductBriefProps> = ({ children, variant, className = '', style = {} }) => {
  const variantClass = s[variant] || s.default;
  return (
    <div className={`${s.productBrief} ${variantClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

// Паттерн: Proxy component - компонент-прокси для передачи пропсов
interface ProductImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

const ProductImage: FC<ProductImageProps> = ({ src, alt, onClick, className = '' }) => (
  <div className={`${s.imageContainer} ${className}`}>
    <img
      src={src}
      alt={alt}
      className={s.image}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    />
  </div>
);

// Паттерн: merge destructured props with other values
const DEFAULT_PROPS = {
  maxDescriptionLength: 80,
  variant: 'default' as const,
  showImage: true,
  showDescription: true,
  onProductClick: () => {},
};

export const ProductBrief: FC<ProductBriefProps> = (props) => {
  // Паттерн: destructuring props + merge destructured props with other values
  const {
    product,
    maxDescriptionLength,
    variant,
    showImage,
    showDescription,
    onProductClick,
    className,
    style,
    ...restProps
  } = { ...DEFAULT_PROPS, ...props };

  // Паттерн: destructuring props для продукта
  const { name, description, price, image } = product;

  const truncatedDescription =
    showDescription && description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  const handleProductClick = () => {
    onProductClick(product);
  };

  return (
    <StyledProductBrief
      variant={variant}
      className={className}
      style={style}
      {...restProps} // Паттерн: JSX spread attributes
    >
      {/* Паттерн: conditional rendering */}
      {showImage && (
        <ProductImage
          src={image}
          alt={name}
          onClick={handleProductClick}
          className={variant === 'compact' ? s.compactImage : ''}
        />
      )}

      <div className={s.content}>
        <h3 className={s.name} onClick={handleProductClick} style={{ cursor: 'pointer' }}>
          {name}
        </h3>

        {/* Паттерн: conditional rendering */}
        {showDescription && description && <p className={s.description}>{truncatedDescription}</p>}

        <div className={s.footer}>
          <div className={s.price}>{price.toLocaleString('ru-RU')} ₽</div>
          <AddToCartButton count={0} />
        </div>
      </div>
    </StyledProductBrief>
  );
};
