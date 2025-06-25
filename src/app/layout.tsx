import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
