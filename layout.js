import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap"
});

export const metadata = {
  title: "Aether Studio — Website Developer for premium brands",
  description:
    "I design and build high-performance websites for ambitious brands. Designed to convert. Engineered to scale.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Aether Studio — High-performance websites",
    description:
      "Designed to convert. Engineered to scale. A senior web developer crafting luxury digital experiences.",
    type: "website"
  }
};

export const viewport = {
  themeColor: "#0A0A0A"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="grain">
        <Loader />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
