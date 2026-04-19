import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DropGenius AI | إمبراطورية الدروب شيبنج الذكية",
  description: "أتمتة كاملة لمتجرك الإلكتروني، سحب منتجات رابحة، وربط تلقائي بالموردين.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} bg-mesh`}>
          <Script 
            src="https://accounts.google.com/gsi/client" 
            strategy="afterInteractive" 
          />
          <main id="main-content">
            {children}
          </main>
      </body>
    </html>
  );
}
