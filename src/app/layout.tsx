import type { Metadata } from "next";
import { Poppins, Syne, DM_Sans } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/preLoader";
import SmoothScroll from "@/components/layout/smoothScroll";

import PageTransition from "@/components/layout/PageTransition";
import LabsWindow from "@/app/labs/LabsWindow"; // Added
import { LabsProvider } from "@/context/LabsContext"; // Added
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flux",
  description: "Flux Labs Official Website",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks the page as "preloading" before first paint (same rule the Preloader uses),
            so no animation runs behind it. The Preloader clears it when it is done;
            the timeout is only a safety net. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var n=performance.getEntriesByType('navigation')[0];var r=n&&n.type==='reload';if(!sessionStorage.getItem('flux-preloader-seen')||r){var d=document.documentElement;d.setAttribute('data-preloading','');setTimeout(function(){if(d.hasAttribute('data-preloading')){d.removeAttribute('data-preloading');window.dispatchEvent(new Event('flux:ready'))}},7000)}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <LabsProvider> {/* Wrap everything in the provider */}
          <Preloader />

          <Navbar />

          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>

          <PageTransition />

          {/* The window stays here to float above everything */}
          <LabsWindow /> 
        </LabsProvider>
      </body>
    </html>
  );
}
