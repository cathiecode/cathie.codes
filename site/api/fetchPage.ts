import fetchCotnentful from "./fetchContenteful";
import { HastNode } from "mdast-util-to-hast/lib";
import transformContentfulBody from "./transformContentfulBody";

export type PageContents = {
  id: string;
  title: string;
  body: HastNode;
};

export default async function fetchPageContents(
  id: string
): Promise<PageContents> {
  const response = await fetchCotnentful(
    ({ environment_id, access_token, space_id }) =>
      `/spaces/${space_id}/environments/${environment_id}/entries?content_type=page&access_token=${access_token}&fields.id[match]=${id}`
  );

  const page = (response?.items ?? [])[0];

  if (!page) {
    throw new Error(`${id}: Failed to fetch page; Not found?`);
  }

  const fields = page?.fields;

  if (!fields) {
    throw new Error(`${id}: Failed to parse field; Invalid schema?`);
  }

  const body = page?.fields?.body as string | undefined;

  if (!body) {
    throw new Error(`${id}: Failed to parse page; Invalid schema?`);
  }

  const parsedBody = await transformContentfulBody(body);

  if (!parsedBody) {
    throw new Error("Failed to parse body; Empty content or invalid syntax?");
  }

  return {
    id: page.fields["id"],
    title: page.fields["title"],
    body: parsedBody,
  };
}
