import { HastNode } from "mdast-util-to-hast/lib";
import fetchPageContents from "./fetchPage";

export type HomeContents = {
  body: HastNode;
};

export default async function fetchBlogContents(): Promise<HomeContents> {
  return await fetchPageContents("index");
}
