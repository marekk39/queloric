import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Web Development & Custom Websites — Queloric",
    template: "%s | Queloric",
  },
  description:
    "Custom websites, AI chatbots, Telegram and Discord bots, and workflow automation. Built fast, priced fairly, starting from 50€.",
  metadataBase: new URL("https://queloric.com"),
  openGraph: {
    title: "Queloric — AI & Web Development Agency",
    description: "Custom websites, AI chatbots, bots and automation. Starting from 50€. Live in days, not months.",
    siteName: "Queloric",
    type: "website",
    locale: "en_US",
    url: "https://queloric.com",
    images: [{ url: "https://queloric.com/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queloric — AI & Web Development Agency",
    description: "Custom websites, AI chatbots, bots and automation. Starting from 50€.",
  },
  alternates: { canonical: "https://queloric.com/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://s.pageclip.co/v1/pageclip.css" media="screen" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { "@context": "https://schema.org", "@type": "Organization", "name": "Queloric", "url": "https://queloric.com" },
          { "@context": "https://schema.org", "@type": "Service", "name": "Custom Website Design", "provider": { "@type": "Organization", "name": "Queloric" }, "offers": { "@type": "Offer", "price": "50", "priceCurrency": "EUR" } }
        ]) }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
