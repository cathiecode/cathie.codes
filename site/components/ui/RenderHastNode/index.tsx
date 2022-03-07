import { Element, Properties } from "hast";
import { HastNode } from "mdast-util-to-hast/lib";
import { ReactNode, CSSProperties, HTMLAttributes, ReactElement } from "react";

export type Renderer = (
  children: ReactNode,
  properties: Properties,
  element: Element
) => ReactNode | null;

type RenderHastNodeProps = {
  className?: string;
  style?: CSSProperties;
  renderers: {
    [tagName: string]: Renderer;
  };
  node: HastNode;
  fallbackRenderer?: Renderer;
};

export default function RenderHastNode(props: RenderHastNodeProps) {
  const { renderers, fallbackRenderer, node } = props;
  if (node.type === "text") {
    return <>{node.value}</>;
  }
  if (node.type === "root") {
    return (
      <>
        {node.children.map((child, i) => (
          <RenderHastNode {...props} node={child} key={i} />
        ))}
      </>
    );
  }

  if (node.type === "comment" || node.type === "doctype") {
    return null;
  }

  if (node.type === "raw") {
    return <>{node.value}</>;
  }

  const renderer = renderers[node.tagName] ?? fallbackRenderer;

  if (!renderer) {
    console.error(node);
    throw new Error("No such tag renderer " + node.tagName);
  }

  let children = null;
  if (node.children && node.children.length !== 0) {
    children = node.children.map((child, i) => (
      <RenderHastNode {...props} node={child} key={i} />
    ));
  }

  return <>{renderer(children, node.properties ?? {}, node)}</>;
}
