import { useRef, useEffect, useState } from 'react';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { DeleteIcon } from '../icons/DeleteIcon';
import { VARIANT } from '../../constants/styles';
import { EditIcon } from '../icons/EditIcon';
import { SaveIcon } from '../icons/SaveIcon';
import useAudio from '../../hooks/useAudio';
import { SOUNDPACK } from '../../assets/audio';
import { motion } from 'framer-motion';

const Todo = ({ todo, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted || false);
  const [newTodo, setNewTodo] = useState(todo.name || '');
  const editInputRef = useRef(null);
  const { playSound } = useAudio();

  // CSS
  const styles = getComputedStyle(document.documentElement);
  const accentColor = styles.getPropertyValue('--color-slate-900');

  const handleToggleCompleted = () => {
    // Play sound only when it's not completed
    if (!isCompleted) {
      playSound(SOUNDPACK.sfxAxeUlt);
    }
    setIsCompleted(prev => !prev);
    // Delete when task is completed
    onDelete();
  };

  const handleEdit = e => {
    if (e.relatedTarget?.type === 'submit') {
      return; // don't exit edit mode if Save button was clicked
    }
    setIsEditing(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newTodo) {
      onEdit({
        ...todo,
        name: newTodo,
      });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setIsCompleted(todo.isCompleted);
  }, [todo.isCompleted]);

  useEffect(() => {
    if (todo.isCompleted !== isCompleted) {
      onEdit({ ...todo, isCompleted });
    }
  }, [isCompleted]);

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
        onClick={handleToggleCompleted}
      >
        {todo.name}
      </h2>
      <div className="flex items-center gap-1">
        <Button
          variant={VARIANT.icon}
          onClick={handleEdit}
          className="[&:hover>svg]:fill-red-500"
        >
          <EditIcon width="24px" height="24px" color={accentColor} />
        </Button>
        <Button
          variant={VARIANT.icon}
          onClick={onDelete}
          className="[&:hover>svg]:fill-red-500"
        >
          <DeleteIcon width="24px" height="24px" color={accentColor} />
        </Button>
      </div>
    </motion.div>
  );

  if (isCompleted) {
    todoContent = (
      <motion.h2
        className="max-w-88 break-words italic font-semibold bg-slate-900 text-white w-full rounded-sm px-2 py-1 cursor-pointer"
        onClick={handleToggleCompleted}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, x: -30 }}
      >
        {todo.name}
      </motion.h2>
    );
  }

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
            onBlur={handleEdit}
            onChange={e => setNewTodo(e.target.value)}
          />
          <Button
            variant={VARIANT.icon}
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
          onChange={handleToggleCompleted}
        />
      </div>
      {todoContent}
    </li>
  );
};

export default Todo;
