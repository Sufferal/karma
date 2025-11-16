import { AnimatePresence } from 'motion/react';
import { TodoItem } from './TodoItem';
import { Todo } from '../../store/slices/todoSlice';

type TodoListProps = {
  items: Todo[];
};

export const TodoList = ({ items }: TodoListProps) => {
  if (!items.length) {
    return (
      <p className="my-5 italic font-semibold flex flex-col items-center justify-center gap-2">
        <span className="rounded text-white bg-slate-900 px-2 py-1">
          No tasks to do
        </span>{' '}
        <span className="max-w-80 text-center">
          You either achieved enlightenment or you're a lazy piece of shit 😉
        </span>
      </p>
    );
  }

  return (
    <div className="w-96">
      <ul className="mt-5 mb-5 flex flex-col gap-2">
        <AnimatePresence>
          {items.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
