import { useRef, useState } from 'react';
import { Input } from '../common/inputs/Input';
import { v4 as uuidv4 } from 'uuid';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import { KEYS } from '../../constants';
import { add, Todo } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { getPriorityFromText } from '../../utils/todo';

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSubmitTodo: Todo = {
      id: uuidv4(),
      name: newTodo,
      priority: getPriorityFromText(newTodo),
    };
    dispatch(add(newSubmitTodo));

    setNewTodo('');
  };

  useKeyboardShortcut(KEYS.R, focusInput);

  return (
    <form onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        id="task"
        label="new task"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        required
        maxLength={100}
        autoComplete="off"
      />
    </form>
  );
};

export default TodoForm;
