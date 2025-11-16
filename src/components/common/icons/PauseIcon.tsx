type PauseIconProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
};

export const PauseIcon = ({ width, height, color }: PauseIconProps) => {
  return (
    <div className={`border border-[#fff] rounded-full p-0.5`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 20"
      >
        <path fill={color} d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
      </svg>
    </div>
  );
};
