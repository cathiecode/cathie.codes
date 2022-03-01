import type { NextPage } from "next";
import Heading from "components/ui/Heading";
import IconicOneTimeLineAnimation from "components/ui/IconicOneTimeLineAnimation";
import IconicInfiniteLineAnimation from "components/ui/IconicInfiniteLineAnimation";
import Hero from "components/model/article/Hero";
import HeroTitle from "components/model/article/HeroTitle";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import Image from "next/image";
import Container from "components/ui/Container";
import PageLoader from "components/model/global/PageLoader";

const Components: NextPage = () => {
  return (
    <div>
      <Container>
        <Heading level={2}>ui</Heading>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Heading key={level} level={level}>
            Heading {level}
          </Heading>
        ))}
        <IconicOneTimeLineAnimation />
        <IconicInfiniteLineAnimation />
        <div>
          <PageLoader style={{ width: "100%", height: "8px" }} />
        </div>
      </Container>
      <div>
        <Heading level={2}>article</Heading>
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
      </div>
    </div>
  );
};

export default Components;
