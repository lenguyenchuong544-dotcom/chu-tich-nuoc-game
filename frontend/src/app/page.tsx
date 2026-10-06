'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { Trophy, Users, Play, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
    const finalName = playerName.trim() || 'Chủ tịch danh dự';
    const finalId = studentId.trim() || 'SV_' + Math.floor(1000 + Math.random() * 9000);

    localStorage.setItem('president_name', finalName);
    localStorage.setItem('president_student_id', finalId);

    setIsSubmitting(true);
    sound.playDecisionClick();
    sound.playBGM();

    // Register with backend in background
    fetch(`${API_BASE}/api/player/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: finalName, studentId: finalId }),
    }).catch(() => {});

    setTimeout(() => {
      router.push('/game');
    }, 180);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 living-pastel-bg text-ink relative">
      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2 border-b border-blush-deep/60">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-peony border-2 border-blush-deep flex items-center justify-center text-white text-xs font-bold shadow-tactile">
            ★
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-ink-muted">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
          <Link href="/leaderboard">
            <Button variant="ghost" size="sm">
              <Trophy className="w-3.5 h-3.5 text-peony" />
              <span className="hidden sm:inline">Bảng Vinh Danh</span>
            </Button>
          </Link>

          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <Users className="w-3.5 h-3.5 text-cornflower-700" />
              <span className="hidden sm:inline">Cổng Giảng Viên</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Hero & Appointment Briefing Form */}
      <main className="w-full max-w-2xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center z-10">
        {/* Soft Presidential Insignia */}
        <div className="relative mb-3">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-blush via-blush-deep to-peony/30 border-2 border-peony flex items-center justify-center text-peony-700 text-3xl font-black shadow-dossier">
            ★
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
            <Badge variant="blush" size="sm">
              NGUYÊN THỦ QUỐC GIA
            </Badge>
          </div>
        </div>

        {/* Big Grand Titles */}
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink mt-3 font-sans">
          CHỦ TỊCH NƯỚC
        </h1>
        <h2 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-peony-700 mt-1">
          VẬN MỆNH QUỐC GIA
        </h2>

        {/* Subtitle Exact Wording */}
        <p className="text-ink-muted text-sm sm:text-base font-sans italic mt-3 max-w-lg leading-relaxed font-normal">
          &ldquo;Một nhiệm kỳ. 30 quyết định. Vận mệnh quốc gia nằm trong tay bạn.&rdquo;
        </p>

        {/* Course Badge */}
        <div className="inline-flex items-center space-x-2 my-4 px-3.5 py-1.5 rounded-pill bg-sky-surface border border-sky-deep text-[11px] text-cornflower-700 font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Môn: Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN & Pháp quyền</span>
        </div>

        {/* Appointment Briefing Card (Stationery Dossier) */}
        <form
          onSubmit={handleStartGame}
          className="w-full max-w-md my-2 p-6 sm:p-7 rounded-2xl bg-cotton border-2 border-blush-deep shadow-dossier text-left"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                Họ và Tên (Đồng chí Chủ tịch nước)
              </label>
              <input
                type="text"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-4 py-2.5 rounded-xl bg-blush-surface/70 border-2 border-blush-deep text-ink text-sm placeholder:text-ink-subtle outline-none focus:border-peony transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                Mã Số Sinh Viên (MSSV) / Lớp
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Ví dụ: K65-1024"
                className="w-full px-4 py-2.5 rounded-xl bg-blush-surface/70 border-2 border-blush-deep text-ink text-sm placeholder:text-ink-subtle outline-none focus:border-peony transition-all"
              />
            </div>
          </div>

          {/* CTA Buttons: Primary & Secondary */}
          <div className="space-y-2.5 mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>BẮT ĐẦU NHIỆM KỲ</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Link href="/leaderboard" className="w-full block">
              <Button
                type="button"
                variant="outline"
                size="md"
                className="w-full"
              >
                <Trophy className="w-4 h-4 text-peony" />
                <span>BẢNG VINH DANH</span>
              </Button>
            </Link>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-sky-surface border border-sky-deep text-[11px] text-cornflower-700 flex items-center space-x-2">
            <Compass className="w-4 h-4 flex-shrink-0" />
            <span>Mẹo: Vuốt thẻ sang trái hoặc phải để quyết sách. Dùng chuột hoặc ngón tay.</span>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center text-[11px] text-ink-muted border-t border-blush-deep/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Học viện / Trường Đại học – Giảng dạy bộ môn Lý luận Chính trị</span>
        <div className="flex items-center space-x-4">
          <Link href="/leaderboard" className="hover:text-peony-700 font-semibold transition-colors">
            Bảng Vinh Danh
          </Link>
          <Link href="/admin" className="hover:text-peony-700 font-semibold transition-colors">
            Cổng Giảng Viên
          </Link>
        </div>
      </footer>
    </div>
  );
}
