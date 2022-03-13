import fetchEntry from "api/fetchArticle";
import fetchEntryList from "api/fetchEntryList";
import { GlobalContents } from "api/fetchGlobalContents";
import InlineFrame from "components/model/external/InlineFrame";
import Page from "components/model/global/Page";
import Container from "components/ui/Container";
import { GetStaticPropsContext, NextPage } from "next";
import injectGlobalContents from "utils/injectGlobalContents";

type ExtPostProps = {
  title: string;
  url: string;
  globalContents: GlobalContents;
};

const ExtPost: NextPage<ExtPostProps> = ({
  globalContents,
  title,
  url,
}: ExtPostProps) => {
  return (
    <Page globalContents={globalContents}>
      <Container>
        <InlineFrame src={url} />
      </Container>
    </Page>
  );
};

export async function getStaticPaths() {
  return {
    paths: (await fetchEntryList("external")).map(
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

  return injectGlobalContents({
    props: {
      title: entry.title,
      url: entry.url,
    },
  });
}

export default ExtPost;
