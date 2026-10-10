import React from 'react';

interface VietSStylLogoProps {
  size?: number; // Kích thước icon (mặc định 36px)
  showText?: boolean;
  textColor?: string;
  className?: string;
}

export const VietSStylLogo: React.FC<VietSStylLogoProps> = ({
  size = 36,
  showText = true,
  textColor = 'text-stone-900',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Biểu tượng Nón Lá & Dải Lụa Chữ S chuẩn theo ảnh thiết kế */}
      <div
        className="shrink-0 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-transform duration-200 hover:scale-105 flex items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: '#801424', // Màu đỏ thẫm cổ phong chuẩn của logo
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ======================================================== */}
          {/* PHẦN 1: NÓN LÁ TRUYỀN THỐNG (CONICAL HAT)                */}
          {/* ======================================================== */}
          {/* Vành đáy nón lá uốn cong nhẹ hai đầu */}
          <path
            d="M 18 36 C 36 41 64 41 82 36"
            stroke="#E5A93C"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Thân nón lá hình nón với đỉnh chóp tròn */}
          <path
            d="M 18 36 C 24 30 36 20 50 10 C 64 20 76 30 82 36"
            stroke="#E5A93C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Nan sườn bên trái */}
          <path
            d="M 50 12 L 34 38"
            stroke="#E5A93C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Nan sườn bên phải */}
          <path
            d="M 50 12 L 66 38"
            stroke="#E5A93C"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Cung vòm mở bên dưới nón */}
          <path
            d="M 23 37 C 32 30 68 30 77 37"
            stroke="#E5A93C"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* ======================================================== */}
          {/* PHẦN 2: DẢI LỤA / NGỌN GIÓ HÌNH CHỮ S (S-SHAPE SWIRL)    */}
          {/* ======================================================== */}
          {/* Nhánh lượn chính xuất phát từ dưới nón tạo thành chữ S lớn */}
          <path
            d="M 48 39 
               C 42 45 42 52 50 56 
               C 62 60 76 60 84 70 
               C 90 78 86 88 74 90 
               C 62 92 46 88 34 82 
               C 22 76 16 78 12 84"
            stroke="#E5A93C"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Đường xoắn ốc / móc cuộn tròn bên trong bụng chữ S */}
          <path
            d="M 37 50 
               C 35 55 35 60 41 62 
               C 49 65 62 65 67 72 
               C 70 77 66 82 61 82 
               C 56 82 53 77 56 73 
               C 58 70 63 71 64 74"
            stroke="#E5A93C"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Dải đuôi gió lượn song song ở góc dưới */}
          <path
            d="M 12 84 
               C 18 76 28 72 42 74 
               C 50 75 58 80 58 85 
               C 58 90 48 92 38 90 
               C 28 88 18 84 12 84 Z"
            fill="#E5A93C"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Tên thương hiệu VietSStyl */}
      {showText && (
        <div className="flex items-center gap-1 select-none">
          <span className={`font-serif text-base sm:text-lg font-black tracking-tight leading-none ${textColor}`}>
            Viet<span className="text-[#8B1528] font-black">S</span><span className="text-[#C28C1E]">Styl</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#801424] text-amber-200 px-1.5 py-0.5 rounded shadow-2xs leading-none">
            Cổ Phục
          </span>
        </div>
      )}
    </div>
  );
};
