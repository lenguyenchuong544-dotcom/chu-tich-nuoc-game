import React, { useState, useRef, useEffect } from 'react';
import { DecisionCard as CardData } from '../data/cards';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../lib/sound';
import { AlertCircle, BookOpen, Compass, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';

interface DecisionCardProps {
  card: CardData;
  onChoice: (choice: 'left' | 'right') => void;
  onPreviewHintChange: (hint: any) => void;
  disabled?: boolean;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({
  card,
  onChoice,
  onPreviewHintChange,
  disabled = false,
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState<'left' | 'right' | null>(null);

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 90;
  const MAX_ROTATION = 12;

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || isExiting) return;
      if (e.key === 'ArrowLeft') {
        handleTriggerChoice('left');
      } else if (e.key === 'ArrowRight') {
        handleTriggerChoice('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, disabled, isExiting]);

  // Update preview hint based on drag
  useEffect(() => {
    if (Math.abs(dragOffset.x) > 20) {
      if (dragOffset.x < 0) {
        onPreviewHintChange(card.leftChoice.hint || null);
      } else {
        onPreviewHintChange(card.rightChoice.hint || null);
      }
    } else {
      onPreviewHintChange(null);
    }
  }, [dragOffset.x, card]);

  const handleTriggerChoice = (direction: 'left' | 'right') => {
    if (disabled || isExiting) return;
    sound.playCardSwipe();
    sound.playDecisionClick();
    setIsExiting(direction);
    onPreviewHintChange(null);

    setTimeout(() => {
      onChoice(direction);
      setIsExiting(null);
      setDragOffset({ x: 0, y: 0 });
    }, 240);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || isExiting) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.15;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset.x < -SWIPE_THRESHOLD) {
      handleTriggerChoice('left');
    } else if (dragOffset.x > SWIPE_THRESHOLD) {
      handleTriggerChoice('right');
    } else {
      setDragOffset({ x: 0, y: 0 });
      onPreviewHintChange(null);
    }
    dragStartRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isExiting) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = (touch.clientY - dragStartRef.current.y) * 0.15;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset.x < -SWIPE_THRESHOLD) {
      handleTriggerChoice('left');
    } else if (dragOffset.x > SWIPE_THRESHOLD) {
      handleTriggerChoice('right');
    } else {
      setDragOffset({ x: 0, y: 0 });
      onPreviewHintChange(null);
    }
    dragStartRef.current = null;
  };

  const rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dragOffset.x * 0.07));

  let exitTransform = '';
  if (isExiting === 'left') {
    exitTransform = 'translateX(-120vw) rotate(-25deg)';
  } else if (isExiting === 'right') {
    exitTransform = 'translateX(120vw) rotate(25deg)';
  }

  const leftStampOpacity = Math.min(1, Math.max(0, -dragOffset.x / 70));
  const rightStampOpacity = Math.min(1, Math.max(0, dragOffset.x / 70));

  return (
    <div className="relative flex flex-col items-center w-full max-w-[420px] mx-auto select-none px-3">
      {/* Floating Direction Prompt Text above Card */}
      <div className="h-8 flex items-center justify-center text-center px-2 mb-1.5 w-full">
        {dragOffset.x < -20 ? (
          <div className="text-amber-300 font-medium text-xs sm:text-sm tracking-wide flex items-center space-x-1.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold">{card.leftChoice.text}</span>
          </div>
        ) : dragOffset.x > 20 ? (
          <div className="text-amber-300 font-medium text-xs sm:text-sm tracking-wide flex items-center space-x-1.5 transition-all">
            <span className="font-semibold">{card.rightChoice.text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        ) : (
          <div className="text-slate-400 text-[11px] font-medium tracking-wider flex items-center space-x-3 opacity-75">
            <span>← Vuốt Trái</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>Vuốt Phải →</span>
          </div>
        )}
      </div>

      {/* Card Stack Container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Card Stack Background Layer 2 */}
        <div className="absolute inset-0 rounded-2xl bg-[#0e1629] border border-white/5 card-stack-2" />

        {/* Card Stack Background Layer 1 */}
        <div className="absolute inset-0 rounded-2xl bg-[#111c34] border border-white/10 card-stack-1" />

        {/* Active Presidential Briefing Decision Card */}
        <div
          ref={cardRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: isExiting
              ? exitTransform
              : `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className={`relative z-10 w-full rounded-2xl bg-[#101a30] briefing-card-shadow p-5 sm:p-6 overflow-hidden ${
            card.isCrisis
              ? 'border-2 border-rose-500/80 shadow-rose-950/40 shadow-2xl'
              : 'border border-amber-500/25'
          }`}
        >
          {/* Neutral Stamp Watermarks (Neutral/Gold, NOT default Red/Green) */}
          <div
            style={{ opacity: leftStampOpacity }}
            className="absolute top-5 right-5 z-20 pointer-events-none transform rotate-12 border-2 border-amber-400/80 bg-[#0c1426]/90 text-amber-300 font-bold text-xs px-2.5 py-1 rounded uppercase tracking-wider shadow-lg"
          >
            LỰA CHỌN A
          </div>

          <div
            style={{ opacity: rightStampOpacity }}
            className="absolute top-5 left-5 z-20 pointer-events-none transform -rotate-12 border-2 border-amber-400/80 bg-[#0c1426]/90 text-amber-300 font-bold text-xs px-2.5 py-1 rounded uppercase tracking-wider shadow-lg"
          >
            LỰA CHỌN B
          </div>

          {/* 1. Category Tag */}
          <div className="flex justify-center mb-3">
            {card.isCrisis ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/40">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Khủng Hoảng Quốc Gia</span>
              </span>
            ) : card.type === 'KNOWLEDGE' ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Kiến Thức Lý Luận</span>
              </span>
            ) : card.type === 'STORYLINE' ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Bước Ngoặt Thể Chế</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                <span>Tình Huống Điều Hành</span>
              </span>
            )}
          </div>

          {/* 2. Character Portrait & Dignitary Role */}
          <div className="flex flex-col items-center text-center my-2">
            <div className="mb-2">
              <CharacterAvatar
                avatarKey={card.characterRole.toLowerCase().includes('tư pháp') ? 'justice' :
                           card.characterRole.toLowerCase().includes('kinh tế') || card.characterRole.toLowerCase().includes('tài chính') ? 'economy' :
                           card.characterRole.toLowerCase().includes('nội vụ') || card.characterRole.toLowerCase().includes('an ninh') ? 'security' :
                           card.characterRole.toLowerCase().includes('thanh tra') ? 'inspector' :
                           card.characterRole.toLowerCase().includes('mặt trận') ? 'front' :
                           card.characterRole.toLowerCase().includes('tòa án') ? 'court' :
                           card.characterRole.toLowerCase().includes('quốc hội') ? 'assembly' :
                           card.characterRole.toLowerCase().includes('lao động') || card.characterRole.toLowerCase().includes('công nhân') ? 'worker' :
                           card.characterRole.toLowerCase().includes('báo') ? 'journalist' :
                           card.characterRole.toLowerCase().includes('số') ? 'digital' :
                           card.characterRole.toLowerCase().includes('văn hóa') || card.characterRole.toLowerCase().includes('giáo dục') ? 'culture' : 'advisor'}
                name={card.characterName}
                role={card.characterRole}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>

            <h3 className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {card.characterRole}
            </h3>
            <p className="text-slate-400 text-xs italic mt-0.5">{card.characterName}</p>
          </div>

          {/* 3. Dilemma Context (Clean Typography, No Heavy Boxes) */}
          <div className="my-3 py-2 text-center border-t border-b border-white/5">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-serif font-normal">
              &ldquo;{card.question}&rdquo;
            </p>
          </div>

          {/* Instruction Subtext */}
          <div className="text-center pt-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              HỒ SƠ MẬT CHÍNH PHỦ
            </span>
          </div>
        </div>
      </div>

      {/* Two Choices Buttons: Full Text, Neutral/Gold Styling (NO Red/Green Default) */}
      <div className="w-full grid grid-cols-2 gap-2.5 mt-3.5">
        <button
          onClick={() => handleTriggerChoice('left')}
          disabled={disabled || !!isExiting}
          className="flex flex-col items-start justify-center p-3 rounded-xl bg-[#0f182c] hover:bg-[#15223e] active:scale-95 border border-white/10 hover:border-amber-400/40 text-slate-200 text-xs sm:text-sm font-medium transition-all text-left shadow-sm min-h-[58px]"
        >
          <span className="text-[10px] uppercase font-bold text-amber-400 mb-0.5 flex items-center space-x-1">
            <ArrowLeft className="w-3 h-3" />
            <span>Phương án A</span>
          </span>
          <span className="leading-snug text-slate-200">{card.leftChoice.text}</span>
        </button>

        <button
          onClick={() => handleTriggerChoice('right')}
          disabled={disabled || !!isExiting}
          className="flex flex-col items-start justify-center p-3 rounded-xl bg-[#0f182c] hover:bg-[#15223e] active:scale-95 border border-white/10 hover:border-amber-400/40 text-slate-200 text-xs sm:text-sm font-medium transition-all text-left shadow-sm min-h-[58px]"
        >
          <span className="text-[10px] uppercase font-bold text-amber-400 mb-0.5 flex items-center space-x-1">
            <span>Phương án B</span>
            <ArrowRight className="w-3 h-3" />
          </span>
          <span className="leading-snug text-slate-200">{card.rightChoice.text}</span>
        </button>
      </div>
    </div>
  );
};
