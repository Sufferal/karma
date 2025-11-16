type CircleProps = {
  width?: string;
  color?: string;
};

export const Circle = ({
  width = '20px',
  color = 'bg-slate-900',
}: CircleProps) => {
  return (
    <div
      style={{ width }}
      className={`aspect-square ${color} rounded-full`}
    ></div>
  );
};
