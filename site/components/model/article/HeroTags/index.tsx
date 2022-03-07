import { Tag as TagType } from "types/Tag";
import Tag from "../Tag";
import styles from "./styles.module.css";

type HeroTagsProps = {
  tags: TagType[];
};

export default function HeroTags({ tags }: HeroTagsProps) {
  return (
    <div className={styles.HeroTags}>
      {tags.map((tag) => (
        <Tag key={tag.id}>{tag.name}</Tag>
      ))}
    </div>
  );
}
