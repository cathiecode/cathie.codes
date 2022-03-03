import { GlobalContents } from "api/fetchGlobalContents";
import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import PageLoader from "../PageLoader";

import styles from "./styles.module.css";

type PageProps = {
  children?: ReactNode;
};

export default function Page({ children }: PageProps) {
  return (
    <>
      <PageLoader
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height: "4px",
          top: 0,
        }}
      />
      <Header />
      {children}
      <Footer contents={globalContents} />
    </>
  );
}
