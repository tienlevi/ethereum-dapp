import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./style.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
