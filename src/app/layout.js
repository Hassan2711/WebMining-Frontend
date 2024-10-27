// src/app/layout.js
import ClientComponent from "@/components/ui/ClientComponent";
import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mining Web App",
  description: "Mining Web App Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
}
