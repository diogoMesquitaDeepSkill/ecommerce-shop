import { AgeVerificationProvider } from "@/components/age-verification-provider";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { Providers } from "./components/providers";
import "./globals.css";
import "./i18n-client";
import { languages } from "./i18n/settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GourmetHub | Premium Food & Wine",
  description:
    "Discover our curated selection of premium wines and gourmet food products",
  generator: "v0.dev",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <AgeVerificationProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </AgeVerificationProvider>
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
