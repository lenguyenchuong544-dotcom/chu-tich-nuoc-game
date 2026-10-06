'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GAME_ENDINGS, GameEnding } from '../data/cards';
import { sound } from '../lib/sound';
import { Trophy, RotateCcw, Home, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';

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
        // Choreographed waves of confetti retuned to the soft pastel stationery palette
        const pastelColors = ['#FF7FB0', '#CFE8FF', '#FFFFFF', '#FFD27A', '#8EE3C8'];
        
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.65 },
          colors: pastelColors,
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: pastelColors,
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: pastelColors,
          });
        }, 300);
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ending: GameEnding =
    GAME_ENDINGS.find((e) => e.id === endingId) || {
      id: 'ENDING_STRONG_STATE',
      title: 'NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA VỮNG MẠNH',
      subtitle: 'Thể chế bền vững - Phát triển hài hòa',
      description:
        'Đồng chí đã hoàn thành xuất sắc nhiệm kỳ, giữ vững ổn định chính trị, phát triển kinh tế và củng cố vững chắc pháp quyền xã hội chủ nghĩa.',
      badge: '🎖 Huân chương Hồ Chí Minh',
      color: '#FFB84D',
      conditionDescription: 'Hoàn thành nhiệm kỳ',
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg my-6 rounded-2xl bg-white border-2 border-blush-border p-6 sm:p-7 shadow-dossier text-center">
        {/* Soft Honey Trophy Honor Badge */}
        <div className="flex justify-center mb-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-highlight-surface border-2 border-highlight text-highlight-text shadow-pastel-pink transform hover:scale-105 transition-transform">
            <Trophy className="w-8 h-8 text-highlight-text" />
          </div>
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-highlight-surface text-highlight-text border border-highlight-border mb-2">
          {ending.badge}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-wide uppercase mt-1">
          HOÀN THÀNH NHIỆM KỲ
        </h1>

        <div className="inline-block my-2.5 px-4 py-1.5 rounded-2xl bg-blush-subtle border border-blush-border">
          <span className="text-sm sm:text-base font-bold text-peony-700">
            {rankTitle} • <span className="font-mono text-base sm:text-lg font-black">{totalScore}</span>/100 Điểm
          </span>
        </div>

        {/* Narrative Description Card */}
        <div className="my-3.5 p-4 sm:p-5 rounded-2xl bg-cotton border border-blush-border/80 text-ink text-sm sm:text-base leading-relaxed text-left font-normal shadow-sm">
          <h4 className="text-peony-700 font-extrabold uppercase text-xs sm:text-sm tracking-wider mb-1.5 flex items-center gap-2">
            <Crown className="w-4 h-4 text-highlight shrink-0" />
            <span>{ending.title}</span>
          </h4>
          <p className="text-ink leading-relaxed">
            {ending.description}
          </p>
        </div>

        {/* 4 Final Stats Grid */}
        <div className="grid grid-cols-4 gap-2.5 my-3.5 text-center">
          <div className="p-3 rounded-2xl bg-blush-subtle border border-blush-border/60">
            <span className="text-xs text-ink-muted block font-bold mb-0.5">Chính Trị</span>
            <span className="text-base sm:text-lg font-black font-mono text-peony-700">
              {Math.round(stats.politics)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-correct-surface border border-correct-border/60">
            <span className="text-xs text-correct-text block font-bold mb-0.5">Kinh Tế</span>
            <span className="text-base sm:text-lg font-black font-mono text-correct-text">
              {Math.round(stats.economy)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-sky-subtle border border-sky-border/60">
            <span className="text-xs text-cornflower-700 block font-bold mb-0.5">Nhân Dân</span>
            <span className="text-base sm:text-lg font-black font-mono text-cornflower-700">
              {Math.round(stats.people)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-cotton border border-blush-border/60">
            <span className="text-xs text-ink-muted block font-bold mb-0.5">Pháp Quyền</span>
            <span className="text-base sm:text-lg font-black font-mono text-ink">
              {Math.round(stats.law)}
            </span>
          </div>
        </div>

        {/* Knowledge & Crisis Summary Metrics */}
        <div className="flex items-center justify-between text-xs sm:text-sm px-4 py-3 rounded-2xl bg-white border border-blush-border my-3.5 text-ink">
          <span className="text-ink-muted">
            Lý Luận (CNXHKH):{' '}
            <strong className="text-cornflower-700 font-mono font-bold text-sm sm:text-base">{knowledgeScore}</strong>
          </span>
          <span className="text-ink-muted">
            Khủng hoảng đã giải quyết:{' '}
            <strong className="text-peony-700 font-mono font-bold text-sm sm:text-base">{crisesSolved}</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <Button
            variant="primary"
            size="md"
            onClick={onRestart}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Chơi Lại
          </Button>

          <Link href="/leaderboard" className="w-full">
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              leftIcon={<Trophy className="w-3.5 h-3.5 text-highlight" />}
            >
              Xếp Hạng
            </Button>
          </Link>

          <Link href="/" className="w-full">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              leftIcon={<Home className="w-3.5 h-3.5 text-ink-muted" />}
            >
              Trang Chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
