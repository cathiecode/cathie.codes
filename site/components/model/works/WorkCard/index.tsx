import DecoratedImage from "components/ui/DecoratedImage";
import Image from "components/ui/Image";
import Heading from "components/ui/Heading";
import { Tag } from "types/Tag";
import Container from "components/ui/Container";

import styles from "./styles.module.scss";
import Link from "next/link";
import classNames from "classnames";
import Button from "components/ui/Button";

type WorkCardProps = {
  workArticle: {
    id: string;
    slug: string;
    title: string;
    copyText: string;
    leadText: string;
    dateStart: string;
    dateEnd: string;
    coverImage: {
      url: string;
      blurImageUrl: string;
      width: number;
      height: number;
    };
    tags: Tag[];
  };
  invert?: boolean;
};

export default function WorkCard({ workArticle, invert }: WorkCardProps) {
  return (
    <div className={classNames(styles.WorkCard, { [styles.invert]: invert })}>
      <Image
        className={styles.background}
        alt={""}
        src={workArticle.coverImage.url}
        blurDataURL={workArticle.coverImage.blurImageUrl}
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.backgroundBlur}></div>
      <div className={styles.description}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          <Link href={`/works/${workArticle.slug}`}>{workArticle.title}</Link>
        </h2>
        <p style={{ marginTop: "0.5rem" }}>
          {workArticle.tags.map((tag) => (
            <Link href={`/tag/${tag.id}`} key={tag.id}>
              <a className={styles.tag}>{tag.name}</a>
            </Link>
          ))}
        </p>
        <p style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
          {workArticle.copyText}
        </p>
        <p style={{ marginTop: "1.5rem" }}>{workArticle.leadText}</p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href={`/works/${workArticle.slug}`}>
            <a>
              <Button>もっと見る</Button>
            </a>
          </Link>
        </p>
      </div>
      <div className={styles.image}>
        <Image
          alt={""}
          src={workArticle.coverImage.url}
          width={workArticle.coverImage.width}
          height={workArticle.coverImage.height}
          blurDataURL={workArticle.coverImage.blurImageUrl}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
