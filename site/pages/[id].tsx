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

type PageArticle = {
  id: string;
  title: string;
  body: HastNode;
};

type PagePostProps = {
  article: PageArticle;
  globalContents: GlobalContents;
};

const PagePost: NextPage<PagePostProps> = ({
  article,
  globalContents,
}: PagePostProps) => {
  return (
    <Page globalContents={globalContents}>
      <article>
        <Container>
          <ArticleBody body={article.body} />
        </Container>
      </article>
    </Page>
  );
};

export async function getStaticPaths() {
  return {
    paths: (await fetchEntryList("page")).items.map(
      (item: any) => `/${item.id}`
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params) {
    throw new Error("No ext post id specified");
  }

  const extId = context.params["id"];

  const entry = await fetchEntry(extId as string);

  return {
    props: {
      article: {
        title: entry.title,
        ext: entry.url,
      },
    },
  };
}

export default PagePost;
