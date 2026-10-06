import React from 'react';
import { CheckCircle2, XCircle, BookOpen, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Top Glow bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-2 ${
            isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />

        {/* Status Header */}
        <div className="flex items-center space-x-3 mb-4">
          {isCorrect ? (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500 text-rose-400">
              <XCircle className="w-7 h-7" />
            </div>
          )}

          <div>
            <h3
              className={`text-lg sm:text-xl font-black tracking-wide ${
                isCorrect ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isCorrect ? '✓ CHÍNH XÁC!' : '✕ CHƯA CHÍNH XÁC!'}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {isCorrect ? `+${knowledgeDelta} Điểm Kiến Thức` : `${knowledgeDelta} Điểm Kiến Thức`}
            </p>
          </div>
        </div>

        {/* Theoretical Explanation */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed my-4">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Kiến Thức Chủ Nghĩa Xã Hội Khoa Học</span>
          </div>
          <p className="font-serif italic text-slate-300">
            {explanation}
          </p>
        </div>

        {/* Continue Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              sound.playDecisionClick();
              onContinue();
            }}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <span>Tiếp Tục Nhiệm Kỳ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
