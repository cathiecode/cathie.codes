import "../styles/globals.css";
import type { AppProps } from "next/app";
import PageLoader from "components/model/global/PageLoader";
import Header from "components/model/global/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <script>0</script>
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
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
