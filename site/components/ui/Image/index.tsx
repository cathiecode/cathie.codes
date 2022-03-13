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
  blurDataUrl?: string;
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
  blurDataUrl,
  objectFit,
  ...props
}: ImageProps) {
  let imageElement;
  if (
    (layout && (width || height)) ||
    (!layout && (!width || !height)) ||
    !blurDataUrl
  ) {
    console.error(
      `No width, height or blurDataUrl for image ${src}(${alt}) so fall backing to <img> instead of <Image>`
    );
    imageElement = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        src={src}
        width={width}
        height={height}
        style={{ objectFit: objectFit }}
        className={className}
        {...props}
      />
    );
  } else {
    let loader;
    if (src.includes("images.ctfassets.net")) {
      if (!src.startsWith("http")) {
        src = "https://" + src;
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

    imageElement = (
      <NextImage
        alt={alt}
        src={src}
        width={width}
        height={height}
        blurDataURL={blurDataUrl}
        className={className}
        placeholder="blur"
        loader={loader}
        layout={layout}
        objectFit={objectFit}
        {...props}
      />
    );
  }

  return imageElement;
}
