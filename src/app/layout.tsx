import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const ToasterProvider = dynamic(() => import("@/components/layout/ToasterProvider"), {
  ssr: true
});

const ModalProvider = dynamic(() => import("@/components/layout/ModalProvider"), {
  ssr: true
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Secret Share - Secure Self-Destructing Messages",
  description: "Share sensitive information securely with self-destructing links. No registration required, end-to-end encryption, and automatic expiration.",
  keywords: ["secret sharing", "secure messaging", "self-destructing", "encryption", "password protection"],
  authors: [{ name: "Secret Share" }],
  creator: "Secret Share",
  openGraph: {
    title: "Secret Share - Secure Self-Destructing Messages",
    description: "Share sensitive information securely with self-destructing links.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret Share - Secure Self-Destructing Messages",
    description: "Share sensitive information securely with self-destructing links.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ToasterProvider />
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}

