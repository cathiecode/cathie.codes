import { ReactNode, CSSProperties, useRef, useEffect, useState } from "react";

import styles from "./styles.module.css";

type RenderBoxProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  width: number;
  height: number;
};

export default function RenderBox({
  className,
  style,
  children,
  width,
  height,
}: RenderBoxProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [windowTransform, setWindowTransform] = useState("");

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const recalc = () => {
      const realWidth = wrapperRef.current?.clientWidth ?? 0;
      const realHeight = wrapperRef.current?.clientHeight ?? 0;

      const ratioX = realWidth / width;
      const ratioY = realHeight / height;
      const ratio = Math.min(ratioX, ratioY);

      const offsetX = (realWidth - width * ratio) / 2;
      const offsetY = (realHeight - height * ratio) / 2;

      setWindowTransform(
        `translate(${offsetX}px, ${offsetY}px) scale(${ratio})`
      );
    };

    const observer = new ResizeObserver((elm) => {
      elm.forEach(recalc);
    });
    observer.observe(wrapperRef.current);
    recalc();

    return () => {
      observer.disconnect();
    };
  }, [width, height]);

  return (
    <div style={style} className={`${className ?? ""} ${styles.RenderBox}`}>
      <div className={styles.inner} style={{ transform: windowTransform }}>
        {children}
      </div>
    </div>
  );
}
