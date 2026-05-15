import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "ICE-BI | Bijoux & Accessoires Hommes",
  description: "Découvrez notre collection de bijoux et accessoires pour hommes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-black text-white">
        <ThemeProvider>
          <ShopProvider>
            <AnimatedBackground />
            <Header />
            {children}
            <Footer />
          </ShopProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}