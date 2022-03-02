import ArticleBody from "components/model/article/ArticleBody";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import Header from "components/model/global/Header";
import Container from "components/ui/Container";
import Heading from "components/ui/Heading";
import { NextPage } from "next";
import Image from "next/image";

const Article: NextPage = () => {
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
        <HeroText>
          勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．
        </HeroText>
        <HeroText># 使用技術タグ #使用技術タグ #使用技術タグ</HeroText>
      </Hero>
      <Container>
        <ArticleBody
          contents={`
            <h2>勉強ばかりして遊ばないと子供はばかになる．</h2>
            <img src="vercel.svg" alt="">
            <p>勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．</p>
          `}
        />
      </Container>
    </article>
  );
};

export default Article;
