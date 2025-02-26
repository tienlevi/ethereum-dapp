import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./style.module.css";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={styles.input} ref={ref} {...props} />;
  },
);

export default Input;
