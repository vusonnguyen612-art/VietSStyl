import React from 'react';

interface Item2DPreviewProps {
  category: 'quan' | 'mu' | 'phukien' | 'giay';
  itemId: string;
  color?: string;
  className?: string;
}

export const Item2DPreview: React.FC<Item2DPreviewProps> = ({
  category,
  itemId,
  color,
  className = 'w-full h-full',
}) => {
  return (
    <div className={`flex items-center justify-center select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full drop-shadow-2xs overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ========================================================= */}
        {/* 1. QUẦN / VÁY (PANTS / SKIRTS)                            */}
        {/* ========================================================= */}
        {category === 'quan' && (
          <g transform="translate(0, 2)">
            {itemId === 'vay-dup' ? (
              // Váy đụp cổ phong dáng xòe rộng
              <g>
                <path
                  d="M 32 12 L 68 12 L 84 70 L 16 70 Z"
                  fill={color || '#1F2937'}
                  stroke="#1c1917"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Cạp váy */}
                <rect x="30" y="8" width="40" height="6" rx="1.5" fill="#ca8a04" stroke="#1c1917" strokeWidth="1.2" />
                {/* Nếp nhún váy đụp */}
                <path d="M 38 14 Q 40 42 36 68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
                <path d="M 50 14 Q 50 42 50 68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
                <path d="M 62 14 Q 60 42 64 68" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
              </g>
            ) : (
              // Quần lụa ống rộng (trắng, đen, lam)
              <g>
                <path
                  d="M 30 10 L 70 10 L 78 72 L 53 72 L 50 28 L 47 72 L 22 72 Z"
                  fill={color || '#1F2937'}
                  stroke="#1c1917"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Cạp quần */}
                <line x1="30" y1="16" x2="70" y2="16" stroke="#1c1917" strokeWidth="1.2" strokeDasharray="3 2" />
                {/* Nếp rủ ly quần */}
                <line x1="36" y1="20" x2="34" y2="68" stroke="rgba(0,0,0,0.18)" strokeWidth="1.4" />
                <line x1="64" y1="20" x2="66" y2="68" stroke="rgba(0,0,0,0.18)" strokeWidth="1.4" />
              </g>
            )}
          </g>
        )}

        {/* ========================================================= */}
        {/* 2. MŨ / NÓN / KHĂN VẤN (HATS / HEADDRESSES)              */}
        {/* ========================================================= */}
        {category === 'mu' && (
          <g transform="translate(0, 0)">
            {/* Không đội mũ */}
            {itemId === 'khong-doi' && (
              <g transform="translate(10, 10)">
                <circle cx="40" cy="30" r="24" fill="#FAF7EE" stroke="#D5C7B0" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="24" y1="14" x2="56" y2="46" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                <text x="40" y="34" textAnchor="middle" fontSize="10" fill="#78716C" fontWeight="bold">Để Mộc</text>
              </g>
            )}

            {/* Nón lá */}
            {itemId === 'non-la' && (
              <g transform="translate(5, 6)">
                {/* Chóp nón */}
                <path
                  d="M 45 6 L 5 56 Q 45 66 85 56 Z"
                  fill="#EBD085"
                  stroke="#1c1917"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Các vành nan tròn */}
                <path d="M 16 46 Q 45 54 74 46" stroke="#B48C36" strokeWidth="1.4" fill="none" />
                <path d="M 26 36 Q 45 42 64 36" stroke="#B48C36" strokeWidth="1.4" fill="none" />
                <path d="M 36 24 Q 45 28 54 24" stroke="#B48C36" strokeWidth="1.4" fill="none" />
                {/* Quai nón đen */}
                <path d="M 22 55 Q 45 74 68 55" stroke="#1c1917" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Nón quai thao */}
            {itemId === 'non-quai-thao' && (
              <g transform="translate(4, 4)">
                {/* Chỏm nón */}
                <ellipse cx="46" cy="22" rx="14" ry="10" fill="#F7EED9" stroke="#1c1917" strokeWidth="1.8" />
                <circle cx="46" cy="14" r="3" fill="#CA8A04" stroke="#1c1917" strokeWidth="1" />
                {/* Vành phẳng dẹt */}
                <rect x="2" y="24" width="88" height="15" rx="3" fill="#E8D5A4" stroke="#1c1917" strokeWidth="2" />
                <ellipse cx="46" cy="24" rx="44" ry="4" fill="#F2E5C5" stroke="#1c1917" strokeWidth="1.6" />
                {/* Nơ quai thao lụa đỏ và dải buông */}
                <circle cx="46" cy="46" r="4" fill="#DC2626" stroke="#1c1917" strokeWidth="1.2" />
                <path d="M 43 48 C 38 60 32 72 30 76" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 49 48 C 54 60 60 72 62 76" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Khăn vấn hoàng tộc */}
            {itemId === 'khan-van-hoang-gia' && (
              <g transform="translate(10, 8)">
                {/* Búi tóc ở giữa */}
                <ellipse cx="40" cy="28" rx="15" ry="10" fill="#1c1917" />
                {/* Trâm cài ngọc */}
                <line x1="22" y1="24" x2="58" y2="30" stroke="#D4AF37" strokeWidth="2.4" />
                <circle cx="21" cy="23" r="3" fill="#EF4444" stroke="#1c1917" strokeWidth="1" />
                {/* Vành khăn vấn quấn tầng */}
                <path
                  d="M 12 50 C 8 26 22 8 40 8 C 58 8 72 26 68 50 C 56 46 24 46 12 50 Z"
                  fill={color || '#EA8308'}
                  stroke="#1c1917"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <ellipse cx="40" cy="30" rx="17" ry="9" fill="none" stroke="#1c1917" strokeWidth="1.8" />
                <path d="M 14 42 C 28 38 52 38 66 42" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" fill="none" />
                <path d="M 18 34 C 28 30 52 30 62 34" stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" fill="none" />
              </g>
            )}

            {/* Khăn đóng nho phong */}
            {itemId === 'khan-dong' && (
              <g transform="translate(14, 10)">
                <path
                  d="M 12 48 C 8 24 20 10 36 10 C 52 10 64 24 60 48 C 50 44 22 44 12 48 Z"
                  fill={color || '#1F2937'}
                  stroke="#1c1917"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path d="M 14 40 Q 36 28 58 40" stroke="rgba(255,255,255,0.2)" strokeWidth="1.6" fill="none" />
                <path d="M 18 30 Q 36 20 54 30" stroke="rgba(255,255,255,0.2)" strokeWidth="1.6" fill="none" />
                <line x1="36" y1="10" x2="36" y2="46" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              </g>
            )}

            {/* Khăn mỏ quạ */}
            {itemId === 'khan-mo-qua' && (
              <g transform="translate(14, 8)">
                <path
                  d="M 10 46 C 6 24 20 8 36 8 C 52 8 66 24 62 46 C 50 40 42 38 36 44 C 30 38 22 40 10 46 Z"
                  fill={color || '#1F2937'}
                  stroke="#1c1917"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                {/* Chóp mỏ quạ nhọn rủ trước trán */}
                <polygon points="31,41 41,41 36,49" fill="#1F2937" stroke="#1c1917" strokeWidth="1.2" />
              </g>
            )}
          </g>
        )}

        {/* ========================================================= */}
        {/* 3. PHỤ KIỆN (ACCESSORIES)                                 */}
        {/* ========================================================= */}
        {category === 'phukien' && (
          <g transform="translate(0, 2)">
            {/* Kiềng bạc */}
            {itemId === 'kieng-bac' && (
              <g transform="translate(10, 8)">
                <ellipse cx="40" cy="34" rx="32" ry="24" fill="none" stroke="#CBD5E1" strokeWidth="6.5" strokeLinecap="round" />
                <ellipse cx="40" cy="34" rx="32" ry="24" fill="none" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="40" cy="34" rx="32" ry="24" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
                {/* Mặt kiềng chạm hoa sen tròn */}
                <circle cx="40" cy="58" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
                <circle cx="40" cy="58" r="2.5" fill="#E2E8F0" />
              </g>
            )}

            {/* Khăn rằn Nam Bộ */}
            {itemId === 'khan-ran' && (
              <g transform="translate(12, 6)">
                {/* Khăn vắt quàng cổ chữ U buông hai vạt */}
                <path
                  d="M 18 12 C 16 38 24 52 24 68 L 34 68 C 34 48 30 38 32 18 C 34 10 44 10 46 18 C 48 38 44 48 44 68 L 54 68 C 54 52 62 38 60 12 C 58 2 20 2 18 12 Z"
                  fill="#F8FAFC"
                  stroke="#1c1917"
                  strokeWidth="1.8"
                />
                {/* Sọc caro đen trắng đặc trưng khăn rằn */}
                {[14, 22, 30, 38, 46, 54, 62].map((y, idx) => (
                  <line key={`h-${idx}`} x1="20" y1={y} x2="34" y2={y} stroke="#1F2937" strokeWidth="1.8" />
                ))}
                {[14, 22, 30, 38, 46, 54, 62].map((y, idx) => (
                  <line key={`h2-${idx}`} x1="44" y1={y} x2="58" y2={y} stroke="#1F2937" strokeWidth="1.8" />
                ))}
                {/* Tua rua dưới chân khăn */}
                <line x1="24" y1="68" x2="24" y2="74" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="29" y1="68" x2="29" y2="74" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="34" y1="68" x2="34" y2="74" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="44" y1="68" x2="44" y2="74" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="49" y1="68" x2="49" y2="74" stroke="#1c1917" strokeWidth="1.5" />
                <line x1="54" y1="68" x2="54" y2="74" stroke="#1c1917" strokeWidth="1.5" />
              </g>
            )}

            {/* Thắt lưng vàng nghệ */}
            {itemId === 'that-lung-vang' && (
              <g transform="translate(6, 16)">
                {/* Đai bản lớn */}
                <rect x="6" y="8" width="76" height="14" rx="3" fill="#EA8308" stroke="#1c1917" strokeWidth="2" />
                {/* Nơ thắt giữa bụng */}
                <circle cx="44" cy="15" r="7" fill="#F59E0B" stroke="#1c1917" strokeWidth="1.8" />
                <ellipse cx="33" cy="15" rx="7" ry="5" fill="#EA8308" stroke="#1c1917" strokeWidth="1.5" />
                <ellipse cx="55" cy="15" rx="7" ry="5" fill="#EA8308" stroke="#1c1917" strokeWidth="1.5" />
                {/* Hai dải lụa buông dài */}
                <path d="M 40 20 L 34 56 L 43 56 L 44 20 Z" fill="#EA8308" stroke="#1c1917" strokeWidth="1.6" />
                <path d="M 44 20 L 45 52 L 53 52 L 48 20 Z" fill="#F59E0B" stroke="#1c1917" strokeWidth="1.6" />
              </g>
            )}

            {/* Trâm cài phượng hoàng */}
            {itemId === 'tram-cai' && (
              <g transform="translate(10, 10)">
                {/* Thân trâm vàng */}
                <path d="M 12 58 L 68 18" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
                <polygon points="12,58 10,64 16,61" fill="#CA8A04" stroke="#1c1917" strokeWidth="1" />
                {/* Đầu phượng xòe cánh */}
                <circle cx="68" cy="18" r="8" fill="#FBBF24" stroke="#1c1917" strokeWidth="1.8" />
                <path d="M 64 12 Q 74 6 78 14 Q 72 20 64 12 Z" fill="#EF4444" stroke="#1c1917" strokeWidth="1" />
                <circle cx="68" cy="18" r="3" fill="#EF4444" />
                {/* Hạt ngọc rủ */}
                <line x1="68" y1="26" x2="68" y2="44" stroke="#D4AF37" strokeWidth="1.4" />
                <circle cx="68" cy="34" r="2.5" fill="#38BDF8" stroke="#1c1917" strokeWidth="0.8" />
                <circle cx="68" cy="44" r="3.5" fill="#EF4444" stroke="#1c1917" strokeWidth="1" />
              </g>
            )}
          </g>
        )}

        {/* ========================================================= */}
        {/* 4. GIÀY DÉP / HÀI / GUỐC (FOOTWEAR)                       */}
        {/* ========================================================= */}
        {category === 'giay' && (
          <g transform="translate(6, 12)">
            {/* Guốc mộc */}
            {itemId === 'guoc-moc' && (
              <g>
                {/* Chiếc trái */}
                <g transform="translate(4, 0)">
                  <path d="M 8 16 C 6 28 8 46 18 46 C 28 46 30 28 28 16 Z" fill="#854D0E" stroke="#1c1917" strokeWidth="1.8" />
                  <path d="M 8 20 Q 18 14 28 20 Q 18 26 8 20 Z" fill="#3F2612" stroke="#1c1917" strokeWidth="1.4" />
                </g>
                {/* Chiếc phải */}
                <g transform="translate(46, 0)">
                  <path d="M 8 16 C 6 28 8 46 18 46 C 28 46 30 28 28 16 Z" fill="#854D0E" stroke="#1c1917" strokeWidth="1.8" />
                  <path d="M 8 20 Q 18 14 28 20 Q 18 26 8 20 Z" fill="#3F2612" stroke="#1c1917" strokeWidth="1.4" />
                </g>
              </g>
            )}

            {/* Hài mũi cong */}
            {itemId === 'hai-cong' && (
              <g>
                <g transform="translate(6, 4)">
                  <path d="M 6 12 C 6 26 10 44 20 44 C 30 44 32 26 30 12 Z" fill="#8B1528" stroke="#1c1917" strokeWidth="1.8" />
                  {/* Mũi cong nhọn vểnh lên */}
                  <path d="M 12 12 Q 18 4 24 12" stroke="#FDE047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="18" cy="8" r="2.2" fill="#FDE047" stroke="#1c1917" strokeWidth="0.8" />
                </g>
                <g transform="translate(46, 4)">
                  <path d="M 6 12 C 6 26 10 44 20 44 C 30 44 32 26 30 12 Z" fill="#8B1528" stroke="#1c1917" strokeWidth="1.8" />
                  <path d="M 12 12 Q 18 4 24 12" stroke="#FDE047" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="18" cy="8" r="2.2" fill="#FDE047" stroke="#1c1917" strokeWidth="0.8" />
                </g>
              </g>
            )}

            {/* Hài thêu chỉ vàng */}
            {itemId === 'hai-theu' && (
              <g>
                <g transform="translate(6, 4)">
                  <path d="M 6 12 C 6 26 10 44 20 44 C 30 44 32 26 30 12 Z" fill="#1E3A8A" stroke="#1c1917" strokeWidth="1.8" />
                  <path d="M 10 18 Q 18 24 26 18" stroke="#FDE047" strokeWidth="1.8" fill="none" />
                  <circle cx="18" cy="22" r="2" fill="#FDE047" />
                  <line x1="18" y1="26" x2="18" y2="38" stroke="#FDE047" strokeWidth="1.4" />
                </g>
                <g transform="translate(46, 4)">
                  <path d="M 6 12 C 6 26 10 44 20 44 C 30 44 32 26 30 12 Z" fill="#1E3A8A" stroke="#1c1917" strokeWidth="1.8" />
                  <path d="M 10 18 Q 18 24 26 18" stroke="#FDE047" strokeWidth="1.8" fill="none" />
                  <circle cx="18" cy="22" r="2" fill="#FDE047" />
                  <line x1="18" y1="26" x2="18" y2="38" stroke="#FDE047" strokeWidth="1.4" />
                </g>
              </g>
            )}

            {/* Dép quai vải */}
            {itemId === 'dep-quai' && (
              <g>
                <g transform="translate(6, 4)">
                  <ellipse cx="18" cy="28" rx="12" ry="18" fill="#E5E7EB" stroke="#1c1917" strokeWidth="1.8" />
                  <line x1="10" y1="20" x2="26" y2="20" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
                  <line x1="18" y1="16" x2="18" y2="24" stroke="#78350F" strokeWidth="2.5" />
                </g>
                <g transform="translate(46, 4)">
                  <ellipse cx="18" cy="28" rx="12" ry="18" fill="#E5E7EB" stroke="#1c1917" strokeWidth="1.8" />
                  <line x1="10" y1="20" x2="26" y2="20" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
                  <line x1="18" y1="16" x2="18" y2="24" stroke="#78350F" strokeWidth="2.5" />
                </g>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
