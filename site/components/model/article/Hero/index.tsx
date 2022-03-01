import { ReactNode } from "react";
import IconicInfiniteLineAnimation from "../../../ui/IconicInfiniteLineAnimation";
import styles from "./styles.module.css";

type HeroProps = {
  children?: ReactNode;
  background?: (style: { className: string }) => ReactNode;
};

export default function Hero({ children, background }: HeroProps) {
  return (
    <div className={styles.Hero}>
      {background && background({ className: styles.background })}
      <div className={styles.wrapper}>
        <IconicInfiniteLineAnimation className={styles.animationLeftTop} />
        <IconicInfiniteLineAnimation className={styles.animationRightBottom} />
        {children}
      </div>
    </div>
  );
}
