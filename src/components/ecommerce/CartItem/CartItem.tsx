import React, { FC } from 'react';
import { CartItemProps } from '../types';
import s from './CartItem.module.css';

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { name, description, price, image, quantity } = item;
  const totalPrice = price * quantity;

  return (
    <div className={s.cartItem}>
      <div className={s.imageContainer}>
        <img src={image} alt={name} className={s.image} />
      </div>

      <div className={s.content}>
        <div className={s.header}>
          <h3 className={s.name}>{name}</h3>
          <button
            className={s.removeButton}
            onClick={() => alert('Удалить из корзины')}
            title="Удалить из корзины"
            aria-label="Удалить товар из корзины"
          >
            ✕
          </button>
        </div>

        <p className={s.description}>{description}</p>

        <div className={s.footer}>
          <div className={s.quantity}>
            Количество: <span className={s.quantityValue}>{quantity}</span>
          </div>
          <div className={s.pricing}>
            <div className={s.unitPrice}>{price.toLocaleString('ru-RU')} ₽ за шт.</div>
            <div className={s.totalPrice}>{totalPrice.toLocaleString('ru-RU')} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};
