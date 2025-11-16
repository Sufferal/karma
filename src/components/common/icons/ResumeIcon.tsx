type ResumeIconProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
};

export const ResumeIcon = ({ width, height, color }: ResumeIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 15"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.05 2.75a.55.55 0 1 0-1.1 0v9.5a.55.55 0 0 0 1.1 0v-9.5Zm2.683-.442A.5.5 0 0 0 5 2.75v9.5a.5.5 0 0 0 .733.442l9-4.75a.5.5 0 0 0 0-.884l-9-4.75ZM6 11.42V3.579L13.429 7.5l-7.43 3.92Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
