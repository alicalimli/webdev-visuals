import { Navbar } from "@/components";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>WebDevVisuals</title>
        <meta name="description" content="Visuals for web development" />
      </Head>
      <body className="bg-bg-main text-white ">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
