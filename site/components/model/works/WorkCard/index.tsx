import DecoratedImage from "components/ui/DecoratedImage";
import Image from "components/ui/Image";
import Heading from "components/ui/Heading";
import { Tag } from "types/Tag";
import Container from "components/ui/Container";

import styles from "./styles.module.scss";
import Link from "next/link";

type WorkCardProps = {
  workArticle: {
    id: string;
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
};

export default function WorkCard({ workArticle }: WorkCardProps) {
  return (
    <div className={styles.WorkCard}>
      <Image
        className={styles.background}
        alt={""}
        src={workArticle.coverImage.url}
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.backgroundBlur}></div>
      <div>
        <div className={styles.descriptionColumn}>
          <h2>{workArticle.title}</h2>
          <p style={{ paddingTop: "1rem" }}>{workArticle.copyText}</p>
          <p style={{ paddingTop: "1rem" }}>{workArticle.leadText}</p>
          <p style={{ paddingTop: "1rem" }}>
            <Link href={`/works/${workArticle.id}`}>
              <a>{workArticle.title}について詳しく知る</a>
            </Link>
          </p>
        </div>
      </div>
      <Image
        alt={""}
        src={workArticle.coverImage.url}
        layout="fill"
        objectFit="contain"
        className={styles.image}
      />
    </div>
  );
}
