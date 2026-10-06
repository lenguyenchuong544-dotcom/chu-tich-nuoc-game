import React from 'react';

interface CharacterAvatarProps {
  avatarKey: string;
  name: string;
  role: string;
  color?: string;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  avatarKey,
  name,
  role,
  color = '#d4af37',
  className = 'w-24 h-24',
}) => {
  // Artistic SVG icons corresponding to the high office characters
  const renderIcon = () => {
    switch (avatarKey) {
      case 'justice': // Bộ trưởng Tư pháp
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#1e3a8a" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="2.5" />
            <path d="M50 22 V74 M32 34 H68 M26 44 L38 44 M62 44 L74 44" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
            <path d="M26 44 C26 52 38 52 38 44 Z" fill="#3b82f6" />
            <path d="M62 44 C62 52 74 52 74 44 Z" fill="#3b82f6" />
            <circle cx="50" cy="22" r="4" fill="#fbbf24" />
          </g>
        );
      case 'economy': // Bộ trưởng Kinh tế & Tài chính
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#064e3b" fillOpacity="0.3" stroke="#34d399" strokeWidth="2.5" />
            <rect x="28" y="32" width="44" height="36" rx="4" fill="#059669" fillOpacity="0.4" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="9" fill="#f59e0b" />
            <path d="M50 44 V56 M46 47 H54" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <path d="M35 30 L50 20 L65 30" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'security': // Bộ trưởng Nội vụ & An ninh
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#450a0a" fillOpacity="0.3" stroke="#f87171" strokeWidth="2.5" />
            <path d="M50 20 L72 30 V50 C72 65 50 78 50 78 C50 78 28 65 28 50 V30 Z" fill="#b91c1c" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2.5" />
            <polygon points="50,33 54,43 65,43 56,49 59,60 50,54 41,60 44,49 35,43 46,43" fill="#fbbf24" />
          </g>
        );
      case 'advisor': // Chủ nhiệm Văn phòng Chủ tịch
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#451a03" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="2.5" />
            <path d="M32 28 H68 V72 H32 Z" fill="#d97706" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
            <path d="M40 38 H60 M40 46 H60 M40 54 H54" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="62" cy="62" r="8" fill="#dc2626" stroke="#fbbf24" strokeWidth="1.5" />
          </g>
        );
      case 'culture': // Bộ trưởng Văn hóa - Giáo dục
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#500724" fillOpacity="0.3" stroke="#f472b6" strokeWidth="2.5" />
            <path d="M26 62 C34 50 48 50 50 64 C52 50 66 50 74 62" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 26 C44 36 34 44 50 56 C66 44 56 36 50 26 Z" fill="#ec4899" fillOpacity="0.7" stroke="#fb7185" strokeWidth="2" />
            <circle cx="50" cy="38" r="4" fill="#fde047" />
          </g>
        );
      case 'inspector': // Tổng Thanh tra Chính phủ
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#2e1065" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="2.5" />
            <circle cx="44" cy="44" r="16" fill="#7c3aed" fillOpacity="0.3" stroke="#c4b5fd" strokeWidth="3" />
            <line x1="56" y1="56" x2="72" y2="72" stroke="#a78bfa" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M38 44 L42 48 L52 38" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'front': // Chủ tịch Mặt trận Tổ quốc
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#134e4a" fillOpacity="0.3" stroke="#2dd4bf" strokeWidth="2.5" />
            <circle cx="34" cy="40" r="7" fill="#14b8a6" />
            <circle cx="66" cy="40" r="7" fill="#14b8a6" />
            <circle cx="50" cy="34" r="8" fill="#2dd4bf" />
            <path d="M26 66 C26 56 38 52 50 52 C62 52 74 56 74 66" fill="#0d9488" stroke="#5eead4" strokeWidth="2" />
          </g>
        );
      case 'court': // Chánh án Tòa án nhân dân tối cao
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#1e1b4b" fillOpacity="0.3" stroke="#818cf8" strokeWidth="2.5" />
            <path d="M25 68 H75 M32 68 V45 M68 68 V45 M50 68 V45 M26 45 L50 25 L74 45 Z" fill="#4338ca" fillOpacity="0.4" stroke="#a5b4fc" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="50" cy="38" r="3.5" fill="#fde047" />
          </g>
        );
      case 'assembly': // Đại biểu Quốc hội
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#431407" fillOpacity="0.3" stroke="#fb923c" strokeWidth="2.5" />
            <path d="M32 68 C32 54 40 48 50 48 C60 48 68 54 68 68 Z" fill="#ea580c" fillOpacity="0.5" stroke="#fb923c" strokeWidth="2" />
            <circle cx="50" cy="36" r="10" fill="#f97316" stroke="#fed7aa" strokeWidth="2" />
            <polygon points="50,22 52,26 57,26 53,29 55,33 50,30 45,33 47,29 43,26 48,26" fill="#fde047" />
          </g>
        );
      case 'worker': // Đại diện Công nhân - Lao động
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#164e63" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="15" fill="#0891b2" stroke="#67e8f9" strokeWidth="3" />
            <path d="M50 25 V33 M50 67 V75 M25 50 H33 M67 50 H75 M32 32 L38 38 M62 62 L68 68 M32 68 L38 62 M62 38 L68 32" stroke="#a5f3fc" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="6" fill="#0f172a" />
          </g>
        );
      case 'journalist': // Nhà báo Điều tra Xã hội
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#4c0519" fillOpacity="0.3" stroke="#fb7185" strokeWidth="2.5" />
            <rect x="28" y="30" width="44" height="42" rx="3" fill="#be123c" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="2.5" />
            <circle cx="50" cy="51" r="10" fill="#1e293b" stroke="#fda4af" strokeWidth="2" />
            <rect x="36" y="22" width="16" height="8" rx="2" fill="#e11d48" />
            <circle cx="62" cy="38" r="3" fill="#fde047" />
          </g>
        );
      case 'digital': // Giám đốc Chuyển đổi số Quốc gia
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#082f49" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2.5" />
            <rect x="30" y="30" width="40" height="32" rx="4" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="50" y1="62" x2="50" y2="70" stroke="#7dd3fc" strokeWidth="3" />
            <line x1="38" y1="70" x2="62" y2="70" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
            <circle cx="42" cy="46" r="3" fill="#38bdf8" />
            <circle cx="58" cy="46" r="3" fill="#34d399" />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#334155" fillOpacity="0.3" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="50" cy="38" r="12" fill="#64748b" />
            <path d="M30 72 C30 58 40 54 50 54 C60 54 70 58 70 72 Z" fill="#475569" />
          </g>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Decorative Outer Halo */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-30"
        style={{ backgroundColor: color }}
      />
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg relative z-10"
      >
        {renderIcon()}
      </svg>
    </div>
  );
};
