import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { AgentProvider } from "@/context/AgentContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AgentProvider>
      <main className={`${poppins.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </AgentProvider>
  );
}
