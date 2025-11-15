/**
 * @example
 * const someDate = new Date(2025, 6, 16); // July 16, 2025 (months are 0-based)
 * const formatted = formatDate(someDate);
 * console.log(formatted); // "2025-07-16"
 */
export const formatDate = date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

/**
 * @example
 * const today = getCurrentDate();
 * console.log(today); // "2025-07-16"
 */
export const getCurrentDate = () => {
  return formatDate(new Date());
};

/**
 * @example
 * const fiveYearsLater = getYearDate(5);
 * console.log(fiveYearsLater); // e.g. "2030-07-16"
 */
export const getYearDate = years => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return formatDate(date);
};

// console.log(getMonthName("07")); // → July
// console.log(getMonthName("07", "fr-FR")); // → juillet
export const getMonthName = (monthStr, locale = 'en-US') => {
  const date = new Date(2000, parseInt(monthStr, 10) - 1, 1);
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
};

export const formatDeadline = (deadline = '') => {
  return deadline
    .split('-')
    .reverse()
    .map((el, index) => {
      return index === 1 ? `${getMonthName(el)}, ` : el;
    })
    .join(' ');
};
