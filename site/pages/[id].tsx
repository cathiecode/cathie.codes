import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import transformContentfulBody from "api/transformContentfulBody";
import ArticleBody from "components/model/article/ArticleBody";
import Hero from "components/model/article/Hero";
import HeroTitle from "components/model/article/HeroTitle";
import BreadClumbList from "components/model/global/BreadClumbList";
import Page from "components/model/global/Page";
import Container from "components/ui/Container";
import { HastNode } from "mdast-util-to-hast/lib";
import { GetStaticPropsContext, NextPage } from "next";
import injectGlobalContents from "utils/injectGlobalContents";

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
        <Hero>
          <HeroTitle>{article.title}</HeroTitle>
        </Hero>
        <Container>
          <ArticleBody body={article.body} />
          <BreadClumbList pageTitle={article.title} />
        </Container>
      </article>
    </Page>
  );
};

export async function getStaticPaths() {
  return {
    paths: (await fetchEntryList("page")).map(
      (item: any) => `/${item.fields.id}`
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params) {
    throw new Error("No page post id specified");
  }

  const pageId = context.params["id"];

  const entry = (await fetchEntryList("page", { "fields.id": pageId }))[0];

  return injectGlobalContents({
    props: {
      article: {
        title: entry.fields.title,
        body: await transformContentfulBody(entry.fields.body),
      },
    },
  });
}

export default PagePost;
