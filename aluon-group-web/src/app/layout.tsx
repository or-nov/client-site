import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteContent } from "@/content/siteContent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Alu-on group | מעטפת הבניין",
  description:
    "פתרונות מתקדמים למעטפת הבניין: אלוקובונד, HPL, אלומיניום וקירות מסך.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header solutions={siteContent.home.solutions} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
