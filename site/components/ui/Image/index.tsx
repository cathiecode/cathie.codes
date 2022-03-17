import { ReactNode, CSSProperties, HTMLAttributes } from "react";
import {
  ImageProps as NextImageProps,
  default as NextImage,
  ImageLoaderProps,
} from "next/image";

import styles from "./styles.module.css";

export type ImageProps = {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  className?: string;
  blurDataURL?: string;
  layout?: string;
  objectFit?: string;
} & Partial<NextImageProps>;

export default function Image({
  className,
  src,
  width,
  height,
  alt,
  layout,
  blurDataURL,
  objectFit,
  placeholder,
  ...props
}: ImageProps) {
  let loader;
  if (src.includes("images.ctfassets.net")) {
    if (!src.startsWith("http")) {
      src = src.replace("//", "https://");
    }

    loader = (props: ImageLoaderProps) => {
      const srcUrlParsed = new URL(src);
      srcUrlParsed.searchParams.append("w", props.width.toString());
      props.quality &&
        srcUrlParsed.searchParams.append("fm", props.quality?.toString());

      return srcUrlParsed.toString();
    };
  } else {
    loader = undefined;
  }

  return (
    <NextImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      blurDataURL={blurDataURL}
      className={className}
      placeholder={placeholder ?? "blur"}
      loader={loader}
      layout={layout}
      objectFit={objectFit}
      {...props}
    />
  );
}
