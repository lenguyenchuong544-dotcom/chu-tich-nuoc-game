import React from 'react';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { Skull, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface GameOverModalProps {
  isOpen: boolean;
  endingId: string;
  turnsSurvived: number;
  knowledgeScore: number;
  stats: {
    politics: number;
    economy: number;
    people: number;
    law: number;
  };
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  endingId,
  turnsSurvived,
  knowledgeScore,
  stats,
  onRestart,
}) => {
  if (!isOpen) return null;

  const ending: GameEnding =
    GAME_ENDINGS.find((e) => e.id === endingId) || {
      id: 'ENDING_CRISIS_GENERIC',
      title: 'GAME OVER: NHIỆM KỲ BỊ GIÁN ĐOẠN',
      subtitle: 'Đất nước mất cân bằng nghiêm trọng',
      description: 'Một trong các chỉ số quốc gia trọng yếu đã suy giảm về 0, khiến bộ máy nhà nước không thể tiếp tục vận hành bình thường.',
      badge: '⚠️ Thất Bại Điều Hành',
      color: '#ef4444',
      conditionDescription: 'Chỉ số chạm đáy 0',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-rose-500/50 p-6 sm:p-7 shadow-2xl text-center overflow-hidden">
        {/* Top Warning bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-red-500 to-rose-600" />

        {/* Icon & Badge */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 border-2 border-rose-500 text-rose-500 animate-pulse">
            <Skull className="w-8 h-8" />
          </div>
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 mb-2">
          {ending.badge}
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-rose-400 tracking-wide uppercase mt-1">
          {ending.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium italic mt-1">
          {ending.subtitle}
        </p>

        {/* Ending Narrative Description */}
        <div className="my-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-serif">
          {ending.description}
        </div>

        {/* Summary Stats Grid */}
        <div className="grid grid-cols-2 gap-2 my-4 text-xs font-semibold">
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col items-center">
            <span className="text-slate-400 text-[11px]">LƯỢT ĐÃ TRỤ VỮNG</span>
            <span className="text-base font-bold text-amber-400 mt-0.5">{turnsSurvived} Lượt</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex flex-col items-center">
            <span className="text-slate-400 text-[11px] flex items-center space-x-1">
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>ĐIỂM KIẾN THỨC</span>
            </span>
            <span className="text-base font-bold text-cyan-400 mt-0.5">{knowledgeScore} Điểm</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại Nhiệm Kỳ</span>
          </button>

          <Link
            href="/leaderboard"
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Bảng Xếp Hạng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
