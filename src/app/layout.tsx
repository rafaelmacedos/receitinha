import "./globals.css";
import { Baloo_2 } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

const baloo2 = Baloo_2({ subsets: ['latin'], style: ['normal'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: "Receitinha",
  description:
    "Aplicação desenvolvida para a competência - Integrar Interfaces e Serviços WEB",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={baloo2.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
