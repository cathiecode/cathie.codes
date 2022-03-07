import { Tag } from "types/Tag";
import fetchContentful from "./fetchContenteful";
import fetchContentfulTags from "./fetchContentfulTags";
import transformContentfulBody from "./transformContentfulBody";

export default async function fetchEntry(entry_id: string) {
  const response = await fetchContentful(
    ({ environment_id, access_token, space_id }) =>
      `/spaces/${space_id}/environments/${environment_id}/entries/${entry_id}?access_token=${access_token}`
  );

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
    ...response.fields,
    ...(body ? { body } : {}),
    tags: tags,
    raw: response,
  };
}
