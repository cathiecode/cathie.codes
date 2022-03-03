import fetchGlobalContents, { GlobalContents } from "api/fetchGlobalContents";
import fetchHomeContents, { HomeContents } from "api/fetchHomeContents";
import Home from "components/page/Home";
import type { GetStaticProps, NextPage } from "next";

type IndexProps = {
  contents: HomeContents;
};

const Index: NextPage<IndexProps> = ({ contents }: IndexProps) => {
  return <Home contents={contents} />;
};

export const getStaticProps: GetStaticProps = async ({}) => {
  const contents = await fetchHomeContents();

  return { props: { contents: contents } };
};

export default Index;
