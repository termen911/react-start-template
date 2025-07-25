import { DatabaseInterface, Discount, Product, ProductType, User, UserType } from '../types';

export class DatabaseMock implements DatabaseInterface {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private discounts: Discount[] = [];

  constructor() {
    // Инициализация тестовых данных
    this.initializeTestData();
  }

  private initializeTestData(): void {
    // Тестовые пользователи
    this.users.set('user1', { id: 'user1', name: 'Standard User', type: UserType.STANDARD });
    this.users.set('user2', { id: 'user2', name: 'Premium User', type: UserType.PREMIUM });
    this.users.set('user3', { id: 'user3', name: 'Gold User', type: UserType.GOLD });
    this.users.set('user4', { id: 'user4', name: 'Free User', type: UserType.FREE });

    // Тестовые товары
    this.products.set('product1', { id: 'product1', name: 'BMW X5', type: ProductType.CAR, price: 50000 });
    this.products.set('product2', { id: 'product2', name: 'LEGO Set', type: ProductType.TOY, price: 100 });
    this.products.set('product3', { id: 'product3', name: 'Pizza', type: ProductType.FOOD, price: 20 });

    // Базовые скидки для типов пользователей
    this.discounts = [
      { userType: UserType.STANDARD, percentage: 5 },
      { userType: UserType.PREMIUM, percentage: 10 },
      { userType: UserType.GOLD, percentage: 20 },
      { userType: UserType.FREE, percentage: 0 },
    ];
  }

  async getUser(userId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }

  async getProduct(productId: string): Promise<Product> {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return product;
  }

  async getDiscounts(): Promise<Discount[]> {
    return [...this.discounts];
  }

  async setDiscount(discount: Discount): Promise<void> {
    // Ищем существующую скидку для замены
    const existingIndex = this.discounts.findIndex(
      (d) => d.userType === discount.userType && d.productType === discount.productType
    );

    if (existingIndex !== -1) {
      this.discounts[existingIndex] = discount;
    } else {
      this.discounts.push(discount);
    }
  }

  // Вспомогательные методы для тестирования
  reset(): void {
    this.users.clear();
    this.products.clear();
    this.discounts = [];
    this.initializeTestData();
  }

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  addProduct(product: Product): void {
    this.products.set(product.id, product);
  }

  clearDiscounts(): void {
    this.discounts = [];
  }
}
