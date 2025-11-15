import { v4 as uuidv4 } from 'uuid';

export const MOCK_TODOS = [
  {
    id: uuidv4(),
    name: 'Meditate',
    category: 'Today',
    isCompleted: false,
  },
];
