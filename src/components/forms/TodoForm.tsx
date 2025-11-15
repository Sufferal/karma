import { useRef, useState } from "react";
import { Input } from "../inputs/Input";
import { v4 as uuidv4 } from "uuid";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { KEYS } from "../../constants";

const TodoForm = ({ category, onSubmit }) => {
  const inputRef = useRef(null);
  const [userTodo, setUserTodo] = useState('');
  const focusInput = () => inputRef.current.focus();

  const submitHandler = e => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      name: userTodo, 
      category,
      isCompleted: false,  
    };
    onSubmit(newTodo);
    setUserTodo('');
  };

  return (
    <form onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        id="task"
        label="Task"
        value={userTodo}
        onChange={e => setUserTodo(e.target.value)}
        required
        maxLength="100"
        autoComplete="off"
      />
    </form>
  );
};

export default TodoForm;
