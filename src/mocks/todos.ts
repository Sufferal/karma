import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../store/slices/todoSlice';

export const MOCK_TODOS: Todo[] = [
  {
    id: uuidv4(),
    name: 'Read [4]',
    priority: 4,
    status: 'idle',
  },
  {
    id: uuidv4(),
    name: 'Run [3]',
    priority: 3,
    status: 'idle',
  },
  {
    id: uuidv4(),
    name: 'Observe [2]',
    priority: 2,
    status: 'idle',
  },
  {
    id: uuidv4(),
    name: 'Meditate [1]',
    priority: 1,
    status: 'idle',
  },
];
