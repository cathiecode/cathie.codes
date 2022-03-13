import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import ArticleCard from "components/model/article/ArticleCard";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import Page from "components/model/global/Page";
import WorkCard from "components/model/works/WorkCard";
import Container from "components/ui/Container";
import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { Tag } from "types/Tag";
import injectGlobalContents from "utils/injectGlobalContents";

type WorksArticleMetadata = {
  id: string;
  title: string;
  copyText: string;
  leadText: string;
  dateStart: string;
  dateEnd: string;
  coverImage: {
    url: string;
    blurImageUrl: string;
    width: number;
    height: number;
  };
  tags: Tag[];
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
      <Hero>
        <HeroTitle>作品</HeroTitle>
        <HeroHorizontalLine />
        <HeroText>作品カテゴリの記事の一覧です！</HeroText>
      </Hero>
      {articles.map((article) => (
        <WorkCard key={article.id} workArticle={article} />
      ))}
    </Page>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const entries = await fetchEntryList("work");

  return injectGlobalContents({
    props: {
      articles: entries.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title,
        tags: item.metadata.tags,
        date: item.sys.createdAt,
        leadText: item.fields.leadText,
        dateStart: item.fields.dateStart,
        dateEnd: item.fields.dateEnd,
        copyText: item.fields.copyText,
        coverImage: item.fields.coverImage ?? null,
      })),
    },
  });
}

export default WorksPost;
