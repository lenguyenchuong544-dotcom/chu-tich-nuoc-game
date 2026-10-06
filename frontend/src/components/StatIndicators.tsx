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
  layout?: 'horizontal' | 'grid2x2' | 'stacked';
  className?: string;
}

export const StatIndicators: React.FC<StatIndicatorsProps> = ({
  stats,
  previewHints,
  recentDelta,
  layout = 'horizontal',
  className = '',
}) => {
  const statConfig = [
    {
      key: 'politics' as const,
      label: 'Chính Trị',
      icon: '🏛',
      val: stats.politics,
      delta: recentDelta?.politics,
      hint: previewHints?.politics,
      barColor: 'bg-peony-500',
      trackColor: 'bg-blush',
    },
    {
      key: 'economy' as const,
      label: 'Kinh Tế',
      icon: '💰',
      val: stats.economy,
      delta: recentDelta?.economy,
      hint: previewHints?.economy,
      barColor: 'bg-correct',
      trackColor: 'bg-correct-surface',
    },
    {
      key: 'people' as const,
      label: 'Nhân Dân',
      icon: '👥',
      val: stats.people,
      delta: recentDelta?.people,
      hint: previewHints?.people,
      barColor: 'bg-cornflower-500',
      trackColor: 'bg-sky-subtle',
    },
    {
      key: 'law' as const,
      label: 'Pháp Quyền',
      icon: '⚖️',
      val: stats.law,
      delta: recentDelta?.law,
      hint: previewHints?.law,
      barColor: 'bg-cornflower-700',
      trackColor: 'bg-blush-subtle',
    },
  ];

  const gridClass =
    layout === 'grid2x2'
      ? 'grid grid-cols-2 gap-3'
      : layout === 'stacked'
      ? 'grid grid-cols-1 gap-2.5'
      : 'grid grid-cols-4 gap-2.5';

  return (
    <div className={`w-full ${className}`}>
      <div className={`${gridClass} bg-white/90 border border-blush-border/80 rounded-2xl p-3 sm:p-3.5 shadow-pastel-card backdrop-blur-md`}>
        {statConfig.map((item) => {
          const isDanger = item.val <= 20;

          return (
            <div
              key={item.key}
              className={`relative flex flex-col justify-between px-2.5 sm:px-3 py-2.5 rounded-xl transition-all duration-200 border ${
                isDanger
                  ? 'bg-wrong-surface border-wrong-border'
                  : 'bg-cotton/80 border-blush-border/50 hover:border-peony-300'
              }`}
            >
              {/* Floating Delta Badge */}
              {item.delta !== undefined && item.delta !== 0 && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm border animate-delta-fade ${
                    item.delta > 0
                      ? 'bg-correct-surface text-correct-text border-correct-border'
                      : 'bg-wrong-surface text-wrong-text border-wrong-border'
                  }`}
                >
                  {item.delta > 0 ? `+${item.delta}` : item.delta}
                </div>
              )}

              {/* Header: Icon, Label & Hint */}
              <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                <div className="flex items-center space-x-1.5 truncate">
                  <span className="text-base select-none" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-ink truncate">
                    {item.label}
                  </span>
                </div>

                {/* Direction Preview Hint (↑ / ↓) */}
                {item.hint !== undefined && item.hint !== 0 && (
                  <span
                    className={`font-black text-xs sm:text-sm transition-transform transform scale-110 ${
                      item.hint > 0 ? 'text-correct' : 'text-wrong'
                    }`}
                    title={item.hint > 0 ? 'Tác động tích cực' : 'Tác động giảm'}
                  >
                    {item.hint > 0 ? '↑' : '↓'}
                  </span>
                )}
              </div>

              {/* Value & Progress Bar */}
              <div className="mt-1">
                <div className="flex items-baseline justify-between mb-1">
                  <span
                    className={`font-mono text-sm sm:text-base font-extrabold ${
                      isDanger ? 'text-wrong-text font-black' : 'text-ink'
                    }`}
                  >
                    {Math.round(item.val)}
                  </span>
                  <span className="text-xs text-ink-muted font-mono font-medium">100</span>
                </div>

                <div className={`w-full h-2 ${item.trackColor} rounded-full overflow-hidden p-[1px]`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isDanger ? 'bg-wrong' : item.barColor
                    }`}
                    style={{ width: `${Math.max(4, Math.min(100, item.val))}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
