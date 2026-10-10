import React, { useState } from 'react';
import { OutfitId } from '../types/costume';
import { Sparkles, Check, ArrowRight, ShieldCheck, X, Crown, Flame, Award } from 'lucide-react';
import { COSTUMES_DATA, TRADITIONAL_PALETTES } from '../data/costumesData';
import { Costume2DPreview } from './Costume2DPreview';

export interface EventOption {
  id: string;
  title: string;
  tag: string;
  desc: string;
  recommendedOutfit: OutfitId;
  defaultPants: string;
  defaultHat: string;
  hasSilverNecklace: boolean;
  suggestedColors: string[]; // hex codes
  culturalNote: string;
  eventIcon: string;
}

export const EVENTS_LIST: EventOption[] = [
  {
    id: 'dai-le-trieu-nghi',
    title: 'Đại Lễ Cung Đình & Triều Nghi',
    tag: 'SSR · Hoàng Tộc',
    eventIcon: '👑',
    desc: 'Lễ nghi triều đình, đón tiếp sứ thần, đại lễ vương triều trang trọng bậc nhất.',
    recommendedOutfit: 'ao-nhat-binh',
    defaultPants: '#F8FAFC',
    defaultHat: '#EA8308',
    hasSilverNecklace: true,
    suggestedColors: ['#E11048', '#EA8308', '#059669', '#844C82'],
    culturalNote: 'Áo Nhật Bình với cổ bình lĩnh thêu ngũ sắc và kiềng ngọc toát lên phẩm vị cao quý của bậc Mệnh phụ.',
  },
  {
    id: 'hy-su-cuoi-hoi',
    title: 'Lễ Hỷ Sự, Cưới Hỏi & Vu Quy',
    tag: 'SSR · Hỷ Khí',
    eventIcon: '🏮',
    desc: 'Ngày thành hôn trọng đại, lễ vu quy trang nghiêm và cầu chúc phúc duyên trăm năm.',
    recommendedOutfit: 'ao-tac',
    defaultPants: '#1F2937',
    defaultHat: '#1F2937',
    hasSilverNecklace: true,
    suggestedColors: ['#E11048', '#B91C1C', '#EA8308'],
    culturalNote: 'Áo Tấc tay thụng là chuẩn mực đại lễ phục cưới truyền thống của người Việt, mang lại hỷ khí ngập tràn.',
  },
  {
    id: 'hoi-lang-quan-ho',
    title: 'Hội Làng & Hát Quan Họ Bắc Bộ',
    tag: 'SR · Dân Gian',
    eventIcon: '🌸',
    desc: 'Trẩy hội mùa xuân, du xuân vãn cảnh chùa, giao duyên Quan họ bờ sông Cầu.',
    recommendedOutfit: 'ao-tu-than',
    defaultPants: '#1F2937',
    defaultHat: '#1F2937',
    hasSilverNecklace: false,
    suggestedColors: ['#78350F', '#881337', '#059669', '#4338CA'],
    culturalNote: 'Áo Tứ Thân kết hợp yếm đào và dải thắt lưng vàng nghệ là biểu tượng duyên dáng của người con gái Kinh Bắc.',
  },
  {
    id: 'song-nuoc-nam-bo',
    title: 'Đồng Quê & Chợ Nổi Nam Bộ',
    tag: 'R · Mộc Mạc',
    eventIcon: '🛶',
    desc: 'Dạo chơi miệt vườn sông nước, bơi xuồng chợ nổi, sinh hoạt đời thường phương Nam.',
    recommendedOutfit: 'ao-ba-ba',
    defaultPants: '#1F2937',
    defaultHat: '#EA8308',
    hasSilverNecklace: false,
    suggestedColors: ['#F87171', '#DF4526', '#2E8B57', '#EA8308'],
    culturalNote: 'Áo Bà Ba cổ tròn vạt xẻ cùng nón lá đan nan rơm vàng mang nét đẹp thuần hậu, phóng khoáng của đất phương Nam.',
  },
  {
    id: 'nho-phong-khoa-cu',
    title: 'Khoa Cử, Nho Phong & Tiên Gia',
    tag: 'SR · Kinh Kỳ',
    eventIcon: '📜',
    desc: 'Dịp cúng tế gia tộc, thăm thầy cô giáo, gìn giữ nề nếp Nho nhã thanh lịch.',
    recommendedOutfit: 'ao-ngu-than',
    defaultPants: '#1F2937',
    defaultHat: '#1F2937',
    hasSilverNecklace: false,
    suggestedColors: ['#78350F', '#1E3A8A', '#059669', '#1F2937'],
    culturalNote: 'Áo Ngũ Thân tay chẽn 5 cúc khuy tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) của bậc trí thức.',
  },
  {
    id: 'du-xuan-tet',
    title: 'Dạo Phố Du Xuân & Lễ Tết',
    tag: 'SSR · Quốc Phục',
    eventIcon: '🧧',
    desc: 'Dạo phố hoa ngày Tết, chụp ảnh kỷ niệm, chúc Tết gia đình và bạn bè.',
    recommendedOutfit: 'ao-dai',
    defaultPants: '#F8FAFC',
    defaultHat: '#EA8308',
    hasSilverNecklace: true,
    suggestedColors: ['#E11048', '#F8FAFC', '#EA8308', '#0284C7', '#844C82'],
    culturalNote: 'Áo Dài thướt tha xẻ tà bay bổng tôn vinh trọn vẹn nét duyên ngàn năm của người phụ nữ Việt Nam.',
  },
];

interface EventSuggestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySuggestion: (config: {
    outfitId: OutfitId;
    shirtColor: string;
    pantsColor: string;
    hatColor: string;
    hasSilverNecklace: boolean;
    eventName: string;
  }) => void;
}

export const EventSuggestModal: React.FC<EventSuggestModalProps> = ({
  isOpen,
  onClose,
  onApplySuggestion,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(EVENTS_LIST[0].id);
  const selectedEvent = EVENTS_LIST.find((e) => e.id === selectedEventId) || EVENTS_LIST[0];

  const [chosenColorHex, setChosenColorHex] = useState<string>(selectedEvent.suggestedColors[0]);

  if (!isOpen) return null;

  // Lấy thẻ bài trang phục tương ứng
  const suggestedCostume =
    COSTUMES_DATA.find((c) => c.id === selectedEvent.recommendedOutfit) || COSTUMES_DATA[0];

  const handleApply = () => {
    onApplySuggestion({
      outfitId: selectedEvent.recommendedOutfit,
      shirtColor: chosenColorHex,
      pantsColor: selectedEvent.defaultPants,
      hatColor: selectedEvent.defaultHat,
      hasSilverNecklace: selectedEvent.hasSilverNecklace,
      eventName: selectedEvent.title,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-[#FAF7EE] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] relative">
        {/* Đường viền hoa văn vàng kim trên nóc thẻ */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37]" />

        {/* Header Popup phong cách Thẻ Bài Sưu Tầm */}
        <div className="bg-[#8B1528] text-white px-5 py-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FBBF24] to-[#B45309] text-stone-900 flex items-center justify-center font-bold text-lg shadow-xs">
              🎴
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg tracking-wide uppercase text-amber-100 flex items-center gap-1.5">
                <span>KHỞI ĐẦU PHỐI ĐỒ · CHỌN SỰ KIỆN ĐỀ XUẤT</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Đóng popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thân Popup chia thành các bước trực quan */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF7EE]">
          {/* BƯỚC 1: CHỌN SỰ KIỆN / BỐI CẢNH */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B1528] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#8B1528] text-amber-300 flex items-center justify-center text-[11px] font-bold shadow-2xs">
                  1
                </span>
                <span>Chọn sự kiện / Dịp em muốn xuất hiện:</span>
              </span>
              <span className="text-[11px] text-stone-500 italic">6 Bối Cảnh Cổ Phong</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EVENTS_LIST.map((evt) => {
                const isSelected = evt.id === selectedEventId;
                const recCostume = COSTUMES_DATA.find((c) => c.id === evt.recommendedOutfit);
                return (
                  <div
                    key={evt.id}
                    onClick={() => {
                      setSelectedEventId(evt.id);
                      setChosenColorHex(evt.suggestedColors[0]);
                    }}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 flex flex-col justify-between relative group hover:scale-[1.02] ${
                      isSelected
                        ? 'bg-white shadow-md ring-2 ring-[#8B1528]/25 -translate-y-0.5'
                        : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-base">{evt.eventIcon}</span>
                        <h4 className="font-bold text-xs text-stone-900 leading-tight">
                          {evt.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug line-clamp-2">
                        {evt.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                      <span className="text-stone-500 font-medium">Khuyên dùng:</span>
                      <span className="font-bold text-[#8B1528] flex items-center gap-1">
                        <Crown className="w-3 h-3 text-[#D4AF37]" />
                        <span>{recCostume?.name}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BƯỚC 2: CHỌN MÀU SẮC CHỦ ĐẠO YÊU THÍCH */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B1528] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#8B1528] text-amber-300 flex items-center justify-center text-[11px] font-bold shadow-2xs">
                  2
                </span>
                <span>Chọn tông màu sắc chủ đạo em thích cho dịp này:</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl shadow-xs">
              {TRADITIONAL_PALETTES.map((pal) => {
                const isSelected = chosenColorHex.toLowerCase() === pal.hex.toLowerCase();
                const isRecommended = selectedEvent.suggestedColors.some(
                  (c) => c.toLowerCase() === pal.hex.toLowerCase()
                );
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setChosenColorHex(pal.hex)}
                    title={`${pal.name} (${pal.hex})${isRecommended ? ' · Hợp Dịp' : ''}`}
                    aria-label={`${pal.name} (${pal.hex})`}
                    className={`p-1 rounded-xl transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                      isSelected
                        ? 'bg-red-50 ring-2 ring-[#8B1528]/35 shadow-md -translate-y-0.5'
                        : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-lg shrink-0 shadow-2xs block"
                      style={{ backgroundColor: pal.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* BƯỚC 3: XEM TRƯỚC THẺ BÀI SƯU TẦM GỢI Ý HOÀN CHỈNH */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-4 relative overflow-hidden">
            {/* Bố cục thẻ bài chi tiết: Áo 2D + Thông số */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Hình minh họa Áo 2D */}
              <div className="w-40 sm:w-44 h-44 shrink-0 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-[#FAF6EC] p-2 flex items-center justify-center relative group">
                <Costume2DPreview
                  outfitId={suggestedCostume.id}
                  primaryColor={chosenColorHex}
                  className="w-full h-full"
                />
                <div className="absolute top-2 left-2 bg-[#8B1528] text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                  {suggestedCostume.rarity}
                </div>
                <div className="absolute bottom-2 right-2 bg-white/95 text-stone-600 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                  Áo 2D
                </div>
              </div>

              {/* Thông số phối đồ & Kỹ năng thẻ bài */}
              <div className="flex-1 space-y-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 bg-[#FAF7EE] rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200">
                    <span className="text-stone-500 block text-[11px]">Trang phục:</span>
                    <b className="text-stone-900 text-sm">{suggestedCostume.name}</b>
                    <span className="text-[11px] text-stone-500 block mt-0.5">({suggestedCostume.era})</span>
                  </div>

                  <div className="p-2.5 bg-[#FAF7EE] rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center gap-2.5">
                    <span
                      className="w-9 h-9 rounded-lg shadow-2xs shrink-0"
                      style={{ backgroundColor: chosenColorHex }}
                    />
                    <div>
                      <b className="text-stone-900 text-sm">
                        {TRADITIONAL_PALETTES.find((p) => p.hex.toLowerCase() === chosenColorHex.toLowerCase())?.name || 'Màu phối'}
                      </b>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#FAF7EE] rounded-xl shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center">
                    <b className="text-stone-900 text-sm">
                      {selectedEvent.hasSilverNecklace ? 'Kiềng Bạc & ' : ''}
                      {suggestedCostume.name === 'Áo Bà Ba' ? 'Nón Lá Nam Bộ' : 'Khăn Vấn / Khăn Đóng'}
                    </b>
                  </div>
                </div>

                {/* Kỹ năng và điểm cổ phong */}
                <div className="p-2.5 bg-red-50/70 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#8B1528] font-bold">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>{suggestedCostume.specialSkill}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-stone-600">
                    <span>Cổ phong: <b className="text-red-700">{suggestedCostume.stats.culturePower}</b></span>
                  </div>
                </div>

                {/* Ý nghĩa văn hóa & Điển lệ */}
                <div className="bg-amber-50/90 p-3 rounded-xl shadow-xs text-[11px] text-amber-900 leading-snug flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <b>Ý nghĩa cổ phong:</b> {selectedEvent.culturalNote}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Hành Động */}
        <div className="bg-white border-t border-stone-100 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Bỏ qua & Tự Do Phối Đồ Ngay
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1528] to-[#A21B32] text-white text-xs sm:text-sm font-bold hover:brightness-110 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Áp Dụng Thẻ Bài Này & Bắt Đầu Sửa Theo Ý</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
