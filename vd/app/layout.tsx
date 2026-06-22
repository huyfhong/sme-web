import type { Metadata } from "next";
import { Roboto, Sarabun } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SME HUB",
  description: "Pixel-perfect website clone of SME HUB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${roboto.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-roboto">{children}</body>
    </html>
  );
}
