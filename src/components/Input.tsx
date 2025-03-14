import { forwardRef, InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type,label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={props.id}>{label}</label>
        <input
          type={type}
          className={`w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 ${className}`}
          ref={ref}
          {...props}
      />
      </div>
    );
  },
);

export default Input;
