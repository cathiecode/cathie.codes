import { Tag } from "types/Tag";
import contentful from "./contentful";
import fetchContentful from "./fetchContenteful";
import fetchContentfulTags from "./fetchContentfulTags";
import transformAssetFields from "./transformAssetFields";
import transformContentfulBody from "./transformContentfulBody";

export default async function fetchEntry(entry_id: string) {
  const response = (await contentful.parseEntries(
    await contentful.getEntry(entry_id)
  )) as any;

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
