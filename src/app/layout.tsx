import type { Metadata } from "next";
import {Inter, Poppins} from "next/font/google"
import "./globals.css";


const inter  = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-geist-mono",
  subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pelora",
  description: "AI Work OS",
   icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
