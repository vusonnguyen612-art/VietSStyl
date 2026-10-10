import React, { useState, useEffect } from 'react';
import { OutfitId } from '../types/costume';
import { COSTUMES_DATA } from '../data/costumesData';

interface PavilionDollStageProps {
  outfitId: OutfitId;
  shirtColor: string;
  pantsColor: string;
  hatColor: string;
  hatId?: string;
  bottomId?: string;
  hasSilverNecklace?: boolean;
  selectedAccessories?: string[];
  shoeId?: string;
  zoomLevel?: number;
  onPartClick?: (partName: string) => void;
  skinColor?: string;
  hairStyle?: string;
  dollImage?: string;
  isThumbnail?: boolean;
  className?: string;
}

export const PavilionDollStage: React.FC<PavilionDollStageProps> = ({
  outfitId,
  shirtColor,
  pantsColor,
  hatColor,
  hatId,
  bottomId,
  hasSilverNecklace = false,
  selectedAccessories = [],
  shoeId = 'guoc-moc',
  zoomLevel = 1,
  onPartClick,
  skinColor = '#fde5d4',
  hairStyle = 'braids',
  isThumbnail = false,
  className = '',
}) => {
  const handleClick = (partName: string) => {
    if (!isThumbnail && onPartClick) onPartClick(partName);
  };

  // Xác định người mẫu đang mặc Váy hay Quần
  const isWearingSkirt =
    bottomId === 'vay-dup' ||
    (bottomId && bottomId.startsWith('vay')) ||
    (!bottomId && outfitId === 'ao-tu-than');

  // Xác định mẫu mũ/khăn đang đội: Mặc định là khăn xếp (khăn vấn) truyền thống màu đen dáng dẹt
  const activeHatId = hatId === 'khong-doi'
    ? 'none'
    : hatId || 'khan-van-hoang-gia';

  // Hiệu ứng xoay nhẹ cho khăn vấn khi nhân vật cử động hoặc đổi trang phục
  const [isOutfitUpdated, setIsOutfitUpdated] = useState<boolean>(false);

  useEffect(() => {
    setIsOutfitUpdated(true);
    const timer = setTimeout(() => setIsOutfitUpdated(false), 750);
    return () => clearTimeout(timer);
  }, [outfitId, shirtColor, pantsColor, hatId, hatColor, shoeId, selectedAccessories, hairStyle, bottomId]);

  // Xác định các phụ kiện đang đeo
  const isWearingNecklace = hasSilverNecklace || selectedAccessories.includes('kieng-bac');
  const isWearingScarf = selectedAccessories.includes('khan-ran');
  const isWearingBelt = selectedAccessories.includes('that-lung-vang');
  const isWearingHairpin = selectedAccessories.includes('tram-cai');

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center overflow-hidden relative select-none ${isThumbnail ? 'bg-transparent p-0' : 'bg-white p-2'} ${className}`}>
      {/* BÚP BÊ 2D TƯƠNG TÁC (KHUÔN MẶT, MẮT SÁNG, MÁ HỒNG, TÓC TẾT, QUAI ĐỎ) */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-200 origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox={isThumbnail ? "10 15 340 625" : "0 0 360 680"}
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-auto max-h-full max-w-full drop-shadow-sm overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
              {/* Vân dệt gấm nhuyễn cho trang phục */}
              <pattern id="brocade-stage" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
              </pattern>
              {/* Vầng hào quang sáng nhẹ phía sau */}
              <radialGradient id="stageGlow" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              {/* Nan tre nón lá */}
              <linearGradient id="strawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>

              {/* Hiệu ứng xoay nhẹ cho khăn vấn (khăn xếp) khi nhân vật cử động hoặc đổi trang phục */}
              <style>{`
                @keyframes turbanSwayIdle {
                  0%, 100% {
                    transform: rotate(0deg);
                  }
                  30% {
                    transform: rotate(-1.8deg);
                  }
                  70% {
                    transform: rotate(1.8deg);
                  }
                }
                @keyframes turbanOutfitSpin {
                  0% {
                    transform: scale(1) rotate(0deg);
                  }
                  20% {
                    transform: scale(1.03) rotate(-5.5deg);
                  }
                  45% {
                    transform: scale(1.02) rotate(4deg);
                  }
                  70% {
                    transform: scale(1.01) rotate(-1.5deg);
                  }
                  100% {
                    transform: scale(1) rotate(0deg);
                  }
                }
              `}</style>
            </defs>

            {/* Vầng hào quang hoàng gia phía sau */}
            <ellipse cx="180" cy="340" rx="170" ry="300" fill="url(#stageGlow)" />

            {/* ========================================================= */}
            {/* LỚP 1: GIÀY / HÀI / GUỐC TRUYỀN THỐNG (DƯỚI CHÂN)         */}
            {/* ========================================================= */}
            <g className="cursor-pointer group" onClick={() => handleClick('Giày')}>
              {/* A. HÀI MŨI CONG HOÀNG TRIỀU */}
              {shoeId === 'hai-cong' && (
                <g>
                  <path d="M 132 608 C 130 622 134 632 152 632 C 170 632 174 622 172 608 Z" fill="#8B1528" stroke="#1f2937" strokeWidth="2" />
                  <path d="M 144 606 Q 152 596 160 606" stroke="#FDE047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="152" cy="600" r="2.5" fill="#FDE047" stroke="#1f2937" strokeWidth="0.8" />
                  <path d="M 188 608 C 186 622 190 632 208 632 C 226 632 230 622 228 608 Z" fill="#8B1528" stroke="#1f2937" strokeWidth="2" />
                  <path d="M 200 606 Q 208 596 216 606" stroke="#FDE047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="208" cy="600" r="2.5" fill="#FDE047" stroke="#1f2937" strokeWidth="0.8" />
                </g>
              )}

              {/* B. HÀI THÊU CHỈ VÀNG */}
              {shoeId === 'hai-theu' && (
                <g>
                  <path d="M 132 608 C 130 622 134 632 152 632 C 170 632 174 622 172 608 Z" fill="#1E3A8A" stroke="#1f2937" strokeWidth="2" />
                  <path d="M 140 614 Q 152 622 164 614" stroke="#FDE047" strokeWidth="2" fill="none" />
                  <circle cx="152" cy="618" r="2.2" fill="#FDE047" />
                  <path d="M 188 608 C 186 622 190 632 208 632 C 226 632 230 622 228 608 Z" fill="#1E3A8A" stroke="#1f2937" strokeWidth="2" />
                  <path d="M 196 614 Q 208 622 220 614" stroke="#FDE047" strokeWidth="2" fill="none" />
                  <circle cx="208" cy="618" r="2.2" fill="#FDE047" />
                </g>
              )}

              {/* C. DÉP QUAI VẢI DÂN GIAN */}
              {shoeId === 'dep-quai' && (
                <g>
                  <ellipse cx="152" cy="618" rx="16" ry="11" fill="#E5E7EB" stroke="#1f2937" strokeWidth="2" />
                  <line x1="138" y1="614" x2="166" y2="614" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="152" y1="607" x2="152" y2="618" stroke="#78350F" strokeWidth="2.8" />
                  <ellipse cx="208" cy="618" rx="16" ry="11" fill="#E5E7EB" stroke="#1f2937" strokeWidth="2" />
                  <line x1="194" y1="614" x2="222" y2="614" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="208" y1="607" x2="208" y2="618" stroke="#78350F" strokeWidth="2.8" />
                </g>
              )}

              {/* D. GUỐC MỘC TRUYỀN THỐNG (MẶC ĐỊNH) */}
              {(!shoeId || shoeId === 'guoc-moc') && (
                <g>
                  <path d="M 134 608 C 132 620 136 630 152 630 C 168 630 172 620 170 608 Z" fill="#78350F" stroke="#1f2937" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 136 613 Q 152 605 168 613 Q 152 621 136 613 Z" fill="#451A03" stroke="#1f2937" strokeWidth="1.8" />
                  <path d="M 190 608 C 188 620 192 630 208 630 C 224 630 228 620 226 608 Z" fill="#78350F" stroke="#1f2937" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 192 613 Q 208 605 224 613 Q 208 621 192 613 Z" fill="#451A03" stroke="#1f2937" strokeWidth="1.8" />
                </g>
              )}
            </g>

            {/* ========================================================= */}
            {/* LỚP 2: QUẦN / VÁY CỔ PHONG                                */}
            {/* ========================================================= */}
            <g className="cursor-pointer group" onClick={() => handleClick(isWearingSkirt ? 'Váy' : 'Quần')}>
              {isWearingSkirt ? (
                /* CHẾ ĐỘ VÁY: VÁY ĐỤP CỔ PHONG DÁNG XÒE RỘNG, DÀI ĐẾN BÀN CHÂN (GIỐNG HÌNH LỰA CHỌN) */
                <g>
                  {/* Thân váy xòe rộng phủ từ eo xuống tận bàn chân */}
                  <path
                    d="M 142 245 C 136 330 118 460 100 606 Q 180 616 260 606 C 242 460 224 330 218 245 Z"
                    fill={pantsColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  {/* Vân gấm nhuyễn cho váy */}
                  <path
                    d="M 142 245 C 136 330 118 460 100 606 Q 180 616 260 606 C 242 460 224 330 218 245 Z"
                    fill="url(#brocade-stage)"
                    opacity="0.5"
                  />

                  {/* Cạp váy đụp màu vàng đồng như hình mẫu trong ô lựa chọn */}
                  <rect
                    x="140"
                    y="242"
                    width="80"
                    height="10"
                    rx="2"
                    fill="#CA8A04"
                    stroke="#1f2937"
                    strokeWidth="1.6"
                  />

                  {/* Các nếp nhún rủ lụa mềm mại dọc thân váy giống hệt hình trong ô lựa chọn */}
                  <g opacity="0.85">
                    <path d="M 148 252 Q 138 440 120 605" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" fill="none" />
                    <path d="M 150 252 Q 140 440 122 605" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" fill="none" />
                    <path d="M 160 252 Q 152 440 144 606" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" fill="none" />
                    <path d="M 170 252 Q 168 440 164 608" stroke="rgba(0,0,0,0.2)" strokeWidth="1.4" fill="none" />
                    {/* Nếp chính giữa rủ thẳng */}
                    <path d="M 180 252 Q 180 440 180 610" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
                    <path d="M 190 252 Q 192 440 196 608" stroke="rgba(0,0,0,0.2)" strokeWidth="1.4" fill="none" />
                    <path d="M 200 252 Q 208 440 216 606" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" fill="none" />
                    <path d="M 210 252 Q 220 440 238 605" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" fill="none" />
                    <path d="M 212 252 Q 222 440 240 605" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" fill="none" />
                    {/* Viền gấu váy lượn chân cong chạm gót */}
                    <path d="M 100 603 Q 180 613 260 603" stroke="rgba(0,0,0,0.28)" strokeWidth="1.6" fill="none" />
                  </g>
                </g>
              ) : (
                /* CHẾ ĐỘ QUẦN: QUẦN LỤA ỐNG RỘNG 2 ỐNG TRUYỀN THỐNG */
                <g>
                  <path
                    d="M 142 245 C 138 275 132 320 130 360 L 122 606 L 174 606 L 180 375 L 186 606 L 238 606 L 230 360 C 228 320 222 275 218 245 Z"
                    fill={pantsColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <line x1="148" y1="350" x2="148" y2="604" stroke="rgba(0,0,0,0.18)" strokeWidth="1.6" />
                  <line x1="212" y1="350" x2="212" y2="604" stroke="rgba(0,0,0,0.18)" strokeWidth="1.6" />
                  <path d="M 180 320 L 180 375" stroke="#1f2937" strokeWidth="1.8" />
                </g>
              )}
            </g>

            {/* ========================================================= */}
            {/* LỚP 3: TRANG PHỤC ÁO TRUYỀN THỐNG                         */}
            {/* ========================================================= */}
            <g className="cursor-pointer group" onClick={() => handleClick('Áo')}>
              {/* A. ÁO BÀ BA NAM BỘ */}
              {outfitId === 'ao-ba-ba' && (
                <g>
                  {/* Tay áo dài */}
                  <path d="M 122 176 C 104 186 92 216 86 260 C 80 305 82 355 86 385 L 110 385 C 110 345 114 295 124 250 C 130 220 136 190 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 238 176 C 256 186 268 216 274 260 C 280 305 278 355 274 385 L 250 385 C 250 345 246 295 236 250 C 230 220 224 190 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" strokeLinejoin="round" />
                  {/* Thân áo lượn eo nhẹ, xẻ tà */}
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 126 360 114 430 108 460 C 130 466 170 466 180 462 C 190 466 230 466 252 460 C 246 430 234 360 228 300 C 226 250 224 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <path d="M 144 176 C 136 210 134 250 132 300 C 126 360 114 430 108 460 C 130 466 170 466 180 462 C 190 466 230 466 252 460 C 246 430 234 360 228 300 C 226 250 224 210 216 176 Z" fill="url(#brocade-stage)" />
                  {/* Nẹp cúc dọc giữa ngực */}
                  <line x1="180" y1="188" x2="180" y2="462" stroke="#1f2937" strokeWidth="2" />
                  {/* Cổ tròn khoét nhẹ lộ làn da tự nhiên */}
                  <path d="M 160 176 C 160 190 200 190 200 176 Z" fill={skinColor} stroke="#1f2937" strokeWidth="1.8" />
                  {/* Hàng khuy cúc ngọc */}
                  {[210, 250, 290, 330, 370].map((y, idx) => (
                    <circle key={idx} cx="180" cy={y} r="3.8" fill="#FDE68A" stroke="#1f2937" strokeWidth="1.4" />
                  ))}
                  {/* Hai túi nhỏ */}
                  <rect x="130" y="380" width="32" height="34" rx="4" fill="none" stroke="#1f2937" strokeWidth="1.8" />
                  <rect x="198" y="380" width="32" height="34" rx="4" fill="none" stroke="#1f2937" strokeWidth="1.8" />
                </g>
              )}

              {/* B. ÁO DÀI TRUYỀN THỐNG */}
              {outfitId === 'ao-dai' && (
                <g>
                  <path d="M 122 176 C 104 186 92 216 86 260 C 80 305 82 355 86 385 L 110 385 C 110 345 114 295 124 250 C 130 220 136 190 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  <path d="M 238 176 C 256 186 268 216 274 260 C 280 305 278 355 274 385 L 250 385 C 250 345 246 295 236 250 C 230 220 224 190 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 126 390 118 500 110 604 C 156 608 204 608 250 604 C 242 500 234 390 228 300 C 226 250 224 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <path d="M 144 176 C 136 210 134 250 132 300 C 126 390 118 500 110 604 C 156 608 204 608 250 604 C 242 500 234 390 228 300 C 226 250 224 210 216 176 Z" fill="url(#brocade-stage)" />
                  {/* Cổ đứng lập lĩnh cao */}
                  <rect x="166" y="152" width="28" height="24" rx="4" fill={shirtColor} stroke="#1f2937" strokeWidth="2" />
                  <line x1="180" y1="152" x2="180" y2="176" stroke="#1f2937" strokeWidth="1.6" />
                  {/* Khuy bấm chéo */}
                  <path d="M 180 176 Q 206 195 220 225" stroke="#1f2937" strokeWidth="1.8" fill="none" strokeDasharray="3 3" />
                  <circle cx="196" cy="188" r="3" fill="#FDE68A" stroke="#1f2937" strokeWidth="1.2" />
                  <circle cx="210" cy="204" r="3" fill="#FDE68A" stroke="#1f2937" strokeWidth="1.2" />
                  <circle cx="218" cy="222" r="3" fill="#FDE68A" stroke="#1f2937" strokeWidth="1.2" />
                  <line x1="180" y1="280" x2="180" y2="604" stroke="rgba(0,0,0,0.12)" strokeWidth="1.8" />
                </g>
              )}

              {/* C. ÁO NHẬT BÌNH */}
              {outfitId === 'ao-nhat-binh' && (
                <g>
                  <path d="M 122 176 C 96 195 66 245 54 305 C 50 335 56 365 64 365 L 124 365 C 124 315 130 245 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  <path d="M 238 176 C 264 195 294 245 306 305 C 310 335 304 365 296 365 L 236 365 C 236 315 230 245 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  <path
                    d="M 144 176 C 138 210 134 250 130 300 C 124 400 116 500 110 604 C 156 608 204 608 250 604 C 244 500 236 400 230 300 C 226 250 222 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <path d="M 144 176 C 138 210 134 250 130 300 C 124 400 116 500 110 604 C 156 608 204 608 250 604 C 244 500 236 400 230 300 C 226 250 222 210 216 176 Z" fill="url(#brocade-stage)" />
                  {/* Bản cổ Bình Lĩnh thêu ngũ sắc */}
                  <rect x="162" y="174" width="36" height="74" fill="#EAB308" stroke="#1f2937" strokeWidth="2.2" rx="3" />
                  <rect x="166" y="178" width="28" height="66" fill="#F97316" rx="2" />
                  <circle cx="180" cy="210" r="5.5" fill="#CA8A04" stroke="#ffffff" strokeWidth="1.4" />
                  <circle cx="180" cy="210" r="2.5" fill="#1E3A8A" />
                  {/* Dải lụa buông ngực */}
                  <path d="M 173 248 L 187 248 L 187 600 L 173 600 Z" fill="#3B82F6" stroke="#1f2937" strokeWidth="1.8" />
                  {/* Cửa tay ngũ sắc */}
                  <path d="M 64 362 L 124 362" stroke="#2563EB" strokeWidth="3.5" />
                  <path d="M 64 355 L 124 355" stroke="#EAB308" strokeWidth="3.5" />
                  <path d="M 64 348 L 124 348" stroke="#10B981" strokeWidth="3.5" />
                  <path d="M 64 341 L 124 341" stroke="#EF4444" strokeWidth="3.5" />
                  <path d="M 236 362 L 296 362" stroke="#2563EB" strokeWidth="3.5" />
                  <path d="M 236 355 L 296 355" stroke="#EAB308" strokeWidth="3.5" />
                  <path d="M 236 348 L 296 348" stroke="#10B981" strokeWidth="3.5" />
                  <path d="M 236 341 L 296 341" stroke="#EF4444" strokeWidth="3.5" />
                </g>
              )}

              {/* D. ÁO TẤC */}
              {outfitId === 'ao-tac' && (
                <g>
                  <path d="M 122 176 C 88 196 48 245 42 320 C 36 385 74 410 114 385 L 144 220 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  <path d="M 238 176 C 272 196 312 245 318 320 C 324 385 286 410 246 385 L 216 220 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  {/* Thân áo tấc suông rộng trang trọng, phủ trọn eo và hông */}
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 128 370 120 445 114 526 C 158 532 202 532 246 526 C 240 445 232 370 228 300 C 226 250 224 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 128 370 120 445 114 526 C 158 532 202 532 246 526 C 240 445 232 370 228 300 C 226 250 224 210 216 176 Z"
                    fill="url(#brocade-stage)"
                  />
                  <rect x="166" y="152" width="28" height="24" rx="4" fill={shirtColor} stroke="#1f2937" strokeWidth="2" />
                  <line x1="180" y1="176" x2="180" y2="526" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
                </g>
              )}

              {/* E. ÁO NGŨ THÂN */}
              {outfitId === 'ao-ngu-than' && (
                <g>
                  <path d="M 122 176 C 104 186 92 216 86 260 C 80 305 82 355 86 385 L 110 385 C 110 345 114 295 124 250 C 130 220 136 190 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  <path d="M 238 176 C 256 186 268 216 274 260 C 280 305 278 355 274 385 L 250 385 C 250 345 246 295 236 250 C 230 220 224 190 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  {/* Thân áo ngũ thân dáng chuẩn, phủ kín cạp quần tự nhiên */}
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 128 370 120 445 114 526 C 158 532 202 532 246 526 C 240 445 232 370 228 300 C 226 250 224 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 128 370 120 445 114 526 C 158 532 202 532 246 526 C 240 445 232 370 228 300 C 226 250 224 210 216 176 Z"
                    fill="url(#brocade-stage)"
                  />
                  <rect x="166" y="152" width="28" height="24" rx="4" fill={shirtColor} stroke="#1f2937" strokeWidth="2" />
                  <path d="M 180 178 C 196 195 214 225 218 260" stroke="#1f2937" strokeWidth="2" fill="none" />
                  {[195, 220, 255, 295, 335].map((y, i) => (
                    <circle key={i} cx="214" cy={y} r="3.5" fill="#FDE68A" stroke="#1f2937" strokeWidth="1.2" />
                  ))}
                </g>
              )}

              {/* F. ÁO TỨ THÂN (TÁI HIỆN CHUẨN XÁC NÂU ĐẤT + YẾM ĐỎ + THẮT LƯNG VÀNG) */}
              {outfitId === 'ao-tu-than' && (
                <g>
                  {/* Tay áo */}
                  <path d="M 122 176 C 104 186 92 216 86 260 C 80 305 82 355 86 385 L 110 385 C 110 345 114 295 124 250 C 130 220 136 190 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  <path d="M 238 176 C 256 186 268 216 274 260 C 280 305 278 355 274 385 L 250 385 C 250 345 246 295 236 250 C 230 220 224 190 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  {/* Thân áo tứ thân hai vạt buông hai bên, để lộ váy đụp / quần ở giữa */}
                  {/* Tà trái */}
                  <path
                    d="M 144 176 C 136 210 130 300 122 450 L 114 604 L 148 604 L 156 450 C 158 300 156 220 158 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 144 176 C 136 210 130 300 122 450 L 114 604 L 148 604 L 156 450 C 158 300 156 220 158 176 Z"
                    fill="url(#brocade-stage)"
                  />
                  {/* Tà phải */}
                  <path
                    d="M 216 176 C 224 210 230 300 238 450 L 246 604 L 212 604 L 204 450 C 202 300 204 220 202 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 216 176 C 224 210 230 300 238 450 L 246 604 L 212 604 L 204 450 C 202 300 204 220 202 176 Z"
                    fill="url(#brocade-stage)"
                  />
                  {/* YẾM ĐÀO ĐỎ THẮM VỚI VIỀN CỔ VÀNG HOÀNG KIM (NHƯ MẪU IMAGE_9) */}
                  <polygon points="160,172 200,172 180,244" fill="#DC2626" stroke="#1f2937" strokeWidth="2.2" />
                  <path d="M 160 172 L 200 172" stroke="#FDE047" strokeWidth="3.5" />
                  <circle cx="180" cy="182" r="3.5" fill="#FDE047" stroke="#1f2937" strokeWidth="1" />
                  {/* DẢI THẮT LƯNG VÀNG NỔI BẬT TRƯỚC BỤNG (BẢN RỘNG CHE TRỌN PHẦN CẠP) */}
                  <rect x="132" y="240" width="96" height="20" rx="3" fill="#EAB308" stroke="#1f2937" strokeWidth="2.2" />
                  <circle cx="180" cy="250" r="6" fill="#CA8A04" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Hai dải lụa thắt buông rủ dài */}
                  <path d="M 174 260 L 168 456 L 178 456 Z" fill="#EAB308" stroke="#1f2937" strokeWidth="1.6" />
                  <path d="M 184 260 L 190 442 L 182 442 Z" fill="#F59E0B" stroke="#1f2937" strokeWidth="1.6" />
                </g>
              )}

              {/* G. ÁO GIAO LĨNH */}
              {outfitId === 'ao-giao-linh' && (
                <g>
                  <path d="M 122 176 C 94 195 64 245 52 305 C 48 335 54 365 62 365 L 122 365 C 122 315 128 245 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  <path d="M 238 176 C 266 195 296 245 308 305 C 312 335 306 365 298 365 L 238 365 C 238 315 232 245 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  {/* Thân áo giao lĩnh vạt chéo rộng thanh tao, phủ kín eo hông */}
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 128 370 122 440 114 508 C 158 514 202 514 246 508 C 238 440 232 370 228 300 C 226 250 224 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <polygon points="160,176 200,176 180,225" fill="#FFFFFF" stroke="#1f2937" strokeWidth="1.8" />
                  <line x1="158" y1="176" x2="190" y2="230" stroke="#1f2937" strokeWidth="2.4" />
                  <line x1="202" y1="176" x2="170" y2="230" stroke="#1f2937" strokeWidth="2.4" />
                  {/* Đai lưng vải bản rộng che kín vòng eo và cạp quần */}
                  <rect x="130" y="240" width="100" height="20" rx="3" fill="#FACC15" stroke="#1f2937" strokeWidth="2" />
                  <circle cx="180" cy="250" r="6" fill="#CA8A04" stroke="#ffffff" strokeWidth="1.4" />
                  <path d="M 174 260 L 170 395 L 178 395 Z" fill="#FACC15" stroke="#1f2937" strokeWidth="1.4" />
                  <path d="M 184 260 L 188 380 L 180 380 Z" fill="#F59E0B" stroke="#1f2937" strokeWidth="1.4" />
                </g>
              )}

              {/* H. ÁO VIÊN LĨNH */}
              {outfitId === 'ao-vien-linh' && (
                <g>
                  <path d="M 122 176 C 94 195 64 245 52 305 C 48 335 54 365 62 365 L 122 365 C 122 315 128 245 144 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  <path d="M 238 176 C 266 195 296 245 308 305 C 312 335 306 365 298 365 L 238 365 C 238 315 232 245 216 178 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.4" />
                  {/* Thân áo viên lĩnh quyền quý phủ kín hoàn toàn eo hông */}
                  <path
                    d="M 144 176 C 136 210 134 250 132 300 C 128 370 122 440 114 508 C 158 514 202 514 246 508 C 238 440 232 370 228 300 C 226 250 224 210 216 176 Z"
                    fill={shirtColor}
                    stroke="#1f2937"
                    strokeWidth="2.4"
                    strokeLinejoin="round"
                  />
                  <path d="M 160 176 C 160 160 200 160 200 176 Z" fill={shirtColor} stroke="#1f2937" strokeWidth="2.2" />
                  <circle cx="180" cy="168" r="14" fill={shirtColor} stroke="#1f2937" strokeWidth="2" />
                  <circle cx="180" cy="168" r="9" fill="#FFFFFF" stroke="#1f2937" strokeWidth="1.4" />
                  <rect x="158" y="202" width="44" height="40" rx="3" fill="#DC2626" stroke="#FACC15" strokeWidth="2.2" />
                  <rect x="162" y="206" width="36" height="32" fill="#F59E0B" opacity="0.9" />
                  <circle cx="180" cy="222" r="7" fill="#FFFFFF" stroke="#1f2937" strokeWidth="1.4" />
                  {/* Đai lưng quan lại bản rộng ôm khít */}
                  <rect x="130" y="250" width="100" height="18" rx="3" fill="#CA8A04" stroke="#1f2937" strokeWidth="2" />
                </g>
              )}
            </g>

            {/* ========================================================= */}
            {/* LỚP 4: BÀN TAY BÚP BÊ                                      */}
            {/* ========================================================= */}
            {outfitId !== 'ao-tac' && (
              <g className="cursor-pointer group" onClick={() => handleClick('Bàn tay')}>
                <path d="M 88 385 C 84 396 86 412 96 418 C 105 422 114 416 116 404 C 117 395 114 386 110 385 Z" fill={skinColor} stroke="#1f2937" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M 94 404 C 98 408 104 406 107 399" stroke="#1f2937" strokeWidth="1.2" fill="none" />
                <path d="M 272 385 C 276 396 274 412 264 418 C 255 422 246 416 244 404 C 243 395 246 386 250 385 Z" fill={skinColor} stroke="#1f2937" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M 266 404 C 262 408 256 406 253 399" stroke="#1f2937" strokeWidth="1.2" fill="none" />
              </g>
            )}

            {outfitId === 'ao-tac' && (
              <g className="cursor-pointer group" onClick={() => handleClick('Bàn tay')}>
                <ellipse cx="168" cy="375" rx="12" ry="9" fill={skinColor} stroke="#1f2937" strokeWidth="2.2" />
                <ellipse cx="192" cy="375" rx="12" ry="9" fill={skinColor} stroke="#1f2937" strokeWidth="2.2" />
              </g>
            )}

            {/* ========================================================= */}
            {/* LỚP 5: CỔ THON THẢ, KHUÔN MẶT SÁNG, MẮT XINH, MÁ HỒNG     */}
            {/* Loại bỏ viền đen quanh mặt, khoe cổ thon dài tự nhiên     */}
            {/* ========================================================= */}
            <g className="cursor-pointer group" onClick={() => handleClick('Khuôn mặt')}>
              {/* CỔ NGƯỜI MẪU THON THẢ DÀI TỰ NHIÊN NỐI VÀO CỔ ÁO */}
              <g>
                <path
                  d="M 166 140 
                     L 165 178 
                     C 172 182 188 182 195 178 
                     L 194 140 Z"
                  fill={skinColor}
                  stroke="#1f2937"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                {/* Đổ bóng nhẹ tự nhiên dưới cằm */}
                <path
                  d="M 166 148 Q 180 156 194 148 Q 180 152 166 148 Z"
                  fill="rgba(0,0,0,0.12)"
                />
                {/* Đường gân cổ thanh thoát */}
                <line x1="173" y1="154" x2="172" y2="170" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeLinecap="round" />
                <line x1="187" y1="154" x2="188" y2="170" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeLinecap="round" />
              </g>

              {/* HAI VÀNH TAI BÚP BÊ VỚI HOA TAI VÀNG */}
              <g>
                <path d="M 144 106 C 137 106 137 122 144 122 Z" fill={skinColor} stroke="#1f2937" strokeWidth="1.6" />
                <circle cx="140" cy="116" r="2" fill="#FBBF24" stroke="#1f2937" strokeWidth="0.8" />
                <path d="M 216 106 C 223 106 223 122 216 122 Z" fill={skinColor} stroke="#1f2937" strokeWidth="1.6" />
                <circle cx="220" cy="116" r="2" fill="#FBBF24" stroke="#1f2937" strokeWidth="0.8" />
              </g>

              {/* KHUÔN MẶT TRÁI XOAN BẦU BĨNH, TRẮNG HỒNG XINH XẮN (VIỀN MỎNG TỰ NHIÊN, KHÔNG CÓ VIỀN ĐEN BỌC NGOÀI) */}
              <path
                d="M 144 94 
                   C 142 64 156 52 180 52 
                   C 204 52 218 64 216 94 
                   C 218 122 212 140 196 148 
                   C 188 151 172 151 164 148 
                   C 148 140 142 122 144 94 Z"
                fill={skinColor}
                stroke="#1f2937"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />

              {/* HAI ĐỐM MÁ HỒNG PHÚNG PHÍNH ĐÁNG YÊU CÓ VẠCH BLUSH */}
              <g>
                <ellipse cx="155" cy="122" rx="9" ry="6.5" fill="#FB7185" opacity="0.75" />
                <ellipse cx="205" cy="122" rx="9" ry="6.5" fill="#FB7185" opacity="0.75" />
                {/* Vạch phấn má hồng // */}
                <line x1="152" y1="120" x2="155" y2="124" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="156" y1="120" x2="159" y2="124" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="202" y1="120" x2="205" y2="124" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="206" y1="120" x2="209" y2="124" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
              </g>

              {/* LÔNG MÀY THANH TÚ MỀM MẠI */}
              <path d="M 154 99 C 160 95 168 96 172 100" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 188 100 C 192 96 200 95 206 99" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* ĐÔI MẮT TO TRÒN ĐEN LÁY LONG LANH (ÁNH SÁNG ĐÔI 2 CHIỀU) */}
              <g>
                {/* Mắt trái */}
                <ellipse cx="163" cy="112" rx="4.5" ry="5.2" fill="#18181b" />
                <circle cx="164.8" cy="110" r="1.8" fill="#ffffff" />
                <circle cx="161.8" cy="113.8" r="0.9" fill="#ffffff" />
                {/* Mi mắt trên cong */}
                <path d="M 157 109 Q 163 105 169 109" stroke="#18181b" strokeWidth="1.8" fill="none" strokeLinecap="round" />

                {/* Mắt phải */}
                <ellipse cx="197" cy="112" rx="4.5" ry="5.2" fill="#18181b" />
                <circle cx="198.8" cy="110" r="1.8" fill="#ffffff" />
                <circle cx="195.8" cy="113.8" r="0.9" fill="#ffffff" />
                {/* Mi mắt trên cong */}
                <path d="M 191 109 Q 197 105 203 109" stroke="#18181b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>

              {/* SỐNG MŨI NHỎ CHẤM NHẸ */}
              <circle cx="180" cy="119" r="1.2" fill="#D97706" />

              {/* NỤ CƯỜI CHÚM CHÍM TƯƠI TẮN HIỀN HẬU */}
              <path d="M 173 131 Q 180 139 187 131" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M 175 133 Q 180 137 185 133" stroke="#F43F5E" strokeWidth="1.4" strokeLinecap="round" fill="none" />

              {/* MÁI TÓC ÔM GỌN TRÊN ĐỈNH ĐẦU & TÓC MÁI RẼ NGÔI NHẸ NHÀNG TRÊN TRÁN */}
              <path
                d="M 144 94 
                   C 142 62 156 50 180 50 
                   C 204 50 218 62 216 94 
                   C 202 82 192 80 180 82 
                   C 168 80 158 82 144 94 Z"
                fill="#18181b"
                stroke="#18181b"
                strokeWidth="1.8"
              />
              <path d="M 172 82 C 176 90 179 90 181 83 C 183 90 187 90 189 82" stroke="#18181b" strokeWidth="1.8" fill="none" />

              {/* BÍM TÓC TẾT HAI BÊN VỚI DÂY NƠ ĐỎ (CHO PHONG CÁCH TÓC TẾT 'BRAIDS') */}
              {(hairStyle === 'braids' || !hairStyle) && (
                <g>
                  {/* Bím tóc trái buông trước ngực */}
                  <g>
                    <path
                      d="M 140 108 
                         C 132 124 122 148 126 172 
                         C 120 188 120 208 128 226 
                         C 126 238 128 252 136 260 
                         L 140 270 
                         C 134 274 130 268 128 262 
                         C 118 246 110 226 110 206 
                         C 110 182 118 154 134 116 Z"
                      fill="#18181b"
                      stroke="#18181b"
                      strokeWidth="2.2"
                    />
                    <path d="M 124 150 C 130 160 136 162 140 155" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 122 174 C 128 184 134 186 138 178" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 124 198 C 130 208 136 210 140 202" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 128 222 C 134 232 140 234 142 226" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 132 244 C 136 252 142 254 144 246" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    {/* Dây nơ đỏ thắm buộc đuôi bím tóc */}
                    <ellipse cx="137" cy="262" rx="5" ry="3.5" fill="#EF4444" stroke="#18181b" strokeWidth="1.4" />
                    <path d="M 134 262 C 128 268 130 274 136 270" stroke="#DC2626" strokeWidth="1.8" fill="none" />
                    <path d="M 140 262 C 146 268 144 274 138 270" stroke="#DC2626" strokeWidth="1.8" fill="none" />
                  </g>

                  {/* Bím tóc phải buông trước ngực */}
                  <g>
                    <path
                      d="M 220 108 
                         C 228 124 238 148 234 172 
                         C 240 188 240 208 232 226 
                         C 234 238 232 252 224 260 
                         L 220 270 
                         C 226 274 230 268 232 262 
                         C 242 246 250 226 250 206 
                         C 250 182 242 154 226 116 Z"
                      fill="#18181b"
                      stroke="#18181b"
                      strokeWidth="2.2"
                    />
                    <path d="M 236 150 C 230 160 224 162 220 155" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 238 174 C 232 184 226 186 222 178" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 236 198 C 230 208 224 210 220 202" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 232 222 C 226 232 220 234 218 226" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    <path d="M 228 244 C 224 252 218 254 216 246" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                    {/* Dây nơ đỏ thắm buộc đuôi bím tóc */}
                    <ellipse cx="223" cy="262" rx="5" ry="3.5" fill="#EF4444" stroke="#18181b" strokeWidth="1.4" />
                    <path d="M 220 262 C 214 268 216 274 222 270" stroke="#DC2626" strokeWidth="1.8" fill="none" />
                    <path d="M 226 262 C 232 268 230 274 224 270" stroke="#DC2626" strokeWidth="1.8" fill="none" />
                  </g>
                </g>
              )}

              {/* BÚI TÓC TRUYỀN THỐNG (NẾU CHỌN HAIR_STYLE = 'BUN') */}
              {hairStyle === 'bun' && (
                <g>
                  <circle cx="180" cy="46" r="18" fill="#18181b" stroke="#18181b" strokeWidth="2" />
                  <path d="M 166 46 Q 180 34 194 46" stroke="#3f3f46" strokeWidth="1.6" fill="none" />
                  {/* Trâm cài hoa cúc vàng */}
                  <line x1="160" y1="44" x2="204" y2="38" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="160" cy="44" r="3.5" fill="#EF4444" />
                </g>
              )}

              {/* BUỘC ĐUÔI NGỰA THẤP (NẾU CHỌN HAIR_STYLE = 'LOW-TIE') */}
              {/* Chòm tóc hơi chéo buông trước ngực tự nhiên, không lấn ra ngoài cơ thể */}
              {hairStyle === 'low-tie' && (
                <g>
                  {/* Tóc sau mang tai gom gọn về phía sau gáy */}
                  <path d="M 144 114 C 142 128 148 144 166 152" stroke="#18181b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                  <path d="M 216 114 C 218 128 212 144 176 152" stroke="#18181b" strokeWidth="2.4" fill="none" strokeLinecap="round" />

                  {/* Chòm tóc đuôi ngựa hơi chéo lượn mềm mại qua xương quai xanh xuống trước ngực (nằm gọn trong thân người, không lấn ra ngoài) */}
                  <g>
                    <path
                      d="M 172 153 
                         C 166 168 153 188 154 214 
                         C 155 234 159 252 164 266 
                         L 166 268 
                         C 167 252 168 234 167 214 
                         C 166 188 171 168 174 155 Z"
                      fill="#18181b"
                      stroke="#18181b"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Các đường vân gợn tóc mềm mại theo chiều chéo của chòm tóc */}
                    <path d="M 170 165 Q 160 198 162 238" stroke="#3f3f46" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    <path d="M 167 178 Q 158 210 161 250" stroke="#3f3f46" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M 171 190 Q 166 222 165 258" stroke="#3f3f46" strokeWidth="1" strokeLinecap="round" fill="none" />

                    {/* Dây nơ đỏ thắm buộc đuôi ngựa thấp sau gáy */}
                    <ellipse cx="171" cy="153" rx="4.5" ry="3" fill="#EF4444" stroke="#18181b" strokeWidth="1.2" />
                    <path d="M 168 154 Q 163 158 165 162" stroke="#DC2626" strokeWidth="1.4" fill="none" />
                    <path d="M 174 154 Q 178 158 176 162" stroke="#DC2626" strokeWidth="1.4" fill="none" />
                  </g>
                </g>
              )}

              {/* TÓC NGẮN THƯ SINH (NẾU CHỌN HAIR_STYLE = 'SHORT') */}
              {hairStyle === 'short' && (
                <g>
                  <path d="M 140 96 C 134 116 136 138 144 146" stroke="#18181b" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M 220 96 C 226 116 224 138 216 146" stroke="#18181b" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* ========================================================= */}
            {/* LỚP 6: PHỤ KIỆN TRUYỀN THỐNG                              */}
            {/* ========================================================= */}
            {/* A. KIỀNG BẠC CỔ TRUYỀN */}
            {isWearingNecklace && (
              <g className="cursor-pointer group" onClick={() => handleClick('Phụ kiện')}>
                <path d="M 160 174 C 160 196 200 196 200 174" fill="none" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
                <path d="M 160 174 C 160 196 200 196 200 174" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="180" cy="188" r="4.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.4" />
                <circle cx="180" cy="188" r="2" fill="#38BDF8" />
              </g>
            )}

            {/* B. KHĂN RẰN NAM BỘ */}
            {isWearingScarf && (
              <g className="cursor-pointer group" onClick={() => handleClick('Phụ kiện')}>
                <path d="M 152 178 C 148 230 152 300 154 390 L 165 390 C 163 300 160 230 162 178 Z" fill="#FFFFFF" stroke="#1f2937" strokeWidth="1.8" />
                <path d="M 196 178 C 193 230 198 300 200 390 L 189 390 C 187 300 185 230 187 178 Z" fill="#FFFFFF" stroke="#1f2937" strokeWidth="1.8" />
                {[195, 220, 245, 270, 295, 320, 345, 370].map((y, idx) => (
                  <g key={idx}>
                    <line x1="152" y1={y} x2="164" y2={y} stroke="#1f2937" strokeWidth="1.8" />
                    <line x1="188" y1={y} x2="199" y2={y} stroke="#1f2937" strokeWidth="1.8" />
                  </g>
                ))}
              </g>
            )}

            {/* C. THẮT LƯNG VÀNG NGHỆ (NẾU KHÔNG PHẢI ÁO TỨ THÂN/GIAO LĨNH ĐÃ CÓ ĐAI RIÊNG) */}
            {isWearingBelt && outfitId !== 'ao-tu-than' && outfitId !== 'ao-giao-linh' && (
              <g className="cursor-pointer group" onClick={() => handleClick('Phụ kiện')}>
                <rect x="146" y="295" width="68" height="15" rx="3" fill="#EA8308" stroke="#1f2937" strokeWidth="2" />
                <circle cx="180" cy="302" r="7" fill="#F59E0B" stroke="#1f2937" strokeWidth="1.8" />
                <path d="M 175 308 L 171 390 L 178 390 Z" fill="#EA8308" stroke="#1f2937" strokeWidth="1.4" />
                <path d="M 182 308 L 184 380 L 188 380 Z" fill="#F59E0B" stroke="#1f2937" strokeWidth="1.4" />
              </g>
            )}

            {/* D. TRÂM CÀI PHƯỢNG HOÀNG */}
            {isWearingHairpin && (
              <g className="cursor-pointer group" onClick={() => handleClick('Phụ kiện')}>
                <line x1="150" y1="74" x2="210" y2="86" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
                <circle cx="148" cy="73" r="5" fill="#EF4444" stroke="#1f2937" strokeWidth="1.4" />
                <circle cx="212" cy="87" r="3.5" fill="#38BDF8" stroke="#1f2937" strokeWidth="1" />
              </g>
            )}

            {/* ========================================================= */}
            {/* LỚP 7: MŨ / NÓN ĐỘI ĐẦU ĐÈ LÊN TRÁN & MẶT (THEO THAM KHẢO ẢNH 2) */}
            {/* Vành nón, chỏm nón, quai nón đều đội lên trên đầu, đè lên trán  */}
            {/* ========================================================= */}
            {activeHatId !== 'none' && (
              <g className="cursor-pointer group" onClick={() => handleClick('Mũ/Nón')}>
                {/* 1. NÓN QUAI THAO (NÓN BA TẦM QUAN HỌ BẮC BỘ) */}
                {activeHatId === 'non-quai-thao' && (
                  <g>
                    {/* Vành nón ba tầm tròn phẳng lớn đội trên đầu, vành nón đè lên trán trên */}
                    <ellipse
                      cx="180"
                      cy="52"
                      rx="125"
                      ry="38"
                      fill={hatColor || '#F3E5C5'}
                      stroke="#1f2937"
                      strokeWidth="2.8"
                    />
                    {/* Các vòng nan tre đồng tâm tinh xảo */}
                    <ellipse cx="180" cy="52" rx="112" ry="34" fill="none" stroke="#D1B875" strokeWidth="1.6" />
                    <ellipse cx="180" cy="52" rx="96" ry="29" fill="none" stroke="#D1B875" strokeWidth="1.6" />
                    <ellipse cx="180" cy="52" rx="78" ry="23" fill="none" stroke="#D1B875" strokeWidth="1.6" />
                    <ellipse cx="180" cy="52" rx="58" ry="17" fill="none" stroke="#D1B875" strokeWidth="1.6" />
                    {/* Mép vành nón uốn cong nổi khối */}
                    <path d="M 55 52 C 55 90 305 90 305 52" stroke="#B4975A" strokeWidth="3" fill="none" />

                    {/* Chỏm nón (bát úp) nhô lên giữa đỉnh nón */}
                    <path d="M 152 50 C 152 24 208 24 208 50 Z" fill="#F7EED9" stroke="#1f2937" strokeWidth="2.2" />
                    <ellipse cx="180" cy="28" rx="8" ry="4" fill="#EAB308" stroke="#1f2937" strokeWidth="1.4" />
                    <circle cx="180" cy="40" r="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />

                    {/* Bóng đổ nhẹ của vành nón đè lên trán người mẫu */}
                    <path d="M 144 87 Q 180 94 216 87 L 216 90 Q 180 97 144 90 Z" fill="rgba(0,0,0,0.22)" />

                    {/* Quai nón lụa đỏ thắm ôm sát từ vành nón xuống dưới cằm */}
                    <path
                      d="M 144 82 C 146 122 164 154 180 154 C 196 154 214 122 216 82"
                      stroke="#DC2626"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Nút hoa thao đỏ thắm thắt xinh xắn dưới cằm */}
                    <ellipse cx="180" cy="154" rx="4.5" ry="3.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.4" />
                    <circle cx="180" cy="154" r="1.5" fill="#FDE047" />

                    {/* Hai dải quai thao lụa đỏ buông dài thướt tha hai bên ngực */}
                    <path
                      d="M 175 156 C 165 195 144 250 136 315 C 132 334 142 338 148 322 C 154 275 174 200 178 156 Z"
                      fill="#DC2626"
                      stroke="#991B1B"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M 185 156 C 195 195 216 250 224 315 C 228 334 218 338 212 322 C 206 275 186 200 182 156 Z"
                      fill="#DC2626"
                      stroke="#991B1B"
                      strokeWidth="1.2"
                    />
                    <circle cx="142" cy="326" r="2.5" fill="#FBBF24" />
                    <circle cx="218" cy="326" r="2.5" fill="#FBBF24" />
                  </g>
                )}

                {/* 2. NÓN LÁ TRUYỀN THỐNG (ĐỘI TRÊN ĐẦU, VÀNH ĐÈ LÊN TRÁN) */}
                {activeHatId === 'non-la' && (
                  <g>
                    {/* Thân nón lá hình chóp nan tre đè lên trán trên */}
                    <path
                      d="M 60 86 Q 180 94 300 86 L 180 16 Z"
                      fill={hatColor ? hatColor : 'url(#strawGrad)'}
                      stroke="#1f2937"
                      strokeWidth="2.6"
                      strokeLinejoin="round"
                    />
                    {/* Bóng đổ nhẹ của mép nón lá lên trán */}
                    <path d="M 144 91 Q 180 96 216 91 L 216 93 Q 180 98 144 93 Z" fill="rgba(0,0,0,0.22)" />
                    {/* Các đường nan nón lá uốn lượn đều đặn */}
                    <path d="M 80 76 Q 180 84 280 76" stroke="#B58E38" strokeWidth="1.8" fill="none" />
                    <path d="M 104 62 Q 180 70 256 62" stroke="#B58E38" strokeWidth="1.8" fill="none" />
                    <path d="M 128 48 Q 180 54 232 48" stroke="#B58E38" strokeWidth="1.8" fill="none" />
                    <path d="M 154 32 Q 180 36 206 32" stroke="#B58E38" strokeWidth="1.8" fill="none" />
                    <line x1="180" y1="16" x2="180" y2="94" stroke="#CAA653" strokeWidth="1.5" />

                    {/* Quai nón lá bằng lụa hồng ôm nhẹ dưới cằm */}
                    <path
                      d="M 146 92 C 148 132 164 154 180 154 C 196 154 212 132 214 92"
                      stroke="#EC4899"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <ellipse cx="180" cy="154" rx="3.5" ry="2.5" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
                  </g>
                )}

                {/* 3. KHĂN XẾP (KHĂN VẤN) TRUYỀN THỐNG VIỆT NAM MÀU ĐEN - DÁNG DẸT HÌNH CHỮ NHẬT NGANG ÔM SÁT ĐỈNH ĐẦU VÀ XOAY NHẸ */}
                {(activeHatId === 'khan-van-hoang-gia' || activeHatId === 'khan-dong') && (
                  <g
                    className="cursor-pointer transition-transform duration-300"
                    style={{
                      transformOrigin: '180px 60px',
                      animation: isOutfitUpdated
                        ? 'turbanOutfitSpin 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        : 'turbanSwayIdle 4.5s ease-in-out infinite',
                    }}
                    onClick={() => {
                      setIsOutfitUpdated(true);
                      setTimeout(() => setIsOutfitUpdated(false), 750);
                      handleClick('Mũ/Nón');
                    }}
                  >
                    <title>Khăn xếp (khăn vấn) truyền thống Việt Nam - Nhấn để đổi màu</title>
                    {/* Hình chữ nhật ngang dáng dẹt màu đen ôm sát đỉnh đầu, không nhô cao hay phồng lên */}
                    <rect
                      x="143"
                      y="50"
                      width="74"
                      height="18"
                      rx="2.5"
                      fill={hatColor || '#18181b'}
                      stroke="#111827"
                      strokeWidth="2"
                    />

                    {/* Các đường nếp vải khăn xếp ngang song song chuẩn phong cách vẽ 2D phẳng */}
                    <line x1="144" y1="54.5" x2="216" y2="54.5" stroke="#27272a" strokeWidth="1.1" />
                    <line x1="144" y1="59" x2="216" y2="59" stroke="#27272a" strokeWidth="1.1" />
                    <line x1="144" y1="63.5" x2="216" y2="63.5" stroke="#27272a" strokeWidth="1.1" />

                    {/* Vệt sáng nhẹ nếp vải lụa phẳng phía trên đỉnh khăn */}
                    <line x1="145" y1="51.5" x2="215" y2="51.5" stroke="#3f3f46" strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />

                    {/* Nếp gập chữ Nhân tinh tế ở chính giữa trước trán */}
                    <path
                      d="M 175 68 L 180 62 L 185 68"
                      stroke="#4b5563"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                )}

                {/* 5. KHĂN MỎ QUẠ BẮC BỘ (MỎ QUẠ CHÍT XUỐNG TRÁN) */}
                {activeHatId === 'khan-mo-qua' && (
                  <g>
                    <path
                      d="M 138 90 
                         C 130 50 146 30 180 30 
                         C 214 30 230 50 222 90 
                         C 208 84 195 82 180 88 
                         C 165 82 152 84 138 90 Z"
                      fill={hatColor || '#18181b'}
                      stroke="#1f2937"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Mỏ quạ nhọn chít ngay giữa trán */}
                    <polygon points="172,82 188,82 180,91" fill="#18181b" stroke="#1f2937" strokeWidth="1.2" />
                    {/* Hai vạt khăn ôm sát má xuống gáy */}
                    <path d="M 140 90 C 146 102 154 112 162 120" stroke="#18181b" strokeWidth="2.4" fill="none" />
                    <path d="M 220 90 C 214 102 206 112 198 120" stroke="#18181b" strokeWidth="2.4" fill="none" />
                  </g>
                )}
              </g>
            )}

            {/* Nhãn hướng dẫn chạm nhẹ */}
            {!isThumbnail && (
              <g transform="translate(180, 660)">
                <rect x="-95" y="-14" width="190" height="20" rx="10" fill="#FAF7EE" stroke="#E5D7BE" strokeWidth="1" />
                <text x="0" y="0" textAnchor="middle" fontSize="9" fill="#78716C" fontWeight="bold">
                  ✦ Chạm vào mặt, áo, quần, mũ để đổi màu ✦
                </text>
              </g>
            )}
          </svg>
        </div>
    </div>
  );
};
