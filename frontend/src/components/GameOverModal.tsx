'use client';

import React from 'react';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { RotateCcw, Trophy, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';

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
      description:
        'Một trong các trụ cột của nhà nước đã suy giảm hoàn toàn, khiến chính quyền mất đi năng lực quản trị.',
      badge: '⚠️ Gián Đoạn Nhiệm Kỳ',
      color: '#FF6B7F',
      conditionDescription: 'Chỉ số chạm đáy 0',
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white border-2 border-wrong-border p-6 sm:p-7 shadow-dossier text-center">
        {/* Warm Coral Alert Icon */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-wrong-surface border-2 border-wrong text-wrong-text shadow-sm">
            <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
          </div>
        </div>

        {/* Ending Status Badge */}
        <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-wrong-surface text-wrong-text border border-wrong-border mb-2.5">
          {ending.badge}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-wide uppercase">
          NHIỆM KỲ KẾT THÚC
        </h2>
        <p className="text-sm sm:text-base text-wrong-text font-bold mt-1">
          {ending.title}
        </p>

        {/* Narrative Description Card */}
        <div className="my-4 p-4 sm:p-5 rounded-2xl bg-cotton border border-blush-border/80 text-ink text-sm sm:text-base leading-relaxed text-left font-normal shadow-sm">
          {ending.description}
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-3.5 rounded-2xl bg-blush-subtle border border-blush-border/70">
            <span className="text-ink-muted text-xs uppercase font-bold block">
              Số Quyết Định Đã Ban Hành
            </span>
            <span className="text-lg sm:text-xl font-black text-peony-700 font-mono mt-1 block">
              {turnsSurvived} / 30
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-subtle border border-sky-border/70">
            <span className="text-ink-muted text-xs uppercase font-bold block">
              Điểm Lý Luận (CNXHKH)
            </span>
            <span className="text-lg sm:text-xl font-black text-cornflower-700 font-mono mt-1 block">
              {knowledgeScore} Điểm
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            variant="primary"
            size="lg"
            onClick={onRestart}
            leftIcon={<RotateCcw className="w-5 h-5" />}
          >
            Nhiệm Kỳ Mới
          </Button>

          <Link href="/leaderboard" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              leftIcon={<Trophy className="w-5 h-5 text-highlight" />}
            >
              Bảng Xếp Hạng
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
