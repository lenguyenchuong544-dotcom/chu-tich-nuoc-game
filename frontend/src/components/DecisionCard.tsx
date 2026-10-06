'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DecisionCard as CardData } from '../data/cards';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../lib/sound';
import { ShieldAlert, BookOpen, Sparkles, FileText, ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
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

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SWIPE_THRESHOLD = 65;
  const MAX_ROTATION = 10;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard controls (Arrow keys)
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

  const handleTriggerChoice = (direction: 'left' | 'right') => {
    if (disabled || isExiting) return;
    sound.playCardSwipe();
    sound.playDecisionClick();
    setIsExiting(direction);
    setIsDragging(false);
    onPreviewHintChange(null);

    exitTimeoutRef.current = setTimeout(() => {
      onChoice(direction);
      setIsExiting(null);
      setDragOffset({ x: 0, y: 0 });
      dragOffsetRef.current = { x: 0, y: 0 };
    }, 240);
  };

  // Pointer drag handling (unified for Mouse, Touch, and Stylus)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || isExiting) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragOffsetRef.current = { x: 0, y: 0 };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || isExiting) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = (e.clientY - dragStartRef.current.y) * 0.15;

    dragOffsetRef.current = { x: deltaX, y: deltaY };
    setDragOffset({ x: deltaX, y: deltaY });

    if (Math.abs(deltaX) > 20) {
      if (deltaX < 0) {
        onPreviewHintChange(card.leftChoice.hint || null);
      } else {
        onPreviewHintChange(card.rightChoice.hint || null);
      }
    } else {
      onPreviewHintChange(null);
    }
  };

  const finishDrag = (pointerTarget?: HTMLElement, pointerId?: number) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (pointerTarget && pointerId !== undefined) {
      try {
        if (pointerTarget.hasPointerCapture(pointerId)) {
          pointerTarget.releasePointerCapture(pointerId);
        }
      } catch (_) {}
    }

    const curX = dragOffsetRef.current.x;
    if (curX < -SWIPE_THRESHOLD) {
      handleTriggerChoice('left');
    } else if (curX > SWIPE_THRESHOLD) {
      handleTriggerChoice('right');
    } else {
      setDragOffset({ x: 0, y: 0 });
      dragOffsetRef.current = { x: 0, y: 0 };
      onPreviewHintChange(null);
    }
    dragStartRef.current = null;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e.currentTarget, e.pointerId);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    setDragOffset({ x: 0, y: 0 });
    dragOffsetRef.current = { x: 0, y: 0 };
    onPreviewHintChange(null);
    dragStartRef.current = null;
  };

  // Global window fallback
  useEffect(() => {
    if (!isDragging) return;
    const onGlobalUp = () => finishDrag();
    window.addEventListener('pointerup', onGlobalUp);
    window.addEventListener('pointercancel', onGlobalUp);
    return () => {
      window.removeEventListener('pointerup', onGlobalUp);
      window.removeEventListener('pointercancel', onGlobalUp);
    };
  }, [isDragging]);

  const rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dragOffset.x * 0.08));

  let exitTransform = '';
  if (isExiting === 'left') {
    exitTransform = 'translateX(-120vw) rotate(-22deg) scale(0.92)';
  } else if (isExiting === 'right') {
    exitTransform = 'translateX(120vw) rotate(22deg) scale(0.92)';
  }

  const leftStampOpacity = Math.min(1, Math.max(0, -dragOffset.x / 45));
  const rightStampOpacity = Math.min(1, Math.max(0, dragOffset.x / 45));

  const getCategoryBadge = () => {
    if (card.isCrisis) {
      return (
        <Badge variant="coral">
          <ShieldAlert className="w-3 h-3" />
          <span>Khủng Hoảng</span>
        </Badge>
      );
    }
    if (card.type === 'KNOWLEDGE') {
      return (
        <Badge variant="sky">
          <BookOpen className="w-3 h-3" />
          <span>Kiểm Tra Lý Luận</span>
        </Badge>
      );
    }
    if (card.type === 'STORYLINE') {
      return (
        <Badge variant="blush">
          <Sparkles className="w-3 h-3" />
          <span>Bước Ngoặt</span>
        </Badge>
      );
    }
    return (
      <Badge variant="neutral">
        <FileText className="w-3 h-3" />
        <span>Điều Hành</span>
      </Badge>
    );
  };

  const getAvatarKey = () => {
    const role = (card.characterRole || '').toLowerCase();
    if (role.includes('tư pháp')) return 'justice';
    if (role.includes('kinh tế') || role.includes('tài chính')) return 'economy';
    if (role.includes('nội vụ') || role.includes('an ninh')) return 'security';
    if (role.includes('thanh tra')) return 'inspector';
    if (role.includes('mặt trận')) return 'front';
    if (role.includes('tòa án')) return 'court';
    if (role.includes('quốc hội')) return 'assembly';
    if (role.includes('văn hóa') || role.includes('giáo dục')) return 'culture';
    return 'advisor';
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto select-none px-1 sm:px-3">
      {/* Dynamic Choice Preview Above Card */}
      <div className="h-8 flex items-center justify-center text-center px-2 mb-1 w-full">
        {dragOffset.x < -20 ? (
          <div className="text-wrong-text font-bold text-xs sm:text-sm tracking-wide flex items-center space-x-1.5 max-w-full">
            <X className="w-4 h-4 text-wrong flex-shrink-0" />
            <span className="truncate">{card.leftChoice.text}</span>
          </div>
        ) : dragOffset.x > 20 ? (
          <div className="text-correct-text font-bold text-xs sm:text-sm tracking-wide flex items-center space-x-1.5 max-w-full">
            <span className="truncate">{card.rightChoice.text}</span>
            <Check className="w-4 h-4 text-correct flex-shrink-0" />
          </div>
        ) : (
          <div className="text-ink-muted text-[10px] sm:text-[11px] tracking-wider uppercase font-medium flex items-center space-x-1.5">
            <span>← Bác Bỏ (P.Án 1)</span>
            <span className="w-1 h-1 rounded-full bg-blush-deep" />
            <span>Vuốt thẻ</span>
            <span className="w-1 h-1 rounded-full bg-blush-deep" />
            <span>Phê Duyệt (P.Án 2) →</span>
          </div>
        )}
      </div>

      {/* 3D Dossier Card Stack Container */}
      <div className="relative w-full card-stack-container flex justify-center">
        {/* Layer 2 (Bottom paper sheet) */}
        <div className="absolute top-0 w-full h-full rounded-2xl pastel-card-stack-back-2 pointer-events-none" />

        {/* Layer 1 (Middle paper sheet) */}
        <div className="absolute top-0 w-full h-full rounded-2xl pastel-card-stack-back-1 pointer-events-none" />

        {/* Main Interactive Dossier Card */}
        <div
          ref={cardRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{
            transform: isExiting
              ? exitTransform
              : `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className={`relative z-20 w-full rounded-2xl bg-cotton border-2 p-4 sm:p-5 transition-shadow duration-200 overflow-hidden touch-none select-none ${
            card.isCrisis
              ? 'border-wrong/80 shadow-dossier-crisis bg-wrong-surface/30'
              : 'border-blush-deep/80 shadow-dossier hover:shadow-dossier-hover'
          }`}
        >
          {/* Tactile Stamp: "BÁC BỎ" on Left Swipe */}
          <div
            style={{ opacity: leftStampOpacity }}
            className="absolute top-3.5 right-4 z-30 pointer-events-none transform rotate-8 stamp-box stamp-reject text-xs sm:text-sm font-black"
          >
            BÁC BỎ
          </div>

          {/* Tactile Stamp: "DUYỆT" on Right Swipe */}
          <div
            style={{ opacity: rightStampOpacity }}
            className="absolute top-3.5 left-4 z-30 pointer-events-none transform -rotate-8 stamp-box stamp-approve text-xs sm:text-sm font-black"
          >
            PHÊ DUYỆT
          </div>

          {/* Stationery Dossier Header */}
          <div className="flex items-center justify-between border-b border-blush-deep/60 pb-2.5 mb-2.5">
            <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] tracking-widest text-peony-700 font-bold uppercase truncate">
              <span className="w-2 h-2 rounded-full bg-peony flex-shrink-0" />
              <span className="truncate">VĂN PHÒNG CHỦ TỊCH NƯỚC</span>
            </div>
            <div className="flex-shrink-0 ml-1">{getCategoryBadge()}</div>
          </div>

          {/* Character Identity */}
          <div className="flex items-center space-x-3 my-2 px-0.5">
            <CharacterAvatar
              avatarKey={getAvatarKey()}
              name={card.characterName}
              role={card.characterRole}
              className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-peony-700 block truncate">
                TỜ TRÌNH ĐẠI BIỂU
              </span>
              <h3 className="text-ink font-bold text-xs sm:text-sm leading-tight truncate">
                {card.characterRole}
              </h3>
              <p className="text-ink-muted text-[11px] truncate font-medium">
                {card.characterName}
              </p>
            </div>
          </div>

          {/* Policy Question Content in Stationery Card */}
          <div className="my-2.5 p-3 sm:p-3.5 rounded-xl bg-blush-surface/70 border border-blush-deep/60">
            <p className="text-ink text-xs sm:text-sm leading-relaxed font-sans font-medium">
              &ldquo;{card.question}&rdquo;
            </p>
          </div>

          {/* Action Instruction Guidance Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-blush-deep/50 text-[9px] sm:text-[10px] text-ink-muted">
            <span>Kéo sang trái hoặc phải để quyết định</span>
            <span className="font-sans text-ink-muted font-medium">← [Bác bỏ] | [Phê duyệt] →</span>
          </div>
        </div>
      </div>

      {/* Two Choice Action Buttons (Tactile Pastel Buttons) */}
      <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5 mt-2.5">
        <button
          onClick={() => handleTriggerChoice('left')}
          disabled={disabled || !!isExiting}
          className="min-h-[44px] flex items-start space-x-2 px-2.5 py-2 rounded-xl border-2 border-blush-deep bg-cotton hover:bg-wrong-surface/50 hover:border-wrong/50 active:translate-y-[2px] active:shadow-tactile-pressed transition-all duration-150 text-left group shadow-tactile"
        >
          <div className="mt-0.5 p-1 rounded bg-wrong-surface border border-wrong/30 text-wrong-text group-hover:bg-wrong/20 flex-shrink-0">
            <ArrowLeft className="w-3 h-3" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold text-wrong-text uppercase tracking-wider block">
              PHƯƠNG ÁN 1
            </span>
            <span className="text-xs font-semibold text-ink leading-snug block mt-0.5 break-words">
              {card.leftChoice.text}
            </span>
          </div>
        </button>

        <button
          onClick={() => handleTriggerChoice('right')}
          disabled={disabled || !!isExiting}
          className="min-h-[44px] flex items-start space-x-2 px-2.5 py-2 rounded-xl border-2 border-blush-deep bg-cotton hover:bg-correct-surface/50 hover:border-correct/50 active:translate-y-[2px] active:shadow-tactile-pressed transition-all duration-150 text-left group shadow-tactile"
        >
          <div className="mt-0.5 p-1 rounded bg-correct-surface border border-correct/30 text-correct-text group-hover:bg-correct/20 flex-shrink-0">
            <ArrowRight className="w-3 h-3" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold text-correct-text uppercase tracking-wider block">
              PHƯƠNG ÁN 2
            </span>
            <span className="text-xs font-semibold text-ink leading-snug block mt-0.5 break-words">
              {card.rightChoice.text}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
