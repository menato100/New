import React from "react";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  AnalyticsTracker,
  ErrorBoundaryClient,
  DOMInspector,
  Branding,
} from "@/utils/creatr.scripts";
import { GlobalErrorHandler } from "@/utils/global-error-handler";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Create a proper React component wrapper
const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const ErrorBoundaryComponent =
    ErrorBoundaryClient as unknown as React.ComponentType<any>;
  return <ErrorBoundaryComponent {...props} />;
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "FuturForge",
    template: "%s | FuturForge",
  },
  description: "Forging the future of technology with cutting-edge news, insights, and analysis",
  applicationName: "FuturForge",
  keywords: ["technology", "tech news", "digital innovation", "AI", "cybersecurity", "hardware", "cloud computing", "future tech"],
  authors: [{ name: "FuturForge Team" }],
  creator: "FuturForge",
  publisher: "FuturForge",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TechInsight",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <GlobalErrorHandler />
        <DOMInspector>
          <ErrorBoundaryWrapper>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Branding />
          </ErrorBoundaryWrapper>
          <AnalyticsTracker siteKey="${siteKey}" />
        </DOMInspector>
      </body>
    </html>
  );
}
