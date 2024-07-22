import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { initializeNitropack } from "../public/libs/init-nitropack";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeNitropack();
  }, []);
  return <Component {...pageProps} />;
}
