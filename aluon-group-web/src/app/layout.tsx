import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AccessibilityWidget } from "@/components/ui/AccessibilityWidget";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { FlowingWavesBackground } from "@/components/ui/FlowingWavesBackground";
import { FloatingSocialBar } from "@/components/ui/FloatingSocialBar";
import { GlobalAnimatedBackground } from "@/components/ui/GlobalAnimatedBackground";
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
  weight: ["300", "400", "500", "600", "700"],
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
  /* סקריפט החלה העדפות נגישות לפני רינדור – מונע "קפיצה" */
  const a11yScript = `
(function(){
  try {
    if (typeof localStorage === 'undefined') return;
    var el = document.documentElement;
    if (localStorage.getItem('accessibility-text-size') === 'large') el.classList.add('a11y-font-plus');
    if (localStorage.getItem('accessibility-high-contrast') === 'true') el.classList.add('a11y-high-contrast');
    if (localStorage.getItem('accessibility-underline-links') === 'true') el.classList.add('a11y-underline-links');
    if (localStorage.getItem('accessibility-reduce-motion') === 'true') el.classList.add('a11y-reduce-motion');
    if (localStorage.getItem('accessibility-grayscale') === 'true') el.setAttribute('data-accessibility-grayscale', 'true');
  } catch(e) {}
})();
  `.trim();

  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} flex min-h-screen flex-col antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: a11yScript }} />
        <FlowingWavesBackground />
        <GlobalAnimatedBackground />
        <FloatingSocialBar />
        <AccessibilityWidget />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header solutions={siteContent.home.solutions} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
