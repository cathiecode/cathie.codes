export type GlobalContents = {
  lastModified: Date;
};

const lastModified = new Date();

export default async function fetchGlobalContents(): Promise<GlobalContents> {
  return {
    lastModified: lastModified,
  };
}
