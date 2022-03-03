import { GlobalContents } from "api/fetchGlobalContents";
import Link from "next/link";
import styles from "./styles.module.css";

type FooterProps = {
  contents: GlobalContents;
};

export default function Footer({ contents }: FooterProps) {
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
          <li className={styles.navItem}>最終更新: {contents.lastModified}</li>
        </ul>
      </nav>
    </div>
  );
}
