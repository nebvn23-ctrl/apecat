import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/config/apecat";
import { anton, jbmono, marker, wordmark } from "@/fonts";

const siteUrl = `https://${SITE.domain}`;

export const viewport: Viewport = {
  themeColor: "#10110E",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "APECAT — The New Meta Has Touched Grass",
  description:
    "Not a cat. Not an ape. Just a very confused creature walking through the grass like he owns the entire blockchain. Zero thoughts. Maximum aura.",
  applicationName: "APECAT",
  keywords: ["apecat", "meme coin", "crypto meme", "gorilla cat"],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "APECAT — The New Meta Has Touched Grass",
    description:
      "Not a cat. Not an ape. Just a very confused creature walking through the grass like he owns the entire blockchain. Zero thoughts. Maximum aura.",
    url: siteUrl,
    siteName: "APECAT",
    images: [
      {
        url: "/media/apecat/apecat-screen-touch.png",
        width: 1376,
        height: 768,
        alt: "Apecat reaching toward the camera in a sunlit field.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APECAT — The New Meta Has Touched Grass",
    description:
      "Not a cat. Not an ape. Just a very confused creature walking through the grass like he owns the entire blockchain.",
    images: ["/media/apecat/apecat-screen-touch.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${jbmono.variable} ${marker.variable} ${wordmark.variable}`}>
      <body>{children}</body>
    </html>
  );
}
