// ============================================================================
// HỆ THỐNG DỮ LIỆU GAME: CHỦ TỊCH NƯỚC - VẬN MỆNH QUỐC GIA
// Môn học: Chủ nghĩa xã hội khoa học
// Chuyên đề: Nhà nước XHCN và Nhà nước pháp quyền XHCN ở Việt Nam
// ============================================================================

export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  personality: string;
  themeColor: string;
}

export type CardType = 'TUTORIAL' | 'GOVERNANCE' | 'KNOWLEDGE' | 'APPLIED' | 'CRISIS' | 'STORYLINE';

export interface CardChoice {
  text: string;
  effects: {
    politics: number;
    economy: number;
    people: number;
    law: number;
  };
  knowledgeDelta?: number;
  setFlags?: Record<string, any>;
  hint?: {
    politics?: 1 | -1 | 0;
    economy?: 1 | -1 | 0;
    people?: 1 | -1 | 0;
    law?: 1 | -1 | 0;
  };
}

export interface DecisionCard {
  id: number;
  characterId: string;
  characterName: string;
  characterRole: string;
  type: CardType;
  category: string;
  question: string;
  leftChoice: CardChoice;
  rightChoice: CardChoice;
  correctChoice?: 'left' | 'right';
  explanation?: string;
  isCrisis?: boolean;
  requiredFlag?: string;
  requiredTurnMin?: number;
}

export const CHARACTERS: Character[] = [
  {
    "id": "nguyen_van_an",
    "name": "Nguyễn Văn An",
    "role": "Bộ trưởng Bộ Tư pháp",
    "avatar": "justice",
    "personality": "Nghiêm cẩn, kiên định hiến định và thượng tôn pháp luật.",
    "themeColor": "#3b82f6"
  },
  {
    "id": "tran_thi_mai",
    "name": "Trần Thị Mai",
    "role": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "avatar": "economy",
    "personality": "Sắc sảo, thực tế, luôn cân nhắc hiệu quả ngân sách và tăng trưởng vĩ mô.",
    "themeColor": "#10b981"
  },
  {
    "id": "le_hoang_nam",
    "name": "Lê Hoàng Nam",
    "role": "Bộ trưởng Bộ Nội vụ & An ninh",
    "avatar": "security",
    "personality": "Kiên quyết giữ vững kỷ cương, trật tự xã hội và ổn định chính trị.",
    "themeColor": "#ef4444"
  },
  {
    "id": "pham_quoc_viet",
    "name": "Phạm Quốc Việt",
    "role": "Chủ nhiệm Văn phòng Chủ tịch",
    "avatar": "advisor",
    "personality": "Thận trọng, thấu đáo, điều phối nhịp nhàng giữa các cơ quan quyền lực.",
    "themeColor": "#f59e0b"
  },
  {
    "id": "vu_thi_lan",
    "name": "GS.TS Vũ Thị Lan",
    "role": "Bộ trưởng Bộ Văn hóa - Giáo dục",
    "avatar": "culture",
    "personality": "Tâm huyết gìn giữ bản sắc dân tộc, phát triển giá trị văn hóa tiến bộ.",
    "themeColor": "#ec4899"
  },
  {
    "id": "dang_minh_khoi",
    "name": "Đặng Minh Khôi",
    "role": "Tổng Thanh tra Chính phủ",
    "avatar": "inspector",
    "personality": "Liêm chính, không khoan nhượng trước tham nhũng, lãng phí và tiêu cực.",
    "themeColor": "#8b5cf6"
  },
  {
    "id": "hoang_dinh_trong",
    "name": "Hoàng Đình Trọng",
    "role": "Chủ tịch Ủy ban MTTQ Việt Nam",
    "avatar": "front",
    "personality": "Lắng nghe nhân dân, coi trọng giám sát xã hội và khối đại đoàn kết.",
    "themeColor": "#14b8a6"
  },
  {
    "id": "bui_van_thang",
    "name": "Bùi Văn Thắng",
    "role": "Chánh án Tòa án nhân dân tối cao",
    "avatar": "court",
    "personality": "Công minh, bảo vệ công lý, thượng tôn pháp luật và quyền con người.",
    "themeColor": "#6366f1"
  },
  {
    "id": "do_thi_nga",
    "name": "Đỗ Thị Nga",
    "role": "Đại biểu Quốc hội chuyên trách",
    "avatar": "assembly",
    "personality": "Thẳng thắn, phản ánh trung thực ý chí và nguyện vọng của cử tri cả nước.",
    "themeColor": "#f97316"
  },
  {
    "id": "nguyen_thi_tam",
    "name": "Nguyễn Thị Tâm",
    "role": "Đại diện Công nhân - Lao động",
    "avatar": "worker",
    "personality": "Chân chất, đại diện tiếng nói trực tiếp từ giai cấp công nhân và nhân dân.",
    "themeColor": "#06b6d4"
  },
  {
    "id": "tran_van_long",
    "name": "Trần Văn Long",
    "role": "Nhà báo Điều tra Xã hội",
    "avatar": "journalist",
    "personality": "Nhanh nhạy, coi trọng công khai minh bạch và phản biện công luận.",
    "themeColor": "#e11d48"
  },
  {
    "id": "le_tuan_anh",
    "name": "TS. Lê Tuấn Anh",
    "role": "Giám đốc Chuyển đổi số Quốc gia",
    "avatar": "digital",
    "personality": "Hiện đại, thúc đẩy công nghệ và dữ liệu phục vụ quản trị quốc gia minh bạch.",
    "themeColor": "#0284c7"
  }
];

export const DECISION_CARDS: DecisionCard[] = [
  {
    "id": 1,
    "characterId": "pham_quoc_viet",
    "characterName": "Phạm Quốc Việt",
    "characterRole": "Chủ nhiệm Văn phòng Chủ tịch",
    "type": "TUTORIAL",
    "category": "HUONG_DAN",
    "question": "Chào mừng đồng chí nhận trọng trách Chủ tịch nước! Hãy thử kéo thẻ sang TRÁI (Từ chối) hoặc sang PHẢI (Đồng ý) để đưa ra quyết định đầu tiên trong nhiệm kỳ.",
    "leftChoice": {
      "text": "← Kéo sang Trái",
      "effects": {
        "politics": 0,
        "economy": 0,
        "people": 0,
        "law": 0
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": 0,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Kéo sang Phải →",
      "effects": {
        "politics": 0,
        "economy": 0,
        "people": 0,
        "law": 0
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": 0,
        "law": 0
      }
    },
    "explanation": "Rất tốt! Bạn có thể vuốt trên màn hình cảm ứng, kéo chuột hoặc bấm phím mũi tên ← / →."
  },
  {
    "id": 2,
    "characterId": "pham_quoc_viet",
    "characterName": "Phạm Quốc Việt",
    "characterRole": "Chủ nhiệm Văn phòng Chủ tịch",
    "type": "TUTORIAL",
    "category": "HUONG_DAN",
    "question": "Quan sát 4 chỉ số phía trên: 🏛 Chính trị, 💰 Kinh tế, 👥 Nhân dân, ⚖️ Pháp quyền (bắt đầu ở mức 50). Nếu BẤT KỲ chỉ số nào giảm về 0, bạn sẽ bị Game Over ngay lập tức!",
    "leftChoice": {
      "text": "Tôi đã hiểu quy luật",
      "effects": {
        "politics": 2,
        "economy": 2,
        "people": 2,
        "law": 2
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "rightChoice": {
      "text": "Tôi sẽ giữ cân bằng tốt",
      "effects": {
        "politics": 2,
        "economy": 2,
        "people": 2,
        "law": 2
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Mỗi quyết định đều có đánh đổi (trade-off). Khi nghiêng thẻ, các ký hiệu ▲/▼ sẽ báo trước chỉ số nào có thể thay đổi."
  },
  {
    "id": 3,
    "characterId": "pham_quoc_viet",
    "characterName": "Phạm Quốc Việt",
    "characterRole": "Chủ nhiệm Văn phòng Chủ tịch",
    "type": "TUTORIAL",
    "category": "HUONG_DAN",
    "question": "Trong nhiệm kỳ, bạn sẽ gặp các câu hỏi Lý luận (cộng điểm Kiến thức), Khủng hoảng khẩn cấp và Quyết định dài hạn kích hoạt sự kiện sau này. Hãy chuẩn bị bắt đầu!",
    "leftChoice": {
      "text": "Sẵn sàng nhận nhiệm vụ",
      "effects": {
        "politics": 3,
        "economy": 1,
        "people": 3,
        "law": 1
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Bắt đầu điều hành đất nước",
      "effects": {
        "politics": 1,
        "economy": 3,
        "people": 1,
        "law": 3
      },
      "hint": {
        "politics": 0,
        "economy": 1,
        "people": 0,
        "law": 1
      }
    },
    "explanation": "Nhiệm kỳ chính thức bắt đầu. Hãy chèo lái con thuyền đất nước vững vàng!"
  },
  {
    "id": 4,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "GOVERNANCE",
    "category": "KINH_TE",
    "question": "Bộ đề xuất triển khai gói ngân sách lớn mở rộng tuyến giao thông huyết mạch kết nối các khu công nghiệp nghèo phía Bắc, nhưng sẽ làm tăng thâm hụt ngân sách ngắn hạn.",
    "leftChoice": {
      "text": "Tạm hoãn để giữ ngân sách an toàn",
      "effects": {
        "politics": -2,
        "economy": 5,
        "people": -6,
        "law": 0
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Phê duyệt triển khai dự án",
      "effects": {
        "politics": 3,
        "economy": -7,
        "people": 8,
        "law": 2
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Đầu tư công cho cơ sở hạ tầng ở vùng khó khăn thể hiện bản chất ưu việt vì dân của Nhà nước XHCN, song cần quản lý thâm hụt ngân sách thận trọng."
  },
  {
    "id": 5,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "GOVERNANCE",
    "category": "PHAP_QUYEN",
    "question": "Một số địa phương muốn áp dụng cơ chế đặc thù vượt ra ngoài quy định hiện hành của luật để giải phóng mặt bằng nhanh hơn.",
    "leftChoice": {
      "text": "Cho phép địa phương linh hoạt",
      "effects": {
        "politics": -4,
        "economy": 7,
        "people": -8,
        "law": -12
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Yêu cầu tuyệt đối tuân thủ pháp luật",
      "effects": {
        "politics": 4,
        "economy": -4,
        "people": 6,
        "law": 12
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Trong Nhà nước pháp quyền XHCN, Hiến pháp và pháp luật giữ vị trí tối thượng. Không thể vì mục tiêu kinh tế trước mắt mà phá vỡ trật tự pháp luật."
  },
  {
    "id": 6,
    "characterId": "dang_minh_khoi",
    "characterName": "Đặng Minh Khôi",
    "characterRole": "Tổng Thanh tra Chính phủ",
    "type": "GOVERNANCE",
    "category": "THAM_NHUNG",
    "question": "Thanh tra đề xuất mở cuộc thanh tra toàn diện các dự án trọng điểm quốc gia. Việc này có thể làm chậm tiến độ thi công một số công trình 3-6 tháng.",
    "leftChoice": {
      "text": "Ưu tiên tiến độ công trình",
      "effects": {
        "politics": -5,
        "economy": 6,
        "people": -6,
        "law": -8
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Thanh tra toàn diện, không ngoại lệ",
      "effects": {
        "politics": 6,
        "economy": -5,
        "people": 8,
        "law": 10
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Phòng chống tham nhũng, lãng phí là nhiệm vụ sống còn để củng cố niềm tin nhân dân và bảo vệ sự nghiêm minh của pháp luật."
  },
  {
    "id": 7,
    "characterId": "hoang_dinh_trong",
    "characterName": "Hoàng Đình Trọng",
    "characterRole": "Chủ tịch Ủy ban MTTQ Việt Nam",
    "type": "GOVERNANCE",
    "category": "DAN_CHU",
    "question": "Mặt trận Tổ quốc đề xuất tổ chức các hội nghị phản biện xã hội công khai về bảng giá đất mới tại tất cả 63 tỉnh thành trước khi ban hành.",
    "leftChoice": {
      "text": "Chỉ lấy ý kiến chuyên gia để tiết kiệm",
      "effects": {
        "politics": -2,
        "economy": 4,
        "people": -7,
        "law": -3
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Tổ chức phản biện rộng rãi toàn dân",
      "effects": {
        "politics": 3,
        "economy": -4,
        "people": 9,
        "law": 5
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Phát huy quyền làm chủ của nhân dân và vai trò phản biện xã hội của Mặt trận là biểu hiện sinh động của nền dân chủ XHCN."
  },
  {
    "id": 8,
    "characterId": "le_hoang_nam",
    "characterName": "Lê Hoàng Nam",
    "characterRole": "Bộ trưởng Bộ Nội vụ & An ninh",
    "type": "GOVERNANCE",
    "category": "CAN_BO",
    "question": "Đề xuất cắt giảm 10% biên chế trung gian không hiệu quả trong các cơ quan hành chính để tinh gọn bộ máy và tăng lương cho cán bộ trực tiếp.",
    "leftChoice": {
      "text": "Giữ nguyên bộ máy để tránh xáo trộn",
      "effects": {
        "politics": -4,
        "economy": -6,
        "people": -4,
        "law": -2
      },
      "hint": {
        "politics": -1,
        "economy": -1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Quyết liệt tinh giản và nâng cao chất lượng",
      "effects": {
        "politics": 5,
        "economy": 6,
        "people": 6,
        "law": 4
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Cải cách, tinh gọn bộ máy nhà nước, nâng cao hiệu lực, hiệu quả quản lý là yêu cầu cấp thiết của xây dựng Nhà nước pháp quyền XHCN."
  },
  {
    "id": 9,
    "characterId": "nguyen_thi_tam",
    "characterName": "Nguyễn Thị Tâm",
    "characterRole": "Đại diện Công nhân - Lao động",
    "type": "GOVERNANCE",
    "category": "VAN_HOA_XA_HOI",
    "question": "Công nhân tại các khu công nghiệp kiến nghị tăng mức lương tối thiểu vùng thêm 7% và bổ sung quỹ xây nhà ở xã hội do chi phí sinh hoạt leo thang.",
    "leftChoice": {
      "text": "Giữ nguyên để giảm áp lực cho doanh nghiệp",
      "effects": {
        "politics": -5,
        "economy": 6,
        "people": -10,
        "law": -1
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Tăng lương tối thiểu và phát triển nhà ở",
      "effects": {
        "politics": 4,
        "economy": -6,
        "people": 11,
        "law": 2
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Giai cấp công nhân là lực lượng lãnh đạo và nền tảng của Nhà nước XHCN. Bảo đảm đời sống cho người lao động là mục tiêu bản chất của chế độ."
  },
  {
    "id": 10,
    "characterId": "le_tuan_anh",
    "characterName": "TS. Lê Tuấn Anh",
    "characterRole": "Giám đốc Chuyển đổi số Quốc gia",
    "type": "GOVERNANCE",
    "category": "DICH_VU_CONG",
    "question": "Bộ đề xuất tích hợp 100% thủ tục đất đai và hộ tịch lên cổng dịch vụ công trực tuyến toàn trình, buộc các cơ quan phải chấm dứt tình trạng tiếp nhận giấy tờ thủ công.",
    "leftChoice": {
      "text": "Để các địa phương tự làm theo khả năng",
      "effects": {
        "politics": -2,
        "economy": -2,
        "people": -4,
        "law": -3
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Bắt buộc chuyển đổi số toàn diện",
      "effects": {
        "politics": 4,
        "economy": 5,
        "people": 7,
        "law": 6
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Chính phủ số giúp công khai minh bạch quy trình, giảm phiền hà, xóa bỏ tình trạng nhũng nhiễu, hiện thực hóa mục tiêu nhà nước phục vụ nhân dân."
  },
  {
    "id": 11,
    "characterId": "bui_van_thang",
    "characterName": "Bùi Văn Thắng",
    "characterRole": "Chánh án Tòa án nhân dân tối cao",
    "type": "GOVERNANCE",
    "category": "PHAP_QUYEN",
    "question": "Để nâng cao chất lượng xét xử, Tòa án đề xuất mở rộng quyền tranh tụng dân chủ tại phiên tòa và áp dụng nghiêm ngặt nguyên tắc suy đoán vô tội.",
    "leftChoice": {
      "text": "Giữ quy trình thẩm vấn truyền thống",
      "effects": {
        "politics": 2,
        "economy": 0,
        "people": -4,
        "law": -7
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Đổi mới mạnh mẽ tranh tụng tại tòa án",
      "effects": {
        "politics": 3,
        "economy": 1,
        "people": 7,
        "law": 11
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nguyên tắc suy đoán vô tội và tranh tụng bình đẳng tại phiên tòa là giá trị tiến bộ của Nhà nước pháp quyền nhằm bảo vệ công lý và quyền con người."
  },
  {
    "id": 12,
    "characterId": "tran_van_long",
    "characterName": "Trần Văn Long",
    "characterRole": "Nhà báo Điều tra Xã hội",
    "type": "GOVERNANCE",
    "category": "QUAN_LY_NHA_NUOC",
    "question": "Báo chí phát hiện một dự án khai thác khoáng sản quy mô lớn gây ô nhiễm nguồn nước ngầm của hàng vạn hộ dân, nhưng chủ đầu tư là doanh nghiệp đóng thuế lớn nhất tỉnh.",
    "leftChoice": {
      "text": "Nhắc nhở kín để duy trì sản xuất kinh tế",
      "effects": {
        "politics": -6,
        "economy": 5,
        "people": -11,
        "law": -9
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Đình chỉ dự án để khắc phục môi trường",
      "effects": {
        "politics": 4,
        "economy": -7,
        "people": 10,
        "law": 9
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nhà nước XHCN không đánh đổi môi trường và sức khỏe của nhân dân lấy tăng trưởng kinh tế đơn thuần; con người luôn là trung tâm của sự phát triển."
  },
  {
    "id": 13,
    "characterId": "do_thi_nga",
    "characterName": "Đỗ Thị Nga",
    "characterRole": "Đại biểu Quốc hội chuyên trách",
    "type": "GOVERNANCE",
    "category": "DAN_CHU",
    "question": "Nhiều đại biểu Quốc hội đề nghị chất vấn trực tiếp và phát sóng truyền hình trực tiếp các phiên giải trình của thành viên Chính phủ về chống lãng phí.",
    "leftChoice": {
      "text": "Họp kín nội bộ để giữ ổn định hình ảnh",
      "effects": {
        "politics": 2,
        "economy": 0,
        "people": -8,
        "law": -6
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Phát sóng công khai toàn bộ phiên chất vấn",
      "effects": {
        "politics": 4,
        "economy": -1,
        "people": 9,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Hoạt động giám sát tối cao của Quốc hội được công khai giúp nhân dân theo dõi, đánh giá trách nhiệm của cơ quan nhà nước, bảo đảm tính dân chủ."
  },
  {
    "id": 14,
    "characterId": "vu_thi_lan",
    "characterName": "GS.TS Vũ Thị Lan",
    "characterRole": "Bộ trưởng Bộ Văn hóa - Giáo dục",
    "type": "GOVERNANCE",
    "category": "VAN_HOA_XA_HOI",
    "question": "Bộ đề xuất miễn toàn bộ học phí bậc mầm non và phổ thông công lập tại các địa bàn khó khăn, đồng thời hỗ trợ bữa ăn trưa dinh dưỡng cho trẻ em vùng cao.",
    "leftChoice": {
      "text": "Chưa ưu tiên vì áp lực cân đối ngân sách",
      "effects": {
        "politics": -3,
        "economy": 4,
        "people": -9,
        "law": -2
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Phê duyệt chính sách an sinh giáo dục",
      "effects": {
        "politics": 5,
        "economy": -6,
        "people": 12,
        "law": 3
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Đầu tư cho giáo dục và trẻ em vùng khó khăn là biểu hiện bản chất nhân văn sâu sắc, bảo đảm công bằng xã hội trong tiếp cận phúc lợi công cộng."
  },
  {
    "id": 15,
    "characterId": "dang_minh_khoi",
    "characterName": "Đặng Minh Khôi",
    "characterRole": "Tổng Thanh tra Chính phủ",
    "type": "GOVERNANCE",
    "category": "THAM_NHUNG",
    "question": "Thanh tra đề xuất cơ chế bắt buộc xác minh ngẫu nhiên biến động tài sản, thu nhập của 20% cán bộ lãnh đạo diện quản lý mỗi năm thông qua liên thông ngân hàng.",
    "leftChoice": {
      "text": "Chỉ xác minh khi có đơn tố cáo chính thức",
      "effects": {
        "politics": -2,
        "economy": 1,
        "people": -6,
        "law": -7
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Ban hành quy định xác minh chủ động",
      "effects": {
        "politics": 5,
        "economy": -2,
        "people": 9,
        "law": 11
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Kiểm soát tài sản, thu nhập của người có chức vụ, quyền hạn là biện pháp then chốt để phòng ngừa tham nhũng và giữ gìn sự trong sạch của bộ máy."
  },
  {
    "id": 16,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "GOVERNANCE",
    "category": "KINH_TE",
    "question": "Có ý kiến đề nghị tư nhân hóa một tập đoàn nhà nước chủ chốt trong lĩnh vực truyền tải điện để huy động vốn tư nhân ngắn hạn.",
    "leftChoice": {
      "text": "Bán toàn bộ cổ phần để thu tiền ngân sách",
      "effects": {
        "politics": -8,
        "economy": 8,
        "people": -9,
        "law": -4
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Nhà nước giữ quyền chi phối lĩnh vực then chốt",
      "effects": {
        "politics": 6,
        "economy": -3,
        "people": 7,
        "law": 4
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Trong kinh tế thị trường định hướng XHCN, kinh tế nhà nước giữ vai trò chủ đạo, nắm giữ các huyết mạch kinh tế để bảo đảm an ninh năng lượng quốc gia."
  },
  {
    "id": 17,
    "characterId": "le_hoang_nam",
    "characterName": "Lê Hoàng Nam",
    "characterRole": "Bộ trưởng Bộ Nội vụ & An ninh",
    "type": "GOVERNANCE",
    "category": "CAN_BO",
    "question": "Bộ đề xuất cơ chế bảo vệ cán bộ năng động, sáng tạo, dám nghĩ dám làm vì lợi ích chung khi xảy ra rủi ro không vụ lợi trong thí điểm mô hình mới.",
    "leftChoice": {
      "text": "Cứ sai là kỷ luật nghiêm ngặt",
      "effects": {
        "politics": -4,
        "economy": -5,
        "people": -2,
        "law": 3
      },
      "hint": {
        "politics": -1,
        "economy": -1,
        "people": 0,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Xây dựng khung pháp lý bảo vệ cán bộ đổi mới",
      "effects": {
        "politics": 5,
        "economy": 6,
        "people": 5,
        "law": 4
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Khuyến khích và bảo vệ cán bộ dám nghĩ dám làm vì lợi ích chung giúp khắc phục tâm lý sợ sai, đùn đẩy trách nhiệm, khơi thông nguồn lực phát triển."
  },
  {
    "id": 18,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "GOVERNANCE",
    "category": "PHAP_QUYEN",
    "question": "Phát hiện một văn bản thông tư của cơ quan cấp dưới có nội dung hạn chế quyền tự do kinh doanh của công dân trái với quy định của Luật Doanh nghiệp.",
    "leftChoice": {
      "text": "Cho phép duy trì thêm 1 năm để ổn định thị trường",
      "effects": {
        "politics": -3,
        "economy": 2,
        "people": -6,
        "law": -11
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Đình chỉ và bãi bỏ ngay văn bản trái luật",
      "effects": {
        "politics": 4,
        "economy": -2,
        "people": 7,
        "law": 12
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Mọi văn bản dưới luật không được trái Hiến pháp và luật. Kiểm tra, xử lý văn bản trái pháp luật là yêu cầu bảo đảm tính tối thượng của luật."
  },
  {
    "id": 19,
    "characterId": "hoang_dinh_trong",
    "characterName": "Hoàng Đình Trọng",
    "characterRole": "Chủ tịch Ủy ban MTTQ Việt Nam",
    "type": "GOVERNANCE",
    "category": "DAN_CHU",
    "question": "Tại một địa phương xảy ra khiếu nại tập trung về phương án đền bù đất. Chủ tịch tỉnh muốn điều lực lượng cưỡng chế ngay.",
    "leftChoice": {
      "text": "Đồng ý cưỡng chế để răn đe",
      "effects": {
        "politics": -8,
        "economy": 3,
        "people": -14,
        "law": -6
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Yêu cầu đối thoại công khai, rà soát lại phương án",
      "effects": {
        "politics": 5,
        "economy": -3,
        "people": 10,
        "law": 7
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Phương châm 'Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng'. Giải quyết tranh chấp cần kiên trì đối thoại, lắng nghe lòng dân."
  },
  {
    "id": 20,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "GOVERNANCE",
    "category": "KINH_TE",
    "question": "Hiệp hội các doanh nghiệp bán lẻ đề xuất tăng giá bán lẻ điện và nước sạch theo cơ chế thị trường tự do hoàn toàn, không cần sự điều tiết của Nhà nước.",
    "leftChoice": {
      "text": "Thả nổi giá hoàn toàn theo thị trường",
      "effects": {
        "politics": -6,
        "economy": 7,
        "people": -12,
        "law": -2
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Nhà nước giữ vai trò điều tiết mặt hàng thiết yếu",
      "effects": {
        "politics": 5,
        "economy": -4,
        "people": 9,
        "law": 3
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Nhà nước XHCN quản lý kinh tế thị trường bằng pháp luật, chính sách để định hướng xã hội chủ nghĩa, kiềm chế độc quyền và bảo vệ an sinh cho nhân dân."
  },
  {
    "id": 21,
    "characterId": "pham_quoc_viet",
    "characterName": "Phạm Quốc Việt",
    "characterRole": "Chủ nhiệm Văn phòng Chủ tịch",
    "type": "GOVERNANCE",
    "category": "QUAN_LY_NHA_NUOC",
    "question": "Đề xuất thành lập Trung tâm Giám sát Điều hành Thông minh (IOC) kết nối dữ liệu liên ngành để theo dõi tiến độ xử lý công vụ và sự hài lòng của nhân dân theo thời gian thực.",
    "leftChoice": {
      "text": "Chưa cần thiết, tốn chi phí hạ tầng",
      "effects": {
        "politics": -2,
        "economy": 2,
        "people": -3,
        "law": -2
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": 0,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Phê duyệt xây dựng hệ thống giám sát số",
      "effects": {
        "politics": 4,
        "economy": -3,
        "people": 7,
        "law": 6
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Ứng dụng công nghệ nâng cao hiệu quả quản lý nhà nước, biến thông tin thành công cụ giám sát quyền lực và đo lường sự phục vụ của bộ máy."
  },
  {
    "id": 22,
    "characterId": "vu_thi_lan",
    "characterName": "GS.TS Vũ Thị Lan",
    "characterRole": "Bộ trưởng Bộ Văn hóa - Giáo dục",
    "type": "GOVERNANCE",
    "category": "VAN_HOA_XA_HOI",
    "question": "Một số tập đoàn bất động sản xin phá dỡ một di tích lịch sử - cách mạng lâu năm để xây dựng tổ hợp trung tâm thương mại cao cấp.",
    "leftChoice": {
      "text": "Cho phép chuyển đổi để thu hút đầu tư lớn",
      "effects": {
        "politics": -6,
        "economy": 8,
        "people": -10,
        "law": -5
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Kiên quyết bảo tồn di sản văn hóa dân tộc",
      "effects": {
        "politics": 6,
        "economy": -4,
        "people": 9,
        "law": 5
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Văn hóa là nền tảng tinh thần của xã hội, vừa là mục tiêu, vừa là sức mạnh nội sinh. Bảo tồn bản sắc và truyền thống cách mạng là cội nguồn sức mạnh dân tộc."
  },
  {
    "id": 23,
    "characterId": "do_thi_nga",
    "characterName": "Đỗ Thị Nga",
    "characterRole": "Đại biểu Quốc hội chuyên trách",
    "type": "GOVERNANCE",
    "category": "PHAP_QUYEN",
    "question": "Đại biểu đề xuất ban hành Luật Tiếp cận Thông tin sửa đổi, quy định rõ mọi quyết định thu chi ngân sách cấp huyện, xã phải được niêm yết công khai cho người dân tiếp cận.",
    "leftChoice": {
      "text": "Hạn chế phạm vi công khai để tránh khiếu kiện",
      "effects": {
        "politics": -3,
        "economy": 0,
        "people": -7,
        "law": -8
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Mở rộng tối đa quyền tiếp cận thông tin",
      "effects": {
        "politics": 4,
        "economy": 1,
        "people": 10,
        "law": 9
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Quyền tiếp cận thông tin là quyền cơ bản của công dân. Công khai, minh bạch là liều thuốc hữu hiệu nhất phòng chống tham nhũng, lãng phí."
  },
  {
    "id": 24,
    "characterId": "bui_van_thang",
    "characterName": "Bùi Văn Thắng",
    "characterRole": "Chánh án Tòa án nhân dân tối cao",
    "type": "GOVERNANCE",
    "category": "PHAP_QUYEN",
    "question": "Đề xuất mở rộng mô hình Hội thẩm nhân dân tham gia xét xử và bảo đảm thực quyền của Hội thẩm độc lập và ngang quyền với Thẩm phán.",
    "leftChoice": {
      "text": "Thu hẹp để Thẩm phán chuyên nghiệp quyết định",
      "effects": {
        "politics": 1,
        "economy": 0,
        "people": -5,
        "law": -3
      },
      "hint": {
        "politics": 0,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Nâng cao năng lực và phát huy vai trò Hội thẩm",
      "effects": {
        "politics": 3,
        "economy": -1,
        "people": 7,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Chế định Hội thẩm nhân dân thể hiện sâu sắc tính nhân dân của nền tư pháp XHCN, đưa tiếng nói và sự giám sát của nhân dân vào hoạt động xét xử."
  },
  {
    "id": 25,
    "characterId": "nguyen_thi_tam",
    "characterName": "Nguyễn Thị Tâm",
    "characterRole": "Đại diện Công nhân - Lao động",
    "type": "GOVERNANCE",
    "category": "VAN_HOA_XA_HOI",
    "question": "Công đoàn đề xuất siết chặt quy định an toàn vệ sinh lao động và tăng gấp đôi mức phạt đối với doanh nghiệp trốn đóng bảo hiểm xã hội cho công nhân.",
    "leftChoice": {
      "text": "Giữ mức phạt nhẹ để thu hút đầu tư nước ngoài",
      "effects": {
        "politics": -5,
        "economy": 5,
        "people": -10,
        "law": -6
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Tăng cường chế tài bảo vệ quyền lợi người lao động",
      "effects": {
        "politics": 4,
        "economy": -4,
        "people": 11,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nhà nước XHCN mang bản chất giai cấp công nhân. Bảo đảm an toàn lao động và bảo hiểm xã hội là trách nhiệm hiến định của Nhà nước."
  },
  {
    "id": 26,
    "characterId": "le_tuan_anh",
    "characterName": "TS. Lê Tuấn Anh",
    "characterRole": "Giám đốc Chuyển đổi số Quốc gia",
    "type": "GOVERNANCE",
    "category": "DICH_VU_CONG",
    "question": "Xây dựng nền tảng kết nối chia sẻ dữ liệu quốc gia (NDXP) giúp người dân làm thủ tục hành chính không phải nộp lại các giấy tờ Nhà nước đã quản lý.",
    "leftChoice": {
      "text": "Chậm triển khai vì các bộ ngành muốn giữ dữ liệu",
      "effects": {
        "politics": -4,
        "economy": -3,
        "people": -6,
        "law": -4
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Bắt buộc mở dữ liệu và chia sẻ liên thông",
      "effects": {
        "politics": 5,
        "economy": 5,
        "people": 8,
        "law": 6
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Xóa bỏ cát cứ thông tin, xây dựng chính phủ số phục vụ người dân nhanh chóng, tiết kiệm chi phí xã hội là bước tiến hiện đại hóa Nhà nước."
  },
  {
    "id": 27,
    "characterId": "tran_van_long",
    "characterName": "Trần Văn Long",
    "characterRole": "Nhà báo Điều tra Xã hội",
    "type": "GOVERNANCE",
    "category": "DAN_CHU",
    "question": "Báo chí phản ánh hiện tượng 'chạy' quy hoạch tại một số địa phương, đề xuất yêu cầu công khai toàn bộ bản đồ quy hoạch lên mạng để toàn dân giám sát.",
    "leftChoice": {
      "text": "Chỉ công bố tóm tắt để tránh đầu cơ bất động sản",
      "effects": {
        "politics": -4,
        "economy": 3,
        "people": -8,
        "law": -7
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Bắt buộc công khai bản đồ số quy hoạch chi tiết",
      "effects": {
        "politics": 4,
        "economy": -2,
        "people": 9,
        "law": 10
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Minh bạch thông tin quy hoạch bảo vệ quyền tiếp cận thông tin của người dân và cắt đứt mối quan hệ lợi ích nhóm trục lợi từ quy hoạch mập mờ."
  },
  {
    "id": 28,
    "characterId": "dang_minh_khoi",
    "characterName": "Đặng Minh Khôi",
    "characterRole": "Tổng Thanh tra Chính phủ",
    "type": "GOVERNANCE",
    "category": "THAM_NHUNG",
    "question": "Phát hiện một số dự án mua sắm tài sản công có dấu hiệu nâng khống giá trị nhưng người chỉ đạo lại là người thân của cán bộ cấp cao.",
    "leftChoice": {
      "text": "Xử lý nội bộ êm thấm để giữ uy tín",
      "effects": {
        "politics": -7,
        "economy": -2,
        "people": -12,
        "law": -14
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Chuyển cơ quan điều tra, không có vùng cấm",
      "effects": {
        "politics": 7,
        "economy": -3,
        "people": 12,
        "law": 14
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nguyên tắc 'Mọi công dân đều bình đẳng trước pháp luật'. Xử lý vi phạm không có vùng cấm, không có ngoại lệ là thước đo của Nhà nước pháp quyền chân chính."
  },
  {
    "id": 29,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "GOVERNANCE",
    "category": "KINH_TE",
    "question": "Đề xuất thành lập Quỹ Phát triển Khoa học & Công nghệ Quốc gia dành 2% GDP tài trợ cho các nghiên cứu làm chủ công nghệ cao và chip bán dẫn.",
    "leftChoice": {
      "text": "Tập trung vốn cho vay thương mại ngắn hạn",
      "effects": {
        "politics": -1,
        "economy": 4,
        "people": -2,
        "law": 0
      },
      "hint": {
        "politics": 0,
        "economy": 1,
        "people": 0,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Thành lập Quỹ và bảo đảm ngân sách khoa học",
      "effects": {
        "politics": 4,
        "economy": -5,
        "people": 6,
        "law": 3
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Khoa học công nghệ là quốc sách hàng đầu. Nhà nước đóng vai trò kiến tạo, đầu tư mạo hiểm cho tương lai để đất nước tự chủ công nghệ."
  },
  {
    "id": 30,
    "characterId": "le_hoang_nam",
    "characterName": "Lê Hoàng Nam",
    "characterRole": "Bộ trưởng Bộ Nội vụ & An ninh",
    "type": "GOVERNANCE",
    "category": "CAN_BO",
    "question": "Thực hiện quy định luân chuyển bí thư cấp ủy và chủ tịch ủy ban nhân dân cấp tỉnh không phải là người địa phương để phòng ngừa cục bộ dòng họ.",
    "leftChoice": {
      "text": "Để địa phương tự giới thiệu cán bộ tại chỗ",
      "effects": {
        "politics": -5,
        "economy": 2,
        "people": -5,
        "law": -6
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Thực hiện nghiêm quy định luân chuyển",
      "effects": {
        "politics": 6,
        "economy": -1,
        "people": 7,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Luân chuyển cán bộ lãnh đạo chủ chốt là giải pháp quan trọng xây dựng đội ngũ cán bộ liêm chính, khách quan, phòng chống lợi ích cục bộ địa phương."
  },
  {
    "id": 31,
    "characterId": "pham_quoc_viet",
    "characterName": "Phạm Quốc Việt",
    "characterRole": "Chủ nhiệm Văn phòng Chủ tịch",
    "type": "GOVERNANCE",
    "category": "QUAN_LY_NHA_NUOC",
    "question": "Bộ đề xuất cắt giảm 30% số lượng các cuộc họp hành chính định kỳ và chuyển sang xử lý công việc hoàn toàn trên môi trường số không giấy tờ.",
    "leftChoice": {
      "text": "Giữ nếp họp truyền thống để an tâm",
      "effects": {
        "politics": -2,
        "economy": -3,
        "people": -2,
        "law": 0
      },
      "hint": {
        "politics": 0,
        "economy": -1,
        "people": 0,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Quyết liệt chuyển sang họp số và giảm họp",
      "effects": {
        "politics": 3,
        "economy": 4,
        "people": 5,
        "law": 3
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Cải cách lề lối làm việc, chống căn bệnh hội họp hình thức, tiết kiệm thời gian và ngân sách nhà nước phục vụ nhân dân."
  },
  {
    "id": 32,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "KNOWLEDGE",
    "category": "CHINH_TRI",
    "question": "Thưa Chủ tịch, một giảng viên lý luận xin ý kiến: Nhà nước Xã hội Chủ nghĩa về mặt chính trị mang bản chất của giai cấp nào?",
    "leftChoice": {
      "text": "Toàn thể các tầng lớp tư sản",
      "effects": {
        "politics": -8,
        "economy": 0,
        "people": -6,
        "law": -4
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Giai cấp công nhân",
      "effects": {
        "politics": 6,
        "economy": 0,
        "people": 6,
        "law": 4
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "correctChoice": "right",
    "explanation": "Chính xác! Nhà nước XHCN mang bản chất giai cấp công nhân, đại diện cho lợi ích của giai cấp công nhân và nhân dân lao động."
  },
  {
    "id": 33,
    "characterId": "hoang_dinh_trong",
    "characterName": "Hoàng Đình Trọng",
    "characterRole": "Chủ tịch Ủy ban MTTQ Việt Nam",
    "type": "KNOWLEDGE",
    "category": "CHINH_TRI",
    "question": "Đồng chí Chủ tịch, bên cạnh bản chất giai cấp công nhân, Nhà nước XHCN còn mang hai đặc tính cốt lõi nào sau đây?",
    "leftChoice": {
      "text": "Tính nhân dân rộng rãi và tính dân tộc sâu sắc",
      "effects": {
        "politics": 6,
        "economy": 0,
        "people": 7,
        "law": 3
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Tính biệt lập quốc tế và tính ưu tiên tư sản",
      "effects": {
        "politics": -7,
        "economy": 0,
        "people": -7,
        "law": -3
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "correctChoice": "left",
    "explanation": "Chính xác! Nhà nước XHCN thống nhất giữa bản chất giai cấp công nhân với tính nhân dân rộng rãi và tính dân tộc sâu sắc."
  },
  {
    "id": 34,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "KNOWLEDGE",
    "category": "KINH_TE",
    "question": "Cơ sở kinh tế của Nhà nước Xã hội Chủ nghĩa được thiết lập dựa trên chế độ sở hữu nào đối với các tư liệu sản xuất chủ yếu?",
    "leftChoice": {
      "text": "Chế độ tư hữu tư bản chủ nghĩa",
      "effects": {
        "politics": -6,
        "economy": -4,
        "people": -5,
        "law": -2
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": -1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Chế độ công hữu (sở hữu xã hội)",
      "effects": {
        "politics": 5,
        "economy": 3,
        "people": 6,
        "law": 3
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 0
      }
    },
    "correctChoice": "right",
    "explanation": "Chính xác! Cơ sở kinh tế của Nhà nước XHCN là chế độ sở hữu xã hội (công hữu) về tư liệu sản xuất chủ yếu, từng bước xóa bỏ áp bức bóc lột."
  },
  {
    "id": 35,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "KNOWLEDGE",
    "category": "PHAP_QUYEN",
    "question": "Trong Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam, yếu tố nào giữ vị trí tối thượng trong điều chỉnh các quan hệ xã hội?",
    "leftChoice": {
      "text": "Hiến pháp và Pháp luật",
      "effects": {
        "politics": 5,
        "economy": 0,
        "people": 5,
        "law": 10
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "rightChoice": {
      "text": "Chỉ thị hành chính bất thành văn",
      "effects": {
        "politics": -5,
        "economy": 0,
        "people": -5,
        "law": -10
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "correctChoice": "left",
    "explanation": "Chính xác! Nhà nước pháp quyền XHCN được tổ chức và hoạt động trên cơ sở Hiến pháp và pháp luật; Hiến pháp và pháp luật giữ vị trí tối thượng."
  },
  {
    "id": 36,
    "characterId": "bui_van_thang",
    "characterName": "Bùi Văn Thắng",
    "characterRole": "Chánh án Tòa án nhân dân tối cao",
    "type": "KNOWLEDGE",
    "category": "PHAP_QUYEN",
    "question": "Về nguyên tắc tổ chức quyền lực nhà nước ở Việt Nam, khẳng định nào sau đây là chuẩn xác nhất theo Hiến pháp?",
    "leftChoice": {
      "text": "Tam quyền phân lập hoàn toàn độc lập",
      "effects": {
        "politics": -6,
        "economy": 0,
        "people": -4,
        "law": -7
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": 0,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Quyền lực thống nhất, có phân công, phối hợp, kiểm soát",
      "effects": {
        "politics": 6,
        "economy": 0,
        "people": 5,
        "law": 9
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "correctChoice": "right",
    "explanation": "Chính xác! Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan trong việc thực hiện các quyền lập pháp, hành pháp, tư pháp."
  },
  {
    "id": 37,
    "characterId": "pham_quoc_viet",
    "characterName": "Phạm Quốc Việt",
    "characterRole": "Chủ nhiệm Văn phòng Chủ tịch",
    "type": "KNOWLEDGE",
    "category": "QUAN_LY_NHA_NUOC",
    "question": "Xét theo tính chất quyền lực, chức năng của Nhà nước XHCN bao gồm hai mặt cơ bản nào?",
    "leftChoice": {
      "text": "Chức năng thống trị giai cấp và Chức năng xã hội",
      "effects": {
        "politics": 5,
        "economy": 2,
        "people": 5,
        "law": 4
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "rightChoice": {
      "text": "Chức năng áp đặt và Chức năng tự phát",
      "effects": {
        "politics": -5,
        "economy": -2,
        "people": -5,
        "law": -4
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "correctChoice": "left",
    "explanation": "Chính xác! Nhà nước có chức năng giai cấp (trấn áp phản cách mạng) và chức năng xã hội (tổ chức, xây dựng đời sống mới). Trong đó chức năng tổ chức, xây dựng là chủ yếu."
  },
  {
    "id": 38,
    "characterId": "le_hoang_nam",
    "characterName": "Lê Hoàng Nam",
    "characterRole": "Bộ trưởng Bộ Nội vụ & An ninh",
    "type": "KNOWLEDGE",
    "category": "CHINH_TRI",
    "question": "Lực lượng nào giữ vai trò lãnh đạo trực tiếp và toàn diện đối với Nhà nước Xã hội Chủ nghĩa Việt Nam?",
    "leftChoice": {
      "text": "Các nghiệp đoàn doanh nghiệp tư nhân",
      "effects": {
        "politics": -10,
        "economy": 2,
        "people": -6,
        "law": -5
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Đảng Cộng sản Việt Nam",
      "effects": {
        "politics": 8,
        "economy": 0,
        "people": 5,
        "law": 6
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "correctChoice": "right",
    "explanation": "Chính xác! Điều 4 Hiến pháp khẳng định Đảng Cộng sản Việt Nam là lực lượng lãnh đạo Nhà nước và xã hội, gắn bó mật thiết với nhân dân."
  },
  {
    "id": 39,
    "characterId": "do_thi_nga",
    "characterName": "Đỗ Thị Nga",
    "characterRole": "Đại biểu Quốc hội chuyên trách",
    "type": "KNOWLEDGE",
    "category": "DAN_CHU",
    "question": "Phương châm thực hiện dân chủ ở cơ sở tại Việt Nam hiện nay được hoàn thiện đầy đủ bao gồm những nội dung nào?",
    "leftChoice": {
      "text": "Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng",
      "effects": {
        "politics": 6,
        "economy": 0,
        "people": 9,
        "law": 6
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "rightChoice": {
      "text": "Dân chấp hành, dân đóng góp, dân nộp thuế, dân chịu phạt",
      "effects": {
        "politics": -7,
        "economy": 2,
        "people": -12,
        "law": -6
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "correctChoice": "left",
    "explanation": "Chính xác! Luật Thực hiện dân chủ ở cơ sở đã bổ sung thành tố rất quan trọng: 'Dân giám sát, dân thụ hưởng'."
  },
  {
    "id": 40,
    "characterId": "vu_thi_lan",
    "characterName": "GS.TS Vũ Thị Lan",
    "characterRole": "Bộ trưởng Bộ Văn hóa - Giáo dục",
    "type": "KNOWLEDGE",
    "category": "VAN_HOA_XA_HOI",
    "question": "Nền tảng tư tưởng cốt lõi của nền văn hóa xã hội chủ nghĩa tại Việt Nam được xây dựng trên hệ tư tưởng nào?",
    "leftChoice": {
      "text": "Chủ nghĩa thực dụng cá nhân",
      "effects": {
        "politics": -8,
        "economy": 2,
        "people": -6,
        "law": -3
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Chủ nghĩa Mác – Lênin và Tư tưởng Hồ Chí Minh",
      "effects": {
        "politics": 7,
        "economy": 0,
        "people": 6,
        "law": 5
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "correctChoice": "right",
    "explanation": "Chính xác! Chủ nghĩa Mác - Lênin và Tư tưởng Hồ Chí Minh là nền tảng tư tưởng, kim chỉ nam cho hành động của Đảng và Nhà nước ta."
  },
  {
    "id": 41,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "KNOWLEDGE",
    "category": "PHAP_QUYEN",
    "question": "Trong Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam, yếu tố nào được xác định là trung tâm của mọi chiến lược phát triển?",
    "leftChoice": {
      "text": "Con người - Nhân dân",
      "effects": {
        "politics": 6,
        "economy": 2,
        "people": 9,
        "law": 6
      },
      "knowledgeDelta": 10,
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "rightChoice": {
      "text": "Quy mô máy móc và số lượng tập đoàn",
      "effects": {
        "politics": -4,
        "economy": 3,
        "people": -8,
        "law": -3
      },
      "knowledgeDelta": -5,
      "hint": {
        "politics": 0,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "correctChoice": "left",
    "explanation": "Chính xác! Bản chất nhân văn của Nhà nước pháp quyền XHCN: Con người là trung tâm, chủ thể, nguồn lực quan trọng nhất và là mục tiêu của sự phát triển."
  },
  {
    "id": 42,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "APPLIED",
    "category": "PHAP_QUYEN",
    "question": "Chủ tịch một tỉnh tự ý ra văn bản tạm cấm vận chuyển hàng hóa nông sản từ tỉnh bạn vào để bảo hộ giá nông sản địa phương mình trong mùa dịch.",
    "leftChoice": {
      "text": "Ủng hộ để bảo vệ lợi ích nông dân tỉnh đó",
      "effects": {
        "politics": -6,
        "economy": -4,
        "people": -4,
        "law": -12
      },
      "hint": {
        "politics": -1,
        "economy": -1,
        "people": 0,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Yêu cầu bãi bỏ ngay văn bản ngăn cấm lưu thông",
      "effects": {
        "politics": 5,
        "economy": 5,
        "people": 6,
        "law": 11
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Văn bản địa phương không được chia cắt thị trường thống nhất toàn quốc và trái luật quốc gia. Nhà nước pháp quyền bảo đảm thị trường thông suốt."
  },
  {
    "id": 43,
    "characterId": "bui_van_thang",
    "characterName": "Bùi Văn Thắng",
    "characterRole": "Chánh án Tòa án nhân dân tối cao",
    "type": "APPLIED",
    "category": "PHAP_QUYEN",
    "question": "Một quan chức địa phương gọi điện trực tiếp chỉ đạo Thẩm phán phải tuyên án phạt tiền thay vì phạt tù đối với người nhà của mình.",
    "leftChoice": {
      "text": "Tạo điều kiện linh hoạt trong quan hệ đồng chí",
      "effects": {
        "politics": -8,
        "economy": 0,
        "people": -12,
        "law": -15
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Xử lý nghiêm hành vi can thiệp vào hoạt động tư pháp",
      "effects": {
        "politics": 6,
        "economy": 0,
        "people": 10,
        "law": 15
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Hiến pháp quy định: 'Thẩm phán, Hội thẩm xét xử độc lập và chỉ tuân theo pháp luật; nghiêm cấm cơ quan, tổ chức, cá nhân can thiệp vào việc xét xử'."
  },
  {
    "id": 44,
    "characterId": "hoang_dinh_trong",
    "characterName": "Hoàng Đình Trọng",
    "characterRole": "Chủ tịch Ủy ban MTTQ Việt Nam",
    "type": "APPLIED",
    "category": "DAN_CHU",
    "question": "Một dự án xây dựng công viên công cộng bị thay đổi quy hoạch thành khu biệt thự liền kề mà không hề niêm yết lấy ý kiến cộng đồng dân cư theo luật định.",
    "leftChoice": {
      "text": "Cho qua vì biệt thự mang lại nhiều tiền thuế hơn",
      "effects": {
        "politics": -5,
        "economy": 7,
        "people": -13,
        "law": -9
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Tạm dừng, buộc lấy ý kiến nhân dân đúng quy trình",
      "effects": {
        "politics": 4,
        "economy": -4,
        "people": 12,
        "law": 10
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Dân chủ XHCN không phải khẩu hiệu; nhân dân có quyền tham gia quản lý nhà nước và xã hội, bàn bạc và giám sát các quy hoạch tác động đến đời sống."
  },
  {
    "id": 45,
    "characterId": "dang_minh_khoi",
    "characterName": "Đặng Minh Khôi",
    "characterRole": "Tổng Thanh tra Chính phủ",
    "type": "APPLIED",
    "category": "THAM_NHUNG",
    "question": "Một số đơn vị báo cáo giải ngân vốn đầu tư công đạt 98% nhưng thực chất là tạm ứng chuyển tiền về tài khoản nhà thầu mà công trình chưa xây dựng gì.",
    "leftChoice": {
      "text": "Chấp nhận báo cáo để giữ thành tích thi đua",
      "effects": {
        "politics": -4,
        "economy": -6,
        "people": -8,
        "law": -10
      },
      "hint": {
        "politics": -1,
        "economy": -1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Kiểm toán thực chất, thu hồi tiền và kỷ luật khai khống",
      "effects": {
        "politics": 5,
        "economy": 4,
        "people": 8,
        "law": 11
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Bệnh thành tích và khai khống tiến độ gây lãng phí nguồn lực quốc gia. Thanh tra, kiểm toán thực chất là chìa khóa xây dựng nhà nước liêm chính."
  },
  {
    "id": 46,
    "characterId": "do_thi_nga",
    "characterName": "Đỗ Thị Nga",
    "characterRole": "Đại biểu Quốc hội chuyên trách",
    "type": "APPLIED",
    "category": "CAN_BO",
    "question": "Một lãnh đạo sở ngành có đơn xin từ chức vì thấy năng lực không đáp ứng được yêu cầu chuyển đổi số và để xảy ra tham nhũng ở cấp dưới.",
    "leftChoice": {
      "text": "Khuyên ở lại vì 'khuyết cán bộ khó bố trí'",
      "effects": {
        "politics": -4,
        "economy": -2,
        "people": -7,
        "law": -5
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Chấp thuận từ chức, hình thành văn hóa từ chức",
      "effects": {
        "politics": 6,
        "economy": 1,
        "people": 9,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Văn hóa từ chức khi không còn đủ uy tín hoặc năng lực là nét đẹp văn minh trong công tác cán bộ của Nhà nước pháp quyền hiện đại."
  },
  {
    "id": 47,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "APPLIED",
    "category": "KINH_TE",
    "question": "Thương lái đầu cơ tích trữ đẩy giá gạo và thịt lợn lên gấp rưỡi trong dịp lễ tết. Có đề xuất Nhà nước xuất kho dự trữ quốc gia bình ổn giá.",
    "leftChoice": {
      "text": "Để thị trường tự điều chỉnh theo quy luật cung cầu",
      "effects": {
        "politics": -6,
        "economy": 4,
        "people": -12,
        "law": -2
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Xuất hàng dự trữ bình ổn và xử lý hành vi đầu cơ",
      "effects": {
        "politics": 5,
        "economy": -3,
        "people": 11,
        "law": 6
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nhà nước XHCN can thiệp điều tiết khi thị trường có hiện tượng đầu cơ lũng đoạn, bảo vệ đời sống nhân dân và ổn định trật tự kinh tế - xã hội."
  },
  {
    "id": 48,
    "characterId": "le_hoang_nam",
    "characterName": "Lê Hoàng Nam",
    "characterRole": "Bộ trưởng Bộ Nội vụ & An ninh",
    "type": "APPLIED",
    "category": "CHINH_TRI",
    "question": "Thảo luận về nguyên tắc tập trung dân chủ: Một cán bộ đề xuất người đứng đầu có quyền quyết định tuyệt đối mọi việc mà không cần biểu quyết tập thể.",
    "leftChoice": {
      "text": "Đồng ý trao quyền độc đoán để quyết định nhanh",
      "effects": {
        "politics": -9,
        "economy": 1,
        "people": -9,
        "law": -10
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Bác bỏ: Tập thể lãnh đạo, cá nhân phụ trách",
      "effects": {
        "politics": 7,
        "economy": 0,
        "people": 7,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nguyên tắc tập trung dân chủ đòi hỏi 'Tập thể lãnh đạo, cá nhân phụ trách'. Dân chủ là tiền đề của tập trung, tập trung trên cơ sở dân chủ."
  },
  {
    "id": 49,
    "characterId": "tran_van_long",
    "characterName": "Trần Văn Long",
    "characterRole": "Nhà báo Điều tra Xã hội",
    "type": "APPLIED",
    "category": "DAN_CHU",
    "question": "Nhà báo viết bài phản ánh tiêu cực ở một tổng công ty nhà nước thì bị tổng giám đốc đe dọa kiện tội 'làm giảm uy tín thương hiệu quốc gia'.",
    "leftChoice": {
      "text": "Cấm nhà báo đăng tin để bảo vệ uy tín công ty",
      "effects": {
        "politics": -6,
        "economy": 2,
        "people": -10,
        "law": -11
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Bảo vệ nhà báo và yêu cầu xác minh đúng sai bài báo",
      "effects": {
        "politics": 5,
        "economy": -2,
        "people": 9,
        "law": 11
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Báo chí cách mạng là công cụ giám sát, phản biện xã hội đắc lực của nhân dân. Pháp luật bảo vệ quyền tự do tác nghiệp hợp pháp của phóng viên."
  },
  {
    "id": 50,
    "characterId": "vu_thi_lan",
    "characterName": "GS.TS Vũ Thị Lan",
    "characterRole": "Bộ trưởng Bộ Văn hóa - Giáo dục",
    "type": "APPLIED",
    "category": "VAN_HOA_XA_HOI",
    "question": "Xuất hiện trào lưu các chương trình truyền thông sính ngoại, xuyên tạc lịch sử dựng nước và giữ nước trên không gian mạng để câu tương tác.",
    "leftChoice": {
      "text": "Kệ không gian mạng, không cần kiểm soát",
      "effects": {
        "politics": -8,
        "economy": 1,
        "people": -7,
        "law": -5
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Xử phạt nghiêm khắc và lan tỏa truyền thông lịch sử chuẩn mực",
      "effects": {
        "politics": 7,
        "economy": -1,
        "people": 8,
        "law": 6
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Bảo vệ nền tảng tư tưởng và chủ quyền văn hóa trên không gian mạng là nhiệm vụ sống còn trong sự nghiệp bảo vệ Tổ quốc XHCN."
  },
  {
    "id": 51,
    "characterId": "nguyen_thi_tam",
    "characterName": "Nguyễn Thị Tâm",
    "characterRole": "Đại diện Công nhân - Lao động",
    "type": "APPLIED",
    "category": "VAN_HOA_XA_HOI",
    "question": "Công nhân ở các khu nhà trọ chật chội đề xuất nhà nước hỗ trợ xây dựng điểm sinh hoạt văn hóa và trạm y tế lưu động gần khu công nghiệp.",
    "leftChoice": {
      "text": "Tự người lao động và doanh nghiệp tự lo liệu",
      "effects": {
        "politics": -5,
        "economy": 3,
        "people": -9,
        "law": -1
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Bố trí quỹ đất và kinh phí công đoàn xây dựng ngay",
      "effects": {
        "politics": 4,
        "economy": -4,
        "people": 10,
        "law": 3
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Chăm lo đời sống văn hóa, tinh thần và sức khỏe cho người lao động là nghĩa vụ của Nhà nước XHCN đối với giai cấp tiên phong của cách mạng."
  },
  {
    "id": 52,
    "characterId": "le_hoang_nam",
    "characterName": "Lê Hoàng Nam",
    "characterRole": "Bộ trưởng Bộ Nội vụ & An ninh",
    "type": "CRISIS",
    "category": "KHUNG_HOANG",
    "isCrisis": true,
    "question": "🚨 [KHỦNG HOẢNG TIN GIẢ] Mạng xã hội lan truyền tin bịa đặt vỡ đập thủy điện và ngân hàng sụp đổ, gây hoang mang rút tiền ồ ạt tại 4 tỉnh!",
    "leftChoice": {
      "text": "Cắt toàn bộ mạng internet khu vực xảy ra hoang mang",
      "effects": {
        "politics": -10,
        "economy": -15,
        "people": -18,
        "law": -12
      },
      "hint": {
        "politics": -1,
        "economy": -1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Chủ tịch lên truyền hình trực tiếp, công khai minh bạch sự thật",
      "effects": {
        "politics": 12,
        "economy": 6,
        "people": 15,
        "law": 8
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Khủng hoảng niềm tin được giải quyết tốt nhất bằng thông tin trung thực, kịp thời và minh bạch từ người đứng đầu nhà nước."
  },
  {
    "id": 53,
    "characterId": "tran_thi_mai",
    "characterName": "Trần Thị Mai",
    "characterRole": "Bộ trưởng Bộ Tài chính & Kinh tế",
    "type": "CRISIS",
    "category": "KHUNG_HOANG",
    "isCrisis": true,
    "question": "🚨 [KHỦNG HOẢNG LẠM PHÁT TOÀN CẦU] Giá dầu thế giới tăng 60%, kéo theo nguy cơ lạm phát phi mã hai con số, làm hao mòn thu nhập của hàng triệu gia đình nghèo!",
    "leftChoice": {
      "text": "Để giá xăng dầu tăng tự do theo thị trường thế giới",
      "effects": {
        "politics": -12,
        "economy": 8,
        "people": -18,
        "law": 2
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Trích Quỹ bình ổn, giảm thuế xăng dầu và trợ giá cho người yếu thế",
      "effects": {
        "politics": 8,
        "economy": -14,
        "people": 16,
        "law": 6
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nhà nước XHCN sử dụng các công cụ vĩ mô để chia sẻ gánh nặng khó khăn với nhân dân, bảo đảm mục tiêu ổn định xã hội là trên hết."
  },
  {
    "id": 54,
    "characterId": "dang_minh_khoi",
    "characterName": "Đặng Minh Khôi",
    "characterRole": "Tổng Thanh tra Chính phủ",
    "type": "CRISIS",
    "category": "KHUNG_HOANG",
    "isCrisis": true,
    "question": "🚨 [ĐẠI ÁN THAM NHŨNG TRỌNG ĐIỂM] Điều tra phát hiện đường dây thông đồng đấu thầu y tế liên quan đến nhiều cán bộ cấp thứ trưởng và lãnh đạo nhiều tỉnh thành!",
    "leftChoice": {
      "text": "Hạ mức kỷ luật một số nhân sự để 'giữ thể diện cán bộ'",
      "effects": {
        "politics": -15,
        "economy": -2,
        "people": -20,
        "law": -20
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Xử lý nghiêm minh, kiên quyết thu hồi triệt để tài sản tham nhũng",
      "effects": {
        "politics": 14,
        "economy": -4,
        "people": 18,
        "law": 20
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "'Đốt lò không có vùng cấm, không có ngoại lệ'. Quyết tâm chính trị chống giặc nội xâm tham nhũng đã củng cố niềm tin tuyệt đối của nhân dân vào chế độ."
  },
  {
    "id": 55,
    "characterId": "hoang_dinh_trong",
    "characterName": "Hoàng Đình Trọng",
    "characterRole": "Chủ tịch Ủy ban MTTQ Việt Nam",
    "type": "CRISIS",
    "category": "KHUNG_HOANG",
    "isCrisis": true,
    "question": "🚨 [THIÊN TAI BÃO LŨ LỊCH SỬ] Lũ quét và sạt lở chia cắt 30 huyện miền núi, hàng vạn đồng bào mất nhà cửa, lương thực cạn kiệt!",
    "leftChoice": {
      "text": "Chờ các địa phương tự ứng cứu theo phương châm 4 tại chỗ",
      "effects": {
        "politics": -14,
        "economy": 2,
        "people": -22,
        "law": -4
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": 0
      }
    },
    "rightChoice": {
      "text": "Huy động quân đội, trực thăng cứu trợ khẩn cấp và xuất ngân sách tái thiết",
      "effects": {
        "politics": 12,
        "economy": -12,
        "people": 20,
        "law": 5
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 0
      }
    },
    "explanation": "Tính ưu việt của Nhà nước XHCN thể hiện rõ nhất trong lúc hoạn nạn: tính mạng và sự an toàn của nhân dân là mệnh lệnh thiêng liêng cao nhất."
  },
  {
    "id": 56,
    "characterId": "nguyen_thi_tam",
    "characterName": "Nguyễn Thị Tâm",
    "characterRole": "Đại diện Công nhân - Lao động",
    "type": "CRISIS",
    "category": "KHUNG_HOANG",
    "isCrisis": true,
    "question": "🚨 [ĐÌNH CÔNG TẠI ĐẶC KHU] 40.000 công nhân đồng loạt ngừng việc vì chủ doanh nghiệp nước ngoài cắt giảm bữa ăn ca và nợ 3 tháng bảo hiểm!",
    "leftChoice": {
      "text": "Cho cảnh sát can thiệp giải tán biểu tình nhanh để bảo vệ chủ đầu tư",
      "effects": {
        "politics": -12,
        "economy": -4,
        "people": -22,
        "law": -10
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Thành lập đoàn công tác liên ngành, buộc chủ doanh nghiệp trả đủ quyền lợi",
      "effects": {
        "politics": 10,
        "economy": -6,
        "people": 18,
        "law": 12
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Nhà nước XHCN luôn đứng về phía quyền và lợi ích hợp pháp của người lao động, kiên quyết bảo đảm thực thi pháp luật lao động đối với mọi doanh nghiệp."
  },
  {
    "id": 57,
    "characterId": "le_tuan_anh",
    "characterName": "TS. Lê Tuấn Anh",
    "characterRole": "Giám đốc Chuyển đổi số Quốc gia",
    "type": "STORYLINE",
    "category": "CHUOI_SU_KIEN",
    "question": "Đề án 'Cổng Công khai Ngân sách Quốc gia': Bạn có quyết định chi 500 tỷ đồng xây dựng cổng công khai toàn bộ số liệu thu chi ngân sách từng dự án cho người dân tra cứu?",
    "leftChoice": {
      "text": "Từ chối để tiết kiệm ngân sách",
      "effects": {
        "politics": -3,
        "economy": 4,
        "people": -6,
        "law": -5
      },
      "setFlags": {
        "budgetPortal": false
      },
      "hint": {
        "politics": 0,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Phê duyệt xây dựng Cổng công khai",
      "effects": {
        "politics": 5,
        "economy": -5,
        "people": 10,
        "law": 10
      },
      "setFlags": {
        "budgetPortal": true
      },
      "hint": {
        "politics": 1,
        "economy": -1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Quyết định này sẽ tạo ra bước ngoặt về minh bạch tài chính công trong các năm tiếp theo của nhiệm kỳ!"
  },
  {
    "id": 58,
    "characterId": "tran_van_long",
    "characterName": "Trần Văn Long",
    "characterRole": "Nhà báo Điều tra Xã hội",
    "type": "STORYLINE",
    "category": "CHUOI_SU_KIEN",
    "requiredFlag": "budgetPortal",
    "requiredTurnMin": 8,
    "question": "Nhờ có Cổng Công khai Ngân sách bạn đã phê duyệt trước đây, một nhóm sinh viên đã phát hiện khoản chi bất thường 200 tỷ đồng tại dự án thủy lợi địa phương!",
    "leftChoice": {
      "text": "Yêu cầu cơ quan thanh tra vào cuộc làm rõ",
      "effects": {
        "politics": 8,
        "economy": 6,
        "people": 14,
        "law": 12
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "rightChoice": {
      "text": "Tuyên dương sinh viên và thu hồi ngay số tiền thất thoát",
      "effects": {
        "politics": 10,
        "economy": 8,
        "people": 16,
        "law": 14
      },
      "hint": {
        "politics": 1,
        "economy": 1,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Minh bạch hóa là sức mạnh vô song của Nhà nước của dân, do dân, vì dân: Nhân dân thực sự làm chủ và giám sát đồng tiền thuế của mình."
  },
  {
    "id": 59,
    "characterId": "dang_minh_khoi",
    "characterName": "Đặng Minh Khôi",
    "characterRole": "Tổng Thanh tra Chính phủ",
    "type": "STORYLINE",
    "category": "CHUOI_SU_KIEN",
    "question": "Đề án 'Bàn tay sạch': Áp dụng bắt buộc công nghệ AI phân tích dữ liệu thuế, đất đai và ngân hàng để tự động cảnh báo tài sản bất minh của cán bộ lãnh đạo.",
    "leftChoice": {
      "text": "Tạm hoãn vì sợ đụng chạm đội ngũ",
      "effects": {
        "politics": -5,
        "economy": 1,
        "people": -8,
        "law": -8
      },
      "setFlags": {
        "cleanHandsAI": false
      },
      "hint": {
        "politics": -1,
        "economy": 0,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Triển khai hệ thống cảnh báo tự động",
      "effects": {
        "politics": 6,
        "economy": -3,
        "people": 11,
        "law": 12
      },
      "setFlags": {
        "cleanHandsAI": true
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Công nghệ hiện đại kết hợp quyết tâm chính trị sẽ tạo tiền đề cho một bộ máy hành chính liêm chính, vì dân."
  },
  {
    "id": 60,
    "characterId": "nguyen_van_an",
    "characterName": "Nguyễn Văn An",
    "characterRole": "Bộ trưởng Bộ Tư pháp",
    "type": "STORYLINE",
    "category": "CHUOI_SU_KIEN",
    "requiredFlag": "cleanHandsAI",
    "requiredTurnMin": 12,
    "question": "Hệ thống AI 'Bàn tay sạch' vừa cảnh báo 2 cán bộ cấp cao sở hữu biệt phủ đứng tên người thân không chứng minh được nguồn tiền. Cả hai xin nộp phạt để miễn truy cứu.",
    "leftChoice": {
      "text": "Chấp nhận phạt tiền để thu ngân sách",
      "effects": {
        "politics": -8,
        "economy": 6,
        "people": -14,
        "law": -15
      },
      "hint": {
        "politics": -1,
        "economy": 1,
        "people": -1,
        "law": -1
      }
    },
    "rightChoice": {
      "text": "Kiên quyết khởi tố theo quy định của pháp luật",
      "effects": {
        "politics": 10,
        "economy": -2,
        "people": 16,
        "law": 16
      },
      "hint": {
        "politics": 1,
        "economy": 0,
        "people": 1,
        "law": 1
      }
    },
    "explanation": "Không đánh đổi kỷ cương phép nước lấy tiền tài. Pháp luật là tối thượng và không có ai đứng trên luật pháp trong Nhà nước pháp quyền XHCN."
  }
];

export interface GameEnding {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
  conditionDescription: string;
}

export const GAME_ENDINGS: GameEnding[] = [
  {
    id: 'ENDING_PERFECT_LEADER',
    title: 'NGUYÊN THỦ KIỆT XUẤT - NHÀ LÃNH ĐẠO TOÀN DIỆN',
    subtitle: 'Vinh quang non sông - Đất nước phồn vinh - Dân chủ vững vàng',
    description: 'Đồng chí đã hoàn thành xuất sắc nhiệm kỳ lịch sử! Tất cả 4 chỉ số đều ở mức thịnh vượng (>75) và am hiểu sâu sắc lý luận Nhà nước pháp quyền XHCN. Đất nước đạt được cả ổn định chính trị, kinh tế phát triển bứt phá, lòng dân đồng thuận tuyệt đối và kỷ cương phép nước nghiêm minh.',
    badge: '🎖 Huân chương Sao Vàng Danh Dự',
    color: '#eab308',
    conditionDescription: 'Tất cả 4 chỉ số > 75 và Điểm kiến thức >= 90'
  },
  {
    id: 'ENDING_STRONG_STATE',
    title: 'NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA VỮNG MẠNH',
    subtitle: 'Thể chế bền vững - Phát triển hài hòa',
    description: 'Nhiệm kỳ kết thúc trong sự hài hòa cao độ. Đồng chí đã giữ vững bản chất của Nhà nước XHCN: vừa giữ vững an ninh chính trị, vừa phát triển kinh tế, gắn bó máu thịt với nhân dân và thượng tôn pháp luật.',
    badge: '🥇 Huân chương Hồ Chí Minh',
    color: '#3b82f6',
    conditionDescription: 'Tất cả các chỉ số đều trên 60 và cân bằng'
  },
  {
    id: 'ENDING_ECONOMIC_POWER',
    title: 'CƯỜNG QUỐC KINH TẾ - KINH TẾ THỊ TRƯỜNG ĐỊNH HƯỚNG XHCN',
    subtitle: 'Nội lực dồi dào - Ngân khố thịnh vượng',
    description: 'Chỉ số Kinh tế đạt đỉnh cao vượt bậc. Đất nước đạt tốc độ tăng trưởng thần kỳ, nguồn lực ngân sách dồi dào tạo tiền đề vững chắc nâng cao phúc lợi cho nhân dân và đầu tư hiện đại hóa cơ sở hạ tầng.',
    badge: '💎 Huân chương Lao Động Hạng Nhất',
    color: '#10b981',
    conditionDescription: 'Chỉ số Kinh tế > 85, các chỉ số khác ổn định'
  },
  {
    id: 'ENDING_PEOPLES_HEART',
    title: 'LÒNG DÂN LÀ GỐC - DÂN CHỦ XÃ HỘI CHỦ NGHĨA NỞ HOA',
    subtitle: 'Nhà nước của dân, do dân và vì dân',
    description: 'Niềm tin của Nhân dân đạt mức tuyệt đối. Mọi chủ trương, chính sách đều lấy dân làm gốc, con người là trung tâm. Khối đại đoàn kết toàn dân tộc được củng cố bền chặt hơn bao giờ hết.',
    badge: '❤️ Huân chương Đại Đoàn Kết',
    color: '#ec4899',
    conditionDescription: 'Chỉ số Nhân dân > 85'
  },
  {
    id: 'ENDING_RULE_OF_LAW',
    title: 'THƯỢNG TÔN PHÁP QUYỀN - KỶ CƯƠNG LIÊM CHÍNH',
    subtitle: 'Hiến pháp tối thượng - Công lý cho muôn người',
    description: 'Chỉ số Pháp quyền đạt mức mẫu mực. Bộ máy nhà nước vận hành chặt chẽ theo Hiến pháp và pháp luật, quyền con người được bảo vệ tối đa, quét sạch mọi nguy cơ lạm quyền và tham nhũng.',
    badge: '⚖️ Huân chương Bảo Vệ Công Lý',
    color: '#8b5cf6',
    conditionDescription: 'Chỉ số Pháp quyền > 85'
  },
  {
    id: 'ENDING_CRISIS_POLITICS',
    title: 'GAME OVER: KHỦNG HOẢNG QUẢN TRỊ & MẤT ỔN ĐỊNH CHÍNH TRỊ',
    subtitle: 'Chỉ số Chính trị chạm đáy (<= 0)',
    description: 'Bộ máy quản lý rơi vào tình trạng mất ổn định nghiêm trọng. Kỷ cương bị buông lỏng, các chủ trương điều hành bị phân hóa, trật tự an toàn quốc gia bị đe dọa nặng nề. Nhiệm kỳ bị gián đoạn.',
    badge: '⚠️ Thất Bại Điều Hành',
    color: '#ef4444',
    conditionDescription: 'Chỉ số Chính trị <= 0'
  },
  {
    id: 'ENDING_CRISIS_ECONOMY',
    title: 'GAME OVER: KHỦNG HOẢNG KINH TẾ - KIỆT QUỆ NGUỒN LỰC',
    subtitle: 'Chỉ số Kinh tế chạm đáy (<= 0)',
    description: 'Nền kinh tế rơi vào suy thoái trầm trọng, ngân sách cạn kiệt. Nhà nước không còn đủ nguồn lực tài chính để thực thi các chính sách an sinh xã hội, tiền tệ mất giá, đời sống gặp bế tắc.',
    badge: '⚠️ Thất Bại Kinh Tế',
    color: '#ef4444',
    conditionDescription: 'Chỉ số Kinh tế <= 0'
  },
  {
    id: 'ENDING_CRISIS_PEOPLE',
    title: 'GAME OVER: KHỦNG HOẢNG NIỀM TIN - XA RỜI NHÂN DÂN',
    subtitle: 'Chỉ số Niềm tin Nhân dân chạm đáy (<= 0)',
    description: 'Niềm tin của quần chúng nhân dân suy giảm nghiêm trọng do các quyết định xa rời thực tiễn, quan liêu và bỏ quên tiếng nói của người lao động. Chế độ mất đi điểm tựa vững chắc nhất là lòng dân.',
    badge: '⚠️ Mất Điểm Tựa Nhân Dân',
    color: '#ef4444',
    conditionDescription: 'Chỉ số Nhân dân <= 0'
  },
  {
    id: 'ENDING_CRISIS_LAW',
    title: 'GAME OVER: XÓI MÒN PHÁP QUYỀN - VÔ KỶ CƯƠNG',
    subtitle: 'Chỉ số Pháp quyền chạm đáy (<= 0)',
    description: 'Các nguyên tắc pháp quyền bị suy yếu hoàn toàn. Hoạt động quản lý mất đi khuôn khổ pháp lý cần thiết, vi hiến và tùy tiện lan rộng, công lý bị xâm phạm, xã hội rơi vào hỗn loạn.',
    badge: '⚠️ Thể Chế Suy Thoái',
    color: '#ef4444',
    conditionDescription: 'Chỉ số Pháp quyền <= 0'
  }
];
