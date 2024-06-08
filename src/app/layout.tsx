import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Roboto as Font } from "next/font/google";
import { GoogleTagManager as TagManager } from "@next/third-parties/google";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@smastrom/react-rating/style.css";

import "./globals.scss";

import Providers from "./providers";

import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GTAG_ID } from "@/conf/keys";

export const dynamic = "force-dynamic";

const font = Font({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Kupons",
    template: "%s | Kupons",
  },
  description: "Unlock Free Courses with Exclusive Coupon Codes!",
  openGraph: {
    images: [
      {
        url: "https://raw.githubusercontent.com/KuponsXyz/kupons-frontend/main/kupons.png",
        alt: "Kupons",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://raw.githubusercontent.com/KuponsXyz/kupons-frontend/main/kupons.png",
        alt: "Kupons",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <TagManager gtmId={GTAG_ID} />
      <body className={`${font.className} text-gray-600`}>
        <Providers>
          <Header />
          <main className="container">
            {/* Rest of the application */}
            {children}
          </main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
