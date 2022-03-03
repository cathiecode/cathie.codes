import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

type CloseButtonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: () => void;
};

export default function CloseButton({
  className,
  style,
  children,
  onClick,
}: CloseButtonProps) {
  return (
    <button
      style={style}
      className={`${className ?? ""} ${styles.CloseButton}`}
      onClick={onClick}
      aria-label="閉じる"
    ></button>
  );
}
