import type { Metadata } from "next";
import { Bangers, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import SpiderNav from "@/components/layout/SpiderNav";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marvel's Multiverse",
  description: "每个宇宙都有一个在写代码的我",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${bangers.variable} ${notoSansSC.variable} h-full`}
      style={{ fontFamily: "var(--font-noto), sans-serif" }}
    >
      <body className="min-h-full flex flex-col">
        <SpiderNav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
