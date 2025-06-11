import { faker } from '@faker-js/faker';
import { Transaction } from '../../finance/types';

export const randomDate = (): string => {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

export const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, () => generateTransaction());
};

const generateTransaction = (): Transaction => {
  return {
    amount: faker.number.int({ min: -100000, max: 100000 }),
    category: faker.commerce.department(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  };
};

export const mockTransactions: Transaction[] = generateTransactions(10);

export const mockTransactions2: Transaction[] = [
  // Доходы
  {
    amount: 75000,
    category: 'Зарплата',
    title: 'Заработная плата за декабрь',
    description:
      'Основная заработная плата за декабрь 2024 года, включая новогоднюю премию и бонус за перевыполнение плана.',
  },
  {
    amount: 25000,
    category: 'Фриланс',
    title: 'Разработка мобильного приложения',
    description:
      'Оплата за разработку мобильного приложения для стартапа. Проект включал UI/UX дизайн, разработку на React Native и интеграцию с API.',
  },
  {
    amount: 12000,
    category: 'Инвестиции',
    title: 'Дивиденды от акций',
    description: 'Квартальные дивиденды от портфеля акций российских и зарубежных компаний.',
  },
  {
    amount: 8500,
    category: 'Подработка',
    title: 'Консультация по веб-разработке',
    description: 'Консультационные услуги по архитектуре веб-приложения и выбору технологического стека.',
  },
  {
    amount: 15000,
    category: 'Продажа',
    title: 'Продажа старого ноутбука',
    description: 'Продажа MacBook Air 2020 года через маркетплейс. Ноутбук был в отличном состоянии.',
  },

  // Расходы на жилье и коммунальные услуги
  {
    amount: -18000,
    category: 'Жилье',
    title: 'Коммунальные платежи',
    description: 'Оплата за электричество, газ, воду и интернет за декабрь. Включает отопление в зимний период.',
  },
  {
    amount: -35000,
    category: 'Жилье',
    title: 'Аренда квартиры',
    description: 'Ежемесячная арендная плата за двухкомнатную квартиру в центре города.',
  },

  // Расходы на продукты и еду
  {
    amount: -4200,
    category: 'Продукты',
    title: 'Продукты на неделю',
    description:
      'Еженедельная покупка продуктов: мясо, рыба, овощи, фрукты, молочные продукты, крупы и хлебобулочные изделия.',
  },
  {
    amount: -2800,
    category: 'Рестораны',
    title: 'Ужин в ресторане',
    description: 'Празднование дня рождения в итальянском ресторане с семьей. Заказывали пиццу, пасту и десерты.',
  },
  {
    amount: -850,
    category: 'Кафе',
    title: 'Кофе с коллегами',
    description: 'Деловая встреча в кофейне с коллегами по проекту. Обсуждали техническое задание.',
  },

  // Транспорт
  {
    amount: -15000,
    category: 'Транспорт',
    title: 'Техническое обслуживание авто',
    description: 'Плановое ТО автомобиля: замена масла и фильтров, проверка тормозной системы, диагностика двигателя.',
  },
  {
    amount: -3500,
    category: 'Транспорт',
    title: 'Заправка автомобиля',
    description: 'Заправка полного бака бензином АИ-95. Цена за литр составила 52 рубля.',
  },
  {
    amount: -1200,
    category: 'Транспорт',
    title: 'Поездка на такси',
    description: 'Поездка на такси в аэропорт ранним утром. Дорога заняла 45 минут.',
  },

  // Техника и гаджеты
  {
    amount: -89000,
    category: 'Техника',
    title: 'iPhone 15 Pro',
    description:
      'Покупка нового смартфона iPhone 15 Pro 256GB в цвете Natural Titanium с расширенной гарантией AppleCare+.',
  },
  {
    amount: -12000,
    category: 'Техника',
    title: 'Беспроводные наушники',
    description: 'AirPods Pro 2-го поколения с активным шумоподавлением для работы и развлечений.',
  },
  {
    amount: -25000,
    category: 'Техника',
    title: 'Монитор для работы',
    description: 'Покупка 27-дюймового 4K монитора Dell для повышения продуктивности работы из дома.',
  },
];
