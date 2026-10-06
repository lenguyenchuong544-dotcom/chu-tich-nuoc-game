'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sound } from '@/lib/sound';
import { Shield, Trophy, Users, BookOpen, Scale, Landmark, Coins, HeartHandshake, ArrowRight, Play, Award } from 'lucide-react';

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
    fetch('http://localhost:4000/api/player/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: finalName, studentId: finalId }),
    }).catch(() => {});

    setTimeout(() => {
      router.push('/game');
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 presidential-pattern relative overflow-hidden">
      {/* Background Decorative Gold Stars & Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-3 border-b border-amber-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-red-600 border border-yellow-400 flex items-center justify-center text-yellow-300 text-xs font-bold shadow-md">
            ★
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-amber-300">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/leaderboard"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 transition-all font-semibold"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Bảng Xếp Hạng</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 transition-all font-semibold"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Giảng Viên (Admin)</span>
          </Link>
        </div>
      </header>

      {/* Main Hero & Registration Container */}
      <main className="w-full max-w-3xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        {/* Presidential Insignia */}
        <div className="relative mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-red-600 to-red-800 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 text-3xl sm:text-4xl font-black shadow-2xl gold-glow">
            ★
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-900 border border-yellow-500/60 text-[10px] font-bold uppercase tracking-widest text-amber-400 whitespace-nowrap shadow-md">
            NGUYÊN THỦ QUỐC GIA
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-slate-100 mt-2">
          CHỦ TỊCH NƯỚC
        </h1>
        <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-widest gold-gradient-text mt-1">
          VẬN MỆNH QUỐC GIA
        </h2>

        {/* Course badge */}
        <div className="inline-flex items-center space-x-2 my-3 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-slate-300">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Môn: Chủ nghĩa xã hội khoa học – Chuyên đề Nhà nước XHCN & Pháp quyền XHCN</span>
        </div>

        {/* Narrative prologue */}
        <div className="max-w-xl my-4 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-slate-300 text-xs sm:text-sm leading-relaxed font-serif text-center shadow-xl">
          <p className="italic">
            &ldquo;Năm đầu tiên trong nhiệm kỳ của bạn bắt đầu. Mỗi quyết định bạn đưa ra sẽ tác động trực tiếp đến Chính trị, Kinh tế, Nhân dân và Pháp quyền. Hãy đưa ra những quyết sách sáng suốt để giữ đất nước cân bằng và thịnh vượng đến cuối nhiệm kỳ.&rdquo;
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleStartGame}
          className="w-full max-w-md my-4 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl text-left"
        >
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Họ và Tên Sinh Viên (Chủ tịch nước)
              </label>
              <input
                type="text"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 text-sm placeholder:text-slate-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Mã Số Sinh Viên (MSSV) / Lớp
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Ví dụ: K65-1024"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 text-sm placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>BẮT ĐẦU NHIỆM KỲ</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 text-center mt-3">
            Hỗ trợ đồng thời 60 người chơi cùng lúc với bảng xếp hạng giảng viên trực tiếp.
          </p>
        </form>

        {/* 4 Pillars preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-2xl mt-4 text-left">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-red-500/20">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase mb-1">
              <Landmark className="w-3.5 h-3.5" />
              <span>Chính Trị</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Bản chất giai cấp công nhân, ổn định trật tự và vai trò lãnh đạo của Đảng.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase mb-1">
              <Coins className="w-3.5 h-3.5" />
              <span>Kinh Tế</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Kinh tế thị trường định hướng XHCN, ngân sách công và an sinh xã hội.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-sky-500/20">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase mb-1">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Nhân Dân</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Quyền làm chủ, khối đại đoàn kết và phương châm 'Dân biết, dân bàn...'.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-500/20">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Pháp Quyền</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Thượng tôn Hiến pháp và pháp luật, kiểm soát quyền lực, liêm chính.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center text-xs text-slate-500 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 Game Giáo Dục – Chủ Tịch Nước: Vận Mệnh Quốc Gia</span>
        <div className="flex items-center space-x-4">
          <Link href="/leaderboard" className="hover:text-amber-400 transition-colors">
            Bảng Xếp Hạng
          </Link>
          <Link href="/admin" className="hover:text-amber-400 transition-colors">
            Cổng Giảng Viên (Admin)
          </Link>
        </div>
      </footer>
    </div>
  );
}
