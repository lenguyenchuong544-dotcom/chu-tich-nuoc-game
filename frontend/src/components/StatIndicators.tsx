'use client';

import React from 'react';
import { Landmark, Coins, Users, Scale } from 'lucide-react';

export interface NationalStats {
  politics: number;
  economy: number;
  people: number;
  law: number;
}

export interface StatDelta {
  politics?: number;
  economy?: number;
  people?: number;
  law?: number;
}

export interface StatPreviewHint {
  politics?: 1 | -1 | 0;
  economy?: 1 | -1 | 0;
  people?: 1 | -1 | 0;
  law?: 1 | -1 | 0;
}

interface StatIndicatorsProps {
  stats: NationalStats;
  previewHints?: StatPreviewHint | null;
  recentDelta?: StatDelta | null;
}

export const StatIndicators: React.FC<StatIndicatorsProps> = ({
  stats,
  previewHints,
  recentDelta,
}) => {
  const statConfig = [
    {
      key: 'politics' as const,
      label: 'Chính Trị',
      icon: <Landmark className="w-3 h-3 text-wrong-text" />,
      val: stats.politics,
      delta: recentDelta?.politics,
      hint: previewHints?.politics,
      barGradient: 'from-wrong to-peony',
      textColor: 'text-wrong-text',
    },
    {
      key: 'economy' as const,
      label: 'Kinh Tế',
      icon: <Coins className="w-3 h-3 text-correct-text" />,
      val: stats.economy,
      delta: recentDelta?.economy,
      hint: previewHints?.economy,
      barGradient: 'from-correct to-sky',
      textColor: 'text-correct-text',
    },
    {
      key: 'people' as const,
      label: 'Nhân Dân',
      icon: <Users className="w-3 h-3 text-cornflower-700" />,
      val: stats.people,
      delta: recentDelta?.people,
      hint: previewHints?.people,
      barGradient: 'from-cornflower to-sky-deep',
      textColor: 'text-cornflower-700',
    },
    {
      key: 'law' as const,
      label: 'Pháp Quyền',
      icon: <Scale className="w-3 h-3 text-peony-700" />,
      val: stats.law,
      delta: recentDelta?.law,
      hint: previewHints?.law,
      barGradient: 'from-peony to-highlight',
      textColor: 'text-peony-700',
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-2 py-1">
      {/* 4 Stat Columns in Pastel Stationery Cards */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full">
        {statConfig.map((item) => {
          const isDanger = item.val <= 20;

          return (
            <div
              key={item.key}
              title={`${item.label}: ${Math.round(item.val)}/100`}
              className={`relative flex flex-col justify-between px-2 py-1.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-default select-none ${
                isDanger
                  ? 'border-wrong bg-wrong-surface shadow-sm ring-2 ring-wrong/40'
                  : 'border-blush-deep/70 bg-cotton shadow-sm hover:border-peony/50'
              }`}
            >
              {/* Floating Delta Badge (+8 / -5) */}
              {item.delta !== undefined && item.delta !== 0 && (
                <div
                  key={`${item.key}-${item.delta}-${Date.now()}`}
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 z-30 font-bold font-mono text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-pill border shadow-tactile animate-float-delta ${
                    item.delta > 0
                      ? 'bg-correct-surface text-correct-text border-correct/80'
                      : 'bg-wrong-surface text-wrong-text border-wrong/80'
                  }`}
                >
                  {item.delta > 0 ? `+${item.delta}` : item.delta}
                </div>
              )}

              {/* Stat Header: Icon & Score & Peek Hint */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-1 min-w-0">
                  <div className="p-0.5 rounded bg-blush-surface border border-blush-deep/50 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-ink-muted truncate hidden sm:inline">
                    {item.label}
                  </span>
                </div>

                {/* Score & Peek Hint */}
                <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0">
                  {item.hint !== undefined && item.hint !== 0 && (
                    <span
                      className={`text-[9px] sm:text-[10px] font-black ${
                        item.hint > 0 ? 'text-correct-text' : 'text-wrong-text'
                      }`}
                    >
                      {item.hint > 0 ? '▲' : '▼'}
                    </span>
                  )}

                  <span
                    className={`font-mono tabular-nums text-[11px] sm:text-xs font-bold ${
                      isDanger ? 'text-wrong-text font-black' : 'text-ink'
                    }`}
                  >
                    {Math.round(item.val)}
                  </span>
                </div>
              </div>

              {/* Progress Micro-Bar */}
              <div className="w-full h-1.5 mt-1 bg-blush-surface rounded-pill overflow-hidden border border-blush-deep/40">
                <div
                  className={`h-full rounded-pill bg-gradient-to-r ${item.barGradient} transition-all duration-300 ease-out`}
                  style={{
                    width: `${Math.max(2, Math.min(100, item.val))}%`,
                  }}
                />
              </div>

              {/* Danger Warning Dot */}
              {isDanger && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-wrong ring-2 ring-cotton" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
