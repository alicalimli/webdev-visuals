import { Navbar } from "@/components";
import Footer from "@/components/footer/Footer";
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
        <div className="min-h-screen">
          <Main />
        </div>
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
