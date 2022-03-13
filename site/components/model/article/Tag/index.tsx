import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

type TagProps = {
  id: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Tag({ className, style, children, id }: TagProps) {
  return (
    <Link href={`/tag/${id}`}>
      <a>
        <div style={style} className={`${className ?? ""} ${styles.Tag}`}>
          {children}
        </div>
      </a>
    </Link>
  );
}
