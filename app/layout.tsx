import "./globals.css";
import { RootProvider } from "@/lib/providers/RootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "OrderFi",
  description:
    "OrderFi is a decentralized demo app for placing and tracking orders with live wallet integration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-black">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
