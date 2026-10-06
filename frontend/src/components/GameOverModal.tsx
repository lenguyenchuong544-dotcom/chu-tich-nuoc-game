'use client';

import React from 'react';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { RotateCcw, Trophy, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

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
      title: 'KHỦNG HOẢNG THỂ CHẾ TRỌNG YẾU',
      subtitle: 'Đất nước mất cân bằng nghiêm trọng',
      description: 'Một trong các trụ cột quốc gia trọng yếu đã suy giảm về 0, khiến bộ máy nhà nước không thể tiếp tục vận hành.',
      badge: '⚠️ Kết Thúc Nhiệm Kỳ',
      color: '#FF6B7F',
      conditionDescription: 'Chỉ số chạm đáy 0',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-cotton border-2 border-wrong/60 p-6 sm:p-7 shadow-dossier-crisis text-center overflow-hidden text-ink">
        {/* Top Warm Coral Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-wrong via-peony to-wrong" />

        {/* Warning Icon Badge */}
        <div className="flex justify-center mb-3 mt-1">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-wrong-surface border-2 border-wrong text-wrong-text shadow-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>
        </div>

        <div className="mb-2">
          <Badge variant="coral" size="md">
            {ending.badge}
          </Badge>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-ink tracking-wide uppercase mt-1">
          NHIỆM KỲ KẾT THÚC
        </h2>
        <p className="text-xs sm:text-sm text-wrong-text font-bold uppercase tracking-wide mt-1">
          {ending.title}
        </p>

        {/* Cause of Failure Narrative */}
        <div className="my-4 p-4 rounded-xl bg-wrong-surface/60 border border-wrong/30 text-ink text-xs sm:text-sm leading-relaxed text-left font-sans">
          <p className="text-wrong-text text-[11px] uppercase tracking-wider font-bold mb-1">
            Nguyên nhân biến động:
          </p>
          <p className="italic text-ink/90">
            {ending.description}
          </p>
        </div>

        {/* Performance Summary (2 columns) */}
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="p-3 rounded-xl bg-cotton border-2 border-blush-deep/60 text-center shadow-tactile">
            <span className="text-[10px] text-ink-muted uppercase tracking-wider font-bold block">
              SỐ QUYẾT ĐỊNH ĐÃ RA
            </span>
            <span className="text-lg font-bold font-mono tabular-nums text-peony-700 mt-0.5 block">
              {turnsSurvived} / 30
            </span>
          </div>

          <div className="p-3 rounded-xl bg-cotton border-2 border-sky-deep/60 text-center shadow-tactile">
            <span className="text-[10px] text-ink-muted uppercase tracking-wider font-bold block">
              ĐIỂM LÝ LUẬN
            </span>
            <span className="text-lg font-bold font-mono tabular-nums text-cornflower-700 mt-0.5 block">
              {knowledgeScore} Điểm
            </span>
          </div>
        </div>

        {/* Final 4 Pillars Status */}
        <div className="p-2.5 rounded-xl bg-blush-surface border border-blush-deep flex items-center justify-around text-xs my-3">
          <div className="text-center">
            <span className="text-[10px] text-ink-muted block font-semibold">Chính Trị</span>
            <span className={`font-mono font-bold ${stats.politics <= 0 ? 'text-wrong-text font-black' : 'text-ink'}`}>
              {Math.round(stats.politics)}
            </span>
          </div>
          <div className="h-4 w-px bg-blush-deep" />
          <div className="text-center">
            <span className="text-[10px] text-ink-muted block font-semibold">Kinh Tế</span>
            <span className={`font-mono font-bold ${stats.economy <= 0 ? 'text-wrong-text font-black' : 'text-ink'}`}>
              {Math.round(stats.economy)}
            </span>
          </div>
          <div className="h-4 w-px bg-blush-deep" />
          <div className="text-center">
            <span className="text-[10px] text-ink-muted block font-semibold">Nhân Dân</span>
            <span className={`font-mono font-bold ${stats.people <= 0 ? 'text-wrong-text font-black' : 'text-ink'}`}>
              {Math.round(stats.people)}
            </span>
          </div>
          <div className="h-4 w-px bg-blush-deep" />
          <div className="text-center">
            <span className="text-[10px] text-ink-muted block font-semibold">Pháp Quyền</span>
            <span className={`font-mono font-bold ${stats.law <= 0 ? 'text-wrong-text font-black' : 'text-ink'}`}>
              {Math.round(stats.law)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <Button
            variant="primary"
            onClick={onRestart}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thực Hiện Lại</span>
          </Button>

          <Link href="/leaderboard" className="w-full">
            <Button
              variant="outline"
              className="w-full"
            >
              <Trophy className="w-4 h-4 text-peony" />
              <span>Bảng Vinh Danh</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
