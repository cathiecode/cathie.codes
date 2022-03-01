import { ReactNode, CSSProperties, createElement } from "react";

import styles from "./styles.module.css";

type HeroTextProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  headingLevel?: number;
  component?: string;
} & (
  | {
      headingLevel?: number;
    }
  | {
      component?: string;
    }
);
export default function HeroText({
  className,
  style,
  children,
  headingLevel,
  component = "h1",
}: HeroTextProps) {
  return createElement(
    headingLevel ? `h${headingLevel}` : component,
    {
      style: style,
      className: `${className ?? ""} ${styles.HeroText}`,
    },
    children
  );
}
