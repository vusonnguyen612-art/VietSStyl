import React from 'react';
import { OutfitId, HairStyleId, AccessoryId } from '../types/costume';

interface PaperDollSvgProps {
  outfitId: OutfitId;
  skinColor: string;
  hairStyle: HairStyleId;
  shirtColor: string;
  accentColor?: string;
  innerColor?: string;
  pantsColor: string;
  bottomId?: string;
  accessoryId: AccessoryId;
  shoeColor: string;
  onPartClick?: (partName: string) => void;
  className?: string;
}

export const PaperDollSvg: React.FC<PaperDollSvgProps> = ({
  outfitId,
  skinColor,
  hairStyle,
  shirtColor,
  accentColor = '#eab308',
  innerColor = '#e11d48',
  pantsColor,
  bottomId,
  accessoryId,
  shoeColor,
  onPartClick,
  className = '',
}) => {
  const handleClick = (partName: string) => {
    if (onPartClick) onPartClick(partName);
  };

  const isWearingSkirt =
    bottomId === 'vay-dup' ||
    Boolean(bottomId && bottomId.startsWith('vay')) ||
    (!bottomId && outfitId === 'ao-tu-than');

  return (
    <svg
      viewBox="0 0 280 440"
      className={`w-full h-full drop-shadow-sm overflow-visible select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Nan tre nón lá */}
        <linearGradient id="hatStrawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>

        {/* Khăn rằn caro Nam Bộ */}
        <pattern id="khanRanPattern" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#18181b" />
          <rect x="6" width="6" height="6" fill="#f4f4f5" />
          <rect y="6" width="6" height="6" fill="#f4f4f5" />
          <rect x="6" y="6" width="6" height="6" fill="#18181b" />
        </pattern>
      </defs>

      {/* ========================================================= */}
      {/* 1. GIÀY / GUỐC MỘC TRUYỀN THỐNG (HÀI CỔ PHONG HOẶC GUỐC)   */}
      {/* ========================================================= */}
      <g
        className="cursor-pointer group"
        onClick={() => handleClick('Guốc mộc')}
        aria-label="Guốc mộc truyền thống"
      >
        <title>Chạm để đổi màu guốc / hài</title>
        
        {outfitId === 'ao-ngu-than' ? (
          // Hài cổ phong truyền thống màu đen với mũi cong tự nhiên theo đúng yêu cầu đề bài
          <g>
            {/* Chân và hài bên trái */}
            <path
              d="M 124 394 
                 C 128 394 132 396 132 400 
                 C 132 408 126 414 116 414 
                 C 104 414 96 412 94 406 
                 C 93 402 96 398 100 398 
                 C 104 400 108 404 114 405 
                 C 118 402 120 396 124 394 Z"
              fill="#1c1917"
              stroke="#18181b"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Mũi hài cong nhẹ đặc trưng */}
            <path d="M 94 406 C 92 403 94 400 97 399" stroke="#18181b" strokeWidth="1.8" fill="none" />

            {/* Chân và hài bên phải */}
            <path
              d="M 156 394 
                 C 152 394 148 396 148 400 
                 C 148 408 154 414 164 414 
                 C 176 414 184 412 186 406 
                 C 187 402 184 398 180 398 
                 C 176 400 172 404 166 405 
                 C 162 402 160 396 156 394 Z"
              fill="#1c1917"
              stroke="#18181b"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M 186 406 C 188 403 186 400 183 399" stroke="#18181b" strokeWidth="1.8" fill="none" />
          </g>
        ) : (
          // Guốc mộc truyền thống với quai cong và đế gỗ
          <g>
            {/* Bàn chân trái cong mềm mại */}
            <path
              d="M 112 396 C 114 393 124 391 131 394 C 133 399 129 405 120 405 C 113 405 110 400 112 396 Z"
              fill={skinColor}
              stroke="#18181b"
              strokeWidth="2.2"
            />
            {/* Bàn chân phải cong mềm mại */}
            <path
              d="M 149 394 C 156 391 166 393 168 396 C 170 400 167 405 160 405 C 151 405 147 399 149 394 Z"
              fill={skinColor}
              stroke="#18181b"
              strokeWidth="2.2"
            />
            
            {/* Quai guốc vải cong mềm mại */}
            <path
              d="M 111 398 C 113 390 128 390 131 398"
              stroke="#451a03"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 149 398 C 152 390 167 390 169 398"
              stroke="#451a03"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Đế guốc gỗ cong uốn lượn tự nhiên */}
            <path
              d="M 107 403 C 107 400 134 400 134 403 C 135 407 134 414 132 416 C 128 417 113 417 109 416 C 107 414 106 407 107 403 Z"
              fill={shoeColor}
              stroke="#18181b"
              strokeWidth="2.4"
            />
            <path
              d="M 146 403 C 146 400 173 400 173 403 C 174 407 173 414 171 416 C 167 417 152 417 148 416 C 146 414 145 407 146 403 Z"
              fill={shoeColor}
              stroke="#18181b"
              strokeWidth="2.4"
            />
            <path d="M 107 409 C 118 410 125 410 133 409" stroke="#18181b" strokeWidth="1.4" opacity="0.25" fill="none" />
            <path d="M 146 409 C 157 410 164 410 172 409" stroke="#18181b" strokeWidth="1.4" opacity="0.25" fill="none" />
          </g>
        )}
      </g>

      {/* ========================================================= */}
      {/* 2. QUẦN / VÁY (ĐƯỜNG CONG NẾP VẢI RỦ TỰ NHIÊN)           */}
      {/* ========================================================= */}
      <g
        className="cursor-pointer group"
        onClick={() => handleClick(isWearingSkirt ? 'Váy' : 'Quần')}
        aria-label={isWearingSkirt ? 'Váy đụp cổ phong' : 'Quần lụa'}
      >
        <title>Chạm để đổi màu {isWearingSkirt ? 'váy' : 'quần'}</title>

        {isWearingSkirt ? (
          // Váy đụp cổ phong dáng xòe rộng rủ dài đến bàn chân (giống hình trong ô lựa chọn)
          <g>
            <path
              d="M 104 185
                 C 98 245 88 325 82 397
                 Q 140 404 198 397
                 C 192 325 182 245 176 185
                 Z"
              fill={pantsColor}
              stroke="#18181b"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Cạp váy vàng đồng */}
            <rect x="102" y="180" width="76" height="8" rx="2" fill="#ca8a04" stroke="#18181b" strokeWidth="1.6" />
            {/* Nếp nhún váy rủ mềm mại */}
            <path d="M 116 188 Q 110 290 102 396" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" fill="none" />
            <path d="M 118 188 Q 112 290 104 396" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" fill="none" />
            <path d="M 140 188 Q 140 290 140 398" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" fill="none" />
            <path d="M 162 188 Q 168 290 176 396" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" fill="none" />
            <path d="M 164 188 Q 170 290 178 396" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" fill="none" />
          </g>
        ) : (
          <>
            {outfitId === 'ao-ba-ba' && (
          // Quần lụa đen ống rộng với đường cong lượn tự nhiên từ hông xuống cổ chân
          <g>
            <path
              d="M 103 216 
                 C 100 240 98 280 97 320 
                 C 96 350 94 380 95 397 
                 C 105 399 125 399 133 396 
                 C 137 360 138 310 140 252 
                 C 142 310 143 360 147 396 
                 C 155 399 175 399 185 397 
                 C 186 380 184 350 183 320 
                 C 182 280 180 240 177 216 
                 Z"
              fill={pantsColor}
              stroke="#18181b"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Nếp gấp cong nhẹ dọc thân quần */}
            <path
              d="M 115 230 C 113 280 112 340 114 392"
              stroke="#000000"
              strokeWidth="1.6"
              opacity="0.28"
              fill="none"
            />
            <path
              d="M 165 230 C 167 280 168 340 166 392"
              stroke="#000000"
              strokeWidth="1.6"
              opacity="0.28"
              fill="none"
            />
            {/* Đường đáy quần cong nhẹ */}
            <path d="M 140 220 C 140 235 140 248 140 252" stroke="#18181b" strokeWidth="2.2" fill="none" />
          </g>
        )}

        {outfitId === 'ao-dai' && (
          // Quần lụa trắng dài chấm mắt cá với đường cong rủ mềm mại
          <g>
            <path
              d="M 106 195 
                 C 102 240 99 290 97 340 
                 C 95 370 93 388 94 399 
                 C 105 401 125 401 133 398 
                 C 137 355 138 300 140 250 
                 C 142 300 143 355 147 398 
                 C 155 401 175 401 186 399 
                 C 187 388 185 370 183 340 
                 C 181 290 178 240 174 195 
                 Z"
              fill={pantsColor}
              stroke="#18181b"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path d="M 114 220 C 112 280 110 340 113 394" stroke="#000000" strokeWidth="1.2" opacity="0.18" fill="none" />
            <path d="M 166 220 C 168 280 170 340 167 394" stroke="#000000" strokeWidth="1.2" opacity="0.18" fill="none" />
          </g>
        )}

            {(outfitId === 'ao-tu-than' || outfitId === 'ao-ngu-than' || outfitId === 'ao-nhat-binh' || outfitId === 'ao-tac') && (
              // Quần thụng lụa đen cổ phong cong rủ
              <g>
                <path
                  d="M 104 216 
                     C 100 250 97 300 96 350 
                     C 95 375 94 390 96 397 
                     C 106 399 125 399 133 396 
                     C 137 350 138 300 140 254 
                     C 142 300 143 350 147 396 
                     C 155 399 174 399 184 397 
                     C 186 390 185 375 184 350 
                     C 183 300 180 250 176 216 
                     Z"
                  fill={pantsColor}
                  stroke="#18181b"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </>
        )}
      </g>

      {/* ========================================================= */}
      {/* 3. LỚP THÂN TRANG PHỤC VÀ TAY ÁO (ĐƯỜNG CONG NỮ TÍNH)      */}
      {/* ========================================================= */}

      {/* A. ÁO BÀ BA (CORAL PINK THEO ĐỀ BÀI VỚI ĐƯỜNG CONG EO & VẠT) */}
      {outfitId === 'ao-ba-ba' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Áo bà ba')}
          aria-label="Áo bà ba"
        >
          <title>Chạm để đổi màu áo bà ba</title>

          {/* Tay áo trái uốn cong tự nhiên theo cánh tay */}
          <path
            d="M 106 114 
               C 96 122 84 140 76 170 
               C 70 192 68 208 72 218 
               C 78 223 94 225 101 220 
               C 104 208 108 185 112 160 
               C 114 145 116 130 118 126 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Nếp cong nhăn khuỷu tay trái */}
          <path d="M 80 162 C 86 166 90 164 92 158" stroke="#18181b" strokeWidth="1.8" fill="none" />

          {/* Tay áo phải uốn cong tự nhiên */}
          <path
            d="M 174 114 
               C 184 122 196 140 204 170 
               C 210 192 212 208 208 218 
               C 202 223 186 225 179 220 
               C 176 208 172 185 168 160 
               C 166 145 164 130 162 126 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Nếp cong nhăn khuỷu tay phải */}
          <path d="M 200 162 C 194 166 190 164 188 158" stroke="#18181b" strokeWidth="1.8" fill="none" />

          {/* Bàn tay trái cong tròn ngây thơ (naive doll hands) */}
          <path
            d="M 74 218 
               C 70 226 71 238 78 243 
               C 85 246 95 244 98 236 
               C 100 230 99 222 97 219 
               Z"
            fill={skinColor}
            stroke="#18181b"
            strokeWidth="2.2"
          />
          <path d="M 80 234 C 84 237 88 236 90 231" stroke="#18181b" strokeWidth="1.2" fill="none" />

          {/* Bàn tay phải cong tròn */}
          <path
            d="M 206 218 
               C 210 226 209 238 202 243 
               C 195 246 185 244 182 236 
               C 180 230 181 222 183 219 
               Z"
            fill={skinColor}
            stroke="#18181b"
            strokeWidth="2.2"
          />
          <path d="M 200 234 C 196 237 192 236 190 231" stroke="#18181b" strokeWidth="1.2" fill="none" />

          {/* Thân áo bà ba lượn eo thon nhẹ & vạt bầu cong tròn chuẩn dáng miền Tây */}
          <path
            d="M 112 110 
               C 122 110 134 113 140 113 
               C 146 113 158 110 168 110 
               C 173 135 176 160 174 185 
               C 173 200 174 215 178 228 
               C 168 233 155 233 140 231 
               C 125 233 112 233 102 228 
               C 106 215 107 200 106 185 
               C 104 160 107 135 112 110 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Cổ tròn áo bà ba khoét cong mềm mại */}
          <path
            d="M 128 108 C 132 115 148 115 152 108"
            stroke="#18181b"
            strokeWidth="2.2"
            fill="none"
          />

          {/* Nẹp cúc ngực giữa uốn lượn nhẹ tự nhiên */}
          <path
            d="M 140 113 C 140 150 140 190 140 231"
            stroke="#18181b"
            strokeWidth="2"
          />

          {/* Hàng 6 cúc áo ngọc tròn dọc ngực áo */}
          {[124, 142, 160, 178, 196, 214].map((y, idx) => (
            <circle
              key={idx}
              cx="140"
              cy={y}
              r="2.5"
              fill="#ffffff"
              stroke="#18181b"
              strokeWidth="1.6"
            />
          ))}

          {/* 2 Túi áo bà ba cong tròn các góc (rounded patch pockets) */}
          {/* Túi trái */}
          <path
            d="M 112 194 
               C 112 194 130 194 130 194 
               C 131 204 131 213 129 216 
               C 126 220 116 220 113 216 
               C 111 213 111 204 112 194 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.2"
          />
          <path d="M 114 198 C 122 199 126 199 128 198" stroke="#18181b" strokeWidth="1.4" strokeDasharray="1.5 1.5" fill="none" />

          {/* Túi phải */}
          <path
            d="M 150 194 
               C 150 194 168 194 168 194 
               C 169 204 169 213 167 216 
               C 164 220 154 220 151 216 
               C 149 213 149 204 150 194 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.2"
          />
          <path d="M 152 198 C 160 199 164 199 166 198" stroke="#18181b" strokeWidth="1.4" strokeDasharray="1.5 1.5" fill="none" />

          {/* Đường xẻ tà cong hai bên hông */}
          <path d="M 103 218 C 105 224 107 228 107 230" stroke="#18181b" strokeWidth="2.2" fill="none" />
          <path d="M 177 218 C 175 224 173 228 173 230" stroke="#18181b" strokeWidth="2.2" fill="none" />
        </g>
      )}

      {/* B. ÁO DÀI (ĐƯỜNG CONG THƯỚT THA UỐN LƯỢN XẺ TÀ CAO) */}
      {outfitId === 'ao-dai' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Áo dài')}
          aria-label="Áo dài"
        >
          <title>Chạm để đổi màu áo dài</title>

          {/* Tay áo raglan ôm thon */}
          <path
            d="M 106 112 C 94 125 80 155 74 190 C 72 208 76 220 80 223 C 86 226 96 223 100 216 C 104 190 108 155 116 126 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M 174 112 C 186 125 200 155 206 190 C 208 208 204 220 200 223 C 194 226 184 223 180 216 C 176 190 172 155 164 126 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* Bàn tay */}
          <path d="M 76 222 C 72 230 73 240 80 244 C 88 247 96 244 98 236 C 100 230 99 223 97 221 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />
          <path d="M 204 222 C 208 230 207 240 200 244 C 192 247 184 244 182 236 C 180 230 181 223 183 221 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />

          {/* Vạt sau áo dài thấp thoáng */}
          <path
            d="M 112 180 C 108 220 102 300 98 365 C 120 370 160 370 182 365 C 178 300 172 220 168 180 Z"
            fill={shirtColor}
            opacity="0.85"
            stroke="#18181b"
            strokeWidth="2.4"
          />

          {/* Thân trước áo dài với eo thon và vạt áo lượn sóng bay bổng */}
          <path
            d="M 116 106 
               C 126 106 134 108 140 108 
               C 146 108 154 106 164 106 
               C 170 128 174 150 171 172 
               C 168 186 172 220 176 280 
               C 180 325 184 355 183 362 
               C 165 368 115 368 97 362 
               C 96 355 100 325 104 280 
               C 108 220 112 186 109 172 
               C 106 150 110 128 116 106 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Cổ áo dài đứng cao nhẹ cong ôm gáy */}
          <path
            d="M 128 106 C 128 97 152 97 152 106 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.2"
          />

          {/* Hàng khuy bấm chạy chéo cong từ cổ qua ngực sang nách phải */}
          <path
            d="M 136 106 C 144 112 154 116 168 122"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="2 3"
            fill="none"
          />
          <circle cx="137" cy="107" r="2.2" fill="#ffffff" stroke="#18181b" strokeWidth="1.4" />
          <circle cx="147" cy="112" r="2.2" fill="#ffffff" stroke="#18181b" strokeWidth="1.4" />
          <circle cx="158" cy="117" r="2.2" fill="#ffffff" stroke="#18181b" strokeWidth="1.4" />

          {/* Đường xẻ tà cong mềm ở hai bên eo */}
          <path d="M 109 172 C 107 182 106 195 105 210" stroke="#18181b" strokeWidth="2.2" fill="none" />
          <path d="M 171 172 C 173 182 174 195 175 210" stroke="#18181b" strokeWidth="2.2" fill="none" />
        </g>
      )}

      {/* C. ÁO TỨ THÂN (ĐƯỜNG CONG VẠT ÁO, NƠ LỤA VÀNG VÀ YẾM ĐÀO) */}
      {outfitId === 'ao-tu-than' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Áo tứ thân')}
          aria-label="Áo tứ thân"
        >
          <title>Chạm để đổi màu áo tứ thân & yếm</title>

          {/* Tay áo thụng cong nhẹ */}
          <path
            d="M 106 112 C 94 125 80 155 74 190 C 72 208 76 222 82 225 C 88 227 98 224 102 216 C 106 190 110 155 118 126 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M 174 112 C 186 125 200 155 206 190 C 208 208 204 222 198 225 C 192 227 182 224 178 216 C 174 190 170 155 162 126 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* Bàn tay */}
          <path d="M 76 222 C 72 230 73 240 80 244 C 88 247 96 244 98 236 C 100 230 99 223 97 221 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />
          <path d="M 204 222 C 208 230 207 240 200 244 C 192 247 184 244 182 236 C 180 230 181 223 183 221 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />

          {/* Vạt sau áo tứ thân (ghép đôi sống lưng) */}
          <path
            d="M 112 175 C 108 220 102 295 98 368 C 120 373 160 373 182 368 C 178 295 172 220 168 175 Z"
            fill={shirtColor}
            opacity="0.9"
            stroke="#18181b"
            strokeWidth="2.6"
          />
          <path d="M 140 114 C 140 180 140 280 140 370" stroke="#18181b" strokeWidth="1.8" opacity="0.35" fill="none" />

          {/* Yếm đào bên trong cong e ấp */}
          <path
            d="M 125 102 C 132 108 148 108 155 102 C 152 128 148 152 140 168 C 132 152 128 128 125 102 Z"
            fill={innerColor}
            stroke="#18181b"
            strokeWidth="2.4"
          />
          {/* Dây yếm đào buộc cổ uốn lượn */}
          <path d="M 126 102 C 129 96 133 93 134 92" stroke="#18181b" strokeWidth="1.8" fill="none" />
          <path d="M 154 102 C 151 96 147 93 146 92" stroke="#18181b" strokeWidth="1.8" fill="none" />

          {/* 2 Vạt trước buông mở lượn sóng sang hai bên */}
          <path
            d="M 114 112 C 122 112 128 114 130 114 C 128 150 126 220 122 355 C 108 355 102 340 104 280 C 106 200 108 140 114 112 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M 166 112 C 158 112 152 114 150 114 C 152 150 154 220 158 355 C 172 355 178 340 176 280 C 174 200 172 140 166 112 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* DẢI THẮT LƯNG VÀNG NGHỆ UỐN LƯỢN NƠ DẢI BỤNG */}
          <g>
            {/* Đai lưng cong ôm trọn vòng eo */}
            <path
              d="M 112 172 C 124 175 156 175 168 172 C 168 184 167 188 166 189 C 154 191 126 191 114 189 C 113 188 112 184 112 172 Z"
              fill={accentColor}
              stroke="#18181b"
              strokeWidth="2.4"
            />
            {/* Nút thắt nơ tròn xinh xắn ở giữa */}
            <circle cx="140" cy="180" r="6.5" fill={accentColor} stroke="#18181b" strokeWidth="2.2" />

            {/* 2 Dải lụa thắt lưng buông rủ mềm mại với sóng vải uốn lượn */}
            <path
              d="M 136 186 
                 C 134 210 131 245 133 275 
                 C 134 290 133 300 135 304 
                 C 139 304 142 290 141 275 
                 C 140 245 141 210 141 186 
                 Z"
              fill={accentColor}
              stroke="#18181b"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M 143 186 
                 C 145 210 148 245 146 270 
                 C 145 285 147 295 149 298 
                 C 153 298 152 285 150 270 
                 C 148 245 145 210 143 186 
                 Z"
              fill={accentColor}
              stroke="#18181b"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>
        </g>
      )}

      {/* D. ÁO NGŨ THÂN (HAND-DRAWN PAPER DOLL STYLE: ĐƯỜNG CONG TỰ NHIÊN, KHÔNG CỨNG NHẮC) */}
      {outfitId === 'ao-ngu-than' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Áo ngũ thân')}
          aria-label="Áo ngũ thân"
        >
          <title>Chạm để đổi màu áo ngũ thân</title>

          {/* Cánh tay trái cong mềm mại buông tự nhiên */}
          <path
            d="M 108 116 
               C 98 126 88 150 82 185 
               C 76 215 75 228 80 234 
               C 86 238 98 238 103 230 
               C 107 205 110 170 116 138 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Nếp gấp cong nhẹ ở khuỷu tay áo */}
          <path d="M 84 175 C 89 180 92 178 94 172" stroke="#18181b" strokeWidth="1.6" fill="none" opacity="0.4" />

          {/* Bàn tay trái vẽ tự nhiên với các ngón tay thư thái (natural hand-drawn fingers) */}
          <g>
            <path
              d="M 80 234 
                 C 74 240 73 248 77 254 
                 C 80 258 83 258 85 253 
                 C 86 260 90 262 93 260 
                 C 95 258 96 253 96 249 
                 C 98 257 102 258 105 255 
                 C 107 252 106 246 104 240 
                 C 105 244 109 245 111 242 
                 C 113 238 111 232 105 228 
                 Z"
              fill={skinColor}
              stroke="#18181b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Kẽ ngón tay cong tự nhiên */}
            <path d="M 85 245 C 86 250 86 254 86 256" stroke="#18181b" strokeWidth="1.2" fill="none" />
            <path d="M 94 245 C 95 250 95 254 95 257" stroke="#18181b" strokeWidth="1.2" fill="none" />
            <path d="M 101 243 C 102 247 102 250 102 253" stroke="#18181b" strokeWidth="1.2" fill="none" />
          </g>

          {/* Cánh tay phải cong mềm mại buông tự nhiên */}
          <path
            d="M 172 116 
               C 182 126 192 150 198 185 
               C 204 215 205 228 200 234 
               C 194 238 182 238 177 230 
               C 173 205 170 170 164 138 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path d="M 196 175 C 191 180 188 178 186 172" stroke="#18181b" strokeWidth="1.6" fill="none" opacity="0.4" />

          {/* Bàn tay phải vẽ tự nhiên với các ngón tay thư thái (natural hand-drawn fingers) */}
          <g>
            <path
              d="M 200 234 
                 C 206 240 207 248 203 254 
                 C 200 258 197 258 195 253 
                 C 194 260 190 262 187 260 
                 C 185 258 184 253 184 249 
                 C 182 257 178 258 175 255 
                 C 173 252 174 246 176 240 
                 C 175 244 171 245 169 242 
                 C 167 238 169 232 175 228 
                 Z"
              fill={skinColor}
              stroke="#18181b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M 195 245 C 194 250 194 254 194 256" stroke="#18181b" strokeWidth="1.2" fill="none" />
            <path d="M 186 245 C 185 250 185 254 185 257" stroke="#18181b" strokeWidth="1.2" fill="none" />
            <path d="M 179 243 C 178 247 178 250 178 253" stroke="#18181b" strokeWidth="1.2" fill="none" />
          </g>

          {/* Thân áo ngũ thân dáng chữ A qua gối với bờ vai xuôi tự nhiên và vạt áo cong mềm */}
          <path
            d="M 112 110 
               C 122 110 134 113 140 113 
               C 146 113 158 110 168 110 
               C 175 140 178 180 182 230 
               C 186 270 188 310 186 325 
               C 168 330 112 330 94 325 
               C 92 310 94 270 98 230 
               C 102 180 105 140 112 110 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Cổ đứng lập lĩnh cao tròn thanh nhã */}
          <path
            d="M 128 108 C 128 97 152 97 152 108 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.4"
          />
          {/* Mép lót trắng hở nhẹ tinh tế */}
          <path d="M 130 99 C 138 97 142 97 150 99" stroke="#ffffff" strokeWidth="2.2" fill="none" />

          {/* Cúc áo cài xéo từ cổ qua ngực sang nách phải */}
          <path
            d="M 138 108 C 146 116 156 122 168 126 C 168 160 167 220 167 322"
            stroke="#18181b"
            strokeWidth="2.2"
            fill="none"
          />

          {/* 5 Hạt khuy vàng tròn nhỏ (small yellow buttons) tượng trưng Ngũ Thường */}
          <circle cx="138" cy="110" r="2.8" fill="#facc15" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="147" cy="116" r="2.8" fill="#facc15" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="157" cy="122" r="2.8" fill="#facc15" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="167" cy="130" r="2.8" fill="#facc15" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="167" cy="156" r="2.8" fill="#facc15" stroke="#18181b" strokeWidth="1.6" />
        </g>
      )}

      {/* E. ÁO NHẬT BÌNH (CỔ BÌNH LĨNH CHỮ NHẬT TO BẢN & CỬA TAY NGŨ SẮC) */}
      {outfitId === 'ao-nhat-binh' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Áo nhật bình')}
          aria-label="Áo nhật bình triều đình"
        >
          <title>Chạm để đổi màu áo nhật bình hoàng gia</title>

          {/* Tay áo rộng vừa với các dải ngũ sắc cong ở cổ tay */}
          <path
            d="M 106 112 C 92 130 76 170 70 215 C 72 225 102 230 110 226 C 114 185 118 150 122 126 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Cửa tay ngũ sắc bên trái uốn cong */}
          <path d="M 72 205 C 84 210 98 212 108 209" stroke="#3b82f6" strokeWidth="3" fill="none" />
          <path d="M 71 211 C 83 216 97 218 109 215" stroke="#eab308" strokeWidth="3" fill="none" />
          <path d="M 70 217 C 82 222 96 224 110 221" stroke="#ffffff" strokeWidth="3" fill="none" />
          <path d="M 70 223 C 82 228 96 230 110 227" stroke="#ef4444" strokeWidth="3" fill="none" />

          <path
            d="M 174 112 C 188 130 204 170 210 215 C 208 225 178 230 170 226 C 166 185 162 150 158 126 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Cửa tay ngũ sắc bên phải uốn cong */}
          <path d="M 208 205 C 196 210 182 212 172 209" stroke="#3b82f6" strokeWidth="3" fill="none" />
          <path d="M 209 211 C 197 216 183 218 171 215" stroke="#eab308" strokeWidth="3" fill="none" />
          <path d="M 210 217 C 198 222 184 224 170 221" stroke="#ffffff" strokeWidth="3" fill="none" />
          <path d="M 210 223 C 198 228 184 230 170 227" stroke="#ef4444" strokeWidth="3" fill="none" />

          {/* Bàn tay */}
          <path d="M 82 226 C 78 238 88 245 96 242 C 100 236 98 228 96 226 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />
          <path d="M 198 226 C 202 238 192 245 184 242 C 180 236 182 228 184 226 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />

          {/* Thân áo chữ A dài qua gối buông song song */}
          <path
            d="M 112 106 
               C 124 106 134 108 140 108 
               C 146 108 156 106 168 106 
               C 174 140 178 190 182 250 
               C 186 305 190 350 186 358 
               C 165 362 115 362 94 358 
               C 90 350 94 305 98 250 
               C 102 190 106 140 112 106 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* CỔ BÌNH LĨNH TO BẢN VIỀN NGŨ SẮC TRANG TRỌNG */}
          <g>
            <rect
              x="122"
              y="108"
              width="36"
              height="56"
              rx="4"
              fill="#ffffff"
              stroke="#18181b"
              strokeWidth="2.6"
            />
            <rect x="124" y="110" width="32" height="52" rx="3" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <rect x="127" y="113" width="26" height="46" rx="2" fill="none" stroke="#eab308" strokeWidth="2.5" />
            <rect x="130" y="116" width="20" height="40" rx="2" fill="none" stroke="#ef4444" strokeWidth="2.5" />

            {/* Họa tiết hoa văn trung tâm */}
            <circle cx="140" cy="135" r="4.2" fill="#fbbf24" stroke="#18181b" strokeWidth="1.6" />
            <circle cx="140" cy="151" r="3.2" fill="#3b82f6" stroke="#18181b" strokeWidth="1.4" />

            {/* Hai vạt áo xẻ song song buông thẳng */}
            <line x1="135" y1="164" x2="135" y2="358" stroke="#18181b" strokeWidth="2" />
            <line x1="145" y1="164" x2="145" y2="358" stroke="#18181b" strokeWidth="2" />
            <circle cx="140" cy="180" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
            <circle cx="140" cy="220" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
          </g>
        </g>
      )}

      {/* F. ÁO TẤC (TAY THỤNG ĐẠI LỄ RỘNG THÙNG THÌNH UỐN LƯỢN SÓNG) */}
      {outfitId === 'ao-tac' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Áo tấc')}
          aria-label="Áo tấc lễ phục"
        >
          <title>Chạm để đổi màu áo tấc đại lễ</title>

          {/* ỐNG TAY THỤNG ĐẠI LỄ CỰC RỘNG BUÔNG THÕNG UỐN LƯỢN ĐƯỜNG CONG */}
          <g>
            {/* Tay thụng bên trái với đường cong lượn mềm mại như cánh buồm */}
            <path
              d="M 106 112 
                 C 86 130 62 170 52 215 
                 C 44 260 56 295 80 306 
                 C 102 312 116 295 116 270 
                 C 116 230 116 170 120 128 
                 Z"
              fill={shirtColor}
              stroke="#18181b"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Nếp gấp ống tay thụng bay lượn */}
            <path d="M 68 220 C 72 265 92 295 106 280" stroke="#18181b" strokeWidth="2" opacity="0.3" fill="none" />

            {/* Tay thụng bên phải uốn lượn cong */}
            <path
              d="M 174 112 
                 C 194 130 218 170 228 215 
                 C 236 260 224 295 200 306 
                 C 178 312 164 295 164 270 
                 C 164 230 164 170 160 128 
                 Z"
              fill={shirtColor}
              stroke="#18181b"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path d="M 212 220 C 208 265 188 295 174 280" stroke="#18181b" strokeWidth="2" opacity="0.3" fill="none" />
          </g>

          {/* Bàn tay chắp lễ phép ở vạt tay */}
          <path d="M 96 260 C 94 272 104 277 112 272 C 114 265 112 258 108 258 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />
          <path d="M 184 260 C 186 272 176 277 168 272 C 166 265 168 258 172 258 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />

          {/* Thân áo thụng dáng chữ A lửng qua gối */}
          <path
            d="M 112 106 
               C 124 106 134 108 140 108 
               C 146 108 156 106 168 106 
               C 174 140 178 190 182 250 
               C 186 270 188 310 186 325 
               C 168 330 112 330 94 325 
               C 92 310 94 270 98 250 
               C 102 190 106 140 112 106 
               Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Cổ đứng lập lĩnh cao cài khuy kín mít */}
          <path
            d="M 126 106 C 126 95 154 95 154 106 Z"
            fill={shirtColor}
            stroke="#18181b"
            strokeWidth="2.4"
          />
          <path d="M 128 97 C 138 95 142 95 152 97" stroke="#ffffff" strokeWidth="2" fill="none" />

          {/* Cài vạt chéo sang nách phải */}
          <path
            d="M 136 106 C 146 114 158 122 170 128 C 170 170 170 240 170 322"
            stroke="#18181b"
            strokeWidth="2.2"
            fill="none"
          />

          {/* 5 Hạt khuy vàng đồng trang nghiêm */}
          <circle cx="136" cy="107" r="2.6" fill="#fef08a" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="146" cy="113" r="2.6" fill="#fef08a" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="156" cy="120" r="2.6" fill="#fef08a" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="168" cy="128" r="2.6" fill="#fef08a" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="169" cy="155" r="2.6" fill="#fef08a" stroke="#18181b" strokeWidth="1.6" />
        </g>
      )}

      {/* ========================================================= */}
      {/* 4. CỔ, KHUÔN MẶT, MẮT, MÁ HỒNG & TÓC TẾT HAI BÊN        */}
      {/* ========================================================= */}
      <g
        className="cursor-pointer group"
        onClick={() => handleClick('Khuôn mặt')}
        aria-label="Khuôn mặt và Tóc"
      >
        <title>Chạm để đổi tông da hoặc kiểu tóc</title>

        {/* Cổ mềm mại */}
        <path
          d="M 130 94 C 130 104 130 108 130 110 C 136 112 144 112 150 110 C 150 108 150 104 150 94 Z"
          fill={skinColor}
          stroke="#18181b"
          strokeWidth="2.2"
        />

        {/* ========================================================= */}
        {/* TÓC TẾT HAI BÊN (BRAIDS) VỚI CÁC MẮT TẾT CONG TỰ NHIÊN     */}
        {/* ========================================================= */}
        {hairStyle === 'braids' && (
          <g>
            {/* BÍM TÓC TRÁI VỚI CÁC MẮT TẾT CONG LƯỢN SÓNG */}
            <path
              d="M 112 78 
                 C 106 88 100 100 102 114 
                 C 98 124 98 136 104 148 
                 C 102 156 104 166 110 172 
                 C 114 176 115 178 114 182 
                 C 111 184 108 180 107 176 
                 C 100 165 94 150 94 136 
                 C 94 120 98 102 108 82 
                 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.4"
            />
            {/* Các mắt bím tóc lượn cong tự nhiên */}
            <path d="M 100 106 C 104 114 108 116 112 110" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            <path d="M 98 124 C 102 132 108 134 113 128" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            <path d="M 100 142 C 105 150 111 152 114 146" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            <path d="M 104 160 C 108 168 113 170 116 164" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            {/* Dây thun đỏ buộc bím tóc */}
            <ellipse cx="112" cy="176" rx="4" ry="2.8" fill="#ef4444" stroke="#18181b" strokeWidth="1.4" />
            {/* Đuôi tóc vểnh cong nhẹ */}
            <path d="M 112 178 C 114 184 118 188 120 186 C 117 183 115 180 114 178" fill="#18181b" stroke="#18181b" strokeWidth="1.6" />

            {/* BÍM TÓC PHẢI VỚI CÁC MẮT TẾT CONG LƯỢN SÓNG */}
            <path
              d="M 168 78 
                 C 174 88 180 100 178 114 
                 C 182 124 182 136 176 148 
                 C 178 156 176 166 170 172 
                 C 166 176 165 178 166 182 
                 C 169 184 172 180 173 176 
                 C 180 165 186 150 186 136 
                 C 186 120 182 102 172 82 
                 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.4"
            />
            <path d="M 180 106 C 176 114 172 116 168 110" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            <path d="M 182 124 C 178 132 172 134 167 128" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            <path d="M 180 142 C 175 150 169 152 166 146" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            <path d="M 176 160 C 172 168 167 170 164 164" stroke="#3f3f46" strokeWidth="1.8" fill="none" />
            {/* Dây thun đỏ buộc bím tóc */}
            <ellipse cx="168" cy="176" rx="4" ry="2.8" fill="#ef4444" stroke="#18181b" strokeWidth="1.4" />
            <path d="M 168 178 C 166 184 162 188 160 186 C 163 183 165 180 166 178" fill="#18181b" stroke="#18181b" strokeWidth="1.6" />
          </g>
        )}

        {/* Hai vành tai cong mềm mại */}
        <path d="M 114 72 C 108 72 108 84 114 84 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />
        <path d="M 112 75 C 110 77 110 80 113 81" stroke="#18181b" strokeWidth="1.4" fill="none" />

        <path d="M 166 72 C 172 72 172 84 166 84 Z" fill={skinColor} stroke="#18181b" strokeWidth="2.2" />
        <path d="M 168 75 C 170 77 170 80 167 81" stroke="#18181b" strokeWidth="1.4" fill="none" />

        {/* Khuôn mặt trái xoan cong tròn ngây thơ (naive oval doll face) */}
        <path
          d="M 114 66 
             C 112 50 126 44 140 44 
             C 154 44 168 50 166 66 
             C 168 82 165 96 156 104 
             C 148 110 132 110 124 104 
             C 115 96 112 82 114 66 
             Z"
          fill={skinColor}
          stroke="#18181b"
          strokeWidth="2.8"
        />

        {/* Hai đốm má hồng phúng phính đáng yêu */}
        <ellipse cx="124" cy="85" rx="5.5" ry="4.5" fill="#fb7185" opacity="0.45" />
        <ellipse cx="156" cy="85" rx="5.5" ry="4.5" fill="#fb7185" opacity="0.45" />

        {/* Lông mày cong thanh tú mềm mại */}
        <path d="M 124 67 C 128 63 134 63 136 67" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 144 67 C 146 63 152 63 156 67" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Đôi mắt chấm bi đen tròn xoe ngây thơ có đốm sáng học trò */}
        <circle cx="129" cy="74" r="2.8" fill="#18181b" />
        <circle cx="130" cy="73" r="1.1" fill="#ffffff" />
        <circle cx="151" cy="74" r="2.8" fill="#18181b" />
        <circle cx="152" cy="73" r="1.1" fill="#ffffff" />

        {/* Sống mũi nhỏ xinh chấm nhẹ */}
        <path d="M 140 78 C 141 80 140 82 139 82" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Nụ cười hiền hậu cong mềm mại */}
        <path d="M 134 89 C 137 94 143 94 146 89" stroke="#18181b" strokeWidth="2.4" strokeLinecap="round" fill="none" />

        {/* TÓC MÁI VÀ PHẦN TÓC TRÊN ĐẦU (ĐƯỜNG CONG TỰ NHIÊN) */}
        {hairStyle === 'braids' && (
          // Tóc rẽ ngôi cong mềm với tóc mái lưa thưa peeking out
          <g>
            <path
              d="M 114 66 
                 C 114 46 166 46 166 66 
                 C 156 58 148 56 140 58 
                 C 132 56 124 58 114 66 
                 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.4"
            />
            {/* Lọn tóc mái cong nhẹ nhô ra dưới nón lá */}
            <path d="M 133 58 C 136 64 139 64 141 59 C 143 64 146 64 148 58" stroke="#18181b" strokeWidth="2" fill="none" />
          </g>
        )}

        {hairStyle === 'short' && (
          // Tóc ngắn uốn cúp cong tròn
          <g>
            <path
              d="M 112 68 
                 C 112 44 168 44 168 68 
                 C 158 58 148 56 140 58 
                 C 132 56 122 58 112 68 
                 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.4"
            />
            <path d="M 112 68 C 114 78 117 78 120 72" fill="#18181b" />
            <path d="M 168 68 C 166 78 163 78 160 72" fill="#18181b" />
          </g>
        )}

        {hairStyle === 'bun' && (
          // Búi tóc cong tròn trên đỉnh kèm trâm cài
          <g>
            <path
              d="M 114 66 C 114 46 166 46 166 66 C 156 58 124 58 114 66 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.4"
            />
            <circle cx="140" cy="40" r="14" fill="#18181b" stroke="#18181b" strokeWidth="2.6" />
            <line x1="120" y1="38" x2="160" y2="38" stroke="#eab308" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="120" cy="38" r="2.8" fill="#ef4444" />
          </g>
        )}

        {hairStyle === 'low-tie' && (
          // Tóc buộc thấp đuôi ngựa: chòm tóc hơi chéo buông trước ngực, không lấn ra ngoài
          <g>
            <path
              d="M 114 66 C 114 46 166 46 166 66 C 156 58 124 58 114 66 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2.4"
            />
            {/* Chòm tóc hơi chéo buông trước ngực */}
            <path
              d="M 134 98 
                 C 130 110 122 126 124 146 
                 C 125 160 128 174 132 184 
                 L 134 184 
                 C 133 172 131 160 131 146 
                 C 130 128 135 110 137 98 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M 133 112 Q 125 136 129 166" stroke="#3f3f46" strokeWidth="1.4" fill="none" />
            {/* Dây nơ đỏ buộc sau gáy */}
            <ellipse cx="134" cy="98" rx="3.8" ry="2.4" fill="#ef4444" stroke="#18181b" strokeWidth="1" />
            <path d="M 132 99 Q 128 103 130 106" stroke="#dc2626" strokeWidth="1.2" fill="none" />
            <path d="M 136 99 Q 140 103 138 106" stroke="#dc2626" strokeWidth="1.2" fill="none" />
          </g>
        )}
      </g>

      {/* ========================================================= */}
      {/* 5. PHỤ KIỆN ĐỘI ĐẦU: NÓN LÁ CÓ QUAI NÓN VÀ ĐƯỜNG CONG      */}
      {/* ========================================================= */}
      {accessoryId !== 'none' && (
        <g
          className="cursor-pointer group"
          onClick={() => handleClick('Phụ kiện đội đầu')}
          aria-label="Phụ kiện đội đầu"
        >
          <title>Chạm để đổi hoặc cất phụ kiện</title>

          {/* A. NÓN LÁ NAN TRE VỚI VÀNH NÓN CONG & QUAI NÓN HUGGING CẰM */}
          {accessoryId === 'non-la' && (
            <g>
              {/* Quai nón đen mỏng cong nhẹ dưới cằm (black chinstrap) */}
              <path
                d="M 118 78 C 124 104 156 104 162 78"
                stroke="#18181b"
                strokeWidth="2"
                fill="none"
              />

              {/* Nón lá hình chóp với vành đáy cong lượn tự nhiên */}
              <path
                d="M 140 14 
                   C 114 36 76 60 36 82 
                   C 76 86 130 88 140 88 
                   C 150 88 204 86 244 82 
                   C 204 60 166 36 140 14 
                   Z"
                fill="url(#hatStrawGrad)"
                stroke="#18181b"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Các đường nan nón uốn cong đều đặn */}
              <path d="M 46 76 C 96 82 184 82 234 76" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.85" />
              <path d="M 68 62 C 104 68 176 68 212 62" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.85" />
              <path d="M 94 44 C 118 50 162 50 186 44" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.85" />
              <path d="M 140 14 C 140 38 140 68 140 88" stroke="#ca8a04" strokeWidth="1.6" opacity="0.6" fill="none" />
            </g>
          )}

          {/* B. KHĂN MỎ QUẠ BẮC BỘ (CONG MỀM CHÍT ĐẦU) */}
          {accessoryId === 'khan-mo-qua' && (
            <g>
              <path
                d="M 112 76 C 112 40 168 40 168 76 C 158 64 146 64 140 68 C 134 64 122 64 112 76 Z"
                fill="#18181b"
                stroke="#18181b"
                strokeWidth="2.6"
              />
              <polygon points="135,66 145,66 140,71" fill="#18181b" stroke="#18181b" strokeWidth="1.6" />
              <path d="M 113 76 C 118 84 126 88 132 94" stroke="#18181b" strokeWidth="2.2" fill="none" />
              <path d="M 167 76 C 162 84 154 88 148 94" stroke="#18181b" strokeWidth="2.2" fill="none" />
            </g>
          )}

          {/* C. KHĂN XẾP (KHĂN VẤN) TRUYỀN THỐNG VIỆT NAM MÀU ĐEN - DÁNG DẸT HÌNH CHỮ NHẬT NGANG ÔM SÁT ĐỈNH ĐẦU */}
          {accessoryId === 'khan-van' && (
            <g>
              {/* Hình chữ nhật ngang dáng dẹt màu đen ôm sát đỉnh đầu */}
              <rect
                x="112"
                y="42"
                width="56"
                height="15"
                rx="2"
                fill="#18181b"
                stroke="#18181b"
                strokeWidth="2"
              />
              {/* Các nếp vải ngang song song phong cách 2D phẳng */}
              <line x1="113" y1="46" x2="167" y2="46" stroke="#2d2d32" strokeWidth="1" />
              <line x1="113" y1="50" x2="167" y2="50" stroke="#2d2d32" strokeWidth="1" />
              <line x1="113" y1="54" x2="167" y2="54" stroke="#2d2d32" strokeWidth="1" />
              {/* Nếp chữ Nhân tinh tế ở giữa trán */}
              <path d="M 136 57 L 140 51 L 144 57" stroke="#4b5563" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* D. KHĂN RẰN NAM BỘ QUÀNG CỔ */}
          {accessoryId === 'khan-ran' && (
            <g>
              <path
                d="M 124 94 C 134 102 146 102 156 94 C 162 104 152 110 140 114 C 128 110 118 104 124 94 Z"
                fill="url(#khanRanPattern)"
                stroke="#18181b"
                strokeWidth="2.2"
              />
              <path
                d="M 123 104 C 123 124 123 150 123 172 C 129 174 135 174 135 172 C 135 150 135 124 135 104 Z"
                fill="url(#khanRanPattern)"
                stroke="#18181b"
                strokeWidth="2"
              />
              <line x1="123" y1="172" x2="135" y2="172" stroke="#18181b" strokeWidth="2" strokeDasharray="2 2" />

              <path
                d="M 145 104 C 145 124 145 146 145 166 C 151 168 157 168 157 166 C 157 146 157 124 157 104 Z"
                fill="url(#khanRanPattern)"
                stroke="#18181b"
                strokeWidth="2"
              />
              <line x1="145" y1="166" x2="157" y2="166" stroke="#18181b" strokeWidth="2" strokeDasharray="2 2" />
            </g>
          )}

          {/* E. NÓN QUAI THAO TRÒN QUAN HỌ */}
          {accessoryId === 'non-quai-thao' && (
            <g>
              <circle cx="140" cy="48" r="42" fill="#fef08a" stroke="#18181b" strokeWidth="2.8" opacity="0.95" />
              <circle cx="140" cy="48" r="38" fill="none" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="140" cy="48" r="26" fill="none" stroke="#ca8a04" strokeWidth="1.8" />
              <path d="M 104 74 C 98 120 102 155 110 182" stroke="#b91c1c" strokeWidth="3" fill="none" />
              <path d="M 176 74 C 182 120 178 155 170 182" stroke="#b91c1c" strokeWidth="3" fill="none" />
            </g>
          )}

          {/* F. KHĂN VẤN HOÀNG CUNG NHẬT BÌNH */}
          {accessoryId === 'nhat-binh-crown' && (
            <g>
              <ellipse cx="140" cy="46" rx="31" ry="14" fill="#b91c1c" stroke="#18181b" strokeWidth="2.8" />
              <path
                d="M 109 46 C 109 66 171 66 171 46 L 171 38 C 171 20 109 20 109 38 Z"
                fill="#dc2626"
                stroke="#18181b"
                strokeWidth="2.6"
              />
              <circle cx="140" cy="42" r="5" fill="#fef08a" stroke="#18181b" strokeWidth="1.8" />
              <path d="M 130 42 C 135 36 145 36 150 42" stroke="#fef08a" strokeWidth="2.5" fill="none" />
              <circle cx="126" cy="44" r="2.5" fill="#38bdf8" />
              <circle cx="154" cy="44" r="2.5" fill="#38bdf8" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
};
