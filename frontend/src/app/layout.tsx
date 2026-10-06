import type { Metadata } from "next";
import "./globals.css";

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
        className="font-sans min-h-screen bg-cotton text-ink stationery-living-bg flex flex-col justify-between relative"
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
