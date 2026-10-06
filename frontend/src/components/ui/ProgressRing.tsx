import React from 'react';

interface ProgressRingProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 54,
  strokeWidth = 5,
  color = '#FF7FB0', // peony
  trackColor = '#FFE3EE', // blush
  label,
  className = '',
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated value track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono font-bold text-xs text-ink">
          {Math.round(clampedValue)}%
        </span>
        {label && <span className="text-[9px] text-ink-muted -mt-0.5">{label}</span>}
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: string;
  height?: string;
  trackColor?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'bg-peony-500',
  height = 'h-2',
  trackColor = 'bg-blush',
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`w-full ${height} ${trackColor} rounded-full overflow-hidden p-0.5 border border-blush-border/40 ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`${height} ${color} rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
