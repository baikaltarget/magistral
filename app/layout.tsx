import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBar from "@/components/CookieBar";
import JsonLd, { org } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: `Автосервис «Магистраль» в Иркутске`, template: "%s" },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", locale: "ru_RU", siteName: SITE.fullName, images: ["/img/fasad-2.webp"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="mx-auto max-w-[1600px] px-0 sm:px-2 sm:pt-2">
          <div className="bg-sheet sm:rounded-xl2 min-h-screen pb-6">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
        <CookieBar />
        <JsonLd data={org()} />
        {/* Яндекс.Метрика — вставить код счётчика ниже, перед </body> */}
      </body>
    </html>
  );
}
