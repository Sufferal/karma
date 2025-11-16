import { Circle } from '../shapes/Circle';

export const HighPriority = () => {
  return (
    <div className="flex gap-1.5">
      <Circle width="10px" color="bg-red-500" />
      <Circle width="10px" color="bg-red-500" />
    </div>
  );
};
