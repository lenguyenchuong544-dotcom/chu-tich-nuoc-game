'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { Trophy, Users, ArrowRight, Play, BookOpen, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('president_name') || '';
    const savedId = localStorage.getItem('president_student_id') || '';
    setPlayerName(savedName);
    setStudentId(savedId);
  }, []);

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = playerName.trim() || 'Chủ tịch nước';
    const finalId = studentId.trim() || 'SV_' + Math.floor(1000 + Math.random() * 9000);

    localStorage.setItem('president_name', finalName);
    localStorage.setItem('president_student_id', finalId);

    setIsSubmitting(true);
    sound.playGameStart();

    fetch('http://localhost:4000/api/player/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: finalName, studentId: finalId }),
    }).catch(() => {});

    setTimeout(() => {
      router.push('/game');
    }, 180);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 stationery-living-bg relative">
      {/* Top Header Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-3 border-b border-blush-border/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-wrong-surface border border-wrong-border flex items-center justify-center text-wrong-text text-sm font-bold shadow-xs">
            ★
          </div>
          <span className="font-extrabold tracking-wider uppercase text-ink text-xs sm:text-sm">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/leaderboard"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/90 hover:bg-blush-subtle border border-blush-border text-ink-muted hover:text-ink transition-colors font-bold text-xs sm:text-sm shadow-xs"
          >
            <Trophy className="w-4 h-4 text-highlight" />
            <span>Bảng Xếp Hạng</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/90 hover:bg-sky-subtle border border-sky-border text-ink-muted hover:text-ink transition-colors font-bold text-xs sm:text-sm shadow-xs"
          >
            <Users className="w-4 h-4 text-cornflower-600" />
            <span>Giảng Viên</span>
          </Link>
        </div>
      </header>

      {/* Main Situation Room Stage (Bilateral 2-Column Layout) */}
      <main className="w-full max-w-6xl mx-auto my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: National Command Briefing & Educational Context */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          {/* State Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-blush to-blush-surface border-2 border-peony-300 flex items-center justify-center text-peony-700 text-3xl sm:text-4xl font-black shadow-pastel-pink">
              ★
            </div>
            <div className="text-left">
              <span className="px-3 py-0.5 rounded-full bg-white border border-peony-300 text-xs font-bold uppercase tracking-wider text-peony-700 shadow-xs inline-block">
                NGUYÊN THỦ QUỐC GIA
              </span>
              <p className="text-xs text-ink-muted mt-1 font-mono">Phiên bản học tập tương tác số</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide text-ink">
              CHỦ TỊCH NƯỚC
            </h1>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-widest text-peony-700 mt-1">
              VẬN MỆNH QUỐC GIA
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-ink-muted text-base sm:text-lg italic max-w-xl font-normal leading-relaxed">
            &ldquo;Một nhiệm kỳ. 30 quyết định. Vận mệnh quốc gia nằm trong tay bạn.&rdquo;
          </p>

          {/* Academic Subject Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/90 border border-blush-border text-xs sm:text-sm font-medium text-ink-muted shadow-xs">
            <BookOpen className="w-4 h-4 text-peony-500 shrink-0" />
            <span>Môn: Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN & Pháp quyền XHCN</span>
          </div>

          {/* 3 Pillar Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2">
            <div className="p-3.5 rounded-2xl bg-white/80 border border-blush-border/70 shadow-xs text-left">
              <span className="text-xl mb-1 block">🏛</span>
              <h4 className="text-xs sm:text-sm font-bold text-ink">30 Quyết Sách</h4>
              <p className="text-xs text-ink-muted mt-0.5 leading-snug">Điều hành chính trị, kinh tế, lòng dân và quốc phòng.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-sky-border/70 shadow-xs text-left">
              <span className="text-xl mb-1 block">⚖️</span>
              <h4 className="text-xs sm:text-sm font-bold text-cornflower-700">Pháp Quyền XHCN</h4>
              <p className="text-xs text-ink-muted mt-0.5 leading-snug">Vận dụng chuẩn xác lý luận và Hiến pháp nước CHXHCN Việt Nam.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 border border-highlight-border/70 shadow-xs text-left">
              <span className="text-xl mb-1 block">🏆</span>
              <h4 className="text-xs sm:text-sm font-bold text-highlight-text">Đồng Bộ Trực Tiếp</h4>
              <p className="text-xs text-ink-muted mt-0.5 leading-snug">Tranh tài trực tiếp trên bảng xếp hạng giảng đường 60 sinh viên.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Appointment Registration Dossier */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <form
            onSubmit={handleStartGame}
            className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border-2 border-blush-border shadow-dossier text-left relative"
          >
            <div className="mb-5 pb-3 border-b border-blush-border/70 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono font-bold text-peony-700">
                  HỒ SƠ NHẬM CHỨC
                </span>
                <h3 className="text-lg font-black text-ink mt-0.5">Đăng Ký Nhiệm Kỳ</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blush-subtle border border-blush-border flex items-center justify-center text-peony-700 font-bold text-sm">
                ✍️
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-ink mb-1.5">
                  Họ và Tên Sinh Viên
                </label>
                <input
                  type="text"
                  required
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-4 py-3 rounded-xl bg-cotton border border-blush-border focus:border-peony-500 focus:ring-2 focus:ring-peony-200 text-ink text-sm sm:text-base placeholder:text-ink-faint outline-none transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-ink mb-1.5">
                  Mã Số Sinh Viên (MSSV) / Lớp
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Ví dụ: K65-1024"
                  className="w-full px-4 py-3 rounded-xl bg-cotton border border-blush-border focus:border-peony-500 focus:ring-2 focus:ring-peony-200 text-ink text-sm sm:text-base placeholder:text-ink-faint outline-none transition-all shadow-xs"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="w-full"
                leftIcon={<Play className="w-5 h-5 fill-white" />}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                BẮT ĐẦU NHIỆM KỲ
              </Button>

              <Link href="/leaderboard" className="block w-full">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  leftIcon={<Trophy className="w-4 h-4 text-highlight" />}
                >
                  BẢNG XẾP HẠNG
                </Button>
              </Link>
            </div>

            <p className="text-xs text-ink-muted text-center mt-3.5 leading-relaxed">
              Hệ thống hỗ trợ đồng thời 60 người chơi cùng lúc với bảng xếp hạng giảng viên trực tiếp.
            </p>
          </form>
        </div>
      </main>

      {/* Clean Stationery Footer */}
      <footer className="w-full max-w-6xl mx-auto py-3 text-center text-xs text-ink-muted border-t border-blush-border/80 flex items-center justify-between">
        <span>© 2026 Game Giáo Dục – Chủ Tịch Nước: Vận Mệnh Quốc Gia</span>
        <div className="flex items-center space-x-4">
          <Link href="/leaderboard" className="hover:text-peony-700 transition-colors font-medium">
            Xếp Hạng
          </Link>
          <Link href="/admin" className="hover:text-peony-700 transition-colors font-medium">
            Cổng Giảng Viên
          </Link>
        </div>
      </footer>
    </div>
  );
}
