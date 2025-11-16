import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../store/slices/todoSlice';

export const MOCK_TODOS: Todo[] = [
  {
    id: uuidv4(),
    name: 'Meditate',
  },
  {
    id: uuidv4(),
    name: 'Read',
  },
  {
    id: uuidv4(),
    name: 'Run',
  },
];
