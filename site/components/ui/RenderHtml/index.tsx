import { ReactNode, CSSProperties, useMemo } from "react";

// FIXME: ブラウザでもJSDOMが読み込まれている気がする。NextJS側の仕組みにしたい。
import { JSDOM } from "jsdom";
import RenderHtmlElement, { Renderer } from "../RenderHtmlElement";

type RenderHtmlProps = {
  html: string;
  renderers: { [tagName: string]: Renderer };
};

let parser =
  "DOMParser" in window
    ? (htmlString: string) =>
        new window.DOMParser().parseFromString(htmlString, "text/html")
    : (htmlString: string) => new JSDOM(htmlString).window.document;

export default function RenderHtml({ html, renderers }: RenderHtmlProps) {
  const domTree = useMemo(() => parser(html), [html]);

  const children = new Array(domTree.children.length);

  for (let i = 0; i < domTree.children.length; i++) {
    children[i] = (
      <RenderHtmlElement
        renderers={renderers}
        originalElement={domTree.children[i]}
      />
    );
  }

  return <>{children}</>;
}
