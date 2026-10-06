import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFDFE",
};

export const metadata: Metadata = {
  title: "Chủ Tịch Nước – Vận Mệnh Quốc Gia | Trò Chơi Quyết Định & Học Tập",
  description: "Trò chơi tương tác nhập vai điều hành quốc gia phục vụ học tập môn Chủ nghĩa xã hội khoa học",
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
    <html lang="vi" className={`${beVietnamPro.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen living-pastel-bg text-ink font-sans flex flex-col justify-between selection:bg-blush-deep selection:text-peony-700">
        {children}
      </body>
    </html>
  );
}
