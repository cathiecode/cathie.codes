import { ReactNode, CSSProperties, HTMLAttributes, ReactElement } from "react";

export type Renderer = (
  attributes: NamedNodeMap,
  children: ReactNode
) => ReactElement;

type RenderHtmlElementProps = {
  className?: string;
  style?: CSSProperties;
  renderers: {
    [tagName: string]: Renderer;
  };
  originalElement: Element;
  fallbackRenderer?: Renderer;
};

export default function RenderHtmlElement({
  renderers,
  fallbackRenderer,
  originalElement,
}: RenderHtmlElementProps) {
  const renderer = renderers[originalElement.tagName] ?? fallbackRenderer;

  if (!renderer) {
    throw new Error("No such tag renderer");
  }

  const children = new Array(originalElement.children.length);

  for (let i = 0; i < originalElement.children.length; i++) {
    children[i] = (
      <RenderHtmlElement
        renderers={renderers}
        originalElement={originalElement.children[i]}
      />
    );
  }

  return renderer(originalElement.attributes, children);
}
