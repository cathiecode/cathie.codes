import { GlobalContents } from "api/fetchGlobalContents";
import GlobalContentsContext from "contexts/GlobalContents";
import { ReactNode, useContext } from "react";
import Footer from "../Footer";
import Header from "../Header";
import PageLoader from "../PageLoader";

import styles from "./styles.module.css";

type PageProps = {
  children?: ReactNode;
  globalContents?: GlobalContents;
};

export default function Page({ children, globalContents }: PageProps) {
  return (
    <div className={styles.Page}>
      <GlobalContentsContext.Provider value={globalContents}>
        <div className={styles.contents}>{children}</div>
        <Footer />
      </GlobalContentsContext.Provider>
    </div>
  );
}
