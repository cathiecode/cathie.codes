import { Tag } from "types/Tag";
import fetchContentful from "./fetchContenteful";
import fetchContentfulObject from "./fetchContentfulObject";

let cache: { [id: string]: Tag } = {};
let cacheDate = 0;

export default async function fetchContentfulTags() {
  if (Date.now() < cacheDate + 30 * 1000) {
    return cache;
  }

  const response = await fetchContentfulObject(
    ({ environment_id, space_id }) =>
      `/spaces/${space_id}/environments/${environment_id}/tags`
  );

  const tags: { [id: string]: Tag } = {};

  response.items.map((item: any) => {
    tags[item.sys.id] = {
      id: item.sys.id,
      name: item.name,
    };
  });

  cache = tags;
  cacheDate = Date.now();

  return tags;
}
