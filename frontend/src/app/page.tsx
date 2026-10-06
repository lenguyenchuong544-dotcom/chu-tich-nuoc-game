'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { Trophy, Users, ArrowRight, Play, BookOpen, Shield } from 'lucide-react';

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
    // Simple elegant sound effect, no narrator voice
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
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 command-center-bg relative">
      {/* Top Bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 border-b border-white/10 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-red-700/80 border border-yellow-400 flex items-center justify-center text-yellow-300 text-xs font-bold">
            ★
          </div>
          <span className="font-semibold tracking-wider uppercase text-slate-200 text-[11px] sm:text-xs">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/leaderboard"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors font-medium text-xs"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Bảng Xếp Hạng</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors font-medium text-xs"
          >
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Giảng Viên</span>
          </Link>
        </div>
      </header>

      {/* Main Command Center Stage */}
      <main className="w-full max-w-xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        {/* Presidential Insignia */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-red-700 to-red-900 border border-amber-400/80 flex items-center justify-center text-yellow-300 text-2xl sm:text-3xl font-black shadow-xl">
            ★
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-[#0b1329] border border-amber-400/40 text-[9px] font-bold uppercase tracking-widest text-amber-400 whitespace-nowrap">
            NGUYÊN THỦ QUỐC GIA
          </span>
        </div>

        {/* Cinematic Title */}
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-slate-100 mt-2">
          CHỦ TỊCH NƯỚC
        </h1>
        <h2 className="text-lg sm:text-2xl font-bold uppercase tracking-widest text-amber-400 mt-0.5">
          VẬN MỆNH QUỐC GIA
        </h2>

        {/* Subtitle explicitly requested in PROMT-UI */}
        <p className="text-slate-300 text-xs sm:text-sm font-serif italic mt-3 max-w-md">
          &ldquo;Một nhiệm kỳ. 30 quyết định. Vận mệnh quốc gia nằm trong tay bạn.&rdquo;
        </p>

        {/* Academic Course Tag */}
        <div className="inline-flex items-center space-x-1.5 my-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-400">
          <BookOpen className="w-3 h-3 text-amber-400" />
          <span>Môn: Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN & Pháp quyền XHCN</span>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleStartGame}
          className="w-full max-w-sm my-4 p-5 rounded-2xl bg-[#0f172a]/95 border border-white/10 shadow-xl text-left"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Họ và Tên Sinh Viên
              </label>
              <input
                type="text"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-slate-100 text-xs sm:text-sm placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Mã Số Sinh Viên (MSSV) / Lớp
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Ví dụ: K65-1024"
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 text-slate-100 text-xs sm:text-sm placeholder:text-slate-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>BẮT ĐẦU NHIỆM KỲ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/leaderboard"
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 border border-white/5"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>BẢNG XẾP HẠNG</span>
            </Link>
          </div>

          <p className="text-[10px] text-slate-500 text-center mt-2.5">
            Hỗ trợ đồng thời 60 người chơi cùng lúc với bảng xếp hạng giảng viên trực tiếp.
          </p>
        </form>
      </main>

      {/* Clean Footer */}
      <footer className="w-full max-w-4xl mx-auto py-2 text-center text-[10px] text-slate-500 border-t border-white/5 flex items-center justify-between">
        <span>© 2026 Game Giáo Dục – Chủ Tịch Nước: Vận Mệnh Quốc Gia</span>
        <div className="flex items-center space-x-3">
          <Link href="/leaderboard" className="hover:text-amber-400 transition-colors">
            Xếp Hạng
          </Link>
          <Link href="/admin" className="hover:text-amber-400 transition-colors">
            Cổng Giảng Viên
          </Link>
        </div>
      </footer>
    </div>
  );
}
