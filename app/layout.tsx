import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotButton from "@/components/ChatbotButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "نظام إدارة كلية الحاسبات والمعلومات - جامعة أسيوط الأهلية",
  description: "نظام متكامل لإدارة العملية التعليمية في كلية الحاسبات والمعلومات",
};

// Routes that have their own DashboardLayout — skip the public Header/Footer for these
const DASHBOARD_PREFIXES = [
  "/student",
  "/professor",
  "/admin",
  "/staff",
  "/assistant",
  "/login",
  "/finance",
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "";

  // Check if this is a dashboard/auth route that manages its own layout
  const isDashboardRoute = DASHBOARD_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {isDashboardRoute ? (
          // Dashboard pages have DashboardLayout — render children directly
          <>{children}</>
        ) : (
          // Public pages get the full public Header + Footer wrapper
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatbotButton />
          </div>
        )}
      </body>
    </html>
  );
}
