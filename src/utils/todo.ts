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

export const getRandomCompleteMessage = () => {
  const completionMessages = [
    // Short & Punchy
    'cooked',
    'ez clap',
    'folded that task',
    'light work',
    'sent it',
    "that's so over",
    'donzo',
    'gg go next',
    'ez for papizi',
    'ez peasy lemon squeezy',
    'clean sweep',
    'smoked it',
    "gripped it n' ripped it.",

    // Slightly Chaotic Energy
    'task? bodied',
    'obliterated that thing',
    'mission deleted',
    'skill issue (for the task)',
    'l + ratio',
    'packed up',
    'sent to the shadow realm',
    'banished',

    // Funny Motivational
    'your brain cells leveled up',
    'productivity arc unlocked',
    'your ancestors are proud',
    'MONK mode activated',
    'your cortisol just dropped by 2%',
    'great work, king',
    'you dropped this king 👑',

    // Soft Aesthetic Vibes
    'done, darling 💅',
    'peace restored 😌',
    '✨ mission accomplished ✨',
    'the universe nods in approval',
  ];

  return completionMessages[
    Math.floor(Math.random() * completionMessages.length)
  ];
};
