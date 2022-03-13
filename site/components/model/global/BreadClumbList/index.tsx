import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const pathTitle: { [key: string]: string } = {
  works: "作品",
  blog: "日記",
  ext: "外部参照",
};

type BreadClumbListProps = {
  customPath?: [string, string][];
  pageTitle?: string;
};

export default function BreadClumbList({
  customPath,
  pageTitle,
}: BreadClumbListProps) {
  const router = useRouter();

  const path = router.asPath
    .split("/")
    .filter((path) => path && path !== "")
    .reduce(
      (prev, current) => [
        ...prev,
        [
          `${prev[prev.length - 1][0]}${current}/`,
          pathTitle[current] ?? current,
        ],
      ],
      [["/", "cathie.codes"]]
    );

  const breadClumb = customPath ?? path;

  return (
    <div className={styles.BreadClumbList}>
      {breadClumb.map(([url, title], i) => (
        <>
          {i !== 0 && (
            <FontAwesomeIcon icon={faAngleRight} className={styles.arrow} />
          )}
          <Link key={i} href={url}>
            <a className={styles.link}>
              {i === breadClumb.length - 1 && pageTitle ? pageTitle : title}
            </a>
          </Link>
        </>
      ))}
    </div>
  );
}
