import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PaymentPredictor - Freelancer Payment Risk Analysis",
    template: "%s | PaymentPredictor",
  },
  description:
    "Predict payment risk, track invoices, and get paid on time. The smart payment management tool for freelancers.",
  keywords: [
    "payment tracking",
    "invoice management",
    "freelancer tools",
    "payment prediction",
    "risk assessment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
