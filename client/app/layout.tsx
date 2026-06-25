import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import SplashScreen from "@/components/shared/SplashScreen";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "PikoNox - Business Consulting & Technology Solutions",
    template: "%s | PikoNox",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "PikoNox delivers cutting-edge business consulting, digital transformation, and technology solutions for modern enterprises. Unlock growth with expert financial strategy and innovation.",
  keywords: [
    "pikonox",
    "business consulting",
    "technology solutions",
    "digital transformation",
    "financial strategy",
    "IT consulting",
    "enterprise solutions",
  ],
  authors: [{ name: "pikonox" }],
  openGraph: {
    type: "website",
    title: "pikonox - Business Consulting & Technology Solutions",
    description:
      "pikonox delivers cutting-edge business consulting, digital transformation, and technology solutions for modern enterprises.",
    siteName: "pikonox",
  },
  twitter: {
    card: "summary_large_image",
    title: "pikonox - Business Consulting & Technology Solutions",
    description:
      "Cutting-edge business consulting and technology solutions for modern enterprises.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics / Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YLWP45FQQT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YLWP45FQQT');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} min-h-screen selection:bg-primary selection:text-white font-(--font-poppins)`} suppressHydrationWarning>
        <SplashScreen />
        <NextTopLoader
          color="#1683F8"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #1683F8, 0 0 5px #1683F8"
          easing="ease"
          speed={200}
        />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#1e293b",
              color: "#f8fafc",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: { iconTheme: { primary: "#2EA043", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
