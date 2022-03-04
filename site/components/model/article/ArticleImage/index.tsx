import styles from "./styles.module.css";
import { CSSProperties, useRef } from "react";

import DecoratedImage from "components/ui/DecoratedImage";

type ArticleImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  style?: CSSProperties;
  className?: string;
};

export default function ArticleImage({
  className,
  ...props
}: ArticleImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <DecoratedImage {...props} className={`${className ?? ""} ${styles.ArticleImage}`} />
  );
}
