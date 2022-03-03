import GlobalContentsContext from "contexts/GlobalContents";
import { lightFormat, parseISO } from "date-fns";
import Link from "next/link";
import { useContext } from "react";
import styles from "./styles.module.scss";

export default function Footer() {
  const contents = useContext(GlobalContentsContext);

  return (
    <div className={styles.Footer}>
      <div className={styles.logo}>cathie.codes</div>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.navItem}>
            <Link href="https://twitter.com/cathiecode">Twitter</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="https://github.com/cathiecode">GitHub</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="https://github.com/cathiecode/cathie.codes">
              このサイトのソースコード
            </Link>
          </li>
          {contents && (
            <li className={styles.navItem}>
              最終更新:{" "}
              {lightFormat(parseISO(contents.lastModified), "yyyy/MM/dd HH:mm")}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
