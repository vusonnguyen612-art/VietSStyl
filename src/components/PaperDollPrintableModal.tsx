import React from 'react';
import { X, Printer, Scissors, Download, Sparkles } from 'lucide-react';
import { PaperDollSvg } from './PaperDollSvg';
import { COSTUMES_DATA } from '../data/costumesData';
import { OutfitId } from '../types/costume';

interface PaperDollPrintableModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOutfitId: OutfitId;
  skinColor: string;
  shirtColor: string;
  pantsColor: string;
  bottomId?: string;
}

export const PaperDollPrintableModal: React.FC<PaperDollPrintableModalProps> = ({
  isOpen,
  onClose,
  currentOutfitId,
  skinColor,
  shirtColor,
  pantsColor,
  bottomId,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border-4 border-[#3f3398] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#3f3398] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                PHIẾU BÀI TẬP: BÚP BÊ GIẤY CẮT DÁN CỔ PHỤC VIỆT NAM
              </h3>
              <p className="text-[11px] text-indigo-200">
                In ra giấy A4 hoặc bìa cứng, dùng kéo cắt theo mép để chơi thay đồ búp bê giấy truyền thống
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Khung Phiếu Giấy In Học Sinh */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#fbfbf7] notebook-grid">
          <div className="max-w-3xl mx-auto bg-white border-2 border-dashed border-stone-400 p-6 rounded-xl shadow-sm relative">
            {/* Header phiếu học sinh */}
            <div className="flex justify-between items-start border-b-2 border-stone-800 pb-3 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase">
                  BÚP BÊ GIẤY: PHỤC TRANG TRUYỀN THỐNG DÂN TỘC
                </h2>
                <p className="text-xs text-stone-600">
                  Môn: Mỹ thuật 5 · Chủ đề: Tự hào bản sắc trang phục Việt Nam
                </p>
              </div>
              <div className="text-right text-xs text-stone-700">
                <p>Họ tên: <span className="border-b border-dotted border-stone-500 inline-block w-28">Nguyễn Minh Tâm</span></p>
                <p className="mt-1">Lớp: <span className="border-b border-dotted border-stone-500 inline-block w-28">5A</span></p>
              </div>
            </div>

            {/* Hướng dẫn cắt dán */}
            <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs p-2.5 rounded-lg mb-5 flex items-center gap-2">
              <Scissors className="w-4 h-4 flex-shrink-0" />
              <span>
                <b>Hướng dẫn:</b> Cắt theo đường viền đen xung quanh nhân vật. Giữ lại các tai gập (mép giấy) ở hai vai và hông để gập cài lên thân búp bê!
              </span>
            </div>

            {/* Bố cục mẫu búp bê và các bộ trang phục */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Cột trái: Búp bê hiện tại của học sinh */}
              <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-[#3f3398] mb-2 uppercase tracking-wide">
                  1. Mẫu búp bê hoàn chỉnh của em
                </span>
                <div className="w-[190px] h-[300px]">
                  <PaperDollSvg
                    outfitId={currentOutfitId}
                    skinColor={skinColor}
                    hairStyle="braids"
                    shirtColor={shirtColor}
                    pantsColor={pantsColor}
                    bottomId={bottomId}
                    accessoryId="non-la"
                    shoeColor="#784421"
                  />
                </div>
                <span className="text-[11px] text-stone-500 italic mt-2">
                  Đã phối màu theo thẩm mỹ của học sinh
                </span>
              </div>

              {/* Cột phải: Hình ảnh minh họa nguyên bản Áo Bà Ba & 5 Cổ Phục */}
              <div className="space-y-3">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-stone-800 block mb-1.5">
                    {currentOutfitId === 'ao-ngu-than'
                      ? '2. Minh họa gốc Áo Ngũ Thân vẽ tay thủ công:'
                      : '2. Minh họa búp bê giấy thủ công truyền thống:'}
                  </span>
                  <img
                    src={
                      currentOutfitId === 'ao-ngu-than'
                        ? '/src/assets/images/ao_ngu_than_doll_1791469432477.jpg'
                        : '/src/assets/images/paper_doll_character_1791545465083.jpg'
                    }
                    alt="Minh họa gốc"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[140px] object-contain rounded border border-stone-200 bg-white"
                  />
                </div>

                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-stone-800 block mb-1.5">
                    3. Bộ 5 Cổ Phục truyền thống (Áo dài, Tứ thân, Ngũ thân, Nhật bình, Áo tấc):
                  </span>
                  <img
                    src="/src/assets/images/five_traditional_outfits_1791467923646.jpg"
                    alt="Bộ 5 Cổ Phục gốc"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[140px] object-contain rounded border border-stone-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Dấu mộc cô giáo ở cuối trang */}
            <div className="mt-6 pt-3 border-t border-stone-300 flex justify-between items-center text-xs text-stone-500">
              <span className="italic font-serif">Trường Tiểu học Thăng Long · Năm học 2026 - 2027</span>
              <div className="text-right">
                <span className="text-[#ea384d] font-handwriting text-base font-bold">
                  Cô Nga đã duyệt: Điểm 10 ⭐⭐⭐
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Hành động */}
        <div className="bg-white border-t border-stone-200 px-5 py-3 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Có thể bấm nút In trang để in phiếu bài tập
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#3f3398] text-white text-xs font-bold hover:bg-[#32287a] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>In Phiếu Bài Tập</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 text-stone-800 text-xs font-semibold hover:bg-stone-300 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
