import contentful from "api/contentful";
import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import ArticleCard from "components/model/article/ArticleCard";
import Hero from "components/model/article/Hero";
import HeroTitle from "components/model/article/HeroTitle";
import BreadClumbList from "components/model/global/BreadClumbList";
import Page from "components/model/global/Page";
import Container from "components/ui/Container";
import Heading from "components/ui/Heading";
import Notification from "components/ui/Notification";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { Tag } from "types/Tag";
import injectGlobalContents from "utils/injectGlobalContents";

type Article = {
  id: string;
  title: string;
  tags: Tag[];
  coverImage: {
    url: string;
    blurImageUrl: string;
    width: number;
    height: number;
  };
  date: string;
};

type TagPageProps = {
  tagName: string;
  worksArticles: Article[];
  blogArticles: Article[];
  globalContents: GlobalContents;
};

export function TagPage({
  tagName,
  worksArticles,
  blogArticles,
  globalContents,
}: TagPageProps) {
  return (
    <Page globalContents={globalContents}>
      <Hero>
        <HeroTitle component="h1">タグ: {tagName}</HeroTitle>
      </Hero>
      <Container>
        <section>
          <Heading level={2}>作品カテゴリの記事</Heading>
          {worksArticles.map((article) => (
            <Link href={`/works/${article.id}`} key={article.id}>
              <a>
                <ArticleCard key={article.id} {...article} />
              </a>
            </Link>
          ))}
          {worksArticles.length === 0 && <p>該当する記事がありません！</p>}
        </section>
        <section>
          <Heading level={2}>日記カテゴリの記事</Heading>
          {blogArticles.map((article) => (
            <Link href={`/blog/${article.id}`} key={article.id}>
              <a>
                <ArticleCard key={article.id} {...article} />
              </a>
            </Link>
          ))}
          {blogArticles.length === 0 && (
            <Notification>該当する記事がありません！</Notification>
          )}
        </section>
        <BreadClumbList pageTitle={tagName} />
      </Container>
    </Page>
  );
}

export async function getStaticPaths() {
  return {
    paths: (await contentful.getTags()).items.map(
      (item) => `/tag/${item.sys.id}`
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params?.["id"]) {
    throw new Error("No work post id specified");
  }

  const tagId = context.params["id"];

  if (typeof tagId !== "string") {
    throw new Error("Invalid tag param");
  }

  const worksEntries = await fetchEntryList("work", {
    "metadata.tags.sys.id[all]": tagId,
    select: "fields.title,fields.coverImage,metadata.tags,sys.createdAt",
  });

  const blogEntries = await fetchEntryList("blog", {
    "metadata.tags.sys.id[all]": tagId,
    select: "fields.title,fields.coverImage,metadata.tags,sys.createdAt",
  });

  const tag = await contentful.getTag(tagId);

  return injectGlobalContents({
    props: {
      tagName: tag.name,
      worksArticles: worksEntries.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        tags: item.metadata.tags,
        coverImage: item.fields.coverImage ?? null,
        date: item.sys.createdAt,
      })),
      blogArticles: blogEntries.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        tags: item.metadata.tags,
        coverImage: item.fields.coverImage ?? null,
        date: item.sys.createdAt,
      })),
    },
  });
}

export default TagPage;
