import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.scss";

type NotificationType = "notification" | "warn" | "error";

type NotificationProps = {
  type?: NotificationType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function Notification({
  className,
  style,
  children,
  type = "notification",
}: NotificationProps) {
  return (
    <div
      style={style}
      className={`${className ?? ""} ${styles.Notification} ${type}`}
    >
      {children}
    </div>
  );
}
