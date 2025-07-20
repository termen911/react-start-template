export type DateFormatOptions = {
  includeTime?: boolean;
  includeWeekday?: boolean;
  short?: boolean;
};

export const formatDateFull = (date: string | Date, locale = 'ru'): string =>
  new Date(date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
