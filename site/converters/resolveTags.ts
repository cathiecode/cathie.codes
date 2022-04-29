import contentful from "api/contentful";
import { TagLink } from "contentful";
import { Tag } from "types/Tag";

let tagRequest = contentful.getTags();

export default async function resolveTags(tagLinks: TagLink[]): Promise<Tag[]> {
  const tags = await tagRequest;

  return tagLinks.map((tagLink) => {
    const tag = tags.items.find((tag) => tag.sys.id === tagLink.sys.id);
    if (!tag) {
      throw new Error(`No such tag ${tagLink.sys.id}`);
    }
    return {
      name: tag.name,
      id: tag.sys.id,
    };
  });
}
