/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

// Определение типов
export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

const enum OperationType {
  Cost = 'Cost',
  Profit = 'Profit',
}

export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: OperationType.Cost;
};

export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: OperationType.Profit;
};

export type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  // Список возможных категорий
  const categories: Category[] = [
    { id: '1', name: 'Электроника', photo: 'electronics.jpg' },
    { id: '2', name: 'Одежда', photo: 'clothes.jpg' },
    { id: '3', name: 'Книги' },
    { id: '4', name: 'Продукты', photo: 'food.jpg' },
    { id: '5', name: 'Спорт', photo: 'sports.jpg' },
  ];

  // Список возможных названий продуктов
  const productNames = [
    'Смартфон XS-12',
    'Футболка хлопковая',
    'Книга "Алгоритмы"',
    'Кроссовки беговые',
    'Кофемашина',
    'Наушники беспроводные',
    'Ноутбук 15"',
    'Рюкзак городской',
    'Куртка демисезонная',
    'Мышь компьютерная',
  ];

  // Выбираем случайные значения
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomName = productNames[Math.floor(Math.random() * productNames.length)];
  const price = Math.floor(Math.random() * 10000) + 500;
  const hasOldPrice = Math.random() > 0.5;
  const oldPrice = hasOldPrice ? price + Math.floor(Math.random() * 2000) : undefined;

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: randomName,
    photo: `product_${Math.floor(Math.random() * 10)}.jpg`,
    desc: Math.random() > 0.3 ? `Описание для ${randomName}` : undefined,
    createdAt,
    oldPrice,
    price,
    category: randomCategory,
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  // Список возможных категорий для операций
  const categories: Category[] = [
    { id: '1', name: 'Зарплата' },
    { id: '2', name: 'Еда', photo: 'food.jpg' },
    { id: '3', name: 'Транспорт' },
    { id: '4', name: 'Развлечения', photo: 'entertainment.jpg' },
    { id: '5', name: 'Подработка', photo: 'part-time.jpg' },
  ];

  // Список возможных названий для операций
  const costNames = ['Покупка продуктов', 'Оплата такси', 'Поход в кино', 'Оплата счетов', 'Покупка одежды'];

  const profitNames = ['Зарплата', 'Возврат денег', 'Подработка', 'Продажа вещей', 'Дивиденды'];

  // Случайно выбираем тип операции: Cost или Profit
  const isProfit = Math.random() > 0.5;

  // Выбираем случайную категорию в зависимости от типа
  const categoryIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[categoryIndex];

  // Для доходов обычно берем категории 0, 4, для трат - остальные
  const adjustedCategory = isProfit
    ? categoryIndex <= 1 || categoryIndex >= 4
      ? randomCategory
      : categories[0]
    : categoryIndex > 1 && categoryIndex < 4
    ? randomCategory
    : categories[1];

  // Выбираем случайное название в зависимости от типа
  const names = isProfit ? profitNames : costNames;
  const randomName = names[Math.floor(Math.random() * names.length)];

  // Генерируем случайную сумму
  const amount = Math.floor(Math.random() * 10000) + 100;

  // Общие свойства для обоих типов операций
  const baseOperation = {
    id: Math.random().toString(36).substr(2, 9),
    name: randomName,
    desc: Math.random() > 0.5 ? `Описание для ${randomName}` : undefined,
    createdAt,
    amount,
    category: adjustedCategory,
  };

  // Возвращаем операцию нужного типа
  if (isProfit) {
    return {
      ...baseOperation,
      type: OperationType.Profit,
    };
  } else {
    return {
      ...baseOperation,
      type: OperationType.Cost,
    };
  }
};
