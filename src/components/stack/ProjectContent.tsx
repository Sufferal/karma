import { AnimatePresence } from 'motion/react';
import TodoForm from '../forms/TodoForm';
import Todo from '../todos/Todo';
import { TodoActions } from '../todos/TodoActions';

export const ProjectContent = ({
  projectName,
  currentTodos,
  setTodos,
  onTodoAdd,
  onTodoEdit,
  onTodoDelete,
}) => {
  return (
    <div className="w-96 mt-5">
      <TodoForm category={projectName} onSubmit={onTodoAdd} />
      {currentTodos.length > 0 && (
        <div className="mt-3">
          <TodoActions
            todos={currentTodos}
            setTodos={setTodos}
            onDelete={onTodoDelete}
          />
        </div>
      )}
      {currentTodos.length ? (
        <ul className="mt-5 mb-5 flex flex-col gap-2">
          <AnimatePresence>
            {currentTodos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                onEdit={onTodoEdit}
                onDelete={() => onTodoDelete(todo.id)}
              />
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <p className="my-5 italic font-semibold">
          <span className="rounded text-white bg-slate-900 px-2 py-1">
            No tasks
          </span>{' '}
          Create one to get started
        </p>
      )}
    </div>
  );
};
