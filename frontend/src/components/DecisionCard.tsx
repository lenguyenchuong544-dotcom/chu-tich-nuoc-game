import React, { useState, useRef, useEffect } from 'react';
import { DecisionCard as CardData } from '../data/cards';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../lib/sound';
import { AlertTriangle, BookOpen, Compass, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';

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

  const SWIPE_THRESHOLD = 95; // pixels to trigger choice
  const MAX_ROTATION = 14; // degrees

  // Keyboard controls (ArrowLeft, ArrowRight)
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

  // Update preview hint based on drag distance
  useEffect(() => {
    if (Math.abs(dragOffset.x) > 25) {
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
    }, 280);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || isExiting) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.2; // slight vertical parallax
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
      // Rebound back to center
      setDragOffset({ x: 0, y: 0 });
      onPreviewHintChange(null);
    }
    dragStartRef.current = null;
  };

  // Touch drag handlers
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
    const deltaY = (touch.clientY - dragStartRef.current.y) * 0.2;
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

  // Compute rotation angle
  const rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dragOffset.x * 0.08));

  // Exit animation transform
  let exitTransform = '';
  if (isExiting === 'left') {
    exitTransform = 'translateX(-120vw) rotate(-35deg) scale(0.9)';
  } else if (isExiting === 'right') {
    exitTransform = 'translateX(120vw) rotate(35deg) scale(0.9)';
  }

  // Stamp opacity calculation
  const leftStampOpacity = Math.min(1, Math.max(0, -dragOffset.x / 75));
  const rightStampOpacity = Math.min(1, Math.max(0, dragOffset.x / 75));

  // Category badge styling
  const getCategoryBadge = () => {
    if (card.isCrisis) {
      return (
        <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600/30 text-rose-300 border border-rose-500/50 animate-pulse">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Khủng Hoảng Quốc Gia</span>
        </span>
      );
    }
    if (card.type === 'KNOWLEDGE') {
      return (
        <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Kiểm Tra Lý Luận</span>
        </span>
      );
    }
    if (card.type === 'STORYLINE') {
      return (
        <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
          <Compass className="w-3.5 h-3.5 text-purple-400" />
          <span>Bước Ngoặt Thể Chế</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
        <span>Tình Huống Điều Hành</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto select-none px-4">
      {/* Floating Decision Preview Text above Card */}
      <div className="h-10 flex items-center justify-center text-center px-4 mb-2">
        {dragOffset.x < -20 ? (
          <div className="text-rose-400 font-bold text-sm tracking-wide flex items-center space-x-1 animate-fade-in">
            <ArrowLeft className="w-4 h-4" />
            <span className="line-clamp-1">{card.leftChoice.text}</span>
          </div>
        ) : dragOffset.x > 20 ? (
          <div className="text-emerald-400 font-bold text-sm tracking-wide flex items-center space-x-1 animate-fade-in">
            <span className="line-clamp-1">{card.rightChoice.text}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        ) : (
          <div className="text-slate-400 text-xs tracking-wider uppercase font-medium flex items-center space-x-2">
            <span>← Vuốt Trái</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span>Vuốt Phải →</span>
          </div>
        )}
      </div>

      {/* Main Interactive Card */}
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
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className={`relative w-full rounded-2xl bg-slate-900/95 border backdrop-blur-xl p-5 sm:p-6 decision-card-shadow overflow-hidden ${
          card.isCrisis
            ? 'border-rose-500 shadow-rose-950/50 shadow-2xl ring-2 ring-rose-500/30'
            : 'border-amber-500/30'
        }`}
      >
        {/* Background Presidential Watermark Seal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <div className="w-72 h-72 rounded-full border-[12px] border-amber-400" />
        </div>

        {/* Swipe Left Watermark Stamp (Red / Amber) */}
        <div
          style={{ opacity: leftStampOpacity }}
          className="absolute top-6 right-6 z-30 pointer-events-none transform rotate-12 border-4 border-rose-500 bg-rose-950/80 text-rose-300 font-black text-sm sm:text-base px-3 py-1 rounded-lg uppercase tracking-widest shadow-2xl"
        >
          {card.leftChoice.text.length > 20 ? 'TỪ CHỐI' : card.leftChoice.text}
        </div>

        {/* Swipe Right Watermark Stamp (Green / Gold) */}
        <div
          style={{ opacity: rightStampOpacity }}
          className="absolute top-6 left-6 z-30 pointer-events-none transform -rotate-12 border-4 border-emerald-500 bg-emerald-950/80 text-emerald-300 font-black text-sm sm:text-base px-3 py-1 rounded-lg uppercase tracking-widest shadow-2xl"
        >
          {card.rightChoice.text.length > 20 ? 'PHÊ DUYỆT' : card.rightChoice.text}
        </div>

        {/* Card Header: Category & Role */}
        <div className="flex flex-col items-center text-center mb-3">
          {getCategoryBadge()}
        </div>

        {/* Character Portrait & Dignitary Identity */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative mb-2">
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
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
          </div>

          <div className="text-center">
            <h3 className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
              {card.characterRole}
            </h3>
            <p className="text-slate-400 text-xs italic">{card.characterName}</p>
          </div>
        </div>

        {/* Question / Context Dilemma */}
        <div className="my-3 sm:my-4 p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-serif font-normal">
            &ldquo;{card.question}&rdquo;
          </p>
        </div>

        {/* Instruction Footer note */}
        <div className="text-center pt-1 border-t border-slate-800/60">
          <span className="text-[11px] text-slate-500">
            Kéo chuột / Vuốt thẻ / Dùng phím mũi tên ← →
          </span>
        </div>
      </div>

      {/* Quick Action Decision Buttons (Convenient alternative for mobile/click users) */}
      <div className="w-full grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={() => handleTriggerChoice('left')}
          disabled={disabled || !!isExiting}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-rose-500/40 bg-rose-950/20 hover:bg-rose-900/40 active:scale-95 text-rose-200 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 text-rose-400 group-hover:-translate-x-1 transition-transform" />
          <span className="truncate px-1 text-right">{card.leftChoice.text}</span>
        </button>

        <button
          onClick={() => handleTriggerChoice('right')}
          disabled={disabled || !!isExiting}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-900/40 active:scale-95 text-emerald-200 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md group"
        >
          <span className="truncate px-1 text-left">{card.rightChoice.text}</span>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
