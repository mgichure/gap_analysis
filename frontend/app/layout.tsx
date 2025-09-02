import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TenantProvider } from "@/lib/tenancy";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gap Analysis Platform",
  description: "Comprehensive gap analysis and compliance management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TenantProvider>
          {children}
          <Toaster />
        </TenantProvider>
      </body>
    </html>
  );
}
