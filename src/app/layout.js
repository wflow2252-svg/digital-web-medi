import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DropGenius AI | إمبراطورية الدروب شيبنج الذكية",
  description: "أتمتة كاملة لمتجرك الإلكتروني، سحب منتجات رابحة، وربط تلقائي بالموردين.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${inter.className} bg-mesh`}>
        {children}
      </body>
    </html>
  );
}
