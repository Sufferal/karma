import { LOWEST_PRIORITY, TodoPriority } from '../store/slices/todoSlice';

export const isTodoPriority = (num: number): num is TodoPriority => {
  const priorityValues = [1, 2, 3, 4];
  return priorityValues.includes(num);
};

export const getPriorityFromText = (text: string): TodoPriority => {
  const currPriority = Number(getBetweenBrackets(text));

  if (isTodoPriority(currPriority)) {
    return currPriority;
  }

  return LOWEST_PRIORITY;
};

export const getBetweenBrackets = (text: string) => {
  const startIndex = text.indexOf('[');
  const endIndex = text.indexOf(']');

  if (startIndex === -1 || endIndex === -1) return null;

  return text.slice(startIndex + 1, endIndex);
};

export const displayFormattedTodo = (text: string) => {
  const currPriority = Number(getBetweenBrackets(text));

  if (isTodoPriority(currPriority)) {
    return text.replaceAll(`[${currPriority}]`, '');
  }

  return text;
};
