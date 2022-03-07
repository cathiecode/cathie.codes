import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useRef, useCallback, useState, CSSProperties } from "react";
import Image, { ImageProps } from "../Image";
import { useInViewport } from "react-in-viewport";
import IconicOneTimeLineAnimation from "../IconicOneTimeLineAnimation";
import Modal from "../Modal";

import styles from "./styles.module.css";

type DecoratedImageProps = {
  style?: CSSProperties;
} & ImageProps;

export default function DecoratedImage({
  src,
  style,
  className,
  ...props
}: DecoratedImageProps) {
  const wrapperRef = useRef<HTMLImageElement>(null);
  const { inViewport, enterCount } = useInViewport(wrapperRef, undefined, {
    disconnectOnLeave: true,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  // eslint-disable-next-line jsx-a11y/alt-text
  let imageElement = <Image src={src} {...props} />;

  const alreadyDisplayed = enterCount > 0;

  return (
    <div
      style={style}
      className={`
        ${className ?? ""}
        ${styles.Image}
        ${alreadyDisplayed ? styles.inViewport : ""}`}
      ref={wrapperRef}
    >
      {alreadyDisplayed ? (
        <>
          <IconicOneTimeLineAnimation className={styles.animationLeft} />
          <IconicOneTimeLineAnimation className={styles.animationRight} />
        </>
      ) : null}
      <div
        className={styles.wrapper}
        onClick={useCallback(() => setIsFullscreen(true), [])}
      >
        {imageElement}
        <FontAwesomeIcon
          icon={faUpRightAndDownLeftFromCenter}
          className={styles.zoom}
        />
      </div>
      <Modal
        onClose={useCallback(() => setIsFullscreen(false), [])}
        open={isFullscreen}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.modalImage} src={src} alt="" />
      </Modal>
    </div>
  );
}
