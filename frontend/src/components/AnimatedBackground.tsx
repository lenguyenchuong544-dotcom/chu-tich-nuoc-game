'use client';

import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 1. Large Ambient Soft Pastel Atmosphere Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blush/40 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-sky/35 blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-24 left-1/4 w-[380px] h-[380px] rounded-full bg-blush-subtle/50 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* 2. Top-Left: Puffy Cartoon Study Cloud & Sun */}
      <div className="absolute top-4 left-3 sm:top-10 sm:left-12 w-28 h-20 sm:w-36 sm:h-24 opacity-60 animate-float-a">
        <svg viewBox="0 0 140 90" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Peeking Sun */}
          <circle cx="48" cy="30" r="18" fill="#FFD27A" opacity="0.8" />
          <path d="M48 6 V10 M48 50 V54 M24 30 H28 M68 30 H72" stroke="#FFB84D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M31 13 L34 16 M62 44 L65 47 M31 47 L34 44 M62 16 L65 13" stroke="#FFB84D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Fluffy Cartoon Cloud */}
          <path
            d="M30 65 C20 65 12 57 12 47 C12 38 18 31 27 30 C30 18 41 10 54 10 C68 10 79 19 82 32 C86 30 90 29 95 29 C107 29 116 38 116 50 C116 51 116 52 115 53 C122 55 128 61 128 68 C128 77 120 84 110 84 H30 C19 84 10 75 10 65 Z"
            fill="#FFFFFF"
            stroke="#CFE8FF"
            strokeWidth="2.5"
          />
          {/* Cute Cloud Smile */}
          <circle cx="50" cy="52" r="2.5" fill="#5F5A75" />
          <circle cx="70" cy="52" r="2.5" fill="#5F5A75" />
          <path d="M57 58 C59 62 61 62 63 58" stroke="#5F5A75" strokeWidth="2" strokeLinecap="round" />
          {/* Cheeks */}
          <ellipse cx="43" cy="55" rx="3.5" ry="2" fill="#FFBFD9" />
          <ellipse cx="77" cy="55" rx="3.5" ry="2" fill="#FFBFD9" />
        </svg>
      </div>

      {/* 3. Top-Right: Flying Origami Paper Plane with Dotted Flight Trail */}
      <div className="absolute top-8 right-4 sm:top-14 sm:right-16 w-24 h-20 sm:w-32 sm:h-28 opacity-50 animate-paper-plane">
        <svg viewBox="0 0 120 100" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Dotted Trail */}
          <path
            d="M10 80 C30 85 45 65 60 70 C75 75 80 50 90 40"
            stroke="#FF94BF"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          {/* Folded Paper Plane */}
          <g transform="translate(68, 12) rotate(18)">
            <polygon points="40,15 0,0 12,38 20,20" fill="#FFFFFF" stroke="#FF7FB0" strokeWidth="2" />
            <polygon points="40,15 12,38 22,24" fill="#FFE0EC" stroke="#FF7FB0" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="20" y2="20" stroke="#FF7FB0" strokeWidth="1.5" />
          </g>
          {/* Mini Sparkle */}
          <polygon points="108,18 110,24 116,26 110,28 108,34 106,28 100,26 106,24" fill="#FFD27A" />
        </svg>
      </div>

      {/* 4. Mid-Left: Cute Open Book of Knowledge with Bookmark Ribbon */}
      <div className="absolute top-1/2 -translate-y-24 left-2 sm:left-8 w-16 h-16 sm:w-24 sm:h-24 opacity-45 animate-float-b">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xs">
          {/* Book Base Cover */}
          <path
            d="M15 72 C30 65 45 68 50 72 C55 68 70 65 85 72 V32 C70 25 55 28 50 32 C45 28 30 25 15 32 Z"
            fill="#FFFFFF"
            stroke="#93C5FD"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Book Spine Center */}
          <line x1="50" y1="32" x2="50" y2="72" stroke="#6FB4F2" strokeWidth="2.5" strokeLinecap="round" />
          {/* Page Lines */}
          <line x1="24" y1="42" x2="42" y2="40" stroke="#CFE8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="50" x2="42" y2="48" stroke="#CFE8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="58" x2="36" y2="56" stroke="#CFE8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="40" x2="76" y2="42" stroke="#CFE8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="48" x2="76" y2="50" stroke="#CFE8FF" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="56" x2="76" y2="58" stroke="#CFE8FF" strokeWidth="2" strokeLinecap="round" />
          {/* Bookmark Ribbon */}
          <path d="M50 32 V54 L54 50 L58 54 V32" fill="#FF7FB0" stroke="#CC3975" strokeWidth="1" />
        </svg>
      </div>

      {/* 5. Mid-Right: Whimsical Feather Pen & Ink Twinkle */}
      <div className="absolute top-1/2 translate-y-8 right-2 sm:right-10 w-16 h-20 sm:w-20 sm:h-28 opacity-45 animate-float-c">
        <svg viewBox="0 0 90 120" fill="none" className="w-full h-full drop-shadow-xs">
          {/* Feather Quill */}
          <g transform="rotate(-20 45 60)">
            <path
              d="M45 10 C58 25 65 50 55 75 C52 82 48 90 45 98 C42 90 38 82 35 75 C25 50 32 25 45 10 Z"
              fill="#FFF0F5"
              stroke="#FF7FB0"
              strokeWidth="2"
            />
            <line x1="45" y1="10" x2="45" y2="108" stroke="#E85B93" strokeWidth="2" strokeLinecap="round" />
            <path d="M45 35 C52 38 56 45 56 45 M45 50 C54 54 56 60 56 60 M45 35 C38 38 34 45 34 45 M45 50 C36 54 34 60 34 60" stroke="#FFBFD9" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="43,108 47,108 45,116" fill="#CC3975" />
          </g>
          {/* Floating Ink Droplet Star */}
          <circle cx="30" cy="98" r="3.5" fill="#FF7FB0" opacity="0.7" />
        </svg>
      </div>

      {/* 6. Bottom-Left: Celebratory Laurel Wreath Sprig & Star */}
      <div className="absolute bottom-8 left-4 sm:bottom-14 sm:left-14 w-20 h-20 sm:w-24 sm:h-24 opacity-40 animate-float-a" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xs">
          {/* Laurel Branch */}
          <path d="M25 80 C35 60 50 45 75 35" stroke="#8EE3C8" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="38" cy="68" rx="7" ry="4" transform="rotate(-30 38 68)" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
          <ellipse cx="48" cy="56" rx="7" ry="4" transform="rotate(-40 48 56)" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
          <ellipse cx="60" cy="46" rx="7" ry="4" transform="rotate(-50 60 46)" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
          <ellipse cx="74" cy="38" rx="6" ry="3.5" transform="rotate(-60 74 38)" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
          {/* Golden Star Accent */}
          <polygon points="76,20 78,25 84,27 78,29 76,34 74,29 68,27 74,25" fill="#FFB84D" stroke="#D97706" strokeWidth="1" />
        </svg>
      </div>

      {/* 7. Bottom-Right: Cute Study Coffee Mug with Steam Heart */}
      <div className="absolute bottom-6 right-4 sm:bottom-12 sm:right-16 w-16 h-18 sm:w-20 sm:h-22 opacity-40 animate-float-b" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 90 90" fill="none" className="w-full h-full drop-shadow-xs">
          {/* Steam Swirl Heart */}
          <path d="M40 22 C36 16 44 12 40 8 M46 22 C50 16 42 12 46 8" stroke="#FF7FB0" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Cup Body */}
          <rect x="22" y="26" width="36" height="38" rx="8" fill="#FFFFFF" stroke="#FFBFD9" strokeWidth="2.5" />
          {/* Cup Handle */}
          <path d="M58 34 C67 34 67 52 58 52" stroke="#FFBFD9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Tiny Heart Stamp on Mug */}
          <path d="M40 45 C38 41 33 42 33 46 C33 50 40 54 40 54 C40 54 47 50 47 46 C47 42 42 41 40 45 Z" fill="#FF7FB0" />
        </svg>
      </div>

      {/* 8. Scattered Animated Twinkling Constellation Stars (✦, ✧, ⋆) */}
      {/* Star 1 - Top Center */}
      <div className="absolute top-16 left-1/2 -translate-x-12 opacity-60 animate-twinkle">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="#FFD27A" stroke="#FFB84D" strokeWidth="1" />
        </svg>
      </div>

      {/* Star 2 - Left Upper */}
      <div className="absolute top-1/4 left-16 sm:left-28 opacity-50 animate-twinkle-delay-1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="#FF7FB0" />
        </svg>
      </div>

      {/* Star 3 - Right Upper */}
      <div className="absolute top-1/3 right-20 sm:right-36 opacity-50 animate-twinkle-delay-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="#6FB4F2" />
        </svg>
      </div>

      {/* Star 4 - Mid Center Subtle */}
      <div className="absolute top-2/3 left-1/3 opacity-40 animate-twinkle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="#FFD27A" />
          <path d="M12 4 V20 M4 12 H20" stroke="#FFD27A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Star 5 - Bottom Center */}
      <div className="absolute bottom-20 right-1/3 opacity-45 animate-twinkle-delay-1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="#8EE3C8" />
        </svg>
      </div>
    </div>
  );
};
