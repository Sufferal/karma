import { useRef, useEffect, useState } from 'react';
import { Button } from '../common/buttons/Button';
import { Input } from '../common/inputs/Input';
import { DeleteIcon } from '../common/icons/DeleteIcon';
import { ButtonVariants } from '../../constants/styles';
import { EditIcon } from '../common/icons/EditIcon';
import { SaveIcon } from '../common/icons/SaveIcon';
import useAudio from '../../hooks/useAudio';
import { SOUNDPACK } from '../../assets/audio';
import { motion } from 'framer-motion';
import {
  edit as editTodo,
  remove as removeTodo,
  Todo,
} from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { TopPriority } from '../common/priorities/TopPriority';
import { HighPriority } from '../common/priorities/HighPriority';
import { MediumPriority } from '../common/priorities/MediumPriority';
import { LowPriority } from '../common/priorities/LowPriority';
import { displayFormattedTodo, getPriorityFromText } from '../../utils/todo';

type TodoItemProps = {
  todo: Todo;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.name || '');
  const editInputRef = useRef<HTMLInputElement | null>(null);
  const { playSound } = useAudio();
  const dispatch = useDispatch();
  const isTodoActive = todo.status === 'active';

  // CSS
  const styles = getComputedStyle(document.documentElement);
  const accentColor = styles.getPropertyValue('--color-slate-900');
  const inProgressClasses = 'bg-red-500 rounded px-3 py-2 text-white';

  const displayTodoPriority = () => {
    let todoPriority = <LowPriority />;

    if (todo.priority === 1) todoPriority = <TopPriority />;
    if (todo.priority === 2) todoPriority = <HighPriority />;
    if (todo.priority === 3) todoPriority = <MediumPriority />;

    return todoPriority;
  };

  const handleComplete = () => {
    playSound(SOUNDPACK.sfxAxeUlt);
    dispatch(removeTodo(todo.id));
  };

  const handleDelete = () => {
    playSound(SOUNDPACK.sfxMacTrash);
    dispatch(removeTodo(todo.id));
  };

  const handleEditStart = () => setIsEditing(true);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (newTodo && newTodo !== todo.name) {
      dispatch(
        editTodo({
          ...todo,
          name: newTodo,
          priority: getPriorityFromText(newTodo),
        })
      );
    }

    setIsEditing(false);
  };

  const handleTodoProgress = () => {
    const newStatus = todo.status === 'idle' ? 'active' : 'idle';
    dispatch(
      editTodo({
        ...todo,
        status: newStatus,
      })
    );
  };

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const todoPriority = (
    <div className="w-6 flex justify-center">{displayTodoPriority()}</div>
  );

  let todoContent = (
    <motion.div
      className={`w-full flex items-center justify-between ${
        isTodoActive ? inProgressClasses : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <h2
        className="font-semibold cursor-pointer max-w-68 break-words"
        onClick={handleComplete}
      >
        {displayFormattedTodo(todo.name)}
      </h2>
      <div
        className={`flex items-center gap-2 ${
          isTodoActive ? 'bg-white py-1 px-2 rounded' : ''
        }`}
      >
        <Button
          className="text-slate-900 text-2xl"
          variant={ButtonVariants.icon}
          onClick={handleTodoProgress}
        >
          {isTodoActive ? '↓' : '↑'}
        </Button>
        <Button
          variant={ButtonVariants.icon}
          onClick={handleEditStart}
          className="[&:hover>svg]:fill-red-500"
        >
          <EditIcon width="24px" height="24px" color={accentColor} />
        </Button>
        <Button
          variant={ButtonVariants.icon}
          onClick={handleDelete}
          className="[&:hover>svg]:fill-red-500"
        >
          <DeleteIcon width="24px" height="24px" color={accentColor} />
        </Button>
      </div>
    </motion.div>
  );

  if (isEditing) {
    todoContent = (
      <div className="w-full">
        <form
          className="grow flex justify-between gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            id={todo.name}
            ref={editInputRef}
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onBlur={() => handleSubmit()}
          />
          <Button
            variant={ButtonVariants.icon}
            type="submit"
            className="[&:hover>svg]:fill-red-500"
          >
            <SaveIcon width="16px" height="16px" color={accentColor} />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <li className="flex items-center gap-3 py-3">
      {todoPriority}
      {todoContent}
    </li>
  );
};
