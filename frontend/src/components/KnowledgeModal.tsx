'use client';

import React from 'react';
import { Check, X, BookOpen, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';
import { Button } from './ui/Button';

interface KnowledgeModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  explanation: string;
  knowledgeDelta: number;
  onContinue: () => void;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  isOpen,
  isCorrect,
  explanation,
  knowledgeDelta,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-blush-border p-6 sm:p-7 shadow-dossier text-left">
        {/* Status Badge & Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-2xl border-2 transition-transform transform scale-100 shrink-0 ${
              isCorrect
                ? 'bg-correct-surface border-correct text-correct-text shadow-sm'
                : 'bg-wrong-surface border-wrong text-wrong-text shadow-sm'
            }`}
          >
            {isCorrect ? (
              <Check className="w-7 h-7 stroke-[2.5]" />
            ) : (
              <X className="w-7 h-7 stroke-[2.5]" />
            )}
          </div>

          <div>
            <h3
              className={`text-lg sm:text-xl font-black tracking-wide ${
                isCorrect ? 'text-correct-text' : 'text-wrong-text'
              }`}
            >
              {isCorrect ? '✓ PHƯƠNG ÁN PHÙ HỢP HIẾN ĐỊNH' : '× CẦN ĐIỀU CHỈNH LÝ LUẬN'}
            </h3>
            <span className="text-sm font-mono font-bold text-ink-muted">
              {isCorrect ? `+${knowledgeDelta} Điểm Lý Luận` : `${knowledgeDelta} Điểm Lý Luận`}
            </span>
          </div>
        </div>

        {/* Theoretical Learning Note */}
        <div className="my-4 p-4 sm:p-5 rounded-2xl bg-cotton border border-blush-border/80 text-ink text-sm sm:text-base leading-relaxed shadow-sm">
          <div className="flex items-center gap-2 text-peony-700 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2.5">
            <BookOpen className="w-4 h-4 text-peony-500 shrink-0" />
            <span>Căn Cứ Lý Luận (Chủ Nghĩa Xã Hội Khoa Học)</span>
          </div>
          <p className="font-normal text-ink leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              sound.playDecisionClick();
              onContinue();
            }}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Tiếp Tục Nhiệm Kỳ
          </Button>
        </div>
      </div>
    </div>
  );
};
