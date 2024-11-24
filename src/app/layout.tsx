import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { inter } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - SmyPlace | Store",
    default: "Home - SmyPlace | Store",
  },
  description: "Welcome to your new favorite place. Your space, your style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
