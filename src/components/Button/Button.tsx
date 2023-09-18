import { FC, ComponentPropsWithRef } from "react";

import styles from "./Button.module.css";

export const Button: FC<ComponentPropsWithRef<"button">> = ({
  children,
  onClick,
}) => {
  const className = `${styles.button}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
