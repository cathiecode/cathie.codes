import { GlobalContents } from "api/fetchGlobalContents";
import { HomeContents } from "api/fetchHomeContents";
import ArticleBody from "components/model/article/ArticleBody";
import Page from "components/model/global/Page";
import CatherineTalkingBubble from "components/ui/CatherineTalkingBubble";
import Container from "components/ui/Container";
import Heading from "components/ui/Heading";
import IconicOneTimeLineAnimation from "components/ui/IconicOneTimeLineAnimation";
import styles from "./styles.module.css";

type HomeProps = {
  contents: HomeContents;
};

export default function Home({ contents }: HomeProps) {
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
      <Container>
        <ArticleBody body={contents.body} />
      </Container>
    </div>
  );
}
