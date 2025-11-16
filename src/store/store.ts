import { configureStore } from '@reduxjs/toolkit';
import todoReducer, { TodoState } from './slices/todoSlice';
import { loadState, saveState } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  // This is not the best solution. Check redux persist package instead.
  preloadedState: loadState() as React.Reducer<TodoState, any>,
});

store.subscribe(() => {
  saveState({
    todo: store.getState().todo,
  });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
