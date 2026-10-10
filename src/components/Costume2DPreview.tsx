import React from 'react';
import { OutfitId } from '../types/costume';

interface Costume2DPreviewProps {
  outfitId: OutfitId;
  primaryColor?: string;
  className?: string;
}

export const Costume2DPreview: React.FC<Costume2DPreviewProps> = ({
  outfitId,
  primaryColor,
  className = 'w-full h-full',
}) => {
  // Màu mặc định chuẩn mực theo từng loại cổ phục nếu không truyền vào
  const getColor = (defaultHex: string) => primaryColor || defaultHex;

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-2xs overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vân dệt gấm nhuyễn */}
          <pattern id={`brocade-${outfitId}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 8 4 L 4 8 L 0 4 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* ======================================================== */}
        {/* 1. ÁO NHẬT BÌNH (CỔ BÌNH LĨNH NGŨ SẮC & CỬA TAY NGŨ SẮC) */}
        {/* ======================================================== */}
        {outfitId === 'ao-nhat-binh' && (
          <g transform="translate(0, 6)">
            {/* Tay áo rộng */}
            {/* Tay trái */}
            <path
              d="M 64 36 L 24 82 L 44 94 L 72 52 Z"
              fill={getColor('#E11048')}
              stroke="#1f2937"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Cửa tay ngũ sắc bên trái */}
            <path d="M 24 80 L 44 92" stroke="#2563eb" strokeWidth="2.5" />
            <path d="M 26 77 L 46 89" stroke="#eab308" strokeWidth="2.5" />
            <path d="M 28 74 L 48 86" stroke="#10b981" strokeWidth="2.5" />
            <path d="M 30 71 L 50 83" stroke="#ef4444" strokeWidth="2.5" />

            {/* Tay phải */}
            <path
              d="M 96 36 L 136 82 L 116 94 L 88 52 Z"
              fill={getColor('#E11048')}
              stroke="#1f2937"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Cửa tay ngũ sắc bên phải */}
            <path d="M 136 80 L 116 92" stroke="#2563eb" strokeWidth="2.5" />
            <path d="M 134 77 L 114 89" stroke="#eab308" strokeWidth="2.5" />
            <path d="M 132 74 L 112 86" stroke="#10b981" strokeWidth="2.5" />
            <path d="M 130 71 L 110 83" stroke="#ef4444" strokeWidth="2.5" />

            {/* Thân áo chữ A dài qua gối */}
            <path
              d="M 64 34 L 96 34 L 108 132 L 52 132 Z"
              fill={getColor('#E11048')}
              stroke="#1f2937"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M 64 34 L 96 34 L 108 132 L 52 132 Z" fill={`url(#brocade-${outfitId})`} />

            {/* Cổ bình lĩnh hình chữ nhật thêu hoa văn ngũ sắc */}
            <rect x="71" y="38" width="18" height="38" fill="#eab308" stroke="#1f2937" strokeWidth="1.6" />
            <rect x="73" y="40" width="14" height="34" fill="#f97316" />
            <circle cx="80" cy="55" r="3.5" fill="#ca8a04" stroke="#ffffff" strokeWidth="1" />
            <circle cx="80" cy="55" r="1.5" fill="#1e3a8a" />

            {/* Dải lụa buông ngực ombre xanh lam đến trắng */}
            <path d="M 76 76 L 84 76 L 84 128 L 76 128 Z" fill="#3b82f6" stroke="#1f2937" strokeWidth="1.2" />
            <line x1="75" y1="76" x2="75" y2="132" stroke="#1f2937" strokeWidth="1.4" />
            <line x1="85" y1="76" x2="85" y2="132" stroke="#1f2937" strokeWidth="1.4" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 2. ÁO TẤC (TAY THỤNG CÁNH BUỒM CỰC RỘNG & CỔ ĐỨNG LẬP LĨNH) */}
        {/* ======================================================== */}
        {outfitId === 'ao-tac' && (
          <g transform="translate(0, 6)">
            {/* Ống tay thụng buông thõng siêu rộng hai bên */}
            <path
              d="M 64 34 C 44 46 16 75 14 105 C 12 125 36 130 54 120 L 72 52 Z"
              fill={getColor('#B91C1C')}
              stroke="#1f2937"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M 96 34 C 116 46 144 75 146 105 C 148 125 124 130 106 120 L 88 52 Z"
              fill={getColor('#B91C1C')}
              stroke="#1f2937"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Thân áo thụng dáng chữ A lửng qua gối */}
            <path
              d="M 64 34 L 96 34 L 106 122 L 54 122 Z"
              fill={getColor('#B91C1C')}
              stroke="#1f2937"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Cổ đứng lập lĩnh */}
            <path d="M 74 34 L 74 26 L 86 26 L 86 34 Z" fill={getColor('#B91C1C')} stroke="#1f2937" strokeWidth="1.6" />
            <line x1="75" y1="27" x2="85" y2="27" stroke="#ffffff" strokeWidth="1.4" />

            {/* Hàng khuy cài chéo sang phải */}
            <path d="M 79 34 Q 86 40 98 48 L 98 118" stroke="#1f2937" strokeWidth="1.4" fill="none" />
            <circle cx="79" cy="35" r="1.8" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
            <circle cx="85" cy="39" r="1.8" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
            <circle cx="91" cy="44" r="1.8" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
            <circle cx="97" cy="49" r="1.8" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 3. ÁO NGŨ THÂN TAY CHẼN (5 CÚC KHUY & CỔ ĐỨNG KINH KỲ)  */}
        {/* ======================================================== */}
        {outfitId === 'ao-ngu-than' && (
          <g transform="translate(0, 6)">
            {/* Tay chẽn gọn gàng */}
            <path
              d="M 64 34 L 32 88 L 48 94 L 72 48 Z"
              fill={getColor('#78350F')}
              stroke="#1f2937"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M 96 34 L 128 88 L 112 94 L 88 48 Z"
              fill={getColor('#78350F')}
              stroke="#1f2937"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Thân áo ngũ thân 5 vạt lửng qua gối */}
            <path
              d="M 64 34 L 96 34 L 104 120 L 56 120 Z"
              fill={getColor('#78350F')}
              stroke="#1f2937"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Cổ đứng lập lĩnh tròn kín đáo */}
            <path d="M 74 34 L 74 25 L 86 25 L 86 34 Z" fill={getColor('#78350F')} stroke="#1f2937" strokeWidth="1.6" />
            <line x1="75" y1="26" x2="85" y2="26" stroke="#ffffff" strokeWidth="1.5" />

            {/* 5 Hạt khuy ngọc đơm xéo sườn phải (Nhân, Lễ, Nghĩa, Trí, Tín) */}
            <path d="M 79 34 Q 86 40 98 48 L 98 116" stroke="#1f2937" strokeWidth="1.4" fill="none" />
            {[35, 39, 44, 49, 64].map((y, idx) => (
              <circle key={idx} cx={79 + idx * 4.5} cy={y} r="1.8" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
            ))}
          </g>
        )}

        {/* ======================================================== */}
        {/* 4. ÁO TỨ THÂN (4 VẠT, YẾM ĐÀO ĐỎ THẮM, THẮT LƯNG VÀNG) */}
        {/* ======================================================== */}
        {outfitId === 'ao-tu-than' && (
          <g transform="translate(0, 6)">
            {/* Tay áo vừa phải */}
            <path d="M 64 34 L 32 88 L 48 94 L 72 48 Z" fill={getColor('#9A3412')} stroke="#1f2937" strokeWidth="1.8" />
            <path d="M 96 34 L 128 88 L 112 94 L 88 48 Z" fill={getColor('#9A3412')} stroke="#1f2937" strokeWidth="1.8" />

            {/* Vạt sau màu nâu/bã trầu */}
            <path d="M 64 34 L 96 34 L 106 132 L 54 132 Z" fill={getColor('#9A3412')} opacity="0.9" stroke="#1f2937" strokeWidth="2" />

            {/* Yếm đào đỏ thắm nổi bật bên trong */}
            <polygon points="73,34 87,34 80,68" fill="#E11D48" stroke="#1f2937" strokeWidth="1.5" />

            {/* 2 Vạt trước buông rủ để lộ yếm */}
            <path d="M 64 34 L 72 34 L 68 130 L 54 130 Z" fill={getColor('#9A3412')} stroke="#1f2937" strokeWidth="1.6" />
            <path d="M 96 34 L 88 34 L 92 130 L 106 130 Z" fill={getColor('#9A3412')} stroke="#1f2937" strokeWidth="1.6" />

            {/* Dải thắt lưng vàng nghệ buộc nơ duyên dáng */}
            <rect x="66" y="72" width="28" height="8" rx="2" fill="#EA8308" stroke="#1f2937" strokeWidth="1.5" />
            <circle cx="80" cy="76" r="3.5" fill="#EA8308" stroke="#1f2937" strokeWidth="1.2" />
            <path d="M 78 80 L 75 118 L 79 118 L 80 80 Z" fill="#EA8308" stroke="#1f2937" strokeWidth="1.2" />
            <path d="M 82 80 L 85 112 L 81 112 L 81 80 Z" fill="#EA8308" stroke="#1f2937" strokeWidth="1.2" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 5. ÁO BÀ BA NAM BỘ (CỔ TRÒN, 2 TÚI VẠT, HÀNG NÚT NGỰC) */}
        {/* ======================================================== */}
        {outfitId === 'ao-ba-ba' && (
          <g transform="translate(0, 10)">
            {/* Tay áo raglan chẽn cổ tay */}
            <path d="M 64 34 L 32 86 L 48 92 L 72 48 Z" fill={getColor('#F87171')} stroke="#1f2937" strokeWidth="1.8" />
            <path d="M 96 34 L 128 86 L 112 92 L 88 48 Z" fill={getColor('#F87171')} stroke="#1f2937" strokeWidth="1.8" />

            {/* Thân áo ngắn xẻ tà hai bên hông */}
            <path
              d="M 64 34 L 96 34 L 102 96 L 90 99 L 80 97 L 70 99 L 58 96 Z"
              fill={getColor('#F87171')}
              stroke="#1f2937"
              strokeWidth="2"
            />

            {/* Cổ tròn thanh thoát */}
            <path d="M 72 34 C 74 40 86 40 88 34 Z" fill="rgba(255,255,255,0.7)" stroke="#1f2937" strokeWidth="1.5" />

            {/* Hàng cúc ngực dọc giữa thân áo */}
            <line x1="80" y1="40" x2="80" y2="97" stroke="#1f2937" strokeWidth="1.4" />
            {[45, 54, 63, 72, 81, 90].map((y, idx) => (
              <circle key={idx} cx="80" cy={y} r="1.6" fill="#ffffff" stroke="#1f2937" strokeWidth="1" />
            ))}

            {/* 2 Túi vuông nhỏ hai bên vạt áo */}
            <rect x="62" y="78" width="10" height="12" rx="1.5" fill={getColor('#F87171')} stroke="#1f2937" strokeWidth="1.4" />
            <rect x="88" y="78" width="10" height="12" rx="1.5" fill={getColor('#F87171')} stroke="#1f2937" strokeWidth="1.4" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 6. ÁO DÀI TRUYỀN THỐNG (CỔ CAO, 2 TÀ DÀI THƯỚT THA XẺ EO) */}
        {/* ======================================================== */}
        {outfitId === 'ao-dai' && (
          <g transform="translate(0, 6)">
            {/* Tay áo dài ôm nhẹ */}
            <path d="M 64 34 L 34 84 L 48 88 L 72 46 Z" fill={getColor('#E11048')} stroke="#1f2937" strokeWidth="1.8" />
            <path d="M 96 34 L 126 84 L 112 88 L 88 46 Z" fill={getColor('#E11048')} stroke="#1f2937" strokeWidth="1.8" />

            {/* Vạt sau dài buông rủ */}
            <path d="M 66 68 L 60 144 L 100 144 L 94 68 Z" fill={getColor('#E11048')} opacity="0.88" stroke="#1f2937" strokeWidth="1.8" />

            {/* Vạt trước xẻ eo cao thướt tha */}
            <path
              d="M 64 34 L 96 34 L 98 68 L 104 142 L 56 142 L 62 68 Z"
              fill={getColor('#E11048')}
              stroke="#1f2937"
              strokeWidth="2"
            />

            {/* Cổ đứng cao 2-3cm ôm nhẹ */}
            <path d="M 74 34 L 74 26 L 86 26 L 86 34 Z" fill={getColor('#E11048')} stroke="#1f2937" strokeWidth="1.6" />

            {/* Hàng khuy bấm chéo từ cổ xuống nách */}
            <path d="M 80 34 Q 86 38 96 46" stroke="#1f2937" strokeWidth="1.2" fill="none" />
            <circle cx="80" cy="34" r="1.4" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" />
            <circle cx="85" cy="37" r="1.4" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" />
            <circle cx="91" cy="41" r="1.4" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 7. ÁO GIAO LĨNH (CỔ GIAO CHÉO CHỮ Y & THẮT ĐAI BẢN LỚN) */}
        {/* ======================================================== */}
        {outfitId === 'ao-giao-linh' && (
          <g transform="translate(0, 6)">
            {/* Ống quần lụa để lộ bên dưới do thân áo ngắn bớt */}
            <path d="M 64 116 L 62 144 L 78 144 L 80 116 Z" fill="#1f2937" opacity="0.9" stroke="#1f2937" strokeWidth="1.2" />
            <path d="M 80 116 L 82 144 L 98 144 L 96 116 Z" fill="#1f2937" opacity="0.9" stroke="#1f2937" strokeWidth="1.2" />

            {/* Tay áo mở rộng đều sang hai bên về phía cánh tay */}
            <path d="M 64 34 C 48 45 28 65 20 84 C 18 90 32 94 48 94 C 54 82 66 56 72 48 Z" fill={getColor('#059669')} stroke="#1f2937" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M 96 34 C 112 45 132 65 140 84 C 142 90 128 94 112 94 C 106 82 94 56 88 48 Z" fill={getColor('#059669')} stroke="#1f2937" strokeWidth="1.8" strokeLinejoin="round" />

            {/* Thân áo ngắn bớt (dài lửng qua gối để lộ quần lụa) */}
            <path d="M 64 34 L 96 34 L 102 118 L 58 118 Z" fill={getColor('#059669')} stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />

            {/* Cổ giao chéo chữ Y */}
            <polygon points="68,34 92,34 80,62" fill="#ffffff" stroke="#1f2937" strokeWidth="1.4" />
            <path d="M 66 34 L 84 64" stroke="#1f2937" strokeWidth="1.8" />
            <path d="M 94 34 L 76 64" stroke="#1f2937" strokeWidth="1.8" />

            {/* Thắt đai lưng bản lớn thắt nơ */}
            <rect x="62" y="66" width="36" height="10" rx="1.5" fill="#facc15" stroke="#1f2937" strokeWidth="1.4" />
            <path d="M 76 76 L 73 108 L 78 108 Z" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
            <path d="M 82 76 L 85 104 L 80 104 Z" fill="#facc15" stroke="#1f2937" strokeWidth="1" />
          </g>
        )}

        {/* ======================================================== */}
        {/* 8. ÁO VIÊN LĨNH (CỔ TRÒN KHÉP KÍN & BỔ TỬ TRƯỚC NGỰC)   */}
        {/* ======================================================== */}
        {outfitId === 'ao-vien-linh' && (
          <g transform="translate(0, 6)">
            {/* Ống quần lụa để lộ bên dưới do thân áo ngắn bớt */}
            <path d="M 64 116 L 62 144 L 78 144 L 80 116 Z" fill="#1f2937" opacity="0.9" stroke="#1f2937" strokeWidth="1.2" />
            <path d="M 80 116 L 82 144 L 98 144 L 96 116 Z" fill="#1f2937" opacity="0.9" stroke="#1f2937" strokeWidth="1.2" />

            {/* Tay áo mở rộng đều sang hai bên về phía cánh tay */}
            <path d="M 64 34 C 46 45 26 65 18 86 C 16 92 32 96 48 96 C 54 84 66 58 72 50 Z" fill={getColor('#1E3A8A')} stroke="#1f2937" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M 96 34 C 114 45 134 65 142 86 C 144 92 128 96 112 96 C 106 84 94 58 88 50 Z" fill={getColor('#1E3A8A')} stroke="#1f2937" strokeWidth="1.8" strokeLinejoin="round" />

            {/* Thân bào phục ngắn bớt (dài lửng qua gối để lộ quần lụa) */}
            <path d="M 64 34 L 96 34 L 102 118 L 58 118 Z" fill={getColor('#1E3A8A')} stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />

            {/* Cổ tròn ôm kín */}
            <circle cx="80" cy="34" r="9" fill={getColor('#1E3A8A')} stroke="#1f2937" strokeWidth="1.6" />
            <circle cx="80" cy="34" r="6" fill="#ffffff" stroke="#1f2937" strokeWidth="1.2" />

            {/* Bổ tử hoa văn triều nghi vuông vức trước ngực */}
            <rect x="68" y="48" width="24" height="22" rx="1" fill="#dc2626" stroke="#facc15" strokeWidth="1.5" />
            <rect x="71" y="51" width="18" height="16" fill="#f59e0b" opacity="0.9" />
            <circle cx="80" cy="59" r="4" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" />

            {/* Đai quan chức */}
            <rect x="60" y="74" width="40" height="7" rx="1.5" fill="#ca8a04" stroke="#1f2937" strokeWidth="1.2" />
          </g>
        )}
      </svg>
    </div>
  );
};
