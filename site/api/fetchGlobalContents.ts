export type GlobalContents = {
  lastModified: string;
};

const lastModified = new Date();

export default async function fetchGlobalContents(): Promise<GlobalContents> {
  return {
    lastModified: lastModified.toISOString(),
  };
}
