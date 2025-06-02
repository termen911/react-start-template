export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AddToCartButtonProps {
  count: number;
}

export interface ProductBriefProps {
  product: Product;
  maxDescriptionLength?: number;
}

export interface ProductFullProps {
  product: Product;
}

export interface CartItemProps {
  item: CartItem;
}
