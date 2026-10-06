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
      label: 'Chính Trị',
      icon: '🏛',
      val: stats.politics,
      delta: recentDelta?.politics,
      hint: previewHints?.politics,
      barColor: 'bg-amber-500',
    },
    {
      key: 'economy' as const,
      label: 'Kinh Tế',
      icon: '💰',
      val: stats.economy,
      delta: recentDelta?.economy,
      hint: previewHints?.economy,
      barColor: 'bg-emerald-500',
    },
    {
      key: 'people' as const,
      label: 'Nhân Dân',
      icon: '👥',
      val: stats.people,
      delta: recentDelta?.people,
      hint: previewHints?.people,
      barColor: 'bg-sky-400',
    },
    {
      key: 'law' as const,
      label: 'Pháp Quyền',
      icon: '⚖️',
      val: stats.law,
      delta: recentDelta?.law,
      hint: previewHints?.law,
      barColor: 'bg-indigo-400',
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-2">
      <div className="grid grid-cols-4 gap-2 bg-[#0c1426]/90 border border-white/10 rounded-xl p-2 shadow-lg backdrop-blur-sm">
        {statConfig.map((item) => {
          const isDanger = item.val <= 20;

          return (
            <div
              key={item.key}
              className={`relative flex flex-col justify-between px-2 py-1.5 rounded-lg transition-all duration-200 ${
                isDanger
                  ? 'bg-rose-950/40 border border-rose-500/60'
                  : 'bg-white/[0.03] border border-white/5'
              }`}
            >
              {/* Floating Delta Badge */}
              {item.delta !== undefined && item.delta !== 0 && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 font-mono font-bold text-xs px-1.5 py-0.2 rounded shadow-md border animate-delta-fade ${
                    item.delta > 0
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                      : 'bg-rose-950 text-rose-300 border-rose-500/50'
                  }`}
                >
                  {item.delta > 0 ? `+${item.delta}` : item.delta}
                </div>
              )}

              {/* Header: Icon, Label & Hint */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 truncate">
                  <span className="text-sm select-none">{item.icon}</span>
                  <span className="text-[11px] font-medium text-slate-300 truncate">
                    {item.label}
                  </span>
                </div>

                {/* Subtle Preview Hint (↑ / ↓) */}
                {item.hint !== undefined && item.hint !== 0 && (
                  <span
                    className={`font-black text-xs transition-opacity ${
                      item.hint > 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.hint > 0 ? '↑' : '↓'}
                  </span>
                )}
              </div>

              {/* Value & Progress Bar */}
              <div className="mt-1">
                <div className="flex items-baseline justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isDanger ? 'text-rose-400 font-black' : 'text-slate-100'
                    }`}
                  >
                    {Math.round(item.val)}
                  </span>
                  <span className="text-[9px] text-slate-500">100</span>
                </div>

                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isDanger ? 'bg-rose-500' : item.barColor
                    }`}
                    style={{ width: `${Math.max(3, Math.min(100, item.val))}%` }}
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
