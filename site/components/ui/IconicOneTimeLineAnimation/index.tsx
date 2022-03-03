import { ReactNode, CSSProperties } from "react";

import styles from "./styles.module.css";

import animation from "./animation.svg";

type IconicOneTimeLineAnimationProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export default function IconicOneTimeLineAnimation({
  className,
  style,
  children,
}: IconicOneTimeLineAnimationProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <svg
      version="1.1"
      viewBox="0 0 482 488.4"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={`${className ?? ""} ${styles.IconicOneTimeLineAnimation}`}
    >
      <g fill="none" strokeWidth="16" className="iconicOneTimeLineAnimation">
        <path d="m475 138.9-199.5 345.5" stroke="#ececf4" pathLength="100" />
        <path d="m206.4 88.13-199.5 345.5" stroke="#2f2fff" pathLength="100" />
        <path d="m289.9 4-199.5 345.5" stroke="#ececf4" pathLength="100" />
        <path d="m411.2 4.711-199.5 345.5" stroke="#ffd600" pathLength="100" />
      </g>
      <style>
        {`
          .iconicOneTimeLineAnimation>path {
            animation: oneTimeLineAnimation 400ms ease-in-out 1 both;
            stroke-dasharray: 0, 100, 100;
            will-change: stroke-dashoffset;
          }

          @keyframes oneTimeLineAnimation {
            from {
              stroke-dashoffset: 0;
            }

            to {
              stroke-dashoffset: 300;
            }
          }
        `}
      </style>
    </svg>
  );
}
