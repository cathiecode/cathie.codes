import { sanitize } from "hast-util-sanitize";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";
import { HastNode } from "mdast-util-to-hast/lib";
import { visit } from "unist-util-visit";
import fetchContentfulImageMetadata from "./fetchContentfulImageMetadata";

export default async function transformContentfulBody(
  body: string
): Promise<HastNode> {
  const parsed = toHast(fromMarkdown(body));

  if (!parsed) {
    return {
      type: "root",
      children: [],
    };
  }

  const sanitized = sanitize(parsed);

  const waitPromise: Promise<void>[] = [];

  visit(sanitized, "element", (node) => {
    if (node.tagName === "img") {
      let src = node?.properties?.src;
      if (!src || typeof src !== "string") {
        return;
      }
      if (!src.startsWith("//") && !src.startsWith("http")) {
        return;
      }
      if (src.startsWith("//images.ctfassets.net")) {
        src = "https:" + src;
      }
      waitPromise.push(
        (async () => {
          const metadata = await fetchContentfulImageMetadata(src);
          Object.assign(node.properties, {
            width: metadata?.width,
            height: metadata?.height,
            src: src,
            blurDataURL: metadata?.placeholder,
          });
        })()
      );
    }
  });

  await Promise.all(waitPromise);

  return sanitized;
}
