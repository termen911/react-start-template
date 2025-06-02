import React, { FC } from 'react';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { ProductFullProps } from '../types';
import s from './ProductFull.module.css';

export const ProductFull: FC<ProductFullProps> = ({ product }) => {
  const { name, description, price, image, category } = product;

  return (
    <div className={s.productFull}>
      <div className={s.imageSection}>
        <div className={s.imageContainer}>
          <img src={image} alt={name} className={s.image} />
        </div>
      </div>

      <div className={s.contentSection}>
        <div className={s.header}>
          <div className={s.categoryBadge}>{category}</div>
          <h1 className={s.name}>{name}</h1>
          <div className={s.price}>{price.toLocaleString('ru-RU')} ₽</div>
        </div>

        <div className={s.description}>
          <h3 className={s.descriptionTitle}>Описание:</h3>
          <p className={s.descriptionText}>{description}</p>
        </div>

        <div className={s.actions}>
          <AddToCartButton count={0} />
        </div>
      </div>
    </div>
  );
};
