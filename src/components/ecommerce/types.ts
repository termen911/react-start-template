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

// Обновленный интерфейс с контролируемыми пропсами и event switch
export interface AddToCartButtonProps {
  count: number;
  onAdd?: () => void;
  onRemove?: () => void;
  onCountChange?: (count: number) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface ProductBriefProps {
  product: Product;
  maxDescriptionLength?: number;
  variant?: 'default' | 'compact' | 'detailed';
  showImage?: boolean;
  showDescription?: boolean;
  onProductClick?: (product: Product) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface ProductFullProps {
  product: Product;
}

export interface CartItemProps {
  item: CartItem;
}
