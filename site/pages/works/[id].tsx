import fetchEntry from "api/fetchArticle";
import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import ArticleBody from "components/model/article/ArticleBody";
import Hero from "components/model/article/Hero";
import HeroHorizontalLine from "components/model/article/HeroHorizontalLine";
import HeroText from "components/model/article/HeroText";
import HeroTitle from "components/model/article/HeroTitle";
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
  coverImage: string;
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
              src="https://cathie.codes/assets/portfolio/libro_ilustrado/title.png"
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
              ? dayjs(article.dateStart).isSame(article.dateEnd, "year")
                ? dayjs(article.dateStart).format("- YYYY/MM/DD")
                : dayjs(article.dateStart).format("- MM/DD")
              : ""}
          </HeroText>
          <HeroTitle>{article.title}</HeroTitle>
          <HeroHorizontalLine />
          <HeroText>{article.tags.map((tag) => `#${tag.name}`)}</HeroText>
        </Hero>
        <Container>
          <ArticleBody body={article.body} />
        </Container>
      </article>
    </Page>
  );
};

export async function getStaticPaths() {
  return {
    paths: (await fetchEntryList("work")).items.map(
      (item: any) => `/works/${item.id}`
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params) {
    throw new Error("No work post id specified");
  }

  const workId = context.params["id"];

  const entry = await fetchEntry(workId as string);

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
