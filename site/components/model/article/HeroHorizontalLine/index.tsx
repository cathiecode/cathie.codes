import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

type HeroHorizontalLineProps = {
  className?: string,
  style?: CSSProperties
  children?: ReactNode,
};

export default function HeroHorizontalLine({className, style, children}: HeroHorizontalLineProps) {
  return <div style={style} className={`${className ?? ""} ${styles.HeroHorizontalLine}`}>{children}</div>
}
