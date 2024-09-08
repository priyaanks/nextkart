import "@/styles/globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import { Providers } from "@/lib/providers";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </Providers>
    </>
  );
}
