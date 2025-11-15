import { useState, useEffect, useRef } from 'react';
import { getSoundByKey, SOUNDPACK_LENGTH } from '../../assets/audio';
import { KEYS, LS_TODOS, NUMBERS } from '../../constants';
import { ProjectContent } from './ProjectContent';
import useTodos from '../../hooks/useTodos';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import useAudio from '../../hooks/useAudio';
import { getLocalStorageItem } from '../../utils/localStorage';

export const Stack = () => {
  // State & Custom hooks
  const { id, name } = project;
  const { todos, setTodos, handleTodoAdd, handleTodoEdit, handleTodoDelete } =
    useTodos();
  const [currentTodos, setCurrentTodos] = useState(
    todos.filter(t => t.category === name)
  );

  // Sound
  const soundCount = Math.min(
    currentTodos.filter(t => t.isCompleted).length + 1,
    SOUNDPACK_LENGTH
  ); // soundpack count starts at 1
  const { playSound } = useAudio();

  const toggleTodoCompletion = index => {
    if (!currentTodos.length) return;

    const currTodo = currentTodos[index];

    if (currTodo) {
      if (!currTodo.isCompleted) {
        const randomSound = getSoundByKey('sfxDeathblow');
        playSound(randomSound);
      }
      const newTodos = todos.map(t =>
        t.id === currTodo.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      setTodos(newTodos);
    }
  };

  // Update current todos when changing the name of the project
  useEffect(() => {
    setCurrentTodos(
      getLocalStorageItem(LS_TODOS).filter(t => t.category === name)
    );
  }, [name, todos]);

  // Keyboard shortcuts
  NUMBERS.forEach((key, index) => {
    useKeyboardShortcut(key, () => toggleTodoCompletion(index));
  });

  return (
    <div className="flex flex-col gap-2">
      <ProjectContent
        projectName={name}
        currentTodos={currentTodos}
        setTodos={setTodos}
        onTodoAdd={handleTodoAdd}
        onTodoEdit={handleTodoEdit}
        onTodoDelete={handleTodoDelete}
      />
    </div>
  );
};
