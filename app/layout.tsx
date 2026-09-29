import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityContext";
import { Header } from "@/components/orbit/Header";

export const metadata: Metadata = {
  title: "SRM Orbit — The Contextual Campus OS",
  description: "A contextual interaction layer connecting students directly to actionable campus services, wayfinding, transit, and academics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 antialiased text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white">
        <AccessibilityProvider>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
