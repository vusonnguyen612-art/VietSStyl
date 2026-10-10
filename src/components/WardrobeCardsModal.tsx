import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Bookmark,
  Trash2,
  Edit3,
  Calendar,
  MapPin,
  Flame,
  Award,
  Layers,
  Check,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { SavedOutfitCard } from '../types/costume';
import { PavilionDollStage } from './PavilionDollStage';
import { CircularEnergyScore } from './CircularEnergyScore';

interface WardrobeCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOutfits: SavedOutfitCard[];
  onLoadAndEdit: (outfit: SavedOutfitCard) => void;
  onDeleteOutfit: (id: string) => void;
  onOpenSaveCurrent: () => void;
  onTriggerAiForOutfit?: (outfit: SavedOutfitCard) => void;
}

export const WardrobeCardsModal: React.FC<WardrobeCardsModalProps> = ({
  isOpen,
  onClose,
  savedOutfits,
  onLoadAndEdit,
  onDeleteOutfit,
  onOpenSaveCurrent,
  onTriggerAiForOutfit,
}) => {
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const filtered = savedOutfits.filter((item) => {
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.outfitName.toLowerCase().includes(q) ||
        item.eventName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#FAF7EE] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Nẹp chỉ mạ vàng */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37]" />

        {/* Header Modal */}
        <div className="bg-[#8B1528] text-white px-5 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
              🗄️
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg tracking-wide uppercase text-amber-100 flex items-center gap-2">
                <span>KHO TỦ ĐỒ CỔ PHONG · THẺ BÀI ĐÃ LƯU</span>
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

        {/* Thanh công cụ lọc & tìm kiếm (loại bỏ viền) */}
        <div className="bg-[#FFFDF7] px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-2xs">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto bg-[#EDE4CF]/60 p-1 rounded-xl">
            <button
              onClick={() => setFilterRarity('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                filterRarity === 'all'
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              Tất Cả ({savedOutfits.length})
            </button>
            <button
              onClick={() => setFilterRarity('SSR')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                filterRarity === 'SSR'
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              SSR · Hoàng Kim
            </button>
            <button
              onClick={() => setFilterRarity('SR')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                filterRarity === 'SR'
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              SR · Cổ Phong
            </button>
            <button
              onClick={() => setFilterRarity('R')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                filterRarity === 'R'
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              R · Dân Gian
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm bộ phối..."
              className="flex-1 sm:w-48 px-3 py-1.5 bg-white border-0 shadow-2xs rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8B1528]"
            />
            <button
              onClick={onOpenSaveCurrent}
              className="px-3 py-1.5 bg-[#8B1528] text-white rounded-xl text-xs font-bold hover:bg-[#721020] transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Lưu Bộ Hiện Tại</span>
            </button>
          </div>
        </div>

        {/* Lưới Thẻ Bài Bộ Phối Đã Lưu */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#FAF7EE]">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xs p-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Chưa có thẻ bài bộ phối nào phù hợp
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Hãy quay lại phòng thử đồ và bấm nút <b>"Lưu Bộ Phối"</b> để lưu trữ các sáng tạo trang phục của bạn vào kho tủ đồ này.
              </p>
              <button
                onClick={onOpenSaveCurrent}
                className="mt-2 px-4 py-2 bg-[#8B1528] text-white rounded-xl text-xs font-bold hover:bg-[#721020] inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Lưu Bộ Đang Mặc Ngay</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
                  >
                    {/* Header Thẻ Bài */}
                    <div className="bg-[#8B1528] text-white px-3.5 py-2.5 flex items-center justify-between">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-amber-100 truncate flex-1">
                        {card.name}
                      </h4>
                    </div>

                    {/* Vùng Trực Quan Người Mẫu Mặc Bộ Phối & Bảng Màu */}
                    <div className="relative bg-[#FAF7EE] p-3 flex flex-col items-center justify-center">
                      <div className="w-full h-56 rounded-xl bg-white p-1.5 flex items-center justify-center relative overflow-hidden shadow-2xs border border-amber-200/40">
                        <PavilionDollStage
                          outfitId={card.outfitId}
                          shirtColor={card.shirtColor}
                          pantsColor={card.pantsColor}
                          bottomId={card.bottomId}
                          hatColor={card.hatColor}
                          hatId={card.hatId}
                          hasSilverNecklace={card.hasSilverNecklace}
                          selectedAccessories={card.selectedAccessories || (card.hasSilverNecklace ? ['kieng-bac'] : [])}
                          shoeId={card.shoeId || 'guoc-moc'}
                          skinColor={card.skinColor || '#fde5d4'}
                          hairStyle={card.hairStyle || 'braids'}
                          dollImage={card.dollImage}
                          isThumbnail={true}
                          zoomLevel={1}
                        />

                        {/* Huy hiệu Người Mẫu */}
                        <div className="absolute top-2 left-2 bg-[#8B1528]/85 text-amber-100 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                          {card.outfitName}
                        </div>

                        {/* Điểm số AI dạng thanh năng lượng hình tròn bao quanh, số điểm ở giữa */}
                        {card.aiEvaluation && (
                          <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white p-1 rounded-xl shadow-md flex items-center gap-1 border border-amber-300/40">
                            <CircularEnergyScore
                              score={card.aiEvaluation.overallScore}
                              maxScore={10}
                              size={32}
                              strokeWidth={3}
                              variant="gold"
                              fontClass="text-[10px] font-black font-mono text-amber-300"
                            />
                            <span className="text-[9px] font-bold text-amber-200 pr-1">AI</span>
                          </div>
                        )}

                        {/* Bối cảnh sự kiện ở góc trái */}
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-2xs text-white text-[9px] px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 shadow-2xs">
                          <MapPin className="w-2.5 h-2.5 text-amber-300" />
                          <span className="truncate max-w-[140px]">{card.eventName}</span>
                        </div>
                      </div>

                      {/* Hàng bảng màu phối của bộ đồ */}
                      <div className="w-full mt-2 flex items-center justify-between text-[10px] text-stone-600 bg-white px-2.5 py-1.5 rounded-lg shadow-2xs">
                        <span className="font-bold text-stone-700">Màu Phối:</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1" title="Màu áo">
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: card.shirtColor }} />
                            <span className="text-[9px]">Áo</span>
                          </span>
                          <span className="flex items-center gap-1" title="Màu quần">
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: card.pantsColor }} />
                            <span className="text-[9px]">Quần</span>
                          </span>
                          <span className="flex items-center gap-1" title="Màu mũ/nón">
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: card.hatColor }} />
                            <span className="text-[9px]">Mũ</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Chi tiết thẩm định AI nếu có */}
                    {card.aiEvaluation && (
                      <div className="p-2.5 bg-amber-50/50 text-[10px] space-y-1">
                        <div className="flex items-center justify-between font-bold text-stone-800">
                          <span className="truncate text-amber-900">👑 {card.aiEvaluation.title}</span>
                          <span className="text-stone-500 font-mono">Hòa sắc: {card.aiEvaluation.colorHarmonyScore}/10</span>
                        </div>
                        <p className="text-stone-600 line-clamp-1 italic">
                          "{card.aiEvaluation.overallVerdict}"
                        </p>
                      </div>
                    )}

                    {/* Chân Thẻ Bài: CÁC NÚT HÀNH ĐỘNG (TIẾP TỤC CHỈNH SỬA) */}
                    <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => onDeleteOutfit(card.id)}
                        className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Xóa thẻ bài này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {onTriggerAiForOutfit && !card.aiEvaluation && (
                          <button
                            type="button"
                            onClick={() => onTriggerAiForOutfit(card)}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                            title="Nhờ AI chấm điểm bộ phối này"
                          >
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span className="hidden sm:inline">Chấm AI</span>
                          </button>
                        )}

                        {/* NÚT TIẾP TỤC CHỈNH SỬA - THEO YÊU CẦU NGƯỜI DÙNG */}
                        <button
                          type="button"
                          onClick={() => {
                            onLoadAndEdit(card);
                            onClose();
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#8B1528] text-white text-xs font-bold hover:bg-[#721020] transition-all flex items-center gap-1 cursor-pointer shadow-xs hover:shadow-md"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                          <span>Tiếp Tục Chỉnh Sửa</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-stone-100 px-5 py-3 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#8B1528] text-white rounded-xl text-xs font-bold hover:bg-[#721020] transition-colors cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02]"
          >
            Đóng Tủ Đồ
          </button>
        </div>
      </div>
    </div>
  );
};
