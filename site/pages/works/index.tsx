import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import ArticleCard from "components/model/article/ArticleCard";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import Page from "components/model/global/Page";
import Container from "components/ui/Container";
import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { Tag } from "types/Tag";
import injectGlobalContents from "utils/injectGlobalContents";

type WorksArticleMetadata = {
  id: string;
  title: string;
  date: string;
  tags: Tag[];
  coverImage: string;
};

type WorksPostProps = {
  articles: WorksArticleMetadata[];
  globalContents: GlobalContents;
};

const WorksPost: NextPage<WorksPostProps> = ({
  articles,
  globalContents,
}: WorksPostProps) => {
  return (
    <Page globalContents={globalContents}>
      <article>
        <Hero>
          <HeroTitle>作品</HeroTitle>
          <HeroHorizontalLine />
          <HeroText>作品カテゴリの記事の一覧です！</HeroText>
        </Hero>
        <Container>
          {articles.map((article: any) => (
            <Link href={`/works/${article.id}`} key={article.id} passHref>
              <a>
                <ArticleCard {...article} />
              </a>
            </Link>
          ))}
        </Container>
      </article>
    </Page>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const entries = await fetchEntryList("work", {
    select: "sys.id,fields.title,metadata.tags,sys.createdAt,fields.coverImage",
  });

  return injectGlobalContents({
    props: {
      articles: entries.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title,
        tags: item.metadata.tags,
        date: item.sys.createdAt,
        coverImage: item.fields.coverImage ?? null,
      })),
    },
  });
}

export default WorksPost;
