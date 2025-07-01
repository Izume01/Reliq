import type { Metadata } from "next";
import { Dancing_Script, Geist, Geist_Mono, Pacifico, Caveat, Roboto } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/next"

const ToasterProvider = dynamic(() => import("@/components/layout/ToasterProvider"), {
  ssr: true
});

const ModalProvider = dynamic(() => import("@/components/layout/ModalProvider"), {
  ssr: true
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
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

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Reliq - Secure Self-Destructing Messages",
  description: "Share sensitive information securely with self-destructing links. No registration required, end-to-end encryption, and automatic expiration.",
  keywords: ["secret sharing", "secure messaging", "self-destructing", "encryption", "password protection"],
  authors: [{ name: "Reliq" }],
  creator: "Reliq",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Reliq - Secure Self-Destructing Messages",
    description: "Share sensitive information securely with self-destructing links.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliq - Secure Self-Destructing Messages",
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
        className={`${geistSans.variable} ${geistMono.variable}  ${dancingScript.variable} ${pacifico.variable} ${caveat.variable} ${roboto.variable} antialiased h-full`}
      >
        <Analytics />
        <ToasterProvider />
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}

