import React from 'react';
import { Check, X, BookOpen, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0f172a] border border-white/10 p-5 sm:p-6 shadow-2xl">
        {/* Status Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
            }`}
          >
            {isCorrect ? <Check className="w-5 h-5 stroke-[2.5]" /> : <X className="w-5 h-5 stroke-[2.5]" />}
          </div>

          <div>
            <h3
              className={`text-base font-bold tracking-wide ${
                isCorrect ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isCorrect ? '✓ LỰA CHỌN PHÙ HỢP' : '× CẦN XEM LẠI'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {isCorrect ? `+${knowledgeDelta} Điểm Lý Luận` : `${knowledgeDelta} Điểm Lý Luận`}
            </span>
          </div>
        </div>

        {/* Theoretical Explanation */}
        <div className="my-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-slate-200 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center space-x-1.5 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Căn Cứ Lý Luận (Chủ Nghĩa Xã Hội Khoa Học)</span>
          </div>
          <p className="font-serif italic text-slate-300">
            {explanation}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              sound.playDecisionClick();
              onContinue();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>Tiếp Tục Nhiệm Kỳ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
