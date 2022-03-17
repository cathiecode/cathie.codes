import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.scss";

type ButtonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Button({ className, style, children }: ButtonProps) {
  return (
    <button style={style} className={`${className ?? ""} ${styles.Button}`}>
      {children}
    </button>
  );
}
