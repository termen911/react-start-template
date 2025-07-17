import { AccountService } from './AccountService';
import { DatabaseMock } from './mocks/DatabaseMock';
import { ProductType, UserType } from './types';

describe('AccountService Integration Tests', () => {
  let accountService: AccountService;
  let databaseMock: DatabaseMock;

  beforeEach(() => {
    databaseMock = new DatabaseMock();
    accountService = new AccountService(databaseMock);
  });

  describe('Реальные сценарии использования', () => {
    test('Сценарий 1: Настройка скидочной системы для премиум пользователей', async () => {
      // Настраиваем систему скидок для премиум пользователей
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.CAR, 25);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.TOY, 30);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.FOOD, 15);

      // Проверяем применение скидок
      const carResult = await accountService.calculateDiscount('user2', 'product1');
      expect(carResult.appliedDiscounts.generalDiscount).toBe(10);
      expect(carResult.appliedDiscounts.productSpecificDiscount).toBe(25);
      expect(carResult.totalDiscount).toBe(17500);

      const toyResult = await accountService.calculateDiscount('user2', 'product2');
      expect(toyResult.appliedDiscounts.generalDiscount).toBe(10);
      expect(toyResult.appliedDiscounts.productSpecificDiscount).toBe(30);
      expect(toyResult.totalDiscount).toBe(40);

      const foodResult = await accountService.calculateDiscount('user2', 'product3');
      expect(foodResult.appliedDiscounts.generalDiscount).toBe(10);
      expect(foodResult.appliedDiscounts.productSpecificDiscount).toBe(15);
      expect(foodResult.totalDiscount).toBe(5);
    });

    test('Сценарий 2: Кампания по увеличению скидок на игрушки', async () => {
      // Увеличиваем скидки на игрушки для всех типов пользователей
      await accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.TOY, 20);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.TOY, 35);
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.TOY, 40);

      // Проверяем эффективность кампании
      const standardResult = await accountService.calculateDiscount('user1', 'product2');
      expect(standardResult.totalDiscount).toBe(25);

      const premiumResult = await accountService.calculateDiscount('user2', 'product2');
      expect(premiumResult.totalDiscount).toBe(45);

      const goldResult = await accountService.calculateDiscount('user3', 'product2');
      expect(goldResult.totalDiscount).toBe(60);
    });

    test('Сценарий 3: Обновление общих скидок для всех пользователей', async () => {
      // Обновляем общие скидки
      await accountService.setGeneralDiscount(UserType.STANDARD, 8);
      await accountService.setGeneralDiscount(UserType.PREMIUM, 15);
      await accountService.setGeneralDiscount(UserType.GOLD, 25);

      // Проверяем новые общие скидки
      const standardResult = await accountService.calculateDiscount('user1', 'product1');
      expect(standardResult.appliedDiscounts.generalDiscount).toBe(8);

      const premiumResult = await accountService.calculateDiscount('user2', 'product1');
      expect(premiumResult.appliedDiscounts.generalDiscount).toBe(15);

      const goldResult = await accountService.calculateDiscount('user3', 'product1');
      expect(goldResult.appliedDiscounts.generalDiscount).toBe(25);
    });
  });

  describe('Сложные сценарии с множественными скидками', () => {
    test('Максимальная скидка для Gold пользователя на автомобили', async () => {
      // Настраиваем максимальную скидку
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.CAR, 80);

      const result = await accountService.calculateDiscount('user3', 'product1');

      // Gold пользователь: 20% общая + 80% на автомобили = 100%
      expect(result.appliedDiscounts.generalDiscount).toBe(20);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(80);
      expect(result.totalDiscount).toBe(50000);
      expect(result.finalPrice).toBe(0);
    });

    test('Комбинация скидок для разных категорий товаров', async () => {
      // Настраиваем разные специальные скидки
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.CAR, 30);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.TOY, 25);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.FOOD, 35);

      // Добавляем новые товары для тестирования
      databaseMock.addProduct({ id: 'luxury-car', name: 'Mercedes S-Class', type: ProductType.CAR, price: 100000 });
      databaseMock.addProduct({ id: 'board-game', name: 'Monopoly', type: ProductType.TOY, price: 50 });
      databaseMock.addProduct({ id: 'restaurant-meal', name: 'Steak Dinner', type: ProductType.FOOD, price: 80 });

      const carResult = await accountService.calculateDiscount('user2', 'luxury-car');
      expect(carResult.totalDiscount).toBe(40000);

      const toyResult = await accountService.calculateDiscount('user2', 'board-game');
      expect(toyResult.totalDiscount).toBe(17.5);

      const foodResult = await accountService.calculateDiscount('user2', 'restaurant-meal');
      expect(foodResult.totalDiscount).toBe(36);
    });
  });

  describe('Тесты производительности и надежности', () => {
    test('Обработка большого количества скидок', async () => {
      // Создаем множество скидок для тестирования производительности
      const userTypes = [UserType.STANDARD, UserType.PREMIUM, UserType.GOLD];
      const productTypes = [ProductType.CAR, ProductType.TOY, ProductType.FOOD];

      for (const userType of userTypes) {
        for (const productType of productTypes) {
          await accountService.setProductSpecificDiscount(userType, productType, 10);
        }
      }

      // Проверяем, что система работает корректно
      const result = await accountService.calculateDiscount('user2', 'product1');
      expect(result.appliedDiscounts.generalDiscount).toBe(10);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(10);
      expect(result.totalDiscount).toBe(10000);
    });

    test('Валидация границ скидок', async () => {
      // Тестируем граничные значения
      await accountService.setProductSpecificDiscount(UserType.STANDARD, ProductType.CAR, 0);
      await accountService.setProductSpecificDiscount(UserType.PREMIUM, ProductType.CAR, 100);

      const standardResult = await accountService.calculateDiscount('user1', 'product1');
      expect(standardResult.appliedDiscounts.productSpecificDiscount).toBe(0);
      expect(standardResult.totalDiscount).toBe(2500);

      const premiumResult = await accountService.calculateDiscount('user2', 'product1');
      expect(premiumResult.appliedDiscounts.productSpecificDiscount).toBe(100);
      expect(premiumResult.totalDiscount).toBe(50000);
      expect(premiumResult.finalPrice).toBe(0);
    });
  });

  describe('Тесты на соответствие бизнес-логике', () => {
    test('Проверка бизнес-правил: Free пользователи не должны получать дополнительные скидки', async () => {
      // Пытаемся установить скидку для Free пользователей
      await accountService.setProductSpecificDiscount(UserType.FREE, ProductType.CAR, 10);

      const result = await accountService.calculateDiscount('user4', 'product1');

      // Free пользователь должен получить только специальную скидку, общая скидка = 0
      expect(result.appliedDiscounts.generalDiscount).toBe(0);
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(10);
      expect(result.totalDiscount).toBe(5000);
    });

    test('Проверка консистентности данных при множественных обновлениях', async () => {
      // Множественные обновления одной и той же скидки
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.CAR, 15);
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.CAR, 25);
      await accountService.setProductSpecificDiscount(UserType.GOLD, ProductType.CAR, 35);

      const result = await accountService.calculateDiscount('user3', 'product1');
      expect(result.appliedDiscounts.productSpecificDiscount).toBe(35);

      // Проверяем, что в базе данных только одна скидка для этой комбинации
      const discounts = await accountService.getAllDiscounts();
      const goldCarDiscounts = discounts.filter(
        (d) => d.userType === UserType.GOLD && d.productType === ProductType.CAR
      );
      expect(goldCarDiscounts.length).toBe(1);
      expect(goldCarDiscounts[0].percentage).toBe(35);
    });
  });
});
