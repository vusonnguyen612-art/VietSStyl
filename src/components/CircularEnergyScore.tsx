import React from 'react';

interface CircularEnergyScoreProps {
  score: number | string;
  maxScore?: number;
  size?: number; // Kích thước pixel (mặc định 46)
  strokeWidth?: number;
  variant?: 'gold' | 'ruby' | 'emerald' | 'amber' | 'teacher-red' | 'blue';
  showLabel?: boolean;
  label?: string;
  className?: string;
  fontClass?: string;
}

export const CircularEnergyScore: React.FC<CircularEnergyScoreProps> = ({
  score,
  maxScore = 10,
  size = 46,
  strokeWidth = 3.5,
  variant = 'gold',
  showLabel = false,
  label = 'Điểm',
  className = '',
  fontClass = '',
}) => {
  const numericScore = typeof score === 'string' ? parseFloat(score) || 0 : score;
  const ratio = Math.min(1, Math.max(0, numericScore / maxScore));

  const center = size / 2;
  const radius = center - strokeWidth - 1.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - ratio);

  // Gradient ID ngẫu nhiên theo size và variant để tránh trùng ID
  const gradId = `energy-grad-${variant}-${size}`;
  const glowId = `energy-glow-${variant}-${size}`;

  // Cấu hình bảng màu năng lượng
  const getGradientColors = () => {
    switch (variant) {
      case 'gold':
        return {
          start: '#FDE047',
          mid: '#F59E0B',
          end: '#D97706',
          track: 'rgba(217, 119, 6, 0.18)',
          glow: 'rgba(245, 158, 11, 0.45)',
          text: 'text-amber-300',
        };
      case 'ruby':
        return {
          start: '#FB7185',
          mid: '#E11D48',
          end: '#9F1239',
          track: 'rgba(225, 29, 72, 0.15)',
          glow: 'rgba(225, 29, 72, 0.4)',
          text: 'text-rose-600',
        };
      case 'teacher-red':
        return {
          start: '#F87171',
          mid: '#DC2626',
          end: '#991B1B',
          track: 'rgba(220, 38, 38, 0.16)',
          glow: 'rgba(220, 38, 38, 0.45)',
          text: 'text-red-600',
        };
      case 'emerald':
        return {
          start: '#6EE7B7',
          mid: '#10B981',
          end: '#047857',
          track: 'rgba(16, 185, 129, 0.18)',
          glow: 'rgba(16, 185, 129, 0.4)',
          text: 'text-emerald-600',
        };
      case 'amber':
        return {
          start: '#FDBA74',
          mid: '#EA580C',
          end: '#C2410C',
          track: 'rgba(234, 88, 12, 0.18)',
          glow: 'rgba(234, 88, 12, 0.4)',
          text: 'text-amber-700',
        };
      case 'blue':
        return {
          start: '#93C5FD',
          mid: '#2563EB',
          end: '#1E40AF',
          track: 'rgba(37, 99, 235, 0.18)',
          glow: 'rgba(37, 99, 235, 0.4)',
          text: 'text-blue-600',
        };
      default:
        return {
          start: '#FDE047',
          mid: '#F59E0B',
          end: '#D97706',
          track: 'rgba(217, 119, 6, 0.18)',
          glow: 'rgba(245, 158, 11, 0.45)',
          text: 'text-amber-400',
        };
    }
  };

  const colors = getGradientColors();

  // Kích thước font chữ theo kích thước vòng tròn
  const getFontSize = () => {
    if (size >= 70) return 'text-2xl sm:text-3xl font-black';
    if (size >= 58) return 'text-xl sm:text-2xl font-black';
    if (size >= 44) return 'text-sm sm:text-base font-extrabold';
    if (size >= 36) return 'text-xs font-bold';
    return 'text-[11px] font-bold';
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title={`${numericScore}/${maxScore} Điểm (Thanh năng lượng: ${Math.round(ratio * 100)}%)`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full transform -rotate-90 overflow-visible"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="50%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor={colors.glow} />
          </filter>
        </defs>

        {/* Vòng nền rãnh chứa năng lượng (Track) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={colors.track}
          strokeWidth={strokeWidth}
        />

        {/* Thanh năng lượng hình tròn bao quanh (Energy Arc) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          className="transition-all duration-700 ease-out"
        />

        {/* Điểm hạt năng lượng sáng tại điểm kết thúc */}
        {ratio > 0.05 && (
          <circle
            cx={center + radius * Math.cos(2 * Math.PI * ratio - Math.PI / 2 + Math.PI / 2)}
            cy={center + radius * Math.sin(2 * Math.PI * ratio - Math.PI / 2 + Math.PI / 2)}
            r={strokeWidth * 0.45}
            fill="#FFFFFF"
            className="opacity-90"
          />
        )}
      </svg>

      {/* Điểm số hiển thị ở giữa thanh năng lượng */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
        <span
          className={`leading-none tracking-tight ${getFontSize()} ${fontClass || colors.text}`}
        >
          {numericScore}
        </span>
        {showLabel && size >= 54 && (
          <span className="text-[9px] uppercase font-bold tracking-wider opacity-75 mt-0.5 leading-none">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
