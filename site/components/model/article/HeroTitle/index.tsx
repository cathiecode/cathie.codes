import { ReactNode, CSSProperties, createElement } from "react";

import styles from "./styles.module.scss";

type HeroTitleProps = {
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

export default function HeroTitle({
  className,
  style,
  children,
  headingLevel,
  component = "div",
}: HeroTitleProps) {
  return createElement(
    headingLevel ? `h${headingLevel}` : component,
    {
      style: style,
      className: `${className ?? ""} ${styles.HeroTitle}`,
    },
    children
  );
}
