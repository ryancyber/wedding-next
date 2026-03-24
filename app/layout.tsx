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
  metadataBase: new URL('https://ryancyber.github.io/wedding-putri-n-riswandi'),
  title: "The Wedding of Putri & Riswandi",
  description: "Sabtu, 04 April 2026 | Mohon doa restu dan kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami.",
  openGraph: {
    title: "The Wedding of Putri & Riswandi",
    description: "Sabtu, 04 April 2026",
    url: "https://ryancyber.github.io/wedding-putri-n-riswandi/",
    siteName: "Undangan Pernikahan Putri & Riswandi",
    images: [
      {
        url: "/WhatsApp Image 2026-03-14 at 09.58.58.jpeg",
        width: 1200,
        height: 630,
        alt: "Putri & Riswandi Wedding",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Putri & Riswandi",
    description: "Sabtu, 04 April 2026",
    images: ["/WhatsApp Image 2026-03-14 at 09.58.58.jpeg"],
  },
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

