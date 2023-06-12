import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { Portal } from "@/components/portal/Portal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Portal>
        <Toaster position="top-center" reverseOrder={false} />
      </Portal>

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />

        <Analytics />
      </QueryClientProvider>
    </>
  );
}
