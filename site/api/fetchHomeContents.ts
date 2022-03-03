import { fromParse5, Node } from "hast-util-from-parse5/lib";
import { parseFragment } from "parse5";
import sanitize from "sanitize-html";
import fetchMicroCms from "./fetchMicroCms";

export type HomeContents = {
  body: Node;
};

export default async function fetchHomeContents(): Promise<HomeContents> {
  const response = await fetchMicroCms("index");

  return {
    body: fromParse5(parseFragment(sanitize(response["body"]))),
  };
}
