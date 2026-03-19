import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding of Putri & Putra",
  description: "Minggu, 28 Desember 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${playfairDisplay.variable} ${dancingScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

