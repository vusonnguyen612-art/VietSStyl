import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shirt,
  Sparkles,
  MapPin,
  Flame,
  Info,
  Check,
  LayoutGrid,
  Maximize2,
  ArrowRight,
  Palette,
  X,
  BookOpen,
  Award,
  Crown,
  Compass,
  History,
} from 'lucide-react';
import { OutfitDefinition, OutfitId } from '../types/costume';
import { Costume2DPreview } from './Costume2DPreview';
import { CostumeTimeline } from './CostumeTimeline';

interface CostumeExploreCarouselProps {
  costumes: OutfitDefinition[];
  currentOutfitId: OutfitId;
  onSelectOutfit: (id: OutfitId) => void;
  onNavigateToFittingRoom: () => void;
  onNavigateToMap: () => void;
  genderFilter: 'all' | 'female' | 'male';
  setGenderFilter: (filter: 'all' | 'female' | 'male') => void;
}

export const CostumeExploreCarousel: React.FC<CostumeExploreCarouselProps> = ({
  costumes,
  currentOutfitId,
  onSelectOutfit,
  onNavigateToFittingRoom,
  onNavigateToMap,
  genderFilter,
  setGenderFilter,
}) => {
  // Vị trí ban đầu theo trang phục đang chọn
  const initialIndex = Math.max(
    0,
    costumes.findIndex((c) => c.id === currentOutfitId)
  );

  const [currentIndex, setCurrentIndex] = useState<number>(
    initialIndex >= 0 ? initialIndex : 0
  );

  // Trạng thái hiển thị dải Dòng Thời Gian thu nhỏ
  const [showTimeline, setShowTimeline] = useState<boolean>(true);

  // Modal hiển thị chi tiết khi click vào thẻ
  const [detailModalCostume, setDetailModalCostume] = useState<OutfitDefinition | null>(null);

  // Tab thông tin đang chọn trên modal chi tiết: 'history' | 'structure' | 'culture'
  const [activeInfoTab, setActiveInfoTab] = useState<'history' | 'structure' | 'culture'>('history');

  // Màu đang thử nghiệm trên modal chi tiết hoặc thẻ bài
  const [activeModalColor, setActiveModalColor] = useState<string>('');

  // Màu xem trước cho từng thẻ
  const [previewColorMap, setPreviewColorMap] = useState<Record<string, string>>({});

  // Chế độ xem: 'carousel' (băng chuyền) hoặc 'grid' (lưới)
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Hỗ trợ cảm ứng vuốt trên mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Đồng bộ currentIndex khi currentOutfitId thay đổi từ bên ngoài (ví dụ bấm từ Timeline hoặc Bản đồ)
  useEffect(() => {
    const foundIndex = costumes.findIndex((c) => c.id === currentOutfitId);
    if (foundIndex >= 0 && foundIndex !== currentIndex) {
      setCurrentIndex(foundIndex);
    }
  }, [currentOutfitId, costumes]);

  // Đảm bảo currentIndex hợp lệ khi danh sách trang phục thay đổi
  useEffect(() => {
    if (currentIndex >= costumes.length) {
      setCurrentIndex(Math.max(0, costumes.length - 1));
    }
  }, [costumes.length, currentIndex]);

  // Điều hướng bằng phím mũi tên trái/phải, phím Escape để đóng modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (detailModalCostume) {
        if (e.key === 'Escape') setDetailModalCostume(null);
        return;
      }
      if (viewMode !== 'carousel' || costumes.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, costumes.length, detailModalCostume]);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + costumes.length) % costumes.length;
    setCurrentIndex(nextIdx);
    if (costumes[nextIdx]) {
      onSelectOutfit(costumes[nextIdx].id);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % costumes.length;
    setCurrentIndex(nextIdx);
    if (costumes[nextIdx]) {
      onSelectOutfit(costumes[nextIdx].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleOpenDetail = (costume: OutfitDefinition) => {
    setDetailModalCostume(costume);
    setActiveModalColor(previewColorMap[costume.id] || costume.defaultColors.primary);
    setActiveInfoTab('history');
  };

  if (!costumes.length) {
    return (
      <div className="p-8 text-center text-stone-600 bg-[#FAF7EE] rounded-2xl border border-[#E5D7BE]">
        Không tìm thấy trang phục phù hợp với bộ lọc hiện tại.
      </div>
    );
  }

  const currentItem = costumes[currentIndex] || costumes[0];
  const prevIndex = (currentIndex - 1 + costumes.length) % costumes.length;
  const nextIndex = (currentIndex + 1) % costumes.length;
  const prevItem = costumes[prevIndex];
  const nextItem = costumes[nextIndex];

  // Màu đang hiển thị cho trang phục trung tâm
  const activeColor = previewColorMap[currentItem.id] || currentItem.defaultColors.primary;

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden gap-2">
      {/* ============================================================== */}
      {/* 1. THANH CÔNG CỤ ĐIỀU KHIỂN (BỘ LỌC & CHẾ ĐỘ XEM)              */}
      {/* ============================================================== */}
      <header className="shrink-0 flex items-center justify-between gap-2.5 bg-white/90 backdrop-blur-xs text-stone-900 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-xs">
        {/* Bộ lọc giới tính */}
        <div className="flex items-center bg-[#EDE4CF]/70 p-0.5 sm:p-1 rounded-xl text-[11px] gap-0.5">
          {(
            [
              { id: 'all', label: 'Tất Cả' },
              { id: 'female', label: 'Nữ' },
              { id: 'male', label: 'Nam' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setGenderFilter(filter.id)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                genderFilter === filter.id
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Cụm công cụ điều khiển bên phải */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Nút bật/tắt Dòng Thời Gian */}
          <button
            type="button"
            onClick={() => setShowTimeline((prev) => !prev)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all duration-200 cursor-pointer shadow-2xs ${
              showTimeline
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'bg-[#FAF2DE] hover:bg-[#F3E6C8] text-[#8B1528]'
            }`}
            title={showTimeline ? 'Ẩn dòng thời gian' : 'Hiện dòng thời gian lịch sử'}
            aria-pressed={showTimeline}
          >
            <History className="w-3 h-3" />
            <span className="hidden sm:inline">Dòng Thời Gian</span>
          </button>

          {/* Chuyển đổi Băng chuyền / Lưới */}
          <div className="flex items-center bg-[#EDE4CF]/70 p-0.5 sm:p-1 rounded-xl gap-0.5">
            <button
              onClick={() => setViewMode('carousel')}
              title="Chế độ Băng Chuyền"
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Chế độ Lưới"
              className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#8B1528] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#8B1528] hover:bg-white/80'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 1.5. THÀNH PHẦN DÒNG THỜI GIAN THU NHỎ (TIMELINE TRACK)         */}
      {/* ============================================================== */}
      {showTimeline && (
        <div className="shrink-0 w-full animate-in fade-in slide-in-from-top-1 duration-200">
          <CostumeTimeline
            currentOutfitId={currentItem?.id || currentOutfitId}
            onSelectOutfit={(id) => {
              onSelectOutfit(id);
              const targetIdx = costumes.findIndex((c) => c.id === id);
              if (targetIdx >= 0) {
                setCurrentIndex(targetIdx);
              }
            }}
            onNavigateToFittingRoom={onNavigateToFittingRoom}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. KHÔNG GIAN BĂNG CHUYỀN - TÔNG MÀU GIẤY CỔ HOÀNG GIA NHẸ NHÀNG */}
      {/* ============================================================== */}
      {viewMode === 'carousel' && (
        <div
          className="relative flex-1 min-h-0 w-full bg-[#FAF7EE] rounded-2xl p-2 sm:p-3.5 shadow-xs flex flex-col justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* KHU VỰC BỐ TRÍ 3 PHẦN: MŨI TÊN TRÁI - KHUNG THẺ - MŨI TÊN PHẢI */}
          <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center gap-3 sm:gap-5 md:gap-7 w-full max-w-5xl mx-auto py-1">
            {/* NÚT MŨI TÊN TRÁI (LOẠI BỎ VIỀN, ĐỔI MÀU & ĐỔ BÓNG MƯỢT KHI HOVER) */}
            {costumes.length > 1 && (
              <button
                onClick={handlePrev}
                className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#8B1528] text-stone-700 hover:text-white shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 group"
                aria-label="Trang phục trước"
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
            )}

            {/* THẺ BÊN TRÁI (LOẠI BỎ VIỀN, ĐỔ BÓNG NHẸ NHÀNG) */}
            {costumes.length > 1 && (
              <div
                onClick={handlePrev}
                className="hidden lg:flex flex-col justify-between w-[190px] xl:w-[210px] h-full max-h-[360px] bg-white rounded-2xl p-3 opacity-60 hover:opacity-95 transition-all duration-300 scale-90 cursor-pointer select-none shrink-0 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                title={`Chuyển sang: ${prevItem.name}`}
              >
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono shrink-0">
                  <span>{prevItem.cardCode}</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold shadow-2xs">
                    {prevItem.rarity}
                  </span>
                </div>

                <div className="w-full flex-1 min-h-0 my-2 flex items-center justify-center p-1 bg-[#FAF6EC] rounded-xl">
                  <Costume2DPreview
                    outfitId={prevItem.id}
                    primaryColor={previewColorMap[prevItem.id] || prevItem.defaultColors.primary}
                    className="w-full h-full"
                  />
                </div>

                <div className="text-center shrink-0">
                  <h4 className="font-serif font-bold text-stone-800 text-xs truncate">
                    {prevItem.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 truncate">{prevItem.era}</p>
                </div>
              </div>
            )}

            {/* THẺ TRUNG TÂM (LOẠI BỎ VIỀN CỨNG, ĐỔ BÓNG MƯỢT MÀ VÀ NỔI BẬT KHI DI CHUỘT) */}
            <div
              onClick={() => handleOpenDetail(currentItem)}
              className="w-full max-w-[340px] sm:max-w-[360px] md:max-w-[380px] h-full max-h-[415px] min-h-[250px] sm:min-h-[290px] bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 p-3.5 sm:p-4 flex flex-col justify-between z-10 transition-all duration-300 relative group cursor-pointer shrink-0"
              title="Nhấn vào thẻ để xem toàn bộ thông tin chi tiết điển chế"
            >
              {/* Header Thẻ: Huy hiệu đỏ, Mã thẻ, Rarity vàng kim */}
              <div className="flex items-center justify-between shrink-0 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#8B1528] text-white text-[10px] font-bold shadow-2xs">
                    {currentItem.badge}
                  </span>
                  <span className="text-stone-500 text-[11px] font-mono">
                    {currentItem.cardCode}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-mono shadow-2xs">
                    {currentItem.rarity}
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    CP {currentItem.stats.culturePower}
                  </span>
                </div>
              </div>

              {/* KHUNG QUẦN ÁO 2D THUẦN TÚY TRÊN NỀN LỤA SÁNG (KHÔNG ĐƯỜNG VIỀN) */}
              <div className="relative flex-1 min-h-0 my-2 rounded-xl bg-[#FAF6EC] group-hover:bg-[#F6EFE2] flex items-center justify-center p-2.5 overflow-hidden transition-colors duration-300">
                {/* Vầng hào quang nhẹ */}
                <div className="absolute w-36 h-36 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

                {/* Quần áo 2D chuẩn mực */}
                <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Costume2DPreview
                    outfitId={currentItem.id}
                    primaryColor={activeColor}
                    className="w-full h-full"
                  />
                </div>

                {/* Tag thời đại góc trên */}
                <div className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-xs text-stone-700 text-[9px] font-medium px-2 py-0.5 rounded-md shadow-xs">
                  {currentItem.era}
                </div>
              </div>

              {/* Tên & Tóm tắt trang phục */}
              <div className="shrink-0 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 truncate group-hover:text-[#8B1528] transition-colors">
                    {currentItem.name}
                  </h3>
                  <span className="text-[10px] text-[#8B1528] font-bold shrink-0 bg-red-50 px-2 py-0.5 rounded shadow-2xs">
                    {currentItem.region}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-1 leading-snug">
                  {currentItem.description}
                </p>
              </div>

              {/* HÀNG NÚT THAO TÁC RÕ RÀNG (KHÔNG VIỀN CỨNG, ĐỔ BÓNG MƯỢT) */}
              <div className="shrink-0 mt-2 pt-2 border-t border-stone-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDetail(currentItem);
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C8] hover:shadow-xs text-[#8B1528] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Xem Chi Tiết</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOutfit(currentItem.id);
                    onNavigateToFittingRoom();
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-[#8B1528] hover:bg-[#A31830] text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <Shirt className="w-3.5 h-3.5 text-amber-300" />
                  <span>Mặc Thử</span>
                </button>
              </div>
            </div>

            {/* THẺ BÊN PHẢI (LOẠI BỎ VIỀN, ĐỔ BÓNG NHẸ NHÀNG) */}
            {costumes.length > 1 && (
              <div
                onClick={handleNext}
                className="hidden lg:flex flex-col justify-between w-[190px] xl:w-[210px] h-full max-h-[360px] bg-white rounded-2xl p-3 opacity-60 hover:opacity-95 transition-all duration-300 scale-90 cursor-pointer select-none shrink-0 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                title={`Chuyển sang: ${nextItem.name}`}
              >
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono shrink-0">
                  <span>{nextItem.cardCode}</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold shadow-2xs">
                    {nextItem.rarity}
                  </span>
                </div>

                <div className="w-full flex-1 min-h-0 my-2 flex items-center justify-center p-1 bg-[#FAF6EC] rounded-xl">
                  <Costume2DPreview
                    outfitId={nextItem.id}
                    primaryColor={previewColorMap[nextItem.id] || nextItem.defaultColors.primary}
                    className="w-full h-full"
                  />
                </div>

                <div className="text-center shrink-0">
                  <h4 className="font-serif font-bold text-stone-800 text-xs truncate">
                    {nextItem.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 truncate">{nextItem.era}</p>
                </div>
              </div>
            )}

            {/* NÚT MŨI TÊN PHẢI (LOẠI BỎ VIỀN, ĐỔI MÀU & ĐỔ BÓNG MƯỢT KHI HOVER) */}
            {costumes.length > 1 && (
              <button
                onClick={handleNext}
                className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#8B1528] text-stone-700 hover:text-white shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 group"
                aria-label="Trang phục kế tiếp"
              >
                <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. CHẾ ĐỘ XEM LƯỚI - LOẠI BỎ VIỀN, KHOẢNG CÁCH NHẸ NHÀNG & ĐỔ BÓNG MƯỢT */}
      {/* ============================================================== */}
      {viewMode === 'grid' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 my-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {costumes.map((costume) => {
            const chosenColor = previewColorMap[costume.id] || costume.defaultColors.primary;
            return (
              <div
                key={costume.id}
                onClick={() => handleOpenDetail(costume)}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group cursor-pointer transition-all duration-300"
              >
                <div className="bg-[#8B1528] text-white px-3 py-2 flex items-center justify-between">
                  <span className="font-serif font-bold text-xs truncate text-amber-100">
                    {costume.name}
                  </span>
                  <span className="text-[9px] font-mono bg-amber-400 text-stone-900 font-bold px-1.5 py-0.5 rounded shadow-2xs">
                    {costume.rarity}
                  </span>
                </div>

                <div className="h-32 bg-[#FAF6EC] group-hover:bg-[#F6EFE2] flex items-center justify-center p-2 relative transition-colors duration-300">
                  <Costume2DPreview
                    outfitId={costume.id}
                    primaryColor={chosenColor}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1.5 text-[8px] text-stone-600 bg-white/90 shadow-2xs px-1.5 py-0.5 rounded">
                    2D Phục Sức
                  </span>
                </div>

                <div className="p-3 space-y-1.5 bg-white">
                  <p className="text-[10px] text-stone-600 line-clamp-1">{costume.description}</p>
                  <div className="flex items-center justify-between pt-1.5 border-t border-stone-100 text-[10px]">
                    <span className="text-[#8B1528] font-bold group-hover:translate-x-0.5 transition-transform">Chi tiết ➔</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOutfit(costume.id);
                        onNavigateToFittingRoom();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#8B1528] text-white text-[10px] font-bold shadow-2xs hover:bg-[#A31830] hover:shadow-xs transition-all"
                    >
                      Mặc Thử
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MODAL THÔNG TIN CHI TIẾT - TÔNG MÀU GIẤY CỔ HOÀNG GIA ĐỒNG BỘ */}
      {/* ============================================================== */}
      {detailModalCostume && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setDetailModalCostume(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[92vh] bg-[#FAF7EE] text-stone-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nẹp chỉ mạ vàng trên nóc */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#FBBF24] to-[#D4AF37]" />

            {/* Header Modal */}
            <div className="bg-[#8B1528] text-white px-5 py-3.5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-stone-900 flex items-center justify-center font-bold text-sm shadow-xs">
                  🎴
                </span>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
                    <span>{detailModalCostume.name}</span>
                    <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 shadow-2xs">
                      {detailModalCostume.rarity}
                    </span>
                  </h3>
                  <p className="text-[11px] text-rose-200">
                    {detailModalCostume.cardCode} · {detailModalCostume.badge} · {detailModalCostume.era}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailModalCostume(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Đóng chi tiết"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nội dung chi tiết */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 bg-[#FAF7EE]">
              {/* CỘT TRÁI: TRANH 2D LỚN & ĐỔI MÀU THỬ NGHIỆM (5 CỘT) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {/* Khung tranh 2D lớn */}
                <div className="relative aspect-square w-full rounded-2xl bg-[#FFFDF7] p-4 flex items-center justify-center overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                  <div className="absolute w-48 h-48 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

                  <Costume2DPreview
                    outfitId={detailModalCostume.id}
                    primaryColor={activeModalColor}
                    className="w-full h-full"
                  />

                  <div className="absolute top-2.5 left-2.5 bg-white/95 text-[#8B1528] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    Phục Sức 2D Cổ Phong
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-stone-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    CP: {detailModalCostume.stats.culturePower}
                  </div>
                </div>

                {/* Bảng thử đổi màu trang phục (giữ nguyên vị trí, chỉ hiện màu, không hiện phần chữ) */}
                {detailModalCostume.colorPalettes && (
                  <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-center gap-2.5 flex-wrap">
                      {detailModalCostume.colorPalettes.map((pal, idx) => {
                        const isSelected = activeModalColor.toLowerCase() === pal.hex.toLowerCase();
                        const isLight = ['#ffffff', '#faf0e6', '#f4a460', '#e6be8a', '#f5deb3', '#fffaf0', '#f5e6cb'].includes(
                          pal.hex.toLowerCase()
                        );
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setActiveModalColor(pal.hex);
                              setPreviewColorMap((prev) => ({
                                ...prev,
                                [detailModalCostume.id]: pal.hex,
                              }));
                            }}
                            title={`${pal.name} · ${pal.meaning}`}
                            aria-label={pal.name}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center hover:scale-110 shadow-2xs ${
                              isSelected
                                ? 'ring-2 ring-[#8B1528] ring-offset-2 scale-110 shadow-sm'
                                : 'hover:opacity-90'
                            }`}
                            style={{ backgroundColor: pal.hex }}
                          >
                            {isSelected && (
                              <Check
                                className={`w-3.5 h-3.5 ${isLight ? 'text-stone-800' : 'text-white'}`}
                                strokeWidth={3}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* CỘT PHẢI: THANH BAR CHUYỂN MỤC THÔNG TIN & KHUNG NỘI DUNG LIỀN NHAU (7 CỘT) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div className="space-y-3 flex-1 flex flex-col min-h-0">
                  {/* THANH BAR: MỖI MỤC THÔNG TIN ĐƯỢC CHIA THÀNH 1 Ô TRÊN THANH BAR CÓ BIỂU TƯỢNG */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-200/50 rounded-2xl shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveInfoTab('history')}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        activeInfoTab === 'history'
                          ? 'bg-white text-[#8B1528] shadow-xs scale-[1.02]'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                      }`}
                    >
                      <BookOpen
                        className={`w-3.5 h-3.5 shrink-0 ${
                          activeInfoTab === 'history' ? 'text-[#8B1528]' : 'text-stone-500'
                        }`}
                      />
                      <span className="truncate">Lịch Sử</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveInfoTab('structure')}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        activeInfoTab === 'structure'
                          ? 'bg-white text-[#8B1528] shadow-xs scale-[1.02]'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                      }`}
                    >
                      <Shirt
                        className={`w-3.5 h-3.5 shrink-0 ${
                          activeInfoTab === 'structure' ? 'text-[#8B1528]' : 'text-stone-500'
                        }`}
                      />
                      <span className="truncate">Cấu Trúc</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveInfoTab('culture')}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        activeInfoTab === 'culture'
                          ? 'bg-white text-[#8B1528] shadow-xs scale-[1.02]'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                      }`}
                    >
                      <Sparkles
                        className={`w-3.5 h-3.5 shrink-0 ${
                          activeInfoTab === 'culture' ? 'text-[#8B1528]' : 'text-stone-500'
                        }`}
                      />
                      <span className="truncate">Ý Nghĩa</span>
                    </button>
                  </div>

                  {/* KHUNG HIỂN THỊ NỘI DUNG LIỀN NHAU (CONTIGUOUS FRAME) */}
                  <div className="flex-1 flex flex-col min-h-[250px]">
                    {/* 1. MỤC KHẢO CỨU & LỊCH SỬ */}
                    {activeInfoTab === 'history' && (
                      <div className="bg-white rounded-2xl shadow-xs overflow-hidden divide-y divide-stone-100 flex-1 flex flex-col animate-in fade-in duration-200">
                        {/* Hàng thông tin thời đại & xuất xứ */}
                        <div className="p-3 sm:p-3.5 bg-gradient-to-r from-amber-50/70 to-rose-50/40 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-[#8B1528] bg-white px-2.5 py-0.5 rounded-full shadow-2xs">
                              {detailModalCostume.era}
                            </span>
                            <span className="text-[11px] font-bold text-stone-700 bg-white px-2.5 py-0.5 rounded-full shadow-2xs">
                              {detailModalCostume.region}
                            </span>
                          </div>
                          <span className="text-[11px] text-amber-900 font-semibold italic">
                            {detailModalCostume.badge}
                          </span>
                        </div>

                        {/* Đoạn văn khái lược */}
                        <div className="p-3.5 sm:p-4 bg-white">
                          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-1">
                            Khái Lược Di Sản:
                          </span>
                          <p className="text-xs text-stone-700 leading-relaxed font-serif italic">
                            "{detailModalCostume.description}"
                          </p>
                        </div>

                        {/* Khảo cứu điển lệ chi tiết */}
                        <div className="p-3.5 sm:p-4 bg-white flex-1">
                          <h5 className="text-[11px] uppercase font-bold text-[#8B1528] tracking-wider mb-2 flex items-center gap-1.5">
                            <span>Khảo Cứu Điển Lệ & Lịch Sử Chi Tiết:</span>
                          </h5>
                          <p className="text-xs text-stone-700 leading-relaxed text-justify">
                            {detailModalCostume.historyNote}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 2. MỤC CẤU TRÚC ĐIỂN CHẾ (CÁC Ô LIỀN NHAU LIỀN KHỐI) */}
                    {activeInfoTab === 'structure' && (
                      <div className="bg-white rounded-2xl shadow-xs overflow-hidden flex-1 flex flex-col animate-in fade-in duration-200">
                        <div className="bg-[#FAF2DE]/70 px-4 py-2.5 border-b border-stone-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#8B1528] flex items-center gap-1.5">
                            <Shirt className="w-3.5 h-3.5 text-[#8B1528]" />
                            <span>Quy Thức Cấu Trúc Điển Chế Phục Sức</span>
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">6 Thành Phần Liền Khối</span>
                        </div>

                        {/* Khung lưới các ô liền nhau, chia ngăn tinh tế không có khoảng trống rỗng */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-stone-100 flex-1">
                          {/* Cột trái */}
                          <div className="divide-y divide-stone-100 sm:border-r sm:border-stone-100">
                            <div className="p-3 sm:p-3.5 hover:bg-[#FAF7EE]/70 transition-colors">
                              <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">
                                Dáng áo & Thân vạt
                              </span>
                              <span className="text-stone-800 text-xs font-semibold mt-0.5 block">
                                {detailModalCostume.structure.flaps}
                              </span>
                            </div>
                            <div className="p-3 sm:p-3.5 hover:bg-[#FAF7EE]/70 transition-colors">
                              <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">
                                Cổ áo
                              </span>
                              <span className="text-stone-800 text-xs font-semibold mt-0.5 block">
                                {detailModalCostume.structure.collar}
                              </span>
                            </div>
                            <div className="p-3 sm:p-3.5 hover:bg-[#FAF7EE]/70 transition-colors">
                              <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">
                                Ống tay áo
                              </span>
                              <span className="text-stone-800 text-xs font-semibold mt-0.5 block">
                                {detailModalCostume.structure.sleeves}
                              </span>
                            </div>
                          </div>

                          {/* Cột phải */}
                          <div className="divide-y divide-stone-100 border-t sm:border-t-0 border-stone-100">
                            <div className="p-3 sm:p-3.5 hover:bg-[#FAF7EE]/70 transition-colors">
                              <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">
                                Hàng cúc khuy / Cài đai
                              </span>
                              <span className="text-stone-800 text-xs font-semibold mt-0.5 block">
                                {detailModalCostume.structure.buttons}
                              </span>
                            </div>
                            <div className="p-3 sm:p-3.5 hover:bg-[#FAF7EE]/70 transition-colors">
                              <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">
                                Y phục lót trong
                              </span>
                              <span className="text-stone-800 text-xs font-semibold mt-0.5 block">
                                {detailModalCostume.structure.undergarment}
                              </span>
                            </div>
                            <div className="p-3 sm:p-3.5 hover:bg-[#FAF7EE]/70 transition-colors">
                              <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">
                                Quần / Váy đi kèm
                              </span>
                              <span className="text-stone-800 text-xs font-semibold mt-0.5 block">
                                {detailModalCostume.structure.bottom}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. MỤC Ý NGHĨA VĂN HÓA & TINH THẦN */}
                    {activeInfoTab === 'culture' && (
                      <div className="bg-white rounded-2xl shadow-xs overflow-hidden divide-y divide-stone-100 flex-1 flex flex-col animate-in fade-in duration-200">
                        <div className="p-4 bg-[#FAF2DE]/50">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1528] block mb-1">
                            Triết Lý Cổ Nhân & Hồn Cốt Dân Tộc:
                          </span>
                          <p className="font-serif italic text-stone-800 text-xs font-semibold leading-relaxed">
                            "{detailModalCostume.collectorQuote}"
                          </p>
                        </div>

                        <div className="p-3.5 flex items-center justify-between gap-3 bg-white">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-amber-100 text-[#8B1528] flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                              ✦
                            </span>
                            <div>
                              <span className="text-[10px] text-stone-400 uppercase font-bold block">
                                Đặc trưng văn hóa
                              </span>
                              <span className="text-xs font-bold text-[#8B1528]">
                                {detailModalCostume.specialSkill}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] text-stone-400 uppercase font-bold block">
                              Nguyên tố
                            </span>
                            <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded shadow-2xs">
                              {detailModalCostume.element}
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 bg-white flex-1 space-y-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                            Chỉ Số Phẩm Vị Điển Lệ:
                          </span>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2.5 rounded-xl bg-[#FAF7EE]">
                              <span className="text-[10px] text-stone-500 block mb-0.5">Tao Nhã</span>
                              <span className="text-sm font-bold text-[#8B1528] font-mono">
                                {detailModalCostume.stats.elegance}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#FAF7EE]">
                              <span className="text-[10px] text-stone-500 block mb-0.5">Uy Nghiêm</span>
                              <span className="text-sm font-bold text-amber-700 font-mono">
                                {detailModalCostume.stats.solemnity}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-[#FAF7EE]">
                              <span className="text-[10px] text-stone-500 block mb-0.5">Linh Hoạt</span>
                              <span className="text-sm font-bold text-emerald-700 font-mono">
                                {detailModalCostume.stats.versatility}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* HÀNG NÚT HÀNH ĐỘNG DƯỚI MODAL */}
                <div className="pt-2 border-t border-stone-200/60 flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      onSelectOutfit(detailModalCostume.id);
                      setDetailModalCostume(null);
                      onNavigateToFittingRoom();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#8B1528] hover:bg-[#A31830] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Shirt className="w-4 h-4 text-amber-300" />
                    <span>Mặc Thử Ngay Trong Phòng Đồ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setDetailModalCostume(null);
                      onNavigateToMap();
                    }}
                    className="py-2.5 px-3.5 rounded-xl bg-[#FAF2DE] hover:bg-[#F3E6C8] hover:shadow-xs hover:scale-[1.02] text-[#8B1528] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Xem Bản Đồ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
