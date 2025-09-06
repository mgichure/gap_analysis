import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TenantProvider } from "@/lib/tenancy";
import { UserProvider } from "@/lib/user-context";
import { ThemeProvider } from "@/components/theme-provider";

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
        <ThemeProvider>
          <UserProvider>
            <TenantProvider>
              {children}
              <Toaster />
            </TenantProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
