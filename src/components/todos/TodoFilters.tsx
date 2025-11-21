import { Button } from '../common/buttons/Button';
import { TodoFilters as TodoFiltersType } from '../stack/Stack';

type TodoFiltersProps = {
  filters: TodoFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<TodoFiltersType>>;
};

export const TodoFilters = ({ filters, setFilters }: TodoFiltersProps) => {
  return (
    <div className="mt-5 flex justify-center">
      <Button
        className={`${filters.showActive ? 'bg-red-500!' : ''}`}
        onClick={() =>
          setFilters(prevFilters => ({
            ...prevFilters,
            showActive: !prevFilters.showActive,
          }))
        }
      >
        ▲
      </Button>
    </div>
  );
};
