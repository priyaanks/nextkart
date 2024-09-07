import "@/styles/globals.css";

import { Providers } from "@/lib/providers";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Providers>
    </>
  );
}
