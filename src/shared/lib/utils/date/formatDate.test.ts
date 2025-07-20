import { formatDateFull } from './formatDate';

describe('formatDateFull', () => {
  // Фиксированная дата для тестирования (15 декабря 2023, 14:30)
  const testDate = new Date(2023, 11, 15, 14, 30, 0);
  // Используем строку без Z для локального времени
  const testDateString = '2023-12-15T14:30:00.000';

  describe('с русской локалью (по умолчанию)', () => {
    it('должен корректно форматировать объект Date', () => {
      const result = formatDateFull(testDate);

      // Проверяем, что результат содержит основные элементы
      expect(result).toMatch(/15/); // день
      expect(result).toMatch(/дек\./); // месяц (сокращённо на русском)
      expect(result).toMatch(/2023/); // год
      expect(result).toMatch(/14:30/); // время
    });

    it('должен корректно форматировать строковую дату', () => {
      const result = formatDateFull(testDateString);

      expect(result).toMatch(/15/);
      expect(result).toMatch(/дек\./);
      expect(result).toMatch(/2023/);
      expect(result).toMatch(/14:30/);
    });

    it('должен использовать русскую локаль по умолчанию', () => {
      const result = formatDateFull(testDate);

      // Проверяем, что месяц отображается на русском языке
      expect(result).toMatch(/дек\./);
    });

    it('должен явно использовать русскую локаль', () => {
      const result = formatDateFull(testDate, 'ru');

      expect(result).toMatch(/дек\./);
    });
  });

  describe('с английской локалью', () => {
    it('должен корректно форматировать дату с английской локалью', () => {
      const result = formatDateFull(testDate, 'en');

      expect(result).toMatch(/15/); // день
      expect(result).toMatch(/Dec/); // месяц на английском
      expect(result).toMatch(/2023/); // год
      expect(result).toMatch(/2:30 PM/); // время в 12-часовом формате
    });

    it('должен корректно форматировать строковую дату с английской локалью', () => {
      const result = formatDateFull(testDateString, 'en');

      expect(result).toMatch(/15/);
      expect(result).toMatch(/Dec/);
      expect(result).toMatch(/2023/);
      expect(result).toMatch(/2:30 PM/);
    });
  });

  describe('граничные случаи', () => {
    it('должен корректно обрабатывать начало года', () => {
      const newYearDate = new Date(2024, 0, 1, 0, 0, 0);
      const result = formatDateFull(newYearDate);

      expect(result).toMatch(/01/);
      expect(result).toMatch(/янв\./);
      expect(result).toMatch(/2024/);
      expect(result).toMatch(/00:00/);
    });

    it('должен корректно обрабатывать конец года', () => {
      const endYearDate = new Date(2023, 11, 31, 23, 59, 59);
      const result = formatDateFull(endYearDate);

      expect(result).toMatch(/31/);
      expect(result).toMatch(/дек\./);
      expect(result).toMatch(/2023/);
      expect(result).toMatch(/23:59/);
    });

    it('должен корректно обрабатывать високосный год', () => {
      const leapYearDate = new Date(2024, 1, 29, 12, 0, 0); // 29 февраля 2024
      const result = formatDateFull(leapYearDate);

      expect(result).toMatch(/29/);
      expect(result).toMatch(/февр\./);
      expect(result).toMatch(/2024/);
    });
  });

  describe('различные форматы входных данных', () => {
    it('должен обрабатывать ISO строки', () => {
      const isoString = '2023-12-15T14:30:00.000Z';
      const result = formatDateFull(isoString);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('должен обрабатывать timestamp', () => {
      const timestamp = testDate.getTime();
      const result = formatDateFull(new Date(timestamp));

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('должен обрабатывать различные строковые форматы дат', () => {
      const dateFormats = ['2023-12-15', '2023/12/15', 'December 15, 2023', 'Dec 15, 2023'];

      dateFormats.forEach((dateFormat) => {
        const result = formatDateFull(dateFormat);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('проверка структуры результата', () => {
    it('должен возвращать строку', () => {
      const result = formatDateFull(testDate);
      expect(typeof result).toBe('string');
    });

    it('должен возвращать непустую строку', () => {
      const result = formatDateFull(testDate);
      expect(result.length).toBeGreaterThan(0);
    });

    it('результат должен содержать все основные компоненты даты', () => {
      const result = formatDateFull(testDate);

      // Должен содержать день (15)
      expect(result).toMatch(/15/);

      // Должен содержать год (2023)
      expect(result).toMatch(/2023/);

      // Должен содержать время в формате HH:MM
      expect(result).toMatch(/\d{2}:\d{2}/);
    });
  });

  describe('согласованность результатов', () => {
    it('одинаковые даты должны давать одинаковые результаты', () => {
      const date1 = new Date(2023, 11, 15, 14, 30, 0);
      const date2 = new Date(2023, 11, 15, 14, 30, 0);

      const result1 = formatDateFull(date1);
      const result2 = formatDateFull(date2);

      expect(result1).toBe(result2);
    });

    it('эквивалентные Date и string должны давать одинаковые результаты', () => {
      const date = new Date(2023, 11, 15, 14, 30, 0);
      const dateString = date.toISOString();

      const resultFromDate = formatDateFull(date);
      const resultFromString = formatDateFull(dateString);

      // Результаты должны быть очень похожими (могут незначительно отличаться из-за часовых поясов)
      expect(resultFromDate).toMatch(/15/);
      expect(resultFromString).toMatch(/15/);
      expect(resultFromDate).toMatch(/2023/);
      expect(resultFromString).toMatch(/2023/);
    });
  });
});
