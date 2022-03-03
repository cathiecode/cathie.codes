import Heading from "components/ui/Heading";
import RenderHast from "components/ui/RenderHast";
import { HastNode } from "mdast-util-to-hast/lib";
import Link from "next/link";
import { createElement } from "react";
import ArticleImage from "../ArticleImage";

import styles from "./styles.module.scss";

type ArticleBodyProps = {
  body: HastNode;
};

export default function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className={styles.ArticleBody}>
      <RenderHast
        renderers={{
          h1: (children) => <Heading level={1}>{children}</Heading>,
          h2: (children) => <Heading level={2}>{children}</Heading>,
          h3: (children) => <Heading level={3}>{children}</Heading>,
          h4: (children) => <Heading level={4}>{children}</Heading>,
          h5: (children) => <Heading level={5}>{children}</Heading>,
          h6: (children) => <Heading level={6}>{children}</Heading>,
          img: (_, props) => (
            <ArticleImage
              src={props["src"] as string}
              alt={props["alt"] as string}
              width={Number(props["width"])}
              height={Number(props["height"])}
            />
          ),
          a: (children, { href, ...props }) =>
            typeof href === "string" && !href.startsWith("http") ? (
              <Link href={href}>
                <a {...props}>{children}</a>
              </Link>
            ) : (
              <a href={href as string} {...props}>
                {children}
              </a>
            ),
        }}
        fallbackRenderer={(children, properties, element) => {
          console.error(`Fallbacking element <${element.tagName}>`);
          return createElement(element.tagName, element.properties, children);
        }}
        node={body}
      />
    </div>
  );
}
