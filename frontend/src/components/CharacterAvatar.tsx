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
  className = 'w-20 h-20',
}) => {
  // Soft, curated pastel palettes with crisp ink outlines and friendly dignitary illustrations
  const renderAvatarDetails = () => {
    switch (avatarKey) {
      case 'justice': // Bộ trưởng Tư pháp
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#EBF5FF" stroke="#93C5FD" strokeWidth="2.5" />
            {/* Scales of Justice */}
            <path d="M50 24 V72 M34 36 H66" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <path d="M26 48 L34 36 L42 48" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
            <path d="M58 48 L66 36 L74 48" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 48 C24 55 44 55 44 48 Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
            <path d="M56 48 C56 55 76 55 76 48 Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
            <circle cx="50" cy="24" r="3.5" fill="#FFB84D" />
          </g>
        );

      case 'economy': // Bộ trưởng Tài chính & Kinh tế
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#E6F9F2" stroke="#A7F3D0" strokeWidth="2.5" />
            {/* Treasury Vault & Growth Coin */}
            <rect x="28" y="34" width="44" height="34" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="50" cy="51" r="9" fill="#FFB84D" stroke="#D97706" strokeWidth="2" />
            <path d="M50 45 V57 M47 48 H53" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 30 L50 20 L66 30" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'security': // Bộ trưởng Nội vụ & An ninh
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFF0F2" stroke="#FECDD3" strokeWidth="2.5" />
            {/* Constitutional Shield with Star */}
            <path d="M50 20 L72 30 V50 C72 65 50 78 50 78 C50 78 28 65 28 50 V30 Z" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2.5" />
            <polygon points="50,33 53,42 63,42 55,48 58,58 50,52 42,58 45,48 37,42 47,42" fill="#FFB84D" stroke="#D97706" strokeWidth="1" />
          </g>
        );

      case 'advisor': // Chủ nhiệm Văn phòng Chủ tịch
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFF8EB" stroke="#FDE68A" strokeWidth="2.5" />
            {/* Government Dossier & Red Seal */}
            <path d="M32 26 H68 V72 H32 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" rx="4" />
            <path d="M40 36 H60 M40 44 H60 M40 52 H54" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="62" cy="62" r="7" fill="#F43F5E" stroke="#FECDD3" strokeWidth="1.5" />
          </g>
        );

      case 'culture': // Bộ trưởng Văn hóa - Giáo dục
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFF0F5" stroke="#FFBFD9" strokeWidth="2.5" />
            {/* Open Book & Lotus Petal */}
            <path d="M26 62 C34 50 48 50 50 64 C52 50 66 50 74 62" fill="none" stroke="#FF7FB0" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 26 C44 36 34 44 50 56 C66 44 56 36 50 26 Z" fill="#FFE0EC" stroke="#E85B93" strokeWidth="2" />
            <circle cx="50" cy="38" r="3.5" fill="#FFB84D" />
          </g>
        );

      case 'inspector': // Tổng Thanh tra Chính phủ
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="2.5" />
            {/* Magnifying Glass with Verification Mark */}
            <circle cx="44" cy="44" r="16" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3" />
            <line x1="56" y1="56" x2="72" y2="72" stroke="#7C3AED" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M38 44 L43 49 L52 39" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );

      case 'front': // Chủ tịch Mặt trận Tổ quốc
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="2.5" />
            {/* Solidarity Circle of People */}
            <circle cx="34" cy="40" r="6" fill="#14B8A6" />
            <circle cx="66" cy="40" r="6" fill="#14B8A6" />
            <circle cx="50" cy="34" r="7" fill="#0D9488" />
            <path d="M26 64 C26 55 38 52 50 52 C62 52 74 55 74 64" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
          </g>
        );

      case 'court': // Chánh án Tòa án nhân dân tối cao
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="2.5" />
            {/* Classical Courthouse Pillars */}
            <path d="M25 68 H75 M32 68 V45 M68 68 V45 M50 68 V45 M26 45 L50 25 L74 45 Z" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="50" cy="37" r="3.5" fill="#FFB84D" />
          </g>
        );

      case 'assembly': // Đại biểu Quốc hội
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="2.5" />
            {/* Parliamentary Podium & Emblem Star */}
            <path d="M32 68 C32 54 40 48 50 48 C60 48 68 54 68 68 Z" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2" />
            <circle cx="50" cy="36" r="9" fill="#F97316" stroke="#FED7AA" strokeWidth="2" />
            <polygon points="50,22 52,26 57,26 53,29 55,33 50,30 45,33 47,29 43,26 48,26" fill="#FFB84D" />
          </g>
        );

      case 'worker': // Đại diện Công nhân - Lao động
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#ECFEFF" stroke="#A5F3FC" strokeWidth="2.5" />
            {/* Gear & Industrial Labor Icon */}
            <circle cx="50" cy="50" r="14" fill="#CFFAFE" stroke="#0891B2" strokeWidth="3" />
            <path d="M50 26 V34 M50 66 V74 M26 50 H34 M66 50 H74 M33 33 L39 39 M61 61 L67 67 M33 67 L39 61 M61 39 L67 33" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="5" fill="#0891B2" />
          </g>
        );

      case 'journalist': // Nhà báo Điều tra Xã hội
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="2.5" />
            {/* Press Badge & Flash Camera */}
            <rect x="28" y="32" width="44" height="40" rx="4" fill="#FFE4E6" stroke="#E11D48" strokeWidth="2.5" />
            <circle cx="50" cy="52" r="9" fill="#FFFFFF" stroke="#BE123C" strokeWidth="2" />
            <rect x="36" y="24" width="16" height="8" rx="2" fill="#F43F5E" />
            <circle cx="62" cy="40" r="2.5" fill="#FFB84D" />
          </g>
        );

      case 'digital': // Giám đốc Chuyển đổi số Quốc gia
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="2.5" />
            {/* Digital Node Network */}
            <rect x="30" y="30" width="40" height="32" rx="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
            <line x1="50" y1="62" x2="50" y2="70" stroke="#38BDF8" strokeWidth="3" />
            <line x1="38" y1="70" x2="62" y2="70" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="42" cy="46" r="3" fill="#0284C7" />
            <circle cx="58" cy="46" r="3" fill="#10B981" />
          </g>
        );

      default:
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2.5" />
            <circle cx="50" cy="38" r="11" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
            <path d="M30 72 C30 58 40 54 50 54 C60 54 70 58 70 72 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label={`${role}: ${name}`}
    >
      {/* Soft Pastel Ambient Halo */}
      <div className="absolute inset-0 rounded-full bg-blush/60 blur-md scale-95" />
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-sm">
        {renderAvatarDetails()}
      </svg>
    </div>
  );
};
