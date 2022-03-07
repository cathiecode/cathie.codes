import getResizedImage from "api/getResizedImage";
import { HastNode } from "mdast-util-to-hast/lib";
import { visit } from "unist-util-visit";

export default async function hastAddBlurDataUrl(rewriteTarget: HastNode) {
  const promiseList: Promise<void>[] = [];

  visit(rewriteTarget, (node) => {
    if (
      node.type === "element" &&
      node.tagName === "img" &&
      node.properties &&
      typeof node?.properties["src"] === "string"
    ) {
      let source = node.properties.src;
      if (typeof node.properties["blurDataURL"] === "string") {
        source = node.properties["blurDataURL"];
        delete node.properties["blurDataURL"];
      }
      promiseList.push(
        getResizedImage(source).then((resized) => {
          if (node.properties) {
            node.properties["blurDataUrl"] = resized;
          }
        })
      );
    }
  });

  await Promise.all(promiseList);

  return rewriteTarget;
}
