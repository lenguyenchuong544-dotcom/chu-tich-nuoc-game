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
  color = '#FF7FB0',
  className = 'w-12 h-12',
}) => {
  const renderIcon = () => {
    switch (avatarKey) {
      case 'justice': // Bộ trưởng Tư pháp
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#CFE8FF" fillOpacity="0.45" stroke="#6FB4F2" strokeWidth="2.5" />
            <path d="M50 24 V72 M32 36 H68 M26 46 L38 46 M62 46 L74 46" stroke="#1A63A8" strokeWidth="3" strokeLinecap="round" />
            <path d="M26 46 C26 54 38 54 38 46 Z" fill="#6FB4F2" />
            <path d="M62 46 C62 54 74 54 74 46 Z" fill="#6FB4F2" />
            <circle cx="50" cy="24" r="4" fill="#FFD27A" />
          </g>
        );
      case 'economy': // Bộ trưởng Kinh tế
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#E8F8F2" stroke="#8EE3C8" strokeWidth="2.5" />
            <rect x="28" y="32" width="44" height="36" rx="6" fill="#8EE3C8" fillOpacity="0.5" stroke="#14634B" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="9" fill="#FFD27A" stroke="#7A4B00" strokeWidth="1.5" />
            <path d="M50 44 V56 M46 47 H54" stroke="#14634B" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      case 'security': // Bộ trưởng Nội vụ & An ninh
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFEBF0" stroke="#FF6B7F" strokeWidth="2.5" />
            <path d="M50 22 L70 32 V50 C70 64 50 76 50 76 C50 76 30 64 30 50 V32 Z" fill="#FF6B7F" fillOpacity="0.3" stroke="#9B1B32" strokeWidth="2.5" />
            <polygon points="50,34 53,42 62,42 55,47 57,56 50,51 43,56 45,47 38,42 47,42" fill="#FFD27A" stroke="#7A4B00" strokeWidth="1" />
          </g>
        );
      case 'advisor': // Cố vấn / Chủ nhiệm Văn phòng
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFF7E6" stroke="#FFD27A" strokeWidth="2.5" />
            <rect x="30" y="28" width="40" height="44" rx="4" fill="#FFFDFE" stroke="#7A4B00" strokeWidth="2" />
            <path d="M38 38 H62 M38 46 H62 M38 54 H54" stroke="#B33D6E" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="60" cy="60" r="7" fill="#FF7FB0" stroke="#FFF" strokeWidth="1.5" />
          </g>
        );
      case 'culture': // Bộ trưởng Văn hóa - Giáo dục
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFE3EE" stroke="#FF7FB0" strokeWidth="2.5" />
            <path d="M26 62 C34 50 48 50 50 64 C52 50 66 50 74 62" fill="none" stroke="#B33D6E" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 26 C44 36 34 44 50 56 C66 44 56 36 50 26 Z" fill="#FF7FB0" fillOpacity="0.6" stroke="#B33D6E" strokeWidth="2" />
            <circle cx="50" cy="38" r="4" fill="#FFD27A" />
          </g>
        );
      case 'inspector': // Tổng Thanh tra
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#F2F8FF" stroke="#6FB4F2" strokeWidth="2.5" />
            <circle cx="44" cy="44" r="16" fill="#FFFDFE" stroke="#1A63A8" strokeWidth="3" />
            <line x1="56" y1="56" x2="72" y2="72" stroke="#1A63A8" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M38 44 L42 48 L52 38" fill="none" stroke="#14634B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="50" cy="50" r="44" fill="#FFE3EE" stroke="#FF7FB0" strokeWidth="2.5" />
            <circle cx="50" cy="38" r="12" fill="#B33D6E" />
            <path d="M30 72 C30 58 40 54 50 54 C60 54 70 58 70 72 Z" fill="#FF7FB0" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center p-1 rounded-full bg-cotton border-2 border-blush-deep shadow-tactile ${className}`}
      title={`${role} – ${name}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
        {renderIcon()}
      </svg>
    </div>
  );
};
