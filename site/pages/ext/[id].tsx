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

type ExtPostProps = {
  title: string;
  url: string;
  globalContents: GlobalContents;
};

const ExtPost: NextPage<ExtPostProps> = ({ globalContents }: ExtPostProps) => {
  return <Page globalContents={globalContents}>TODO</Page>;
};

export async function getStaticPaths() {
  return {
    paths: (await fetchEntryList("external")).items.map(
      (item: any) => `/ext/${item.id}`
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
      title: entry.title,
      ext: entry.url,
    },
  };
}

export default ExtPost;
