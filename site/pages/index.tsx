import fetchGlobalContents, { GlobalContents } from "api/fetchGlobalContents";
import fetchHomeContents, { HomeContents } from "api/fetchHomeContents";
import Page from "components/model/global/Page";
import Home from "components/page/Home";
import type { GetStaticProps, NextPage } from "next";
import hastAddBlurDataUrl from "utils/hastAddBlurDataUrl";

type IndexProps = {
  contents: HomeContents;
  globalContents: GlobalContents;
};

const Index: NextPage<IndexProps> = ({
  contents,
  globalContents,
}: IndexProps) => {
  return (
    <Page globalContents={globalContents}>
      <Home contents={contents} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({}) => {
  const contents = await fetchHomeContents();
  const globalContents = await fetchGlobalContents();

  await hastAddBlurDataUrl(contents.body);

  return { props: { contents, globalContents } };
};

export default Index;
