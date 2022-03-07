import { defaultSchema, sanitize } from "hast-util-sanitize";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";
import { HastNode } from "mdast-util-to-hast/lib";
import { visit } from "unist-util-visit";
import { gfm } from "micromark-extension-gfm";
import { gfmFromMarkdown, gfmToMarkdown } from "mdast-util-gfm";
import fetchContentfulImageMetadata from "./fetchContentfulImageMetadata";
import getResizedImage from "./getResizedImage";

const allowedContents = {
  ...defaultSchema,
};

export default async function transformContentfulBody(
  body: string
): Promise<HastNode> {
  const parsed = toHast(
    fromMarkdown(body, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()],
    })
  );

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
      if (!node.properties) {
        return;
      }

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
          if (!node.properties) {
            return;
          }

          const metadata = await fetchContentfulImageMetadata(src);

          let blurSource = src;
          if (typeof metadata?.placeholder === "string") {
            blurSource = metadata?.placeholder;
          }

          const resized = await getResizedImage(blurSource);

          Object.assign(node.properties, {
            width: metadata?.width,
            height: metadata?.height,
            src: src,
            blurDataUrl: resized,
          });
        })()
      );
    }
  });

  await Promise.all(waitPromise);

  return sanitized;
}
