import React, { useState } from 'react';
import { X, Bookmark, Check, Sparkles, MapPin, Tag } from 'lucide-react';
import { OutfitId, CardRarity, SavedOutfitCard, AiEvaluationResult } from '../types/costume';
import { PavilionDollStage } from './PavilionDollStage';

interface SaveOutfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfitConfig: {
    outfitId: OutfitId;
    outfitName: string;
    shirtColor: string;
    shirtColorName?: string;
    pantsColor: string;
    pantsColorName?: string;
    bottomId?: string;
    hatId: string;
    hatName?: string;
    hatColor: string;
    hasSilverNecklace: boolean;
    selectedAccessories?: string[];
    shoeId?: string;
    shoesName: string;
    skinColor?: string;
    hairStyle?: string;
    dollImage?: string;
    eventName: string;
  };
  pendingAiEvaluation?: AiEvaluationResult | null;
  onConfirmSave: (card: SavedOutfitCard) => void;
  onOpenWardrobe: () => void;
}

export const SaveOutfitModal: React.FC<SaveOutfitModalProps> = ({
  isOpen,
  onClose,
  outfitConfig,
  pendingAiEvaluation,
  onConfirmSave,
  onOpenWardrobe,
}) => {
  const defaultName = `Bộ Phối ${outfitConfig.outfitName} - ${outfitConfig.eventName || 'Cổ Phong'}`;
  const [outfitTitle, setOutfitTitle] = useState<string>(defaultName);
  const [eventName, setEventName] = useState<string>(outfitConfig.eventName || 'Đời sống & Lễ hội');
  const [rarity, setRarity] = useState<CardRarity>('SSR');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const newCard: SavedOutfitCard = {
      id: 'outfit-' + Date.now(),
      cardCode: 'TỦ-' + Math.floor(1000 + Math.random() * 9000),
      name: outfitTitle.trim() || defaultName,
      outfitId: outfitConfig.outfitId,
      outfitName: outfitConfig.outfitName,
      shirtColor: outfitConfig.shirtColor,
      shirtColorName: outfitConfig.shirtColorName,
      pantsColor: outfitConfig.pantsColor,
      pantsColorName: outfitConfig.pantsColorName,
      bottomId: outfitConfig.bottomId,
      hatId: outfitConfig.hatId,
      hatName: outfitConfig.hatName,
      hatColor: outfitConfig.hatColor,
      hasSilverNecklace: outfitConfig.hasSilverNecklace,
      selectedAccessories: outfitConfig.selectedAccessories || (outfitConfig.hasSilverNecklace ? ['kieng-bac'] : []),
      shoeId: outfitConfig.shoeId || 'guoc-moc',
      shoesName: outfitConfig.shoesName,
      skinColor: outfitConfig.skinColor || '#fde5d4',
      hairStyle: outfitConfig.hairStyle || 'braids',
      dollImage: outfitConfig.dollImage,
      eventName: eventName.trim() || 'Lễ hội truyền thống',
      rarity: rarity,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      aiEvaluation: pendingAiEvaluation || undefined,
    };

    onConfirmSave(newCard);
    setSavedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FAF7EE] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Nẹp viền vàng */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37]" />

        {/* Header Modal */}
        <div className="bg-[#8B1528] text-white px-5 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
              <Bookmark className="w-5 h-5 text-stone-900" />
            </div>
            <div>
              <h2 className="font-bold text-base tracking-wide uppercase text-amber-100 flex items-center gap-2">
                <span>LƯU BỘ PHỐI VÀO KHO TỦ ĐỒ</span>
              </h2>
              <p className="text-xs text-rose-200">
                Lưu trọn bộ hình ảnh người mẫu mặc bộ phối cổ phong để tiếp tục chỉnh sửa bất kỳ lúc nào
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thân Modal */}
        <div className="p-5 space-y-4">
          {!savedSuccess ? (
            <>
              {/* Thẻ xem trước trực quan người mẫu mặc trọn bộ */}
              <div className="bg-white rounded-xl p-3.5 shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-3.5 border border-amber-200/50">
                <div className="w-24 h-36 rounded-xl bg-[#FAF7EE] p-1 shrink-0 flex items-center justify-center shadow-inner relative overflow-hidden border border-amber-300/40">
                  <PavilionDollStage
                    outfitId={outfitConfig.outfitId}
                    shirtColor={outfitConfig.shirtColor}
                    pantsColor={outfitConfig.pantsColor}
                    bottomId={outfitConfig.bottomId}
                    hatColor={outfitConfig.hatColor}
                    hatId={outfitConfig.hatId}
                    hasSilverNecklace={outfitConfig.hasSilverNecklace}
                    selectedAccessories={outfitConfig.selectedAccessories || (outfitConfig.hasSilverNecklace ? ['kieng-bac'] : [])}
                    shoeId={outfitConfig.shoeId || 'guoc-moc'}
                    skinColor={outfitConfig.skinColor || '#fde5d4'}
                    hairStyle={outfitConfig.hairStyle || 'braids'}
                    dollImage={outfitConfig.dollImage}
                    isThumbnail={true}
                    zoomLevel={1}
                  />
                  <div className="absolute bottom-1 right-1 bg-[#8B1528]/85 text-amber-100 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                    Người Mẫu
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#8B1528] uppercase tracking-wider block">
                      {outfitConfig.outfitName}
                    </span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">
                      Trọn Bộ Người Mẫu
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 truncate mt-0.5">
                    {outfitTitle || defaultName}
                  </h4>
                  <div className="text-xs text-stone-600 mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: outfitConfig.shirtColor }} />
                      <span>Áo: {outfitConfig.shirtColorName || outfitConfig.shirtColor}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: outfitConfig.pantsColor }} />
                      <span>Quần: {outfitConfig.pantsColorName || outfitConfig.pantsColor}</span>
                    </span>
                    {outfitConfig.hatId && outfitConfig.hatId !== 'khong-doi' && (
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full shadow-2xs" style={{ backgroundColor: outfitConfig.hatColor }} />
                        <span>Mũ: {outfitConfig.hatName || 'Mũ'}</span>
                      </span>
                    )}
                  </div>
                  {pendingAiEvaluation && (
                    <div className="mt-1.5 inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold shadow-2xs">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Đã có điểm AI: {pendingAiEvaluation.overallScore}/10</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nhập Tên Bộ Phối */}
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8B1528]" />
                  <span>Tên Thẻ Bài Bộ Phối:</span>
                </label>
                <input
                  type="text"
                  value={outfitTitle}
                  onChange={(e) => setOutfitTitle(e.target.value)}
                  placeholder="Nhập tên gọi cho bộ phối..."
                  className="w-full px-3 py-2 bg-white rounded-xl text-xs text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#8B1528]/20 shadow-2xs"
                />
              </div>

              {/* Bối cảnh sự kiện / Địa điểm */}
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1528]" />
                  <span>Bối cảnh / Địa điểm tham gia:</span>
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Ví dụ: Đồng Quê Nam Bộ, Chụp ảnh sen, Đám cưới..."
                  className="w-full px-3 py-2 bg-white rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8B1528]/20 shadow-2xs"
                />
              </div>

              {/* Phân hạng phẩm vị thẻ bài */}
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1.5">
                  Huy hiệu phẩm vị thẻ bài:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'SSR' as CardRarity, label: 'SSR · Hoàng Kim', desc: 'Đại Lễ & Tuyệt Phẩm' },
                    { id: 'SR' as CardRarity, label: 'SR · Cổ Phong', desc: 'Hỷ Lễ & Nhã Nhặn' },
                    { id: 'R' as CardRarity, label: 'R · Dân Gian', desc: 'Đời Thường & Dung Dị' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRarity(r.id)}
                      className={`p-2 rounded-xl text-center transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                        rarity === r.id
                          ? 'bg-[#8B1528] text-white shadow-xs'
                          : 'bg-white text-stone-700 hover:bg-stone-50 shadow-2xs'
                      }`}
                    >
                      <span className="font-bold text-xs block">{r.label}</span>
                      <span className="text-[9px] opacity-80 block">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Thông báo lưu thành công */
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Đã Lưu Thẻ Bài Vào Kho Tủ Đồ!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Bộ phối <b>"{outfitTitle}"</b> đã được lưu trữ an toàn dưới dạng thẻ bài cổ phong. Bạn có thể mở tủ đồ bất cứ lúc nào để tiếp tục chỉnh sửa.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-stone-100 px-5 py-3 flex items-center justify-end gap-2">
          {!savedSuccess ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-[#8B1528] text-white rounded-xl text-xs font-bold hover:bg-[#721020] transition-colors shadow-xs hover:shadow-md hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-300" />
                <span>Xác Nhận Lưu Thẻ Bài</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Tiếp Tục Phối Đồ
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWardrobe();
                }}
                className="px-5 py-2 bg-[#8B1528] text-white rounded-xl text-xs font-bold hover:bg-[#721020] transition-colors shadow-xs hover:shadow-md hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Mở Kho Tủ Đồ Xem Thẻ</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
