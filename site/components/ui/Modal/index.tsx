import { ReactNode, CSSProperties, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import {
  ENTERED,
  ENTERING,
  EXITING,
} from "react-transition-group/Transition";

import styles from "./styles.module.css";

type ModalProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
};

export default function Modal({
  className,
  style,
  children,
  onClose,
  open,
}: ModalProps) {
  const [isClientSide, setClientSide] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.document.body) {
      setClientSide(true);
    }
    setClientSide(true);
  }, []);

  if (isClientSide) {
    return (
      <Transition in={open} timeout={250} nodeRef={wrapperRef}>
        {(transitionState) => {
          if ([ENTERING, ENTERED, EXITING].includes(transitionState)) {
            return createPortal(
              <div
                style={style}
                className={`${className ?? ""} ${styles.Modal} ${
                  styles[`Modal--${transitionState}`]
                }`}
                ref={wrapperRef}
              >
                <div className={styles.touchGuard} onClick={onClose}></div>
                {children}
                <style>
                  {`
                    body {
                      overflow: hidden;
                    }
                  `}
                </style>
              </div>,
              window.document.body
            );
          } else {
            return null;
          }
        }}
      </Transition>
    );
  } else {
    return null;
  }
}
