import React, { useState } from 'react';
import { OutfitId } from '../types/costume';
import { COSTUMES_DATA } from '../data/costumesData';
import { X, Check, BookOpen, ShieldCheck, Flame, Compass } from 'lucide-react';
import { Costume2DPreview } from './Costume2DPreview';

interface CostumeGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOutfit: (id: OutfitId) => void;
  currentOutfitId: OutfitId;
}

export const CostumeGalleryModal: React.FC<CostumeGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectOutfit,
  currentOutfitId,
}) => {
  const [selectedInspectId, setSelectedInspectId] = useState<OutfitId>(currentOutfitId);
  const [activeViewMode, setActiveViewMode] = useState<'cards' | 'compare' | 'history'>('cards');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#FAF7EE] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Dải trang trí mạ vàng trên nóc */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37]" />

        {/* Header Modal phong cách Thẻ Bài Hoàng Kim */}
        <div className="bg-[#8B1528] text-white px-5 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FBBF24] to-[#B45309] text-stone-900 flex items-center justify-center font-bold text-lg shadow-xs">
              🎴
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg tracking-wide uppercase text-amber-100 flex items-center gap-2">
                <span>ALBUM THẺ BÀI CỔ PHỤC 2D VIỆT NAM</span>
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thanh gợi ý phụ */}
        <div className="bg-[#FFFDF7] px-4 py-2 flex items-center justify-between gap-2 shadow-2xs">
          <span className="text-xs text-stone-500 italic">
            💡 Nhấp vào thẻ để trang bị ngay vào phòng thử đồ
          </span>
        </div>

        {/* Nội dung trung tâm */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FAF7EE]">
          {/* 1. CHẾ ĐỘ XEM THẺ BÀI SƯU TẦM 2D THUẦN TÚY (CHÍNH) */}
          {activeViewMode === 'cards' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COSTUMES_DATA.map((costume) => {
                  const isCurrent = currentOutfitId === costume.id;
                  return (
                    <div
                      key={costume.id}
                      onClick={() => {
                        setSelectedInspectId(costume.id);
                        onSelectOutfit(costume.id);
                      }}
                      className={`rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden relative group bg-white ${
                        isCurrent
                          ? 'shadow-md ring-2 ring-[#8B1528]/25 -translate-y-1'
                          : 'shadow-xs hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {/* Tiêu đề thẻ */}
                      <div className="p-3 bg-[#FAF7EE] flex items-center justify-between">
                        <h4 className="font-bold text-xs text-stone-900 leading-tight truncate">
                          {costume.name}
                        </h4>
                      </div>

                      {/* Khung phục sức 2D thuần túy */}
                      <div className="relative overflow-hidden bg-[#FAF6EC] group-hover:bg-[#F5EFE0] h-48 flex items-center justify-center p-3 group transition-colors duration-200">
                        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <Costume2DPreview
                            outfitId={costume.id}
                            primaryColor={costume.defaultColors.primary}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="absolute top-2 right-2 bg-white/90 text-[#8B1528] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                          {costume.badge}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white/90 text-stone-600 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                          2D Cổ Phục
                        </div>
                      </div>

                      {/* Thông tin & Chân thẻ */}
                      <div className="p-3 space-y-1.5 bg-white">
                        <div className="text-[10px] text-stone-600 line-clamp-2 leading-snug">
                          {costume.description}
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                          <span className="text-[#8B1528] font-bold flex items-center gap-1 font-mono">
                            <Flame className="w-3 h-3 text-amber-600" />
                            <span>CP {costume.stats.culturePower}</span>
                          </span>

                          {isCurrent ? (
                            <span className="flex items-center gap-0.5 font-bold text-[#8B1528] bg-red-50 px-2 py-0.5 rounded shadow-2xs">
                              <Check className="w-3 h-3 text-[#8B1528] stroke-[3]" />
                              <span>Đang Mặc</span>
                            </span>
                          ) : (
                            <span className="text-amber-800 font-semibold group-hover:underline">
                              Chọn Mặc ➔
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. CHẾ ĐỘ XEM ĐỐI SOÁT CẤU TRÚC ĐIỂN LỆ (2D) */}
          {activeViewMode === 'compare' && (
            <div className="space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs space-y-3">
                <h3 className="font-bold text-sm text-[#8B1528] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B1528]" />
                  <span>Bảng Đối Soát Cấu Trúc Điển Lệ Cổ Phục (2D)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COSTUMES_DATA.map((c) => (
                    <div key={c.id} className="p-3.5 bg-[#FAF7EE] rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-stone-900 text-sm">{c.name}</h4>
                        <span className="text-[10px] font-bold text-[#8B1528] bg-white px-2 py-0.5 rounded shadow-2xs">
                          {c.era}
                        </span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="w-20 h-20 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center shadow-2xs">
                          <Costume2DPreview outfitId={c.id} className="w-full h-full" />
                        </div>
                        <ul className="text-xs text-stone-700 space-y-1">
                          <li>• <b>Kiểu cổ:</b> {c.structure.collar}</li>
                          <li>• <b>Tay áo:</b> {c.structure.sleeves}</li>
                          <li>• <b>Tà áo:</b> {c.structure.flaps}</li>
                          <li>• <b>Khuy cài:</b> {c.structure.buttons}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. CHẾ ĐỘ XEM CẨM NANG VĂN HÓA & LỊCH SỬ */}
          {activeViewMode === 'history' && (
            <div className="bg-white p-5 rounded-2xl shadow-xs space-y-4 text-xs">
              <h3 className="font-bold text-sm text-[#8B1528] uppercase border-b border-stone-100 pb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#8B1528]" />
                <span>Cẩm Nang Văn Hóa & Nguồn Gốc Lịch Sử Di Sản</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COSTUMES_DATA.map((c) => (
                  <div key={c.id} className="p-4 bg-[#FAF7EE] rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <b className="text-stone-900 text-sm block">{c.name} ({c.badge})</b>
                      <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded shadow-2xs">
                        {c.region}
                      </span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">{c.historyNote}</p>
                    <div className="text-[11px] text-[#8B1528] font-semibold pt-1 border-t border-stone-200/60">
                      📜 Điển lệ: {c.collectorQuote}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-stone-100 px-5 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#8B1528] text-white rounded-xl text-xs font-bold hover:bg-[#721020] transition-colors cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02]"
          >
            Đóng Album
          </button>
        </div>
      </div>
    </div>
  );
};
