import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

import cathieInBubble from "./cathiecode-in-bubble.svg";

type CatherineTalkingBubbleProps = {
  className?: string;
  style?: CSSProperties;
};

export default function CatherineTalkingBubble({
  className,
  style,
}: CatherineTalkingBubbleProps) {
  return (
    <span
      style={style}
      className={`${className ?? ""} ${styles.CatherineTalkingBubble}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.bubble}
        src={cathieInBubble.src}
        alt="キャサリンが喋っている"
      />
    </span>
  );
}
