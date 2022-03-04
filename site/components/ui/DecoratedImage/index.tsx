import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties, useRef, useCallback, useState } from "react";
import { default as NextImage } from "next/image";
import { useInViewport } from "react-in-viewport";
import IconicOneTimeLineAnimation from "../IconicOneTimeLineAnimation";
import Modal from "../Modal";

import styles from "./styles.module.css";

type ImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  style?: CSSProperties;
  className?: string;
};

export default function Image({
  className,
  style,
  alt,
  src,
  width,
  height,
}: ImageProps) {
  const wrapperRef = useRef<HTMLImageElement>(null);
  const { inViewport, enterCount } = useInViewport(wrapperRef, undefined, {
    disconnectOnLeave: true,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  let imageElement;
  if (!width || !height) {
    console.error(
      `No width or height for image ${src}(${alt}) so fall backing to <img> instead of <Image>`
    );
    imageElement = (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} src={src} />
    );
  } else {
    imageElement = (
      <NextImage alt={alt} src={src} width={width} height={height} />
    );
  }

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
        {imageElement}
      </Modal>
    </div>
  );
}
