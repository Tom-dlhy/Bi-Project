import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intelligent Help Center | Dashboard Admin - ESILV",
  description:
    "Dashboard Business Intelligence pour surveiller le Chatbot RAG de l'ESILV. Visualisation des KPIs, activité hebdomadaire, répartition des sujets et logs des questions.",
  keywords: [
    "ESILV",
    "chatbot",
    "RAG",
    "Business Intelligence",
    "dashboard",
    "help center",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
