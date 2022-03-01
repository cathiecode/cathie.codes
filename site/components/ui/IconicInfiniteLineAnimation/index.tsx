import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

import animation from "./animation.svg";

type IconicInfiniteLineAnimationProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function IconicInfiniteLineAnimation({
  className,
  style,
  children,
}: IconicInfiniteLineAnimationProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={animation.src}
      alt=""
      style={style}
      className={`${className ?? ""} ${styles.IconicInfiniteLineAnimation}`}
    />
  );
}
