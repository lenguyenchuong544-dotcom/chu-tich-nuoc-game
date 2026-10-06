import React from 'react';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { RotateCcw, Trophy, AlertTriangle } from 'lucide-react';
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
      title: 'MẤT CÂN BẰNG THỂ CHẾ QUỐC GIA',
      subtitle: 'Một chỉ số trọng yếu chạm đáy',
      description: 'Một trong các trụ cột của nhà nước đã suy giảm hoàn toàn, khiến chính quyền mất đi năng lực quản trị.',
      badge: '⚠️ Gián Đoạn Nhiệm Kỳ',
      color: '#ef4444',
      conditionDescription: 'Chỉ số chạm đáy 0',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0f172a] border border-rose-500/40 p-6 sm:p-7 shadow-2xl text-center">
        {/* Warning Icon & Badge */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/50 text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30 mb-2">
          {ending.badge}
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-wide uppercase">
          NHIỆM KỲ KẾT THÚC
        </h2>
        <p className="text-xs text-rose-400 font-semibold mt-1">
          {ending.title}
        </p>

        {/* Narrative Description */}
        <div className="my-4 p-4 rounded-xl bg-black/40 border border-white/5 text-slate-300 text-xs sm:text-sm leading-relaxed text-left font-serif">
          {ending.description}
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 my-4 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase font-medium block">Số Quyết Định</span>
            <span className="text-base font-bold text-amber-400 font-mono mt-0.5">{turnsSurvived} / 30</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-slate-400 text-[10px] uppercase font-medium block">Điểm Lý Luận (CNXHKH)</span>
            <span className="text-base font-bold text-cyan-400 font-mono mt-0.5">{knowledgeScore} Điểm</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nhiệm Kỳ Mới</span>
          </button>

          <Link
            href="/leaderboard"
            className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Bảng Xếp Hạng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
