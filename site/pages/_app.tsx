import "../styles/globals.css";
import type { AppProps } from "next/app";
import PageLoader from "components/model/global/PageLoader";

function MyApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
