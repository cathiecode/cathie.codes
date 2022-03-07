import fetchGlobalContents from "api/fetchGlobalContents";

export default async function injectGlobalContents(
  original: any
): Promise<any> {
  return {
    ...original,
    props: {
      ...(original?.props ?? {}),
      globalContents: await fetchGlobalContents(),
    },
  };
}
