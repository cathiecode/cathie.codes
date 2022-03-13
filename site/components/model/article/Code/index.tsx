import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.scss";

type CodeProps = {
  language?: string;
  highlightedHtml?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Code({
  highlightedHtml,
  language,
  className,
  style,
  ...props
}: CodeProps) {
  return (
    <div style={style} className={`${className ?? ""} ${styles.Code}`}>
      <div className={styles.language}>{language}</div>
      <code
        {...props}
        dangerouslySetInnerHTML={{
          __html: highlightedHtml ?? "// Failed to load code block...",
        }}
      />
    </div>
  );
}
