import { ReactNode, CSSProperties } from "react";
import { default as NextImage, ImageLoaderProps } from "next/image";

import styles from "./styles.module.css";

type ImageProps = {
  alt: string,
  src: string,
  width: number,
  height: number,
  className?: string,
  blurDataUrl?: string,
};

export default function Image({ className, src, width, height, alt, blurDataUrl }: ImageProps) {
  let imageElement;
  if (!width || !height || !blurDataUrl) {
    console.error(
      `No width, height or blurDataUrl for image ${src}(${alt}) so fall backing to <img> instead of <Image>`
    );
    imageElement = (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} src={src} width={width} height={height} className={className} />
    );
  } else {
    let loader;
    if (src.includes("images.ctfassets.net")) {
      if (!src.startsWith("http")) {
        src = "https://" + src;
      }

      const srcUrlParsed = new URL(src);

      loader = (props: ImageLoaderProps) => {
        srcUrlParsed.searchParams.append("w", props.width.toString());
        props.quality && srcUrlParsed.searchParams.append("fm", props.quality?.toString());

        return srcUrlParsed.toString();
      }
    } else {
      loader = undefined
    }

    imageElement = (
      <NextImage alt={alt} src={src} width={width} height={height} blurDataURL={blurDataUrl} className={className} placeholder="blur" loader={loader} />
    );
  }

  return imageElement;
}
