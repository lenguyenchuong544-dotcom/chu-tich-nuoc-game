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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/25 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-cotton border-2 border-blush-deep p-5 sm:p-6 shadow-dossier-hover overflow-hidden text-ink">
        {/* Top Status Accent Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 ${
            isCorrect ? 'bg-correct' : 'bg-wrong'
          }`}
        />

        {/* Status Header */}
        <div className="flex items-center space-x-3 mb-4 mt-1">
          {isCorrect ? (
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-correct-surface border-2 border-correct text-correct-text flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-wrong-surface border-2 border-wrong text-wrong-text flex-shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
          )}

          <div>
            <span
              className={`stamp-box text-xs sm:text-sm ${
                isCorrect ? 'stamp-approve' : 'stamp-reject'
              }`}
            >
              {isCorrect ? '✓ LỰA CHỌN PHÙ HỢP' : '✕ CẦN XEM LẠI'}
            </span>
            <p className="text-xs text-ink-muted font-bold mt-1 font-mono">
              {isCorrect ? `+${knowledgeDelta} Điểm Lý Luận` : `${knowledgeDelta} Điểm Lý Luận`}
            </p>
          </div>
        </div>

        {/* Theoretical Explanation */}
        <div className="p-4 rounded-xl bg-blush-surface border border-blush-deep/80 text-ink text-sm leading-relaxed my-3">
          <div className="flex items-center space-x-1.5 text-peony-700 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-peony" />
            <span>Căn Cứ Lý Luận Khoa Học & Hiến Pháp</span>
          </div>
          <p className="font-sans italic text-ink/90 leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Continue Button (CTA: TIẾP TỤC NHIỆM KỲ) */}
        <div className="mt-5 flex justify-end">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              sound.playDecisionClick();
              onContinue();
            }}
            className="w-full sm:w-auto"
          >
            <span>TIẾP TỤC NHIỆM KỲ</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
