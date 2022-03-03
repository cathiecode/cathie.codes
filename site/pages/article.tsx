import ArticleBody from "components/model/article/ArticleBody";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import Header from "components/model/global/Header";
import Container from "components/ui/Container";
import RenderHast from "components/ui/RenderHast";

import { fromParse5, Node } from "hast-util-from-parse5/lib";

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
  body: Node;
};

type ArticleProps = {
  article: ArticleData;
};

const Article: NextPage<ArticleProps> = ({ article }: ArticleProps) => {
  console.log(article.body);
  return (
    <article>
      <Header />
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
  );
};

export const getStaticProps: GetStaticProps = async ({}) => {
  const article: ArticleData = {
    title: "リブロ・イラストラド",
    coverImage:
      "https://cathie.codes/assets/portfolio/libro_ilustrado/title.png",
    leadText:
      "勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．",
    tags: ["使用技術タグ", "使用技術タグ", "使用技術タグ"],
    body: fromParse5(
      parseFragment(
        `<h2>勉強ばかりして遊ばないと子供はばかになる．</h2><img src="/vercel.svg" /><p>仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．</p>`
      )
    ),
  };

  return { props: { article } };
};
export default Article;
