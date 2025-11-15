import { useState, useEffect, useRef, useMemo } from 'react';
import { LS_TODOS } from '../constants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorage';
import { MOCK_TODOS } from '../mocks/todos';

function useTodos() {
  const [todos, setTodos] = useState(
    getLocalStorageItem(LS_TODOS) ?? MOCK_TODOS
  );
  const handleTodoAdd = newTodo => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleTodoEdit = updTodo => {
    const newTodos = todos.map(t => (t.id === updTodo.id ? updTodo : t));
    setTodos(newTodos);
  };

  const handleTodoDelete = id => {
    const newTodos = todos.filter(t => t.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    setLocalStorageItem(LS_TODOS, todos);
  }, [todos]);

  return {
    todos,
    setTodos,
    handleTodoAdd,
    handleTodoEdit,
    handleTodoDelete,
  };
}

export default useTodos;
