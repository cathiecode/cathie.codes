import styles from "./styles.module.css";
import { CSSProperties, useRef } from "react";

import Image from "components/ui/Image";

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
    <Image {...props} className={`${className ?? ""} ${styles.ArticleImage}`} />
  );
}
