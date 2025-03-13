import { forwardRef, InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={``} ref={ref} {...props} />;
  },
);

export default Input;
