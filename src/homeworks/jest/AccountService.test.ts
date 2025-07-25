import { AccountService } from './AccountService';
import { DatabaseMock } from './mocks/DatabaseMock';
import { ProductType, UserType } from './types';

describe('AccountService', () => {
  let accountService: AccountService;
  let databaseMock: DatabaseMock;

  beforeEach(() => {
    databaseMock = new DatabaseMock();
    accountService = new AccountService(databaseMock);
  });

  describe('Базовые скидки для типов пользователей', () => {
    test('Standard пользователь должен получать 5% скидку', async () => {
      const result = await accountService.calculateDiscount('user1', 'product1');

      expect(result.appliedDiscounts.generalDiscount).toBe(5);
      expect(result.totalDiscount).toBe(2500);
      expect(result.finalPrice).toBe(47500);
    });

    test('Premium пользователь должен получать 10% скидку', async () => {
      const result = await accountService.calculateDiscount('user2', 'product1');

      expect(result.appliedDiscounts.generalDiscount).toBe(10);
      expect(result.totalDiscount).toBe(5000);
      expect(result.finalPrice).toBe(45000);
    });

    test('Gold пользователь должен получать 20% скидку', async () => {
      const result = await accountService.calculateDiscount('user3', 'product1');

      expect(result.appliedDiscounts.generalDiscount).toBe(20);
      expect(result.totalDiscount).toBe(10000);
      expect(result.finalPrice).toBe(40000);
    });

    test('Free пользователь должен получать 0% скидку', async () => {
      const result = await accountService.calculateDiscount('user4', 'product1');

      expect(result.appliedDiscounts.generalDiscount).toBe(0);
      expect(result.totalDiscount).toBe(0);
      expect(result.finalPrice).toBe(50000);
    });
  });

  describe('Специальные скидки для конкретных типов товаров', () => {
    beforeEach(async () => {
      // Устанавливаем специальные скидки для конкретных товаров
      await accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.CAR, 15);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.TOY, 25);
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.FOOD, 30);
    });

    test('Standard пользователь должен получать специальную скидку на автомобили', async () => {
      const result = await accountService.calculateDiscount('user1', 'product1');

      expect(result.appliedDiscounts.generalDiscount).toBe(5);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(15);
      expect(result.totalDiscount).toBe(10000);
      expect(result.finalPrice).toBe(40000);
    });

    test('Premium пользователь должен получать специальную скидку на игрушки', async () => {
      const result = await accountService.calculateDiscount('user2', 'product2');

      expect(result.appliedDiscounts.generalDiscount).toBe(10);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(25);
      expect(result.totalDiscount).toBe(35);
      expect(result.finalPrice).toBe(65);
    });

    test('Gold пользователь должен получать специальную скидку на еду', async () => {
      const result = await accountService.calculateDiscount('user3', 'product3');

      expect(result.appliedDiscounts.generalDiscount).toBe(20);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(30);
      expect(result.totalDiscount).toBe(10);
      expect(result.finalPrice).toBe(10);
    });

    test('Пользователь без специальной скидки должен получать только общую скидку', async () => {
      const result = await accountService.calculateDiscount('user1', 'product2');

      expect(result.appliedDiscounts.generalDiscount).toBe(5);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(0);
      expect(result.totalDiscount).toBe(5);
      expect(result.finalPrice).toBe(95);
    });
  });

  describe('Суммирование скидок', () => {
    beforeEach(async () => {
      // Устанавливаем специальные скидки для тестирования суммирования
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.CAR, 15);
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.TOY, 10);
    });

    test('Скидки должны суммироваться правильно', async () => {
      const result = await accountService.calculateDiscount('user2', 'product1');

      expect(result.appliedDiscounts.generalDiscount).toBe(10);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(15);
      expect(result.totalDiscount).toBe(12500);
      expect(result.finalPrice).toBe(37500);
    });

    test('Максимальная скидка не должна превышать 100%', async () => {
      // Устанавливаем очень большие скидки
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.CAR, 90);

      const result = await accountService.calculateDiscount('user3', 'product1');

      expect(result.totalDiscount).toBe(50000);
      expect(result.finalPrice).toBe(0);
    });

    test('Общая скидка больше 100% должна ограничиваться стоимостью товара', async () => {
      // Устанавливаем общую скидку больше 100%
      await accountService.setGeneralDiscount(UserType.PREMIUM, 150);

      const result = await accountService.calculateDiscount('user2', 'product2');

      expect(result.appliedDiscounts.generalDiscount).toBe(150);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(0);
      expect(result.totalDiscount).toBe(100);
      expect(result.finalPrice).toBe(0);
    });

    test('Специальная скидка больше 100% должна ограничиваться стоимостью товара', async () => {
      // Устанавливаем специальную скидку больше 100%
      await accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.FOOD, 120);

      const result = await accountService.calculateDiscount('user1', 'product3');

      expect(result.appliedDiscounts.generalDiscount).toBe(5);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(120);
      expect(result.totalDiscount).toBe(20);
      expect(result.finalPrice).toBe(0);
    });
  });

  describe('Обработка ошибок', () => {
    test('Должна выбрасывать ошибку для несуществующего пользователя', async () => {
      await expect(accountService.calculateDiscount('nonexistent', 'product1')).rejects.toThrow(
        'User with id nonexistent not found'
      );
    });

    test('Должна выбрасывать ошибку для несуществующего товара', async () => {
      await expect(accountService.calculateDiscount('user1', 'nonexistent')).rejects.toThrow(
        'Product with id nonexistent not found'
      );
    });

    test('Должна валидировать отрицательные скидки', async () => {
      await expect(accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.CAR, -10)).rejects.toThrow(
        'Discount percentage cannot be negative'
      );
    });
  });

  describe('Управление скидками', () => {
    test('Должна устанавливать новую скидку для конкретного товара', async () => {
      await accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.FOOD, 12);

      const result = await accountService.calculateDiscount('user1', 'product3');
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(12);
    });

    test('Должна обновлять существующую скидку', async () => {
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.CAR, 15);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.CAR, 25);

      const result = await accountService.calculateDiscount('user2', 'product1');
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(25);
    });

    test('Должна возвращать все скидки', async () => {
      await accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.CAR, 15);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.TOY, 20);

      const discounts = await accountService.getAllDiscounts();
      expect(discounts.length).toBeGreaterThan(0);

      const carDiscount = discounts.find((d) => d.userType === UserType.STANDARD && d.productType === ProductType.CAR);
      expect(carDiscount?.percentage).toBe(15);
    });
  });

  describe('Граничные случаи', () => {
    test('Должна корректно обрабатывать товары с нулевой стоимостью', async () => {
      databaseMock.addProduct({ id: 'free-product', name: 'Free Item', type: ProductType.TOY, price: 0 });

      const result = await accountService.calculateDiscount('user1', 'free-product');
      expect(result.originalPrice).toBe(0);
      expect(result.finalPrice).toBe(0);
      expect(result.totalDiscount).toBe(0);
    });

    test('Должна корректно обрабатывать 100% скидку', async () => {
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.FOOD, 80);

      const result = await accountService.calculateDiscount('user3', 'product3');
      expect(result.finalPrice).toBe(0);
    });
  });
});
