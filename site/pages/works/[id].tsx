import fetchEntry from "api/fetchEntry";
import fetchEntryBySlug from "api/fetchEntryBySlug";
import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import ArticleBody from "components/model/article/ArticleBody";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroTags from "components/model/article/HeroTags";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
import BreadClumbList from "components/model/global/BreadClumbList";
import Page from "components/model/global/Page";
import Container from "components/ui/Container";
import Image from "components/ui/Image";
import dayjs from "dayjs";
import { HastNode } from "mdast-util-to-hast/lib";
import { GetStaticPropsContext, NextPage } from "next";
import { Tag } from "types/Tag";
import injectGlobalContents from "utils/injectGlobalContents";

type WorksArticle = {
  title: string;
  copyText: string;
  leadText: string;
  body: HastNode;
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
  article: WorksArticle;
  globalContents: GlobalContents;
};

const WorksPost: NextPage<WorksPostProps> = ({
  article,
  globalContents,
}: WorksPostProps) => {
  return (
    <Page globalContents={globalContents}>
      <article>
        <Hero
          background={({ className }) => (
            <Image
              src={article.coverImage.url}
              blurDataURL={article.coverImage.blurImageUrl}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt=""
              className={className}
            />
          )}
        >
          <HeroText>
            {dayjs(article.dateStart).format("YYYY/MM/DD")}
            {article.dateEnd
              ? dayjs(article.dateEnd).isSame(article.dateEnd, "year")
                ? dayjs(article.dateEnd).format("- YYYY/MM/DD")
                : dayjs(article.dateEnd).format("- MM/DD")
              : ""}
          </HeroText>
          <HeroTitle>{article.title}</HeroTitle>
          <HeroHorizontalLine />
          <HeroTags tags={article.tags} />
        </Hero>
        <Container>
          <BreadClumbList pageTitle={article.title} />
          <ArticleBody body={article.body} />
        </Container>
      </article>
    </Page>
  );
};

export async function getStaticPaths() {
  return {
    paths: (await fetchEntryList("work")).map(
      (item: any) => `/works/${item.fields.slug}`
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params) {
    throw new Error("No work post id specified");
  }

  const workId = context.params["id"];

  const entry = await fetchEntryBySlug("work", workId as string);

  return injectGlobalContents({
    props: {
      article: {
        title: entry.title,
        copyText: entry.copyText,
        leadText: entry.leadText,
        body: entry.body,
        dateStart: entry.dateStart,
        dateEnd: entry.dateEnd,
        coverImage: entry.coverImage ?? null,
        tags: entry.tags ?? [],
      },
    },
  });
}

export default WorksPost;
