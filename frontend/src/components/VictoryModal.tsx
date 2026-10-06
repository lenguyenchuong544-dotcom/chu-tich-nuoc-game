'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { sound } from '../lib/sound';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

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
        // Confetti in pastel palette (pink, baby blue, mint, honey, white)
        confetti({
          origin: { y: 0.65 },
          particleCount: 160,
          spread: 80,
          colors: ['#FF7FB0', '#6FB4F2', '#8EE3C8', '#FFD27A', '#FFFFFF'],
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ending: GameEnding =
    GAME_ENDINGS.find((e) => e.id === endingId) || {
      id: 'ENDING_STRONG_STATE',
      title: 'NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA VỮNG MẠNH',
      subtitle: 'Đất nước vững vàng phát triển',
      description: 'Đồng chí đã hoàn thành xuất sắc 5 năm nhiệm kỳ Chủ tịch nước, giữ vững ổn định chính trị, phát triển kinh tế thị trường định hướng XHCN và thượng tôn pháp luật.',
      badge: '🎖 Huân Chương Hồ Chí Minh',
      color: '#FFD27A',
      conditionDescription: 'Hoàn thành trọn vẹn nhiệm kỳ 30 lượt',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 rounded-3xl bg-cotton border-2 border-highlight/80 p-6 sm:p-8 shadow-dossier-hover text-center overflow-hidden text-ink">
        {/* Top Honey Gold Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-highlight via-peony to-highlight" />

        {/* Honor Emblem */}
        <div className="flex justify-center mb-3 mt-1">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-highlight-surface border-2 border-highlight text-highlight-text shadow-tactile">
            <Trophy className="w-8 h-8 text-highlight-text" />
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-peony" />
          </div>
        </div>

        <div className="mb-2">
          <Badge variant="honey" size="md">
            {ending.badge}
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-wide uppercase mt-1">
          HOÀN THÀNH NHIỆM KỲ
        </h1>

        {/* Rank & Score Pill */}
        <div className="inline-flex items-center space-x-2 mt-2 px-4 py-1.5 rounded-pill bg-blush-surface border border-blush-deep">
          <span className="text-xs sm:text-sm font-black text-peony-700">
            {rankTitle}
          </span>
          <span className="text-ink-subtle">•</span>
          <span className="font-mono tabular-nums text-xs sm:text-sm font-bold text-ink">
            {totalScore}/100 ĐIỂM
          </span>
        </div>

        {/* Ending Title & Narrative */}
        <div className="my-4 p-4 rounded-2xl bg-blush-surface/70 border border-blush-deep/60 text-ink text-xs sm:text-sm leading-relaxed text-left font-sans">
          <h4 className="text-peony-700 font-bold uppercase tracking-wider text-xs mb-1">
            KẾT CỤC: {ending.title}
          </h4>
          <p className="italic text-ink/90 leading-relaxed">
            {ending.description}
          </p>
        </div>

        {/* Core Pillars & Knowledge Summary (5 columns in soft pastel) */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 my-4 text-center">
          <div className="p-2 rounded-xl bg-cotton border-2 border-wrong/40 shadow-tactile">
            <span className="text-[9px] sm:text-[10px] text-wrong-text block font-bold truncate">Chính Trị</span>
            <span className="text-xs sm:text-sm font-mono tabular-nums font-bold text-wrong-text mt-0.5 block">{Math.round(stats.politics)}</span>
          </div>
          <div className="p-2 rounded-xl bg-cotton border-2 border-correct/40 shadow-tactile">
            <span className="text-[9px] sm:text-[10px] text-correct-text block font-bold truncate">Kinh Tế</span>
            <span className="text-xs sm:text-sm font-mono tabular-nums font-bold text-correct-text mt-0.5 block">{Math.round(stats.economy)}</span>
          </div>
          <div className="p-2 rounded-xl bg-cotton border-2 border-sky-deep shadow-tactile">
            <span className="text-[9px] sm:text-[10px] text-cornflower-700 block font-bold truncate">Nhân Dân</span>
            <span className="text-xs sm:text-sm font-mono tabular-nums font-bold text-cornflower-700 mt-0.5 block">{Math.round(stats.people)}</span>
          </div>
          <div className="p-2 rounded-xl bg-cotton border-2 border-blush-deep shadow-tactile">
            <span className="text-[9px] sm:text-[10px] text-peony-700 block font-bold truncate">Pháp Quyền</span>
            <span className="text-xs sm:text-sm font-mono tabular-nums font-bold text-peony-700 mt-0.5 block">{Math.round(stats.law)}</span>
          </div>
          <div className="p-2 rounded-xl bg-sky-surface border-2 border-sky-deep shadow-tactile">
            <span className="text-[9px] sm:text-[10px] text-cornflower-700 block font-bold truncate">Lý Luận</span>
            <span className="text-xs sm:text-sm font-mono tabular-nums font-bold text-cornflower-700 mt-0.5 block">{knowledgeScore}</span>
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
            <span>Chơi Lại Nhiệm Kỳ</span>
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
