import fetchGlobalContents, { GlobalContents } from "api/fetchGlobalContents";

export default async function injectGlobalContents<T extends { props: any }>(
  original: T
): Promise<
  { props: Extract<T, "props"> & { globalContents: GlobalContents } } & Omit<
    T,
    "props"
  >
> {
  return {
    ...original,
    props: {
      ...(original?.props ?? {}),
      globalContents: await fetchGlobalContents(),
    },
  };
}
