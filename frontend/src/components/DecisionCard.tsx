'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DecisionCard as CardData, CardChoice } from '../data/cards';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../lib/sound';
import { BookOpen, Sparkles, AlertTriangle, ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { Badge } from './ui/Badge';

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
  const [committedStamp, setCommittedStamp] = useState<'left' | 'right' | null>(null);

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 85;
  const MAX_ROTATION = 14;

  // Keyboard navigation: ArrowLeft for Choice A, ArrowRight for Choice B
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || isExiting || committedStamp) return;
      if (e.key === 'ArrowLeft') {
        handleTriggerChoice('left');
      } else if (e.key === 'ArrowRight') {
        handleTriggerChoice('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, disabled, isExiting, committedStamp]);

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
  }, [dragOffset.x, card, onPreviewHintChange]);

  const handleTriggerChoice = (direction: 'left' | 'right') => {
    if (disabled || isExiting || committedStamp) return;

    sound.playDecisionClick();
    setCommittedStamp(direction);
    onPreviewHintChange(null);

    // After stamp strike settles, fly card off with momentum
    setTimeout(() => {
      sound.playCardSwipe();
      setIsExiting(direction);
    }, 180);

    setTimeout(() => {
      onChoice(direction);
      setIsExiting(null);
      setCommittedStamp(null);
      setDragOffset({ x: 0, y: 0 });
    }, 420);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || isExiting || committedStamp) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.18;
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
    if (disabled || isExiting || committedStamp) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = (touch.clientY - dragStartRef.current.y) * 0.18;
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

  const rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dragOffset.x * 0.08));

  let exitTransform = '';
  if (isExiting === 'left') {
    exitTransform = 'translateX(-120vw) translateY(30px) rotate(-24deg)';
  } else if (isExiting === 'right') {
    exitTransform = 'translateX(120vw) translateY(30px) rotate(24deg)';
  }

  const leftDragOpacity = Math.min(1, Math.max(0, -dragOffset.x / 60));
  const rightDragOpacity = Math.min(1, Math.max(0, dragOffset.x / 60));

  const roleKey = card.characterRole.toLowerCase().includes('tư pháp')
    ? 'justice'
    : card.characterRole.toLowerCase().includes('kinh tế') ||
      card.characterRole.toLowerCase().includes('tài chính')
    ? 'economy'
    : card.characterRole.toLowerCase().includes('nội vụ') ||
      card.characterRole.toLowerCase().includes('an ninh')
    ? 'security'
    : card.characterRole.toLowerCase().includes('thanh tra')
    ? 'inspector'
    : card.characterRole.toLowerCase().includes('mặt trận')
    ? 'front'
    : card.characterRole.toLowerCase().includes('tòa án')
    ? 'court'
    : card.characterRole.toLowerCase().includes('quốc hội')
    ? 'assembly'
    : card.characterRole.toLowerCase().includes('lao động') ||
      card.characterRole.toLowerCase().includes('công nhân')
    ? 'worker'
    : card.characterRole.toLowerCase().includes('báo')
    ? 'journalist'
    : card.characterRole.toLowerCase().includes('số')
    ? 'digital'
    : card.characterRole.toLowerCase().includes('văn hóa') ||
      card.characterRole.toLowerCase().includes('giáo dục')
    ? 'culture'
    : 'advisor';

  return (
    <div className="relative flex flex-col items-center w-full max-w-[440px] mx-auto select-none px-2 sm:px-3">
      {/* Dynamic Gesture Hint Label above Dossier */}
      <div className="h-9 flex items-center justify-center text-center px-2 mb-2.5 w-full">
        {dragOffset.x < -18 ? (
          <div className="text-peony-700 font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 transition-all">
            <ArrowLeft className="w-4 h-4 text-peony-600 shrink-0" />
            <span className="truncate max-w-[320px]">{card.leftChoice.text}</span>
          </div>
        ) : dragOffset.x > 18 ? (
          <div className="text-cornflower-700 font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 transition-all">
            <span className="truncate max-w-[320px]">{card.rightChoice.text}</span>
            <ArrowRight className="w-4 h-4 text-cornflower-600 shrink-0" />
          </div>
        ) : (
          <div className="text-ink-muted text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-3 opacity-90">
            <span className="flex items-center gap-1.5">← Kéo Trái: Phương án A</span>
            <span className="w-1.5 h-1.5 rounded-full bg-peony-300" />
            <span className="flex items-center gap-1.5">Kéo Phải: Phương án B →</span>
          </div>
        )}
      </div>

      {/* Dossier Card Stack Container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Layer 2 Background Dossier Sheet */}
        <div className="absolute inset-0 rounded-2xl bg-blush-subtle border border-blush-border/70 card-stack-layer-2 shadow-sm" />

        {/* Layer 1 Background Dossier Sheet */}
        <div className="absolute inset-0 rounded-2xl bg-white/90 border border-blush-border card-stack-layer-1 shadow-pastel-card" />

        {/* Active Dossier Card */}
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
              : `perspective(1000px) translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) rotateZ(${rotation}deg) rotateY(${dragOffset.x * 0.04}deg) rotateX(${Math.max(-6, Math.min(6, -dragOffset.y * 0.08))}deg)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className={`relative z-10 w-full rounded-2xl bg-white border-2 p-5 sm:p-6 overflow-hidden transition-shadow ${
            card.isCrisis
              ? 'border-wrong-border shadow-pastel-pink ring-2 ring-wrong/20'
              : 'border-blush-border shadow-dossier'
          }`}
        >
          {/* Directional Soft Tint Overlay during drag */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-150 rounded-2xl z-0"
            style={{
              backgroundColor:
                dragOffset.x < 0
                  ? 'rgba(255, 127, 176, 0.09)'
                  : dragOffset.x > 0
                  ? 'rgba(111, 180, 242, 0.09)'
                  : 'transparent',
              opacity: Math.min(1, Math.abs(dragOffset.x) / 50),
            }}
          />
          {/* Authentic Tactile Rubber Stamp Landing Moment */}
          {/* Choice A Stamp ("PHÊ DUYỆT") */}
          <div
            style={{
              opacity: committedStamp === 'left' ? 1 : leftDragOpacity,
              transform:
                committedStamp === 'left'
                  ? 'scale(1) rotate(-8deg)'
                  : `scale(${0.9 + leftDragOpacity * 0.2}) rotate(-10deg)`,
              transition: isDragging
                ? 'none'
                : 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute top-5 right-5 z-30 pointer-events-none border-2 border-peony-600 bg-white/95 text-peony-700 text-sm sm:text-base px-4 py-1.5 rounded-lg uppercase stamp-imprint shadow-stamp"
          >
            PHÊ DUYỆT
          </div>

          {/* Choice B Stamp ("BÁC BỎ") */}
          <div
            style={{
              opacity: committedStamp === 'right' ? 1 : rightDragOpacity,
              transform:
                committedStamp === 'right'
                  ? 'scale(1) rotate(8deg)'
                  : `scale(${0.9 + rightDragOpacity * 0.2}) rotate(10deg)`,
              transition: isDragging
                ? 'none'
                : 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute top-5 left-5 z-30 pointer-events-none border-2 border-cornflower-700 bg-white/95 text-cornflower-700 text-sm sm:text-base px-4 py-1.5 rounded-lg uppercase stamp-imprint shadow-stamp"
          >
            BÁC BỎ
          </div>

          {/* Top Dossier Ribbon / Category Badge */}
          <div className="flex justify-center mb-3">
            {card.isCrisis ? (
              <Badge variant="wrong" size="md" icon={<AlertTriangle className="w-4 h-4" />}>
                Khủng Hoảng Quốc Gia
              </Badge>
            ) : card.type === 'KNOWLEDGE' ? (
              <Badge variant="peony" size="md" icon={<BookOpen className="w-4 h-4" />}>
                Kiến Thức Lý Luận
              </Badge>
            ) : card.type === 'STORYLINE' ? (
              <Badge variant="sky" size="md" icon={<Sparkles className="w-4 h-4" />}>
                Bước Ngoặt Thể Chế
              </Badge>
            ) : (
              <Badge variant="neutral" size="md">Tình Huống Điều Hành</Badge>
            )}
          </div>

          {/* Character Portrait & Role Header */}
          <div className="flex flex-col items-center text-center my-1.5">
            <div className="mb-2">
              <CharacterAvatar
                avatarKey={roleKey}
                name={card.characterName}
                role={card.characterRole}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>

            <h3 className="text-ink font-extrabold text-sm sm:text-base uppercase tracking-wider">
              {card.characterRole}
            </h3>
            <p className="text-ink-muted text-xs sm:text-sm font-medium italic mt-0.5">{card.characterName}</p>
          </div>

          {/* Dossier Dilemma Question */}
          <div className="my-3 py-3 text-center border-t border-b border-blush-border/70">
            <p className="text-ink text-base sm:text-lg sm:leading-relaxed leading-normal font-semibold">
              &ldquo;{card.question}&rdquo;
            </p>
          </div>

          {/* Dossier Category Subtitle */}
          <div className="text-center pt-1">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-ink-muted">
              HỒ SƠ BÁO CÁO NGUYÊN THỦ
            </span>
          </div>
        </div>
      </div>

      {/* Tactile Two-Choice Buttons */}
      <div className="w-full grid grid-cols-2 gap-3 mt-4">
        {/* Choice A Button */}
        <button
          onClick={() => handleTriggerChoice('left')}
          disabled={disabled || !!isExiting || !!committedStamp}
          className="flex flex-col items-start justify-center p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-blush-subtle active:translate-y-[2px] border-2 border-blush-border hover:border-peony-400 text-ink font-medium transition-all text-left shadow-sm min-h-[76px]"
        >
          <span className="text-xs uppercase font-extrabold text-peony-700 mb-1 flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4 text-peony-500 shrink-0" />
            <span>Phương Án A</span>
          </span>
          <span className="text-sm sm:text-base leading-snug line-clamp-2 text-ink font-bold">{card.leftChoice.text}</span>
        </button>

        {/* Choice B Button */}
        <button
          onClick={() => handleTriggerChoice('right')}
          disabled={disabled || !!isExiting || !!committedStamp}
          className="flex flex-col items-start justify-center p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-sky-subtle active:translate-y-[2px] border-2 border-sky-border hover:border-cornflower-400 text-ink font-medium transition-all text-left shadow-sm min-h-[76px]"
        >
          <span className="text-xs uppercase font-extrabold text-cornflower-700 mb-1 flex items-center gap-1.5">
            <span>Phương Án B</span>
            <ArrowRight className="w-4 h-4 text-cornflower-500 shrink-0" />
          </span>
          <span className="text-sm sm:text-base leading-snug line-clamp-2 text-ink font-bold">{card.rightChoice.text}</span>
        </button>
      </div>
    </div>
  );
};
