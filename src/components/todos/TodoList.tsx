import { AnimatePresence } from 'motion/react';
import { TodoItem } from './TodoItem';
import { Todo, TodoPriority } from '../../store/slices/todoSlice';

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

  const groupedItemsByCategory = Object.groupBy(items, item => item.priority);
  const priorityKeys = Object.keys(groupedItemsByCategory).map(
    Number
  ) as TodoPriority[];

  return (
    <div className="w-96">
      <ul className="mt-5 mb-5 flex flex-col">
        {priorityKeys.map((priority: TodoPriority) => (
          <div
            key={`priority-${priority}`}
            className="border-b-3 border-b-slate-500"
          >
            <p className="mt-3 italic">
              Priority <span className="font-medium">#{priority}</span>
            </p>
            <AnimatePresence>
              {groupedItemsByCategory[priority]?.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </ul>
    </div>
  );
};
