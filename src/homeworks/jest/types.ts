// Типы пользователей
export enum UserType {
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
  GOLD = 'Gold',
  FREE = 'Free',
}

// Типы товаров
export enum ProductType {
  CAR = 'Car',
  TOY = 'Toy',
  FOOD = 'Food',
}

// Интерфейс пользователя
export interface User {
  id: string;
  name: string;
  type: UserType;
}

// Интерфейс товара
export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
}

// Интерфейс скидки
export interface Discount {
  userType: UserType;
  productType?: ProductType; // Если не указан, то общая скидка на все товары
  percentage: number;
}

// Интерфейс для работы с базой данных
export interface DatabaseInterface {
  getUser(userId: string): Promise<User>;
  getProduct(productId: string): Promise<Product>;
  getDiscounts(): Promise<Discount[]>;
  setDiscount(discount: Discount): Promise<void>;
}

// Интерфейс результата расчета скидки
export interface DiscountResult {
  originalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  appliedDiscounts: {
    generalDiscount: number;
    productSpecificDiscount: number;
  };
}
