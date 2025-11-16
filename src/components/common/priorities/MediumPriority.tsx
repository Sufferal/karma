import { Circle } from '../shapes/Circle';

export const MediumPriority = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center">
        <Circle width="10px" color="bg-red-500" />
      </div>
      <div className="flex gap-1.5">
        <Circle width="10px" color="bg-red-500" />
        <Circle width="10px" color="bg-red-500" />
      </div>
    </div>
  );
};
