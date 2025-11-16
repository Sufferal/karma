import { TodoList } from '../todos/TodoList';
import { useSelector } from 'react-redux';
import { selectTodos } from '../../store/selectors/todoSelectors';
import TodoForm from '../todos/TodoForm';

export const Stack = () => {
  const todos = useSelector(selectTodos);
  const reversedTodos = todos.toReversed();

  return (
    <div className="flex flex-col">
      <TodoForm />
      <TodoList items={reversedTodos} />
    </div>
  );
};
