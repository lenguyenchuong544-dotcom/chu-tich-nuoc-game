import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chủ Tịch Nước – Vận Mệnh Quốc Gia | Trò Chơi Chiến Lược & Học Tập",
  description: "Trò chơi tương tác nhập vai Chủ tịch nước điều hành quốc gia phục vụ học tập môn Chủ nghĩa xã hội khoa học",
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
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 presidential-pattern font-sans flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
