import { useRouter } from "next/router";
import { ReactNode, CSSProperties, useState, useEffect } from "react";

import styles from "./styles.module.css";

type PageLoaderProps = {
  className?: string;
  style?: CSSProperties;
};

export default function PageLoader({ className, style }: PageLoaderProps) {
  const router = useRouter();

  const [fakeProgress, setFakeProgress] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [loaderKey, setLoaderKey] = useState(0);

  useEffect(() => {
    const handleStart = (url: string) => {
      setIsLoading(true);
      setFakeProgress(0);
      setLoaderKey((key) => key + 1);
    };
    const handleStop = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFakeProgress((prev) => prev + 0.5);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [loaderKey]);

  return (
    <svg
      key={loaderKey}
      style={{ ...style, opacity: isLoading && fakeProgress !== 0 ? 1 : 0 }}
      className={`${className ?? ""} ${styles.PageLoader}`}
      width="100px"
      height="1px"
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className={styles.PageLoader}
        strokeDashoffset={isLoading ? (1 - 1 / (fakeProgress + 1)) * 100 : 100}
      >
        <path
          stroke="#2f2fff"
          d="M 100,0.5 H 0"
          strokeDasharray="0, 100, 100"
          pathLength="100"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
