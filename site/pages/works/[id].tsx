import contentful from "api/contentful";
import fetchEntry from "api/fetchEntry";
import fetchEntryBySlug from "api/fetchEntryBySlug";
import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import transformContentfulBody from "api/transformContentfulBody";
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
import assetImageToAttributes from "converters/assetImageToAttributes";
import resolveTags from "converters/resolveTags";
import dayjs from "dayjs";
import { HastNode } from "mdast-util-to-hast/lib";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { IWork, IWorkFields } from "types/contentful.generated";
import { Tag } from "types/Tag";
import injectGlobalContents from "utils/injectGlobalContents";

type WorksArticle = {
  title: string;
  copyText: string;
  leadText: string;
  body: HastNode;
  dateStart: string;
  dateEnd: string | undefined;
  coverImage: {
    src: string;
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
              src={article.coverImage.src}
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

export const getStaticProps: GetStaticProps<WorksPostProps> = async (
  context: GetStaticPropsContext
) => {
  if (!context.params) {
    throw new Error("No work post id specified");
  }

  const workId = context.params["id"];

  const entries = await contentful.getEntries<IWorkFields>({
    content_type: "work",
    "fields.slug": workId,
  });

  const entry = entries.items[0];

  if (entry === undefined) {
    throw new Error(`No such article ${workId}`);
  }

  console.log(JSON.stringify(entry));

  const entryFields = entry.fields;

  return await injectGlobalContents({
    props: {
      article: {
        title: entryFields.title,
        copyText: entryFields.copyText,
        leadText: entryFields.leadText,
        body: await transformContentfulBody(entryFields.body),
        dateStart: entryFields.dateStart,
        dateEnd: entryFields.dateEnd,
        coverImage: await assetImageToAttributes(entryFields.coverImage),
        tags: await resolveTags(entry.metadata.tags),
      },
    },
  });
};

export default WorksPost;
