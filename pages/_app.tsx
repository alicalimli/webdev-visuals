import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";

import type { AppProps } from "next/app";
import { Portal } from "@/components/portal/Portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Portal>
        <ToastContainer
          hideProgressBar={true}
          theme="dark"
          className="z-50"
          transition={Flip}
        />
      </Portal>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Analytics />
      </QueryClientProvider>
    </>
  );
}
