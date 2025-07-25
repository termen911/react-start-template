import { DatabaseInterface, Discount, DiscountResult, ProductType, UserType } from './types';

export class AccountService {
  constructor(private database: DatabaseInterface) {}

  /**
   * Рассчитывает итоговую скидку для пользователя и товара
   */
  async calculateDiscount(userId: string, productId: string): Promise<DiscountResult> {
    // Получаем данные пользователя и товара
    const user = await this.database.getUser(userId);
    const product = await this.database.getProduct(productId);

    // Получаем все скидки из базы данных
    const discounts = await this.database.getDiscounts();

    // Находим общую скидку для типа пользователя
    const generalDiscount = discounts.find((discount) => discount.userType === user.type && !discount.productType);

    // Находим специальную скидку для конкретного типа товара
    const productSpecificDiscount = discounts.find(
      (discount) => discount.userType === user.type && discount.productType === product.type
    );

    const generalDiscountPercentage = generalDiscount?.percentage || 0;
    const productSpecificDiscountPercentage = productSpecificDiscount?.percentage || 0;

    // Суммируем скидки
    const totalDiscountPercentage = Math.min(100, generalDiscountPercentage + productSpecificDiscountPercentage);

    // Рассчитываем итоговую скидку и цену
    const totalDiscount = Math.min(product.price, (product.price * totalDiscountPercentage) / 100);
    const finalPrice = product.price - totalDiscount;

    return {
      originalPrice: product.price,
      totalDiscount,
      finalPrice,
      appliedDiscounts: {
        generalDiscount: generalDiscountPercentage,
        productSpecificDiscount: productSpecificDiscountPercentage,
      },
    };
  }

  /**
   * Устанавливает скидку для конкретного типа товара и пользователя
   */
  async setProductSpecificDiscount(userType: UserType, productType: ProductType, percentage: number): Promise<void> {
    if (percentage < 0) {
      throw new Error('Discount percentage cannot be negative');
    }

    const discount: Discount = {
      userType,
      productType,
      percentage,
    };

    await this.database.setDiscount(discount);
  }

  /**
   * Устанавливает общую скидку для типа пользователя
   */
  async setGeneralDiscount(userType: UserType, percentage: number): Promise<void> {
    if (percentage < 0) {
      throw new Error('Discount percentage cannot be negative');
    }

    const discount: Discount = {
      userType,
      percentage,
    };

    await this.database.setDiscount(discount);
  }

  /**
   * Возвращает все скидки из базы данных
   */
  async getAllDiscounts(): Promise<Discount[]> {
    return await this.database.getDiscounts();
  }

  /**
   * Возвращает скидки для конкретного типа пользователя
   */
  async getDiscountsForUserType(userType: UserType): Promise<Discount[]> {
    const allDiscounts = await this.database.getDiscounts();
    return allDiscounts.filter((discount) => discount.userType === userType);
  }

  /**
   * Возвращает специальную скидку для конкретного типа товара и пользователя
   */
  async getProductSpecificDiscount(userType: UserType, productType: ProductType): Promise<Discount | null> {
    const allDiscounts = await this.database.getDiscounts();
    const discount = allDiscounts.find((d) => d.userType === userType && d.productType === productType);
    return discount || null;
  }

  /**
   * Возвращает общую скидку для типа пользователя
   */
  async getGeneralDiscount(userType: UserType): Promise<Discount | null> {
    const allDiscounts = await this.database.getDiscounts();
    const discount = allDiscounts.find((d) => d.userType === userType && !d.productType);
    return discount || null;
  }
}
