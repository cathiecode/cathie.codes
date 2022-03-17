import { Tag } from "types/Tag";
import contentful from "./contentful";
import fetchContentfulTags from "./fetchContentfulTags";
import transformAssetFields from "./transformAssetFields";
import transformContentfulBody from "./transformContentfulBody";

export default async function fetchEntryBySlug(
  contentTypeId: string,
  slug: string
) {
  const response = (
    (await contentful.parseEntries(
      await contentful.getEntries({
        "fields.slug": slug,
        content_type: contentTypeId,
      })
    )) as any
  ).items[0];

  const tagPool = await fetchContentfulTags();

  let body = response?.fields?.body;
  if (response.fields.body) {
    body = await transformContentfulBody(response.fields.body);
  }

  let tags: Tag[] =
    response?.metadata?.tags?.map((item: any) => ({
      id: item.sys.id,
      name: tagPool[item.sys.id].name,
    })) ?? [];

  return {
    ...response.sys,
    ...response.metadata,
    ...(await transformAssetFields(response.fields)),
    ...(body ? { body } : {}),
    tags: tags,
    raw: response,
  };
}
