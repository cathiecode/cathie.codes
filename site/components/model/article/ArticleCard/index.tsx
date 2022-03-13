import Image from "components/ui/Image";
import dayjs from "dayjs";
import Link from "next/link";
import { Tag } from "types/Tag";
import HeroTags from "../HeroTags";
import styles from "./styles.module.css";

type ArticleCardProps = {
  title: string;
  tags: Tag[];
  coverImage: {
    url: string;
    blurImageUrl: string;
    width: number;
    height: number;
  };
  date: string;
};

export default function ArticleCard({
  title,
  tags,
  coverImage,
  date,
}: ArticleCardProps) {
  return (
    <div className={styles.ArticleCard}>
      <div className={styles.cover}>
        {coverImage && (
          <Image
            src={coverImage.url}
            blurDataUrl={coverImage.blurImageUrl}
            layout="fill"
            objectFit="cover"
            alt=""
            sizes="8rem"
          />
        )}
      </div>
      <div>
        <div>{title}</div>
        <div className={styles.date}>{dayjs(date).format("YYYY/MM/DD")}</div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
