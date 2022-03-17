import { GlobalContents } from "api/fetchGlobalContents";
import { HomeContents } from "api/fetchHomeContents";
import ArticleBody from "components/model/article/ArticleBody";
import Page from "components/model/global/Page";
import CatherineTalkingBubble from "components/ui/CatherineTalkingBubble";
import Container from "components/ui/Container";
import Heading from "components/ui/Heading";
import IconicOneTimeLineAnimation from "components/ui/IconicOneTimeLineAnimation";
import styles from "./styles.module.css";

import cathiecode from "../../../assets/cathiecode.svg";
import Head from "next/head";

type HomeProps = {
  contents: HomeContents;
};

export default function Home({ contents }: HomeProps) {
  return (
    <div className={styles.Home}>
      <Head>
        <title>cathie.codes</title>
      </Head>
      <div className={styles.hero}>
        <div className={styles.heroBack}></div>
        <div className={styles.heroFront}>
          <div className={styles.heroMainContents}>
            <IconicOneTimeLineAnimation
              duration={600}
              className={styles.heroIconicAnimationLeft}
            />
            <h1 className={styles.heroContentsAnimationTarget}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              @cathiecode
            </h1>
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
