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
import { edit, remove, Todo } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { Circle } from '../common/shapes/Circle';
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

  // CSS
  const styles = getComputedStyle(document.documentElement);
  const accentColor = styles.getPropertyValue('--color-slate-900');

  const displayTodoPriority = () => {
    let todoPriority = <LowPriority />;

    if (todo.priority === 1) todoPriority = <TopPriority />;
    if (todo.priority === 2) todoPriority = <HighPriority />;
    if (todo.priority === 3) todoPriority = <MediumPriority />;

    return todoPriority;
  };

  const handleComplete = () => {
    playSound(SOUNDPACK.sfxAxeUlt);
    dispatch(remove(todo.id));
  };

  const handleDelete = () => {
    playSound(SOUNDPACK.sfxMacTrash);
    dispatch(remove(todo.id));
  };

  const handleEditStart = () => setIsEditing(true);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (newTodo && newTodo !== todo.name) {
      dispatch(
        edit({
          ...todo,
          name: newTodo,
          priority: getPriorityFromText(newTodo),
        })
      );
    }

    setIsEditing(false);
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
      className="w-full flex items-center justify-between"
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
      <div className="flex items-center gap-1">
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
    <li className="flex items-center gap-3 py-3 border-b-[1.5px] border-b-slate-900">
      {todoPriority}
      {todoContent}
    </li>
  );
};
