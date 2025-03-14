import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={`w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
