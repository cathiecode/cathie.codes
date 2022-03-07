import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

type TagProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Tag({ className, style, children }: TagProps) {
  return (
    <Link href="/">
      <a>
        <div style={style} className={`${className ?? ""} ${styles.Tag}`}>
          {children}
        </div>
      </a>
    </Link>
  );
}
