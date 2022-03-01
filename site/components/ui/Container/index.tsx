import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.scss";

type ContainerProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Container({
  className,
  style,
  children,
}: ContainerProps) {
  return (
    <div style={style} className={`${className ?? ""} ${styles.Container}`}>
      {children}
    </div>
  );
}
