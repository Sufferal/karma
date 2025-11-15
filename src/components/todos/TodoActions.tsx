import { useRef } from 'react';
import { COMPLETED, KEYS, UNCHECKED } from '../../constants';
import { VARIANT } from '../../constants/styles';
import { Button } from '../buttons/Button';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';

export const TodoActions = ({ todos, setTodos }) => {
  const confirmationDeleteRef = useRef(null);
  const confirmationDeleteHandler = () => confirmationDeleteRef.current.open();
  const areAllTodosCompleted = todos.every(t => t.isCompleted);
  const completeStatus = areAllTodosCompleted ? UNCHECKED : COMPLETED;

  const handleToggleCompleteAll = () => {
    const newCompletedStatus = completeStatus === COMPLETED;

    setTodos(prevTodos =>
      prevTodos.map(t =>
        todos.find(current => current.id === t.id)
          ? { ...t, isCompleted: newCompletedStatus }
          : t
      )
    );
  };

  const handleDeleteAll = () => {
    setTodos(prevTodos =>
      prevTodos.filter(t => !todos.some(current => current.id === t.id))
    );
    confirmationDeleteRef.current.close();
  };

  useKeyboardShortcut(KEYS.C, handleToggleCompleteAll);
  useKeyboardShortcut(KEYS.X, confirmationDeleteHandler);

  return (
    <>
      <div className="flex items-center gap-3">
        <Button onClick={handleToggleCompleteAll} fullWidth>
          {completeStatus} all
        </Button>
        <Button
          onClick={confirmationDeleteHandler}
          variant={VARIANT.danger}
          fullWidth
        >
          Delete all
        </Button>
      </div>
    </>
  );
};
