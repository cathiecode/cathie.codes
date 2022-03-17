import fetchEntry from "api/fetchEntry";
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
import { GetStaticPathsContext, GetStaticPropsContext, NextPage } from "next";
import { Tag } from "types/Tag";
import injectGlobalContents from "utils/injectGlobalContents";

type BlogArticle = {
  title: string;
  body: HastNode;
  date: string;
  tags: Tag[];
  coverImage?: {
    url: string;
    blurImageUrl: string;
    width: number;
    height: number;
  };
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
          background={({ className }) =>
            article.coverImage && (
              <Image
                src={article.coverImage?.url}
                blurDataURL={article.coverImage?.blurImageUrl}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                alt=""
                className={className}
                sizes="25vw"
              />
            )
          }
        >
          <HeroText>{dayjs(article.date).format("YYYY/MM/DD")}</HeroText>
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
    paths: (await fetchEntryList("blog", { select: "" })).map(
      (item: any) => `/blog/${item.sys.id}`
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

  return injectGlobalContents({
    props: {
      article: {
        title: entry.title,
        body: entry.body,
        coverImage: entry.coverImage ?? null,
        tags: entry.tags ?? [],
      },
    },
  });
}

export default BlogPost;
