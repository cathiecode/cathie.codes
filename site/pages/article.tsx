import fetchGlobalContents, { GlobalContents } from "api/fetchGlobalContents";
import ArticleBody from "components/model/article/ArticleBody";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import Page from "components/model/global/Page";
import Container from "components/ui/Container";
import { fromMarkdown } from "mdast-util-from-markdown";
import { HastNode, toHast } from "mdast-util-to-hast/lib";

import {
  GetStaticProps,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from "next";

import Image from "next/image";
import { parse, parseFragment } from "parse5";
import React from "react";

type ArticleData = {
  title: string;
  coverImage: string /* may be data url */;
  leadText: string;
  tags: string[];
  body: HastNode;
};

type ArticleProps = {
  article: ArticleData;
  globalContents: GlobalContents;
};

const Article: NextPage<ArticleProps> = ({
  article,
  globalContents,
}: ArticleProps) => {
  console.log(article.body);
  return (
    <Page globalContents={globalContents}>
      <article>
        <Hero
          background={({ className }) => (
            <Image
              src="https://cathie.codes/assets/portfolio/libro_ilustrado/title.png"
              layout="fill"
              objectFit="cover"
              alt=""
              className={className}
            />
          )}
        >
          <HeroTitle>リブロ・イラストラド</HeroTitle>
          <HeroText>アクション×ブロック崩し×ストーリー</HeroText>
          <HeroHorizontalLine />
          <HeroText>{article.leadText}</HeroText>
          <HeroText>{article.tags.map((tag) => `#${tag}`)}</HeroText>
        </Hero>
        <Container>
          <ArticleBody body={article.body} />
        </Container>
      </article>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const article: ArticleData = {
    title: "リブロ・イラストラド",
    coverImage:
      "https://cathie.codes/assets/portfolio/libro_ilustrado/title.png",
    leadText:
      "勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．",
    tags: ["使用技術タグ", "使用技術タグ", "使用技術タグ"],
    body: toHast(fromMarkdown("")) ?? { type: "root", children: [] },
  };

  const globalContents = await fetchGlobalContents();

  return { props: { article, globalContents } };
};

export default Article;
