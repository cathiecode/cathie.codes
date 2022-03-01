import Image from "next/image";

import styles from "./styles.module.css";

import icon from "../../../../assets/icon.png";
import Link from "next/link";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  return (
    <div className={styles.Header}>
      <span className={styles.tradeMarkWrapper}>
        <Link href="/">
          <a className={styles.tradeMark}>
            <Image
              width={60}
              height={60}
              layout="fill"
              src={icon}
              alt=""
              className={styles.tradeMarkImage}
            />
          </a>
        </Link>
      </span>
    </div>
  );
}
