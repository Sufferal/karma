import { TodoList } from '../todos/TodoList';
import { useSelector } from 'react-redux';
import { selectTodos } from '../../store/selectors/todoSelectors';
import TodoForm from '../todos/TodoForm';
import { TodoFilters } from '../todos/TodoFilters';
import { useMemo, useState } from 'react';

export type TodoFilters = {
  showActive: boolean;
};

export const Stack = () => {
  const todos = useSelector(selectTodos);

  const [filters, setFilters] = useState<TodoFilters>({
    showActive: false,
  });

  const filteredTodos = useMemo(() => {
    let newTodos = todos;

    newTodos = newTodos.toReversed();
    newTodos = newTodos.toSorted((a, b) => a.priority - b.priority);
    if (filters.showActive) {
      newTodos = newTodos.filter(todo => todo.status === 'active');
    }

    return newTodos;
  }, [todos, filters]);

  return (
    <div className="flex flex-col">
      <TodoForm />
      <TodoFilters filters={filters} setFilters={setFilters} />
      <TodoList items={filteredTodos} />
    </div>
  );
};
