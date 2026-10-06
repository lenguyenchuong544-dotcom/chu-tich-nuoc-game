import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chủ Tịch Nước – Vận Mệnh Quốc Gia | Trò Chơi Học Tập & Quyết Sách",
  description:
    "Trò chơi tương tác nhập vai Chủ tịch nước điều hành quốc gia phục vụ học tập môn Chủ nghĩa xã hội khoa học",
  icons: {
    icon: "/favicon.ico",
  },
};

import { MotionProvider } from "@/components/MotionProvider";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnam.variable} ${mono.variable} font-sans min-h-screen bg-cotton text-ink stationery-living-bg flex flex-col justify-between relative`}
      >
        <MotionProvider>
          <AnimatedBackground />
          <div className="relative z-10 flex-1 flex flex-col min-h-screen">
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
