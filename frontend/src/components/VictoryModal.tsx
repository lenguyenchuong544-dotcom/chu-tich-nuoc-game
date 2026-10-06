import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { sound } from '../lib/sound';
import { Trophy, RotateCcw, Home, Sparkles } from 'lucide-react';
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
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ending: GameEnding =
    GAME_ENDINGS.find((e) => e.id === endingId) || {
      id: 'ENDING_STRONG_STATE',
      title: 'NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA VỮNG MẠNH',
      subtitle: 'Thể chế bền vững - Phát triển hài hòa',
      description: 'Đồng chí đã hoàn thành xuất sắc nhiệm kỳ, giữ vững ổn định chính trị, phát triển kinh tế và củng cố vững chắc pháp quyền xã hội chủ nghĩa.',
      badge: '🎖 Huân chương Hồ Chí Minh',
      color: '#eab308',
      conditionDescription: 'Hoàn thành nhiệm kỳ',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg my-6 rounded-2xl bg-[#0f172a] border border-amber-500/40 p-6 sm:p-7 shadow-2xl text-center">
        {/* Honor Badge */}
        <div className="flex justify-center mb-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-400/60 text-amber-400 shadow-md">
            <Trophy className="w-7 h-7" />
          </div>
        </div>

        <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-1">
          {ending.badge}
        </span>

        <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-wide uppercase mt-1">
          HOÀN THÀNH NHIỆM KỲ
        </h1>

        <div className="inline-block my-2 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10">
          <span className="text-sm font-bold text-amber-300">
            {rankTitle} • {totalScore}/100 Điểm
          </span>
        </div>

        {/* Narrative Description */}
        <div className="my-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-slate-200 text-xs sm:text-sm leading-relaxed text-left font-serif">
          <h4 className="text-amber-400 font-bold uppercase text-[11px] tracking-wider mb-1">
            {ending.title}
          </h4>
          <p className="italic text-slate-300">
            {ending.description}
          </p>
        </div>

        {/* 4 Final Stats */}
        <div className="grid grid-cols-4 gap-2 my-3 text-center">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Chính Trị</span>
            <span className="text-sm font-bold font-mono text-slate-100">{Math.round(stats.politics)}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Kinh Tế</span>
            <span className="text-sm font-bold font-mono text-slate-100">{Math.round(stats.economy)}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Nhân Dân</span>
            <span className="text-sm font-bold font-mono text-slate-100">{Math.round(stats.people)}</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Pháp Quyền</span>
            <span className="text-sm font-bold font-mono text-slate-100">{Math.round(stats.law)}</span>
          </div>
        </div>

        {/* Knowledge & Crisis Metrics */}
        <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 my-3">
          <span className="text-slate-400">Điểm Lý Luận (CNXHKH): <strong className="text-cyan-400">{knowledgeScore}</strong></span>
          <span className="text-slate-400">Khủng hoảng đã xử lý: <strong className="text-amber-400">{crisesSolved}</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi Lại</span>
          </button>

          <Link
            href="/leaderboard"
            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Xếp Hạng</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang Chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
