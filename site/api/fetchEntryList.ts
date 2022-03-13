import contentful from "./contentful";
import fetchContentfulTags from "./fetchContentfulTags";
import transformAssetFields from "./transformAssetFields";

export default async function fetchEntryList(type: string, query: object = {}) {
  const result = (await contentful.parseEntries(
    await contentful.getEntries({ content_type: type, ...query })
  )) as any;

  const tagPool = await fetchContentfulTags();

  const transformedItems = await Promise.all(
    result.items.map(async (item: any) => ({
      ...item,
      fields: await transformAssetFields(item.fields),
      metadata: {
        ...item.metadata,
        tags: item.metadata.tags.map((item: any) => ({
          id: item.sys.id,
          name: tagPool[item.sys.id].name,
        })),
      },
    }))
  );

  return transformedItems;
}
