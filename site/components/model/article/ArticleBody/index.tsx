import sanitize from "sanitize-html";

import styles from "./styles.module.scss";

type ArticleBodyProps = {
  contents: string;
};

const sanitizeOption = {
  ...sanitize.defaults,
  allowedTags: [...sanitize.defaults.allowedTags, "img"],
};

export default function ArticleBody({ contents }: ArticleBodyProps) {
  return (
    <div
      className={styles.ArticleBody}
      dangerouslySetInnerHTML={{ __html: sanitize(contents, sanitizeOption) }}
    ></div>
  );
}
