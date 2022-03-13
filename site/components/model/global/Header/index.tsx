import Image from "next/image";

import styles from "./styles.module.scss";

import icon from "../../../../assets/icon.png";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Transition } from "react-transition-group";
import { useRouter } from "next/router";

import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isActive || isLocked) {
      return;
    }

    const onSomeActionOccured = () => {
      setIsActive(false);
    };

    document.addEventListener("scroll", onSomeActionOccured);
    router.events.on("routeChangeStart", onSomeActionOccured);

    return () => {
      document.removeEventListener("scroll", onSomeActionOccured);
      router.events.off("routeChangeStart", onSomeActionOccured);
    };
  }, [isActive, isLocked, router.events]);

  const onTrademarkClicked = useCallback(() => {
    if (isLocked) {
      setIsActive(false);
      setIsLocked(false);
    } else {
      setIsActive((current) => !current);
    }
  }, [isLocked]);

  const onLockClicked = useCallback(() => {
    if (isLocked) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
      setIsActive(true);
    }
  }, [isLocked]);

  return (
    <div className={classNames(styles.Header, { [styles.active]: isActive })}>
      <Transition in={isActive} timeout={180} nodeRef={navRef}>
        {(transitionState) => (
          <div
            className={classNames(
              styles.nav,
              styles[`nav--${transitionState}`]
            )}
            ref={navRef}
          >
            <Link href="/">
              <a className={styles.logo}>cathie.codes</a>
            </Link>
            <Link href="/works">
              <a className={styles.navItem}>ポートフォリオ</a>
            </Link>
            <Link href="/blog">
              <a className={styles.navItem}>日記</a>
            </Link>
            <div>
              <button className={styles.lock} onClick={onLockClicked}>
                <FontAwesomeIcon
                  icon={faThumbTack}
                  style={{
                    color: isLocked ? "var(--black)" : "var(--lightgray)",
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </Transition>
      <div className={styles.tradeMarkWrapper}>
        <button className={styles.tradeMark} onClick={onTrademarkClicked}>
          <Image
            width={60}
            height={60}
            layout="fill"
            src={icon}
            alt=""
            className={styles.tradeMarkImage}
          />
        </button>
      </div>
    </div>
  );
}
