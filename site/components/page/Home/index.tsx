import Heading from "components/ui/Heading";
import IconicOneTimeLineAnimation from "components/ui/IconicOneTimeLineAnimation";
import styles from "./styles.module.css";

type HomeProps = {};

export default function Home({}: HomeProps) {
  return (
    <div className={styles.Home}>
      <div className={styles.hero}>
        <div className={styles.heroBack}></div>
        <div className={styles.heroFront}>
          <div className={styles.heroMainContents}>
            <IconicOneTimeLineAnimation
              duration={600}
              className={styles.heroIconicAnimationLeft}
            />
            <h1 className={styles.heroContentsAnimationTarget}>@cathiecode</h1>
            <IconicOneTimeLineAnimation
              duration={600}
              className={styles.heroIconicAnimationRight}
            />
          </div>
        </div>
      </div>
      <div>
        <Heading level={2}>ヒーロー</Heading>
      </div>
    </div>
  );
}
