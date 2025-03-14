import { forwardRef, InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
