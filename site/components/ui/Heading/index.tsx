import { ReactNode, CSSProperties, createElement } from "react";

import styles from "./styles.module.css";

type HeadingProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  level?: number;
};

export default function Heading({
  className,
  style,
  children,
  level = 2,
}: HeadingProps) {
  return createElement(
    `h${level}`,
    {
      style: style,
      className: `${className ?? ""} ${styles.Heading}`,
    },
    children
  );
}
