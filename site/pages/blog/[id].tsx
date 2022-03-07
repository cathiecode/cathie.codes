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
import { GetStaticPathsContext, GetStaticPropsContext, NextPage } from "next";
import { Tag } from "types/Tag";

type BlogArticle = {
  title: string;
  body: HastNode;
  date: string;
  tags: Tag[];
  coverImage: string;
};

type BlogPostProps = {
  article: BlogArticle;
  globalContents: GlobalContents;
};

const BlogPost: NextPage<BlogPostProps> = ({
  article,
  globalContents,
}: BlogPostProps) => {
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
          <HeroText>{dayjs(article.date).format("YYYY/MM/DD")}</HeroText>
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
    paths: (await fetchEntryList("blog")).items.map(
      (item: any) => `/blog/${item.id}`
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params) {
    throw new Error("No blog post id specified");
  }

  const blogId = context.params["id"];

  const entry = await fetchEntry(blogId as string);

  return {
    props: {
      article: {
        title: entry.title,
        body: entry.body,
        coverImage: entry.coverImage ?? null,
        tags: entry.tags ?? [],
      },
    },
  };
}

export default BlogPost;
