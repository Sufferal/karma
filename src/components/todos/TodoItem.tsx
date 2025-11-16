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

type TodoItemProps = {
  todo: Todo;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.name || '');
  const editInputRef = useRef<HTMLInputElement | null>(null);

  const { playSound } = useAudio();
  const dispatch = useDispatch();

  // CSS
  const styles = getComputedStyle(document.documentElement);
  const accentColor = styles.getPropertyValue('--color-slate-900');

  const handleComplete = () => {
    setIsCompleted(true);
    playSound(SOUNDPACK.sfxAxeUlt);
    dispatch(remove(todo.id));
  };

  const handleDelete = () => {
    playSound(SOUNDPACK.sfxMacTrash);
    dispatch(remove(todo.id));
  };

  const handleEditStart = () => setIsEditing(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo) {
      dispatch(
        edit({
          ...todo,
          name: newTodo,
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
        {todo.name}
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
    <li className="flex items-center gap-2">
      <div className="mr-3">
        <Input
          id={todo.id}
          type="checkbox"
          checked={isCompleted}
          onChange={handleComplete}
        />
      </div>
      {todoContent}
    </li>
  );
};
