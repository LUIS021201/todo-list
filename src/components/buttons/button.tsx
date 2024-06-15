import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  backgroundcolor?: string;
}

export const Button: React.FC<Props> = ({
  children,
  backgroundcolor = "bg-[#7145d6]",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`px-2 py-1 rounded font-medium ${backgroundcolor}`}
    >
      {children}
    </button>
  );
};
