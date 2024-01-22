import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Fragment } from "react";
const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} className={poppins.className} />;
}
