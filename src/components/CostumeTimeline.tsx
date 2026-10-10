import React, { useRef, useState, useEffect } from 'react';
import {
  History,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Shirt,
  Calendar,
  Sparkles,
  ArrowRight,
  Layers,
  BookOpen,
  Info,
} from 'lucide-react';
import { OutfitId } from '../types/costume';
import { Costume2DPreview } from './Costume2DPreview';
import { COSTUME_TIMELINE_DATA, TimelineMilestone } from '../data/timelineData';

interface CostumeTimelineProps {
  currentOutfitId: OutfitId;
  onSelectOutfit: (outfitId: OutfitId) => void;
  onNavigateToFittingRoom?: () => void;
  className?: string;
  lang?: 'vi' | 'en';
}

// Từ điển đa ngôn ngữ (i18n dictionary)
const I18N = {
  vi: {
    timelineTitle: 'Dòng Thời Gian Cổ Phục',
    timelineSubtitle: 'Kéo cuộn theo trục thời gian để khám phá tiến trình biến đổi y phục Việt Nam qua các triều đại',
    dragHint: 'Kéo chuột hoặc vuốt để cuộn dòng thời gian',
    viewAllEras: 'Xem Toàn Cảnh',
    closeDetail: 'Đóng',
    tryOn: 'Mặc Thử',
    learnMore: 'Chi tiết lịch sử',
    eraEvolution: 'Tiến trình tiến hóa y phục',
    historicalContext: 'Bối cảnh lịch sử & Điển chế',
    significance: 'Ý nghĩa văn hóa',
    scrollLeft: 'Cuộn về thời kỳ trước',
    scrollRight: 'Cuộn sang thời kỳ kế tiếp',
    currentlyViewing: 'Đang xem',
    selectEra: 'Chọn thời kỳ này',
    century: 'Thế kỷ',
    year: 'Năm',
  },
  en: {
    timelineTitle: 'Costume Timeline',
    timelineSubtitle: 'Drag or scroll along the historical axis to explore the evolution of Vietnamese traditional attire',
    dragHint: 'Drag or swipe to explore historical progression',
    viewAllEras: 'Full Timeline',
    closeDetail: 'Close',
    tryOn: 'Try On',
    learnMore: 'Historical Details',
    eraEvolution: 'Sartorial Evolution',
    historicalContext: 'Historical Decrees & Context',
    significance: 'Cultural Significance',
    scrollLeft: 'Scroll to earlier era',
    scrollRight: 'Scroll to later era',
    currentlyViewing: 'Current',
    selectEra: 'Select this era',
    century: 'Century',
    year: 'Year',
  },
};

export const CostumeTimeline: React.FC<CostumeTimelineProps> = ({
  currentOutfitId,
  onSelectOutfit,
  onNavigateToFittingRoom,
  className = '',
  lang = 'vi',
}) => {
  const t = I18N[lang] || I18N.vi;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Modal mở rộng xem chi tiết toàn cảnh dòng thời gian
  const [isFullModalOpen, setIsFullModalOpen] = useState<boolean>(false);
  const [selectedMilestoneForModal, setSelectedMilestoneForModal] = useState<TimelineMilestone | null>(null);

  // Kéo rê bằng chuột (mouse drag-to-scroll)
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);

  // Tìm mốc thời gian đang khớp với trang phục đang chọn
  const activeMilestone =
    COSTUME_TIMELINE_DATA.find((m) => m.costumeId === currentOutfitId) ||
    COSTUME_TIMELINE_DATA[0];

  // Tự động cuộn mốc đang chọn vào tầm nhìn khi currentOutfitId thay đổi
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeEl = scrollContainerRef.current.querySelector<HTMLElement>(
      `[data-costume-id="${currentOutfitId}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentOutfitId]);

  // Điều khiển nút cuộn trái / phải
  const handleScrollBy = (offset: number) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  };

  // Xử lý kéo thả bằng chuột (Mouse Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMoved.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleNodeClick = (milestone: TimelineMilestone) => {
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }
    onSelectOutfit(milestone.costumeId);
  };

  const handleOpenDetailedModal = (milestone?: TimelineMilestone) => {
    setSelectedMilestoneForModal(milestone || activeMilestone);
    setIsFullModalOpen(true);
  };

  return (
    <div
      className={`relative w-full bg-white rounded-2xl shadow-xs border-0 p-2 sm:p-2.5 transition-all select-none ${className}`}
    >
      {/* ============================================================== */}
      {/* 1. THANH HEADER MINI CỦA DÒNG THỜI GIAN                          */}
      {/* ============================================================== */}
      <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded-md bg-[#8B1528] text-amber-200 flex items-center justify-center shrink-0">
            <History className="w-3 h-3 text-amber-200" />
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="text-[10px] text-stone-600 font-semibold truncate">
              {activeMilestone.yearDisplay} · {activeMilestone.periodName}
            </span>
          </div>
        </div>

        {/* Nút điều khiển cuộn & Mở rộng toàn cảnh */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => handleScrollBy(-220)}
            className="w-6 h-6 rounded-lg bg-[#FAF7EE] hover:bg-[#8B1528] text-stone-700 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1528]"
            aria-label={t.scrollLeft}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleScrollBy(220)}
            className="w-6 h-6 rounded-lg bg-[#FAF7EE] hover:bg-[#8B1528] text-stone-700 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1528]"
            aria-label={t.scrollRight}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleOpenDetailedModal()}
            className="ml-0.5 px-2 py-1 rounded-lg bg-[#FAF7EE] hover:bg-[#8B1528] text-[#8B1528] hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1528]"
            title={t.viewAllEras}
          >
            <Maximize2 className="w-2.5 h-2.5" />
            <span className="hidden md:inline">{t.viewAllEras}</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. KHU VỰC TRỤC DÒNG THỜI GIAN KÉO CUỘN (SCROLLABLE TIMELINE TRACK) */}
      {/* ============================================================== */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#FAF7EE] py-1.5 px-1">
        {/* Đường ray thời gian xuyên suốt (Solid timeline axis line) */}
        <div
          className="absolute top-[34px] left-6 right-6 h-[2px] bg-[#E5D7BE] pointer-events-none"
          aria-hidden="true"
        />

        {/* Khay cuộn ngang các mốc lịch sử */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex items-stretch gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth px-1.5 py-0.5 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COSTUME_TIMELINE_DATA.map((milestone) => {
            const isActive = milestone.costumeId === currentOutfitId;
            return (
              <div
                key={milestone.id}
                data-costume-id={milestone.costumeId}
                onClick={() => handleNodeClick(milestone)}
                className={`group shrink-0 w-[136px] sm:w-[152px] rounded-xl p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1528] ${
                  isActive
                    ? 'bg-white shadow-md ring-2 ring-[#8B1528] -translate-y-0.5'
                    : 'bg-white/85 hover:bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectOutfit(milestone.costumeId);
                  }
                }}
                aria-pressed={isActive}
                aria-label={`${milestone.costumeName} (${milestone.yearDisplay})`}
              >
                {/* 1. Mốc năm & Nút chấm tròn trên trục */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  {/* Nhãn năm (Unboxed clean text) */}
                  <span
                    className={`text-[10px] font-mono font-bold leading-none ${
                      isActive ? 'text-[#8B1528]' : 'text-stone-700 group-hover:text-stone-900'
                    }`}
                  >
                    {milestone.yearDisplay}
                  </span>

                  {/* Chấm tròn biểu thị vị trí mốc thời gian */}
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#8B1528] text-white shadow-xs scale-110'
                        : 'bg-white border border-[#D5C7B0] group-hover:border-[#8B1528]'
                    }`}
                  >
                    <div
                      className={`w-1 h-1 rounded-full ${
                        isActive ? 'bg-amber-300' : 'bg-stone-300 group-hover:bg-[#8B1528]'
                      }`}
                    />
                  </div>
                </div>

                {/* 2. Thẻ hiển thị hình ảnh 2D nhỏ gọn + Tên phục sức */}
                <div className="flex items-center gap-1.5 my-0.5">
                  {/* Tranh 2D mini */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FAF7EE] group-hover:bg-[#F5EFE0] p-0.5 shrink-0 flex items-center justify-center transition-colors">
                    <Costume2DPreview
                      outfitId={milestone.costumeId}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Tên trang phục */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`font-serif font-bold text-[11px] sm:text-xs truncate leading-tight ${
                        isActive ? 'text-[#8B1528]' : 'text-stone-900 group-hover:text-[#8B1528]'
                      }`}
                      title={milestone.costumeName}
                    >
                      {milestone.costumeName}
                    </h4>
                  </div>
                </div>

                {/* 3. Phụ chú dưới cùng */}
                <div className="pt-1 mt-0.5 border-t border-stone-100 flex items-center justify-between text-[8.5px] sm:text-[9px]">
                  <span className="text-stone-500 font-medium truncate">
                    {milestone.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MODAL TOÀN CẢNH: TIẾN TRÌNH LỊCH SỬ VIỆT PHỤC QUA CÁC THỜI KỲ */}
      {/* ============================================================== */}
      {isFullModalOpen && selectedMilestoneForModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsFullModalOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[92vh] bg-[#FAF7EE] text-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Toàn Cảnh */}
            <div className="bg-[#8B1528] text-white px-5 py-3.5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-bold text-sm shadow-xs">
                  <History className="w-4 h-4 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
                    <span>{t.timelineTitle}</span>
                    <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900">
                      7 Giai Đoạn Tiêu Biểu
                    </span>
                  </h3>
                  <p className="text-[11px] text-rose-200">
                    {t.timelineSubtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFullModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={t.closeDetail}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nội dung bên trong Modal */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Dải tiến trình thời gian tổng thể */}
              <div className="bg-white rounded-2xl p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8B1528]" />
                    <span>Trục Diễn Tiến Thời Gian (Chronological Axis)</span>
                  </h4>
                  <span className="text-[11px] text-stone-500">
                    Bấm vào từng thời kỳ để xem chi tiết
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {COSTUME_TIMELINE_DATA.map((milestone) => {
                    const isSelectedInModal = selectedMilestoneForModal.id === milestone.id;
                    return (
                      <button
                        key={milestone.id}
                        type="button"
                        onClick={() => setSelectedMilestoneForModal(milestone)}
                        className={`p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelectedInModal
                            ? 'bg-[#8B1528] text-white shadow-md'
                            : 'bg-[#FAF7EE] hover:bg-[#F3EBD8] text-stone-800'
                        }`}
                      >
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isSelectedInModal ? 'text-amber-300' : 'text-[#8B1528]'
                          }`}
                        >
                          {milestone.yearDisplay}
                        </span>
                        <h5 className="font-serif font-bold text-xs truncate mt-1">
                          {milestone.costumeName.replace('Áo ', '')}
                        </h5>
                        <span
                          className={`text-[9px] mt-1 ${
                            isSelectedInModal ? 'text-rose-100' : 'text-stone-500'
                          }`}
                        >
                          {milestone.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chi tiết về thời kỳ được chọn */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Tranh 2D & Nút hành động */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="w-full aspect-square max-w-[220px] rounded-2xl bg-[#FAF7EE] p-3 flex items-center justify-center shadow-xs">
                    <Costume2DPreview
                      outfitId={selectedMilestoneForModal.costumeId}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="w-full mt-3 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectOutfit(selectedMilestoneForModal.costumeId);
                        setIsFullModalOpen(false);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-[#FAF7EE] hover:bg-[#8B1528] text-[#8B1528] hover:text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Khám phá thẻ trang phục này</span>
                    </button>

                    {onNavigateToFittingRoom && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectOutfit(selectedMilestoneForModal.costumeId);
                          setIsFullModalOpen(false);
                          onNavigateToFittingRoom();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-[#8B1528] hover:bg-[#A31830] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Shirt className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t.tryOn} trong phòng thử đồ</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Thông tin lịch sử, bối cảnh & tiến trình cải cách */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#8B1528] bg-rose-50 px-2 py-0.5 rounded-md">
                        {selectedMilestoneForModal.yearDisplay}
                      </span>
                      <span className="text-xs text-stone-500">·</span>
                      <span className="text-xs font-medium text-stone-600">
                        {selectedMilestoneForModal.dynasty}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      {selectedMilestoneForModal.costumeName}
                    </h3>
                    <p className="text-xs text-[#8B1528] font-medium mt-0.5">
                      {selectedMilestoneForModal.periodName}
                    </p>
                  </div>

                  {/* Đặc trưng nhận diện */}
                  <div className="p-3 rounded-xl bg-[#FAF7EE] text-xs leading-relaxed text-stone-800">
                    <strong className="text-stone-900 font-bold block mb-1">
                      ✦ Đặc trưng nhận diện cốt lõi:
                    </strong>
                    {selectedMilestoneForModal.shortHighlight}
                  </div>

                  {/* Bối cảnh lịch sử & Điển chế */}
                  <div>
                    <h5 className="font-serif font-bold text-xs text-stone-900 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#8B1528]" />
                      <span>{t.historicalContext}</span>
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {selectedMilestoneForModal.historicalContext}
                    </p>
                  </div>

                  {/* Ý nghĩa trong dòng chảy tiến hóa */}
                  <div>
                    <h5 className="font-serif font-bold text-xs text-stone-900 mb-1 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.eraEvolution}</span>
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {selectedMilestoneForModal.evolutionSummary}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-stone-500 hidden sm:inline">
                Khảo cứu theo Đại Việt Sử Ký Toàn Thư & Khâm Định Đại Nam Hội Điển Sự Lệ
              </span>
              <button
                type="button"
                onClick={() => setIsFullModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors cursor-pointer ml-auto"
              >
                {t.closeDetail}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
