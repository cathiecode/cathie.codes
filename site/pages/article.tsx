import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import Header from "components/model/global/Header";
import { NextPage } from "next";
import Image from "next/image";

const Article: NextPage = () => {
  return (
    <>
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
        <HeroHorizontalLine />
        <HeroText>
          <div>
            勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．勉強ばかりして遊ばないと子供はばかになる．仕事ばかりしている人間はおもしろみのない人になる．
          </div>
          <div># 使用技術タグ #使用技術タグ #使用技術タグ</div>
        </HeroText>
      </Hero>
    </>
  );
};

export default Article;
