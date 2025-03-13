import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...props }: Props) {
  return (
    <button className={``} {...props}>
      {children}
    </button>
  );
}

export default Button;
