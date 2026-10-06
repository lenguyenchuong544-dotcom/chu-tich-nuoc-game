import React from 'react';

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
      label: 'CHÍNH TRỊ',
      icon: '🏛',
      val: stats.politics,
      delta: recentDelta?.politics,
      hint: previewHints?.politics,
      color: 'from-red-600 to-amber-500',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      glowColor: 'rgba(239, 68, 68, 0.4)',
    },
    {
      key: 'economy' as const,
      label: 'KINH TẾ',
      icon: '💰',
      val: stats.economy,
      delta: recentDelta?.economy,
      hint: previewHints?.economy,
      color: 'from-emerald-600 to-teal-400',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      glowColor: 'rgba(16, 185, 129, 0.4)',
    },
    {
      key: 'people' as const,
      label: 'NHÂN DÂN',
      icon: '👥',
      val: stats.people,
      delta: recentDelta?.people,
      hint: previewHints?.people,
      color: 'from-sky-600 to-cyan-400',
      textColor: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      glowColor: 'rgba(14, 165, 233, 0.4)',
    },
    {
      key: 'law' as const,
      label: 'PHÁP QUYỀN',
      icon: '⚖️',
      val: stats.law,
      delta: recentDelta?.law,
      hint: previewHints?.law,
      color: 'from-purple-600 to-indigo-400',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      glowColor: 'rgba(168, 85, 247, 0.4)',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-2 py-3">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {statConfig.map((item) => {
          // Warning state when stat is dangerously low (<= 20)
          const isDanger = item.val <= 20;

          return (
            <div
              key={item.key}
              className={`relative flex flex-col items-center justify-between p-2 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                item.bgColor
              } ${item.borderColor} ${
                isDanger ? 'animate-pulse border-red-500 shadow-red-500/30 shadow-lg' : ''
              }`}
            >
              {/* Floating Delta Badge after decision */}
              {item.delta !== undefined && item.delta !== 0 && (
                <div
                  key={`${item.key}-${item.delta}-${Date.now()}`}
                  className={`absolute -top-4 z-30 font-bold text-xs sm:text-sm px-1.5 py-0.5 rounded-full shadow-lg border animate-float-delta ${
                    item.delta > 0
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                      : 'bg-rose-950 text-rose-300 border-rose-500'
                  }`}
                >
                  {item.delta > 0 ? `+${item.delta}` : item.delta}
                </div>
              )}

              {/* Indicator Icon & Preview Hint (▲ / ▼) */}
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-inner">
                <span className="text-base sm:text-xl select-none">{item.icon}</span>

                {/* Peek Preview: ▲ / ▼ hint when dragging card */}
                {item.hint !== undefined && item.hint !== 0 && (
                  <div
                    className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] sm:text-xs font-black shadow-md animate-bounce ${
                      item.hint > 0
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.hint > 0 ? '▲' : '▼'}
                  </div>
                )}
              </div>

              {/* Label & Value */}
              <div className="mt-1.5 flex flex-col items-center w-full">
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-300 uppercase truncate max-w-full">
                  {item.label}
                </span>

                <div className="flex items-baseline space-x-0.5 mt-0.5">
                  <span
                    className={`text-sm sm:text-base font-extrabold font-mono ${
                      isDanger ? 'text-red-400 font-black' : item.textColor
                    }`}
                  >
                    {Math.round(item.val)}
                  </span>
                  <span className="text-[9px] text-slate-500">/100</span>
                </div>
              </div>

              {/* Progress Bar Gauge */}
              <div className="w-full h-1.5 sm:h-2 mt-1.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500 ease-out`}
                  style={{
                    width: `${Math.max(3, Math.min(100, item.val))}%`,
                  }}
                />
              </div>

              {/* Danger Warning Dot */}
              {isDanger && (
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
