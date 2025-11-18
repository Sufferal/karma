import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_TODOS } from '../../mocks/todos';

export type Todo = {
  id: string;
  name: string;
  priority: TodoPriority;
  status: TodoStatus;
};

export type TodoPriority = 1 | 2 | 3 | 4;
export const HIGHEST_PRIORITY: TodoPriority = 1;
export const LOWEST_PRIORITY: TodoPriority = 4;
export type TodoStatus = 'idle' | 'active';
export const DEFAULT_TODO_STATUS: TodoStatus = 'idle';

export type TodoState = {
  items: Todo[];
};

const initialState: TodoState = {
  items: MOCK_TODOS,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    edit: (state, action: PayloadAction<Todo>) => {
      const newTodo = action.payload;
      const existingTodo = state.items.find(todo => todo.id === newTodo.id);

      if (existingTodo) {
        state.items = state.items.map(todo =>
          todo.id === newTodo.id ? newTodo : todo
        );
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const removeTodoId = action.payload;
      const existingTodo = state.items.find(todo => todo.id === removeTodoId);

      if (existingTodo) {
        state.items = state.items.filter(todo => todo.id !== removeTodoId);
      }
    },
  },
});

export const { add, edit, remove } = todoSlice.actions;
export default todoSlice.reducer;
