import fetchGlobalContents from "api/fetchGlobalContents";

export default async function injectGlobalContents<T extends { props: any }>(
  original: T
): Promise<T> {
  return {
    ...original,
    props: {
      ...(original?.props ?? {}),
      globalContents: await fetchGlobalContents(),
    },
  };
}
