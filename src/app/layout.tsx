import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import VercelAnalytics from "@/components/analytics/VercelAnalytics";
import AppNavbar from "@/components/layout/AppNavbar";
import AppFooter from "@/components/layout/AppFooter";

const ToasterProvider = dynamic(() => import("@/components/layout/ToasterProvider"), {
  ssr: true
});

const ModalProvider = dynamic(() => import("@/components/layout/ModalProvider"), {
  ssr: true
});

export const metadata: Metadata = {
  title: "Reliq - Secure Self-Destructing Messages",
  description: "Share sensitive information securely with self-destructing links. Account-bound creation, end-to-end encryption, and automatic expiration.",
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
    description: "Share sensitive information securely with self-destructing links and account-bound ownership.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliq - Secure Self-Destructing Messages",
    description: "Share sensitive information securely with self-destructing links and account-bound ownership.",
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
      <body className="h-full antialiased font-geist-sans">
        <ToasterProvider />
        <ModalProvider>
          <div className="flex min-h-full flex-col">
            <AppNavbar />
            <div className="flex-1">
              {children}
            </div>
            <AppFooter />
          </div>
        </ModalProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
