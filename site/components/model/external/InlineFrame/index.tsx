import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

type InlineFrameProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function InlineFrame({
  className,
  style,
  src,
}: InlineFrameProps) {
  return (
    <iframe
      className={`${styles.InlineFrame} ${className}`}
      style={style}
      src={src}
      frameBorder={0}
    />
  );
}
