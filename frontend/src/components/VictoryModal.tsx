import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { sound } from '../lib/sound';
import { Award, Trophy, RotateCcw, Home, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface VictoryModalProps {
  isOpen: boolean;
  endingId: string;
  totalScore: number;
  rankTitle: string;
  knowledgeScore: number;
  crisesSolved: number;
  stats: {
    politics: number;
    economy: number;
    people: number;
    law: number;
  };
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  endingId,
  totalScore,
  rankTitle,
  knowledgeScore,
  crisesSolved,
  stats,
  onRestart,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playVictoryBGM();
      // Multi-burst fireworks confetti
      try {
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio: number, opts: confetti.Options) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ending: GameEnding =
    GAME_ENDINGS.find((e) => e.id === endingId) || {
      id: 'ENDING_STRONG_STATE',
      title: 'HOÀN THÀNH NHIỆM KỲ LỊCH SỬ',
      subtitle: 'Đất nước vững vàng phát triển',
      description: 'Đồng chí đã hoàn thành trọn vẹn nhiệm kỳ Chủ tịch nước, giữ vững ổn định chính trị, phát triển kinh tế và củng cố vững chắc pháp quyền xã hội chủ nghĩa.',
      badge: '🎖 Huân chương Hồ Chí Minh',
      color: '#eab308',
      conditionDescription: 'Hoàn thành nhiệm kỳ',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl bg-slate-900 border-2 border-amber-500/60 p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
        {/* Presidential Gold Radiance */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 shadow-lg shadow-yellow-500/30" />

        {/* Honor Medal */}
        <div className="flex justify-center mb-3">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 shadow-xl shadow-amber-500/20">
            <Trophy className="w-10 h-10" />
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-300 animate-spin" />
          </div>
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/50 mb-2">
          {ending.badge}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wide uppercase mt-1">
          HOÀN THÀNH NHIỆM KỲ
        </h1>

        <div className="inline-block mt-1 px-4 py-1 rounded-full bg-slate-800 border border-slate-700">
          <span className="text-sm sm:text-base font-bold text-yellow-300">
            {rankTitle} ({totalScore}/100)
          </span>
        </div>

        {/* Narrative Description */}
        <div className="my-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed text-left font-serif">
          <h4 className="text-amber-400 font-bold uppercase tracking-wider text-xs mb-1">
            {ending.title}
          </h4>
          <p className="italic text-slate-300">
            {ending.description}
          </p>
        </div>

        {/* 4 Final Stats Grid */}
        <div className="grid grid-cols-4 gap-2 my-3">
          <div className="p-2 rounded-xl bg-slate-800/80 border border-red-500/30">
            <span className="text-[10px] text-slate-400 font-semibold block">CHÍNH TRỊ</span>
            <span className="text-sm sm:text-base font-extrabold text-red-400">{Math.round(stats.politics)}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 font-semibold block">KINH TẾ</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400">{Math.round(stats.economy)}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 border border-sky-500/30">
            <span className="text-[10px] text-slate-400 font-semibold block">NHÂN DÂN</span>
            <span className="text-sm sm:text-base font-extrabold text-sky-400">{Math.round(stats.people)}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 border border-purple-500/30">
            <span className="text-[10px] text-slate-400 font-semibold block">PHÁP QUYỀN</span>
            <span className="text-sm sm:text-base font-extrabold text-purple-400">{Math.round(stats.law)}</span>
          </div>
        </div>

        {/* Additional Pedagogical Metrics */}
        <div className="grid grid-cols-2 gap-2 my-3 text-xs font-semibold">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between px-3">
            <span className="text-slate-400 flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Điểm Lý Luận (CNXHKH)</span>
            </span>
            <span className="text-cyan-400 font-bold text-sm">{knowledgeScore}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between px-3">
            <span className="text-slate-400 flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Khủng hoảng đã vượt qua</span>
            </span>
            <span className="text-amber-400 font-bold text-sm">{crisesSolved}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nhiệm Kỳ Mới</span>
          </button>

          <Link
            href="/leaderboard"
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 shadow-md shadow-amber-500/20"
          >
            <Trophy className="w-4 h-4" />
            <span>Bảng Xếp Hạng</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Trang Chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
