import React, { FC } from 'react';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { ProductBriefProps } from '../types';
import s from './ProductBrief.module.css';

export const ProductBrief: FC<ProductBriefProps> = ({ product, maxDescriptionLength = 80 }) => {
  const { name, description, price, image } = product;

  const truncatedDescription =
    description.length > maxDescriptionLength ? `${description.slice(0, maxDescriptionLength)}...` : description;

  return (
    <div className={s.productBrief}>
      <div className={s.imageContainer}>
        <img src={image} alt={name} className={s.image} />
      </div>

      <div className={s.content}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.description}>{truncatedDescription}</p>

        <div className={s.footer}>
          <div className={s.price}>{price.toLocaleString('ru-RU')} ₽</div>
          <AddToCartButton count={0} />
        </div>
      </div>
    </div>
  );
};
