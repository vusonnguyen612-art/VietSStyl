import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  LocateFixed,
  Globe,
  Layers,
  Check,
} from 'lucide-react';
import {
  VIETNAM_MAP_LOCATIONS,
  COSTUME_ORIGIN_RESEARCH,
  RegionalOriginLocation,
} from '../data/costumeLocationsData';
import { Costume2DPreview } from './Costume2DPreview';
import { OutfitId } from '../types/costume';

type Language = 'vi' | 'en';
type RegionFilter = 'all' | 'Bắc Bộ' | 'Trung Bộ' | 'Nam Bộ';
type ViewPreset = 'all' | 'bac' | 'trung' | 'nam' | 'bien-dao';

interface VietnamCostumeMapProps {
  onSelectCostume?: (costumeId: OutfitId) => void;
}

// Từ điển đa ngôn ngữ (i18n dictionary) đáp ứng tiêu chuẩn quốc tế & nghiên cứu văn hóa
const I18N = {
  vi: {
    mapTitle: 'Bản Đồ Cổ Phục Việt Nam',
    mapSubtitle: 'Phân định 3 miền Bắc - Trung - Nam & Chủ quyền Biển Đảo',
    overview: 'Toàn Cảnh',
    northVietnam: 'Bắc Bộ',
    centralVietnam: 'Trung Bộ',
    southVietnam: 'Nam Bộ',
    islandsView: 'Biển Đảo',
    boundariesToggle: 'Ranh Giới Tỉnh & Vùng',
    costumeBadgesToggle: 'Thẻ Bài Cổ Phục',
    paracelIslands: 'Quần đảo Hoàng Sa',
    paracelSubtitle: '(TP. Đà Nẵng, Việt Nam)',
    spratlyIslands: 'Quần đảo Trường Sa',
    spratlySubtitle: '(Tỉnh Khánh Hòa, Việt Nam)',
    eastSea: 'BIỂN ĐÔNG',
    gulfOfTonkin: 'VỊNH BẮC BỘ',
    gulfOfThailand: 'VỊNH THÁI LAN',
    panZoomHint: 'Kéo chuột để di chuyển · Cuộn bánh xe để phóng to / thu nhỏ',
    resetZoom: 'Về 100%',
    viewDetails: 'Xem Di Sản',
    backToMap: 'Trở về xem Bản Đồ',
    focusLocation: 'Phóng to vị trí này',
    noCostumesTitle: 'Vùng giao thoa hoặc trang phục thổ cẩm dân tộc đặc thù',
    noCostumesDesc: 'Địa danh này ghi dấu văn hóa bản địa đa dạng hoặc là phên dậu biên cương, biển đảo thiêng liêng của Tổ quốc.',
    prominentCostumesHeader: 'Cổ Phục Tiêu Biểu Tại Địa Danh',
    tryOutfitNow: 'Thử Đồ Ngay',
    historicalOrigin: 'Nguồn gốc lịch sử:',
    frequentLocations: 'Vùng đất thịnh hành:',
    capitalCity: 'Thủ Đô Hà Nội',
    hcmCity: 'TP. Hồ Chí Minh',
    daNangCity: 'TP. Đà Nẵng',
    canThoCity: 'TP. Cần Thơ',
    hueCity: 'Cố Đô Huế',
    langLabel: 'Ngôn ngữ',
    costumeCount: 'cổ phục đặc trưng',
    noCostumesCount: 'Không có cổ phục người Kinh đặc thù',
  },
  en: {
    mapTitle: 'Traditional Vietnamese Costume Map',
    mapSubtitle: '3 Core Regions (North - Central - South) & Maritime Sovereignty',
    overview: 'Overview',
    northVietnam: 'North Vietnam',
    centralVietnam: 'Central Vietnam',
    southVietnam: 'South Vietnam',
    islandsView: 'Islands',
    boundariesToggle: 'Boundaries & Labels',
    costumeBadgesToggle: 'Costume Cards',
    paracelIslands: 'Paracel Islands',
    paracelSubtitle: '(Hoang Sa · Da Nang, Vietnam)',
    spratlyIslands: 'Spratly Islands',
    spratlySubtitle: '(Truong Sa · Khanh Hoa, Vietnam)',
    eastSea: 'EAST SEA',
    gulfOfTonkin: 'GULF OF TONKIN',
    gulfOfThailand: 'GULF OF THAILAND',
    panZoomHint: 'Drag to pan · Scroll to zoom in / out',
    resetZoom: 'Reset 100%',
    viewDetails: 'View Heritage',
    backToMap: 'Back to Map',
    focusLocation: 'Focus on location',
    noCostumesTitle: 'Cultural Crossroads or Indigenous Ethnic Costumes',
    noCostumesDesc: 'This territory represents rich indigenous ethnic attire or sacred sovereign borderlands & archipelagos.',
    prominentCostumesHeader: 'Distinctive Costumes at this Location',
    tryOutfitNow: 'Try On Outfit',
    historicalOrigin: 'Historical origin:',
    frequentLocations: 'Primary regions:',
    capitalCity: 'Hanoi (Capital)',
    hcmCity: 'Ho Chi Minh City',
    daNangCity: 'Da Nang City',
    canThoCity: 'Can Tho City',
    hueCity: 'Imperial City of Hue',
    langLabel: 'Language',
    costumeCount: 'signature costumes',
    noCostumesCount: 'No specific Kinh ethnic attire recorded',
  },
};

export const VietnamCostumeMap: React.FC<VietnamCostumeMapProps> = ({ onSelectCostume }) => {
  const [lang, setLang] = useState<Language>('vi');
  const [selectedLocation, setSelectedLocation] = useState<RegionalOriginLocation>(
    VIETNAM_MAP_LOCATIONS.find((loc) => loc.id === 'thua-thien-hue') || VIETNAM_MAP_LOCATIONS[0]
  );
  const [filterRegion, setFilterRegion] = useState<RegionFilter>('all');
  const [selectedCostumeDetail, setSelectedCostumeDetail] = useState<string | null>(null);
  const [showRegionLabels, setShowRegionLabels] = useState<boolean>(true);
  const [showCostumeBadges, setShowCostumeBadges] = useState<boolean>(true);
  const [mapThemeMode, setMapThemeMode] = useState<'realistic' | 'regional'>('realistic');
  const [mobileViewTab, setMobileViewTab] = useState<'map' | 'detail'>('map');

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number }>({
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });
  const dragDistanceRef = useRef<number>(0);

  const MIN_ZOOM = 0.8;
  const MAX_ZOOM = 4.5;
  const ZOOM_STEP = 0.3;

  const t = I18N[lang];

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(MAX_ZOOM, Number((prev + ZOOM_STEP).toFixed(2))));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(MIN_ZOOM, Number((prev - ZOOM_STEP).toFixed(2))));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Preset camera views
  const handlePresetFocus = useCallback((preset: ViewPreset) => {
    if (preset === 'all') {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else if (preset === 'bac') {
      setZoom(2.2);
      setPan({ x: 40, y: 260 });
    } else if (preset === 'trung') {
      setZoom(2.1);
      setPan({ x: -30, y: 20 });
    } else if (preset === 'nam') {
      setZoom(2.3);
      setPan({ x: 70, y: -270 });
    } else if (preset === 'bien-dao') {
      setZoom(1.9);
      setPan({ x: -160, y: -50 });
    }
  }, []);

  // Focus directly onto a selected province
  const focusOnLocation = useCallback((loc: RegionalOriginLocation) => {
    const targetZoom = 2.4;
    const dx = 300 - loc.coordinates.x;
    const dy = 450 - loc.coordinates.y;
    const scale = 0.72;
    setZoom(targetZoom);
    setPan({
      x: Math.round(dx * scale),
      y: Math.round(dy * scale),
    });
    setSelectedLocation(loc);
  }, []);

  // Pan / drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    dragDistanceRef.current = 0;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: pan.x,
      initialPanY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    dragDistanceRef.current = Math.hypot(dx, dy);
    setPan({
      x: dragStartRef.current.initialPanX + dx,
      y: dragStartRef.current.initialPanY + dy,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 0.87;
      setZoom((prev) => {
        const next = Number((prev * factor).toFixed(2));
        return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const onGlobalPointerUp = () => setIsDragging(false);
    window.addEventListener('pointerup', onGlobalPointerUp);
    return () => window.removeEventListener('pointerup', onGlobalPointerUp);
  }, [isDragging]);

  const handleLocationClick = (loc: RegionalOriginLocation) => {
    if (dragDistanceRef.current > 6) return;
    setSelectedLocation(loc);
    if (loc.prominentCostumes.length > 0) {
      setSelectedCostumeDetail(loc.prominentCostumes[0].costumeId);
    } else {
      setSelectedCostumeDetail(null);
    }
  };

  // Filter locations by region
  const displayedLocations = VIETNAM_MAP_LOCATIONS.filter((loc) => {
    if (filterRegion === 'all') return true;
    return loc.region === filterRegion;
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF7EE] rounded-2xl border border-[#E5D7BE] shadow-md overflow-hidden select-none">
      {/* ======================================================== */}
      {/* 1. TOP HEADER TOOLBAR: WARM PARCHMENT & COHESIVE BRANDING */}
      {/* ======================================================== */}
      <header className="shrink-0 bg-[#F4EAE0] border-b border-[#E5D7BE] px-3 sm:px-4 py-2.5 flex flex-col gap-2 z-20">
        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex items-center bg-white p-0.5 rounded-xl border border-[#E5D7BE] w-full">
          <button
            onClick={() => setMobileViewTab('map')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileViewTab === 'map'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.overview}</span>
          </button>
          <button
            onClick={() => setMobileViewTab('detail')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileViewTab === 'detail'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate">{selectedLocation.province}</span>
          </button>
        </div>

        {/* Desktop & Tablet Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 w-full">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-[#E5D7BE]">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="p-1 rounded-lg text-stone-600 hover:text-[#8B1528] hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
                title="Thu nhỏ bản đồ (-)"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 py-0.5 text-xs font-bold font-mono text-[#8B1528] hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                title="Đặt lại 100%"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="p-1 rounded-lg text-stone-600 hover:text-[#8B1528] hover:bg-stone-100 disabled:opacity-40 transition-colors cursor-pointer"
                title="Phóng to bản đồ (+)"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 rounded-lg text-stone-500 hover:text-[#8B1528] hover:bg-stone-100 transition-colors cursor-pointer"
                title="Đặt lại toàn cảnh"
                aria-label="Reset view"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toggle Boundaries & Labels */}
            <button
              onClick={() => setShowRegionLabels((prev) => !prev)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                showRegionLabels
                  ? 'bg-[#8B1528] text-white border-[#8B1528] shadow-xs'
                  : 'bg-white text-stone-600 border-[#E5D7BE] hover:text-stone-900'
              }`}
              aria-label={t.boundariesToggle}
            >
              <Layers className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">{t.boundariesToggle}</span>
              <span className="sm:hidden">Ranh Giới</span>
            </button>

            {/* Toggle Costume Badges */}
            <button
              onClick={() => setShowCostumeBadges((prev) => !prev)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                showCostumeBadges
                  ? 'bg-[#8B1528] text-white border-[#8B1528] shadow-xs'
                  : 'bg-white text-stone-600 border-[#E5D7BE] hover:text-stone-900'
              }`}
              aria-label={t.costumeBadgesToggle}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">{t.costumeBadgesToggle}</span>
              <span className="sm:hidden">Thẻ Bài</span>
            </button>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-xl border border-[#E5D7BE]">
              {(['all', 'Bắc Bộ', 'Trung Bộ', 'Nam Bộ'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setFilterRegion(reg)}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    filterRegion === reg
                      ? 'bg-[#8B1528] text-white shadow-xs'
                      : 'text-stone-700 hover:text-[#8B1528] hover:bg-stone-100'
                  }`}
                >
                  {reg === 'all'
                    ? t.overview
                    : reg === 'Bắc Bộ'
                    ? t.northVietnam
                    : reg === 'Trung Bộ'
                    ? t.centralVietnam
                    : t.southVietnam}
                </button>
              ))}
            </div>

            {/* i18n Language Toggle: VI / EN */}
            <div className="flex items-center bg-white p-0.5 rounded-xl border border-[#E5D7BE]">
              <button
                onClick={() => setLang('vi')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-[#8B1528] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label="Chuyển sang tiếng Việt"
              >
                VI
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#8B1528] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. BODY: 2-COLUMN ASYMMETRIC GRID (70/30 SPLIT ON DESKTOP) */}
      {/* ======================================================== */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* LEFT COLUMN: THE REALISTIC PAINTED CARTOGRAPHY MAP (7 COLS) */}
        <main
          className={`lg:col-span-7 h-full flex flex-col bg-[#FAF7EE] relative overflow-hidden border-r border-[#E5D7BE] ${
            mobileViewTab === 'map' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Floating View Presets Toolbar in Top-Right */}
          <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5 pointer-events-auto">
            <div className="hidden sm:flex items-center gap-1 bg-white/95 backdrop-blur-md border border-[#E5D7BE] p-1 rounded-xl shadow-md text-[11px] font-semibold text-stone-700">
              <span className="text-[10px] text-stone-500 px-1">Góc nhìn:</span>
              <button
                onClick={() => handlePresetFocus('all')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  zoom === 1 && pan.x === 0 && pan.y === 0
                    ? 'bg-[#8B1528] text-white shadow-xs'
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                {t.overview}
              </button>
              <button
                onClick={() => handlePresetFocus('bac')}
                className="px-2 py-0.5 rounded-md hover:bg-stone-100 text-stone-700 hover:text-[#8B1528] transition-all cursor-pointer"
              >
                {t.northVietnam}
              </button>
              <button
                onClick={() => handlePresetFocus('trung')}
                className="px-2 py-0.5 rounded-md hover:bg-stone-100 text-stone-700 hover:text-[#8B1528] transition-all cursor-pointer"
              >
                {t.centralVietnam}
              </button>
              <button
                onClick={() => handlePresetFocus('nam')}
                className="px-2 py-0.5 rounded-md hover:bg-stone-100 text-stone-700 hover:text-[#8B1528] transition-all cursor-pointer"
              >
                {t.southVietnam}
              </button>
              <button
                onClick={() => handlePresetFocus('bien-dao')}
                className="px-2 py-0.5 rounded-md hover:bg-stone-100 text-stone-700 hover:text-[#8B1528] transition-all cursor-pointer"
              >
                {t.islandsView}
              </button>
            </div>
          </div>

          {/* Bottom Drag / Pan Notice */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-xs border border-[#E5D7BE] rounded-full px-3 py-1 shadow-xs text-[11px] text-stone-700 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-[#8B1528]" />
              <span>{t.panZoomHint}</span>
            </div>
            {(zoom !== 1 || pan.x !== 0 || pan.y !== 0) && (
              <button
                onClick={handleResetZoom}
                className="pointer-events-auto bg-[#8B1528] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs hover:bg-[#A11930] transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.resetZoom}</span>
              </button>
            )}
          </div>

          {/* SVG Map Canvas with Zoom & Pan */}
          <div
            ref={mapContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`flex-1 min-h-0 w-full h-full flex items-center justify-center relative overflow-hidden select-none touch-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ userSelect: 'none' }}
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="w-full h-full flex items-center justify-center will-change-transform pointer-events-auto"
            >
              <svg
                viewBox="0 0 620 920"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full max-h-[780px] select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ======================================================== */}
                {/* 1. DEFS: REALISTIC WATERCOLORS, BATHYMETRY & RELIEF      */}
                {/* ======================================================== */}
                <defs>
                  {/* Đại dương biển xanh tự nhiên chuẩn các trang bản đồ địa lý thực tế */}
                  <linearGradient id="oceanDeepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CDE7F7" />
                    <stop offset="35%" stopColor="#BCE0F5" />
                    <stop offset="70%" stopColor="#A7D5F0" />
                    <stop offset="100%" stopColor="#96C9EB" />
                  </linearGradient>

                  {/* Vầng sáng biển nông thềm lục địa (Coastal Shelf Turquoise Glow) */}
                  <linearGradient id="shelfGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E0F7FA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#B2EBF2" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#80DEEA" stopOpacity="0.25" />
                  </linearGradient>

                  {/* Dãy Hoàng Liên Sơn & Tây Bắc (Địa hình cao độ tự nhiên) */}
                  <linearGradient id="northHighlandGrad" x1="20%" y1="0%" x2="90%" y2="100%">
                    <stop offset="0%" stopColor="#9C7728" />
                    <stop offset="35%" stopColor="#C59336" />
                    <stop offset="70%" stopColor="#5EA966" />
                    <stop offset="100%" stopColor="#3F9149" />
                  </linearGradient>

                  {/* Dãy Trường Sơn Bắc & Trung Bộ */}
                  <linearGradient id="truongSonGrad" x1="0%" y1="30%" x2="100%" y2="80%">
                    <stop offset="0%" stopColor="#966F26" />
                    <stop offset="45%" stopColor="#B88934" />
                    <stop offset="75%" stopColor="#549E59" />
                    <stop offset="100%" stopColor="#3A8741" />
                  </linearGradient>

                  {/* Cao nguyên Tây Nguyên & Nam Trung Bộ */}
                  <linearGradient id="tayNguyenGrad" x1="10%" y1="20%" x2="90%" y2="80%">
                    <stop offset="0%" stopColor="#A36C28" />
                    <stop offset="50%" stopColor="#C28B36" />
                    <stop offset="100%" stopColor="#4E9754" />
                  </linearGradient>

                  {/* Đồng bằng Nam Bộ & Châu thổ Mekong */}
                  <linearGradient id="southDeltaGrad" x1="20%" y1="10%" x2="80%" y2="90%">
                    <stop offset="0%" stopColor="#4E9C54" />
                    <stop offset="45%" stopColor="#38A146" />
                    <stop offset="80%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#15803D" />
                  </linearGradient>

                  {/* Châu thổ sông Hồng phì nhiêu */}
                  <radialGradient id="redRiverDeltaGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#4ADE80" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3" />
                  </radialGradient>

                  {/* Châu thổ Cửu Long 9 nhánh sông */}
                  <radialGradient id="mekongDeltaGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#4ADE80" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3" />
                  </radialGradient>

                  {/* Khung tiêu đề sơn mài dát vàng (Cartouche Gold) */}
                  <linearGradient id="cartoucheGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="40%" stopColor="#F59E0B" />
                    <stop offset="80%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#B45309" />
                  </linearGradient>

                  {/* Rạn san hô biển đảo (Coral Atoll Glow) */}
                  <radialGradient id="atollGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#0891B2" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0E7490" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* ======================================================== */}
                {/* 2. REALISTIC MARINE CANVAS (BIỂN ĐÔNG & THỦY HỌA ĐỊA LÝ) */}
                {/* ======================================================== */}
                {/* Nền đại dương xanh nước biển tự nhiên như các trang bản đồ chuẩn */}
                <rect x="0" y="0" width="620" height="920" fill="url(#oceanDeepGrad)" />

                {/* Đường lưới tọa độ hàng hải cổ điển */}
                <g stroke="#93C5FD" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.45">
                  <line x1="80" y1="20" x2="80" y2="900" />
                  <line x1="160" y1="20" x2="160" y2="900" />
                  <line x1="240" y1="20" x2="240" y2="900" />
                  <line x1="320" y1="20" x2="320" y2="900" />
                  <line x1="400" y1="20" x2="400" y2="900" />
                  <line x1="480" y1="20" x2="480" y2="900" />
                  <line x1="560" y1="20" x2="560" y2="900" />

                  <line x1="20" y1="90" x2="600" y2="90" />
                  <line x1="20" y1="180" x2="600" y2="180" />
                  <line x1="20" y1="270" x2="600" y2="270" />
                  <line x1="20" y1="360" x2="600" y2="360" />
                  <line x1="20" y1="450" x2="600" y2="450" />
                  <line x1="20" y1="540" x2="600" y2="540" />
                  <line x1="20" y1="630" x2="600" y2="630" />
                  <line x1="20" y1="720" x2="600" y2="720" />
                  <line x1="20" y1="810" x2="600" y2="810" />
                </g>

                {/* Sóng lượn đồng mức nước biển nông ven bờ (Bathymetry Ripples) */}
                <g fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0.4">
                  <path d="M 285 45 C 335 60, 395 90, 425 150 C 445 210, 395 270, 375 330 C 355 390, 375 450, 405 510 C 445 590, 455 670, 425 740 C 395 810, 335 870, 275 900" />
                  <path d="M 295 35 C 350 50, 415 85, 450 150 C 470 215, 420 280, 400 345 C 380 405, 400 465, 430 530 C 470 615, 480 700, 445 775 C 410 845, 350 905, 280 915" />
                  <path d="M 315 25 C 375 42, 440 80, 475 145 C 498 215, 445 285, 422 355 C 400 415, 422 478, 452 545 C 495 635, 502 725, 465 805 C 425 878, 360 920, 290 920" />
                </g>

                {/* ======================================================== */}
                {/* 3. SURROUNDING INDOCHINA CONTEXT (BỐI CẢNH BÁN ĐẢO)     */}
                {/* ======================================================== */}
                {/* Đất liền lân cận thể hiện theo tông màu giấy sa/đất tự nhiên chuẩn như bản đồ thực tế */}
                <g id="surrounding-indochina" opacity="0.85">
                  {/* Nam Trung Hoa & Vịnh Bắc Bộ phía Bắc */}
                  <path
                    d="M 40 20 L 40 100 C 90 95, 120 90, 150 90 C 180 85, 230 65, 250 65 C 275 70, 290 75, 310 80 C 325 90, 335 105, 345 120 C 365 125, 380 130, 390 135 C 420 120, 460 110, 520 115 L 600 115 L 600 20 Z"
                    fill="#EFEAE1"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                  {/* Đảo Hải Nam (Hainan Island) trong Vịnh Bắc Bộ */}
                  <g id="island-hainan">
                    <ellipse cx="430" cy="225" rx="34" ry="26" fill="#EAE3D2" stroke="#CBD5E1" strokeWidth="1" />
                    <text x="430" y="228" textAnchor="middle" fontSize="8" fill="#64748B" fontWeight="600">
                      Đ. Hải Nam
                    </text>
                  </g>
                  {/* Lào & Campuchia (Phía Tây Việt Nam) */}
                  <path
                    d="M 40 100 
                       C 80 120, 100 135, 125 140 
                       C 140 175, 160 190, 190 205 
                       C 220 230, 235 240, 265 255 
                       C 255 270, 250 300, 245 330 
                       C 240 360, 255 400, 275 430 
                       C 295 460, 295 500, 290 540 
                       C 285 580, 280 620, 265 650 
                       C 250 670, 220 680, 190 690 
                       C 160 700, 130 710, 100 730 
                       L 40 730 Z"
                    fill="#EFEAE1"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                </g>

                {/* ======================================================== */}
                {/* 4. VIETNAM CONTINENTAL SHELF (THỀM LỤC ĐỊA BIỂN NÔNG)    */}
                {/* ======================================================== */}
                {/* Vầng sáng biển nông ngọc bích bao quanh bờ biển hình chữ S */}
                <path
                  d="M 120 135 
                     C 140 120, 165 108, 190 105 
                     C 215 100, 235 80, 255 60 
                     C 280 65, 298 70, 318 75 
                     C 335 85, 345 100, 355 115 
                     C 375 120, 395 125, 405 132 
                     C 400 155, 385 168, 375 178 
                     C 360 185, 350 198, 345 210 
                     C 340 225, 335 242, 330 255 
                     C 318 268, 305 282, 305 305 
                     C 302 328, 312 348, 322 368 
                     C 332 388, 345 415, 355 435 
                     C 372 452, 388 468, 396 482 
                     C 405 505, 412 532, 422 558 
                     C 432 585, 442 605, 442 628 
                     C 438 655, 425 678, 408 698 
                     C 392 708, 370 715, 355 712 
                     C 372 715, 385 732, 380 755 
                     C 370 778, 358 795, 348 812 
                     C 338 828, 325 850, 315 870 
                     C 298 892, 275 912, 250 922 
                     C 232 928, 215 915, 202 892 
                     C 192 870, 182 842, 172 820 
                     C 165 802, 182 785, 198 772 
                     C 215 758, 230 740, 248 722 
                     C 270 700, 290 690, 315 685 
                     C 305 650, 292 610, 298 570 
                     C 305 535, 310 500, 320 468 
                     C 315 435, 298 405, 282 372 
                     C 265 340, 248 308, 242 275 
                     C 252 252, 268 240, 282 235 
                     C 260 235, 240 230, 228 218 
                     C 212 208, 198 192, 182 182 
                     C 168 172, 148 162, 132 152 Z"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="8"
                  opacity="0.35"
                  strokeLinejoin="round"
                  filter="blur(4px)"
                />

                {/* ======================================================== */}
                {/* 5. THE S-SHAPED CONTINENTAL TERRITORY (LÃNH THỔ HÌNH CHỮ S) */}
                {/* ======================================================== */}

                {/* VÙNG 1: BẮC BỘ (HOÀNG LIÊN SƠN, TÂY BẮC, ĐÔNG BẮC & ĐỒNG BẰNG SÔNG HỒNG) */}
                <g id="region-bac-bo">
                  {/* Khối đất liền Bắc Bộ */}
                  <path
                    d="M 125 140 
                       C 140 125, 160 115, 185 110 
                       C 210 105, 230 85, 250 65 
                       C 275 70, 290 75, 310 80 
                       C 325 90, 335 105, 345 120 
                       C 365 125, 380 130, 390 135 
                       C 385 150, 375 160, 365 170 
                       C 350 175, 340 185, 335 195 
                       C 330 205, 325 220, 320 230 
                       C 310 240, 298 250, 285 255 
                       C 265 255, 245 252, 235 240 
                       C 220 230, 205 215, 190 205 
                       C 175 195, 155 185, 140 175 
                       C 128 165, 122 152, 125 140 Z"
                    fill={mapThemeMode === 'realistic' ? 'url(#northHighlandGrad)' : '#10B981'}
                    stroke="#B45309"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />

                  {/* Châu thổ Sông Hồng màu phù sa phì nhiêu */}
                  <ellipse cx="282" cy="180" rx="42" ry="26" fill="url(#redRiverDeltaGrad)" />

                  {/* Sống núi dãy Hoàng Liên Sơn & Fansipan (Vẽ bóng núi tự nhiên) */}
                  <g stroke="#78350F" strokeWidth="1.2" fill="none" opacity="0.65">
                    <path d="M 175 115 Q 195 130 215 155" />
                    <path d="M 190 110 Q 210 125 230 148" />
                    <path d="M 160 135 Q 180 148 200 170" />
                    {/* Đỉnh Fansipan biểu tượng */}
                    <g transform="translate(195, 125)">
                      <polygon points="0,-4 3,2 -3,2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
                      <text x="5" y="-1" fontSize="7" fill="#78350F" fontWeight="bold">
                        Fansipan 3.143m
                      </text>
                    </g>
                  </g>

                  {/* Hệ thống Sông ngòi miền Bắc: Sông Hồng, Sông Đà, Sông Lô */}
                  <g fill="none" stroke="#0284C7" strokeWidth="1.2" opacity="0.9" strokeLinecap="round">
                    {/* Sông Hồng từ Lào Cai về Thăng Long - Hà Nội rồi ra biển */}
                    <path d="M 190 108 C 215 125, 245 150, 275 172 C 295 185, 315 200, 330 220" />
                    {/* Sông Đà từ Tây Bắc hòa vào Sông Hồng */}
                    <path d="M 155 145 C 180 160, 215 170, 255 172" />
                    {/* Sông Lô từ Tuyên Quang xuống */}
                    <path d="M 245 95 C 252 120, 260 145, 270 165" />
                  </g>
                </g>

                {/* VÙNG 2: TRUNG BỘ (DÃY TRƯỜNG SƠN, DUYÊN HẢI & TÂY NGUYÊN) */}
                <g id="region-trung-bo">
                  {/* Khối đất liền Trung Bộ eo biển thon dài */}
                  <path
                    d="M 285 255 
                       C 295 265, 300 280, 298 300 
                       C 295 320, 305 340, 315 360 
                       C 325 380, 335 405, 345 425 
                       C 360 440, 375 455, 382 468 
                       C 390 490, 395 515, 405 540 
                       C 415 565, 425 585, 428 605 
                       C 425 630, 415 650, 400 668 
                       C 385 678, 365 685, 350 682 
                       C 335 675, 320 660, 310 640 
                       C 300 620, 290 590, 295 560 
                       C 300 530, 305 500, 315 470 
                       C 310 440, 295 410, 280 380 
                       C 265 350, 250 320, 245 290 
                       C 255 270, 270 260, 285 255 Z"
                    fill={mapThemeMode === 'realistic' ? 'url(#truongSonGrad)' : '#F59E0B'}
                    stroke="#B45309"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />

                  {/* Sống lưng dãy Trường Sơn Bắc & Trường Sơn Nam */}
                  <g stroke="#78350F" strokeWidth="1.3" fill="none" opacity="0.6">
                    <path d="M 270 295 Q 285 330 295 375" />
                    <path d="M 298 385 Q 320 425 340 455" />
                    <path d="M 335 465 Q 360 510 385 565" />
                    <path d="M 370 565 Q 395 610 405 645" />
                    {/* Dãy cao nguyên Tây Nguyên (Đắk Lắk, Lâm Đồng) */}
                    <ellipse cx="345" cy="590" rx="36" ry="48" fill="url(#tayNguyenGrad)" opacity="0.35" />
                  </g>

                  {/* Các con sông lịch sử miền Trung: Sông Mã, Sông Lam, Sông Hương, Sông Thu Bồn */}
                  <g fill="none" stroke="#0284C7" strokeWidth="1.1" opacity="0.9" strokeLinecap="round">
                    {/* Sông Mã (Thanh Hóa) */}
                    <path d="M 255 275 C 270 282, 285 290, 298 296" />
                    {/* Sông Lam (Nghệ An) */}
                    <path d="M 265 315 C 280 325, 295 335, 305 342" />
                    {/* Sông Gianh & Sông Thạch Hãn (Quảng Bình, Quảng Trị) */}
                    <path d="M 285 375 C 300 385, 315 395, 328 405" />
                    {/* Sông Hương (Cố Đô Huế) thơ mộng */}
                    <path d="M 322 430 C 332 435, 342 438, 352 440" />
                    {/* Sông Thu Bồn (Quảng Nam - Hội An) */}
                    <path d="M 345 470 C 358 475, 370 480, 380 484" />
                    {/* Sông Ba / Đà Rằng (Phú Yên) */}
                    <path d="M 340 545 C 365 555, 388 565, 412 572" />
                  </g>

                  {/* Đèo Hải Vân & Đèo Ngang (Vị trí địa lý hiểm trở) */}
                  <g opacity="0.9">
                    <line x1="318" y1="388" x2="324" y2="384" stroke="#92400E" strokeWidth="1.6" />
                    <text x="326" y="386" fontSize="7" fill="#78350F" fontWeight="bold">Đèo Ngang</text>
                    <line x1="365" y1="462" x2="372" y2="458" stroke="#92400E" strokeWidth="1.6" />
                    <text x="374" y="460" fontSize="7" fill="#78350F" fontWeight="bold">Đèo Hải Vân</text>
                  </g>
                </g>

                {/* VÙNG 3: NAM BỘ (ĐÔNG NAM BỘ & ĐỒNG BẰNG SÔNG CỬU LONG) */}
                <g id="region-nam-bo">
                  {/* Khối đất liền Nam Bộ mở rộng về phía biển */}
                  <path
                    d="M 350 682 
                       C 365 685, 375 700, 370 720 
                       C 362 740, 350 755, 340 770 
                       C 330 785, 320 805, 310 825 
                       C 295 845, 275 865, 255 878 
                       C 240 885, 225 875, 215 855 
                       C 205 835, 195 810, 185 790 
                       C 180 775, 195 760, 210 748 
                       C 225 735, 240 720, 255 705 
                       C 275 685, 295 675, 320 672 
                       C 335 675, 345 678, 350 682 Z"
                    fill={mapThemeMode === 'realistic' ? 'url(#southDeltaGrad)' : '#15803D'}
                    stroke="#B45309"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />

                  {/* Châu thổ Cửu Long sông nước miệt vườn rạng ngời */}
                  <ellipse cx="265" cy="790" rx="55" ry="40" fill="url(#mekongDeltaGlow)" />

                  {/* Hệ thống Sông Đồng Nai, Sông Sài Gòn & 9 Cửa Sông Tiền, Sông Hậu */}
                  <g fill="none" stroke="#0284C7" strokeWidth="1.2" opacity="0.9" strokeLinecap="round">
                    {/* Sông Đồng Nai & Sài Gòn */}
                    <path d="M 320 705 C 322 718, 326 732, 335 745" />
                    {/* Sông Tiền */}
                    <path d="M 235 740 C 265 750, 295 765, 325 780" />
                    <path d="M 285 760 C 305 770, 320 785, 332 800" />
                    {/* Sông Hậu qua Cần Thơ ra cửa Trần Đề, Định An */}
                    <path d="M 225 765 C 255 778, 280 800, 305 825" />
                    <path d="M 255 795 C 275 815, 295 835, 310 850" />
                    {/* Kênh rạch Cà Mau miệt thứ */}
                    <path d="M 220 830 C 235 845, 250 860, 260 870" />
                  </g>

                  {/* Mũi Cà Mau cực Nam Tổ quốc */}
                  <circle cx="230" cy="875" r="3.2" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="238" y="878" fontSize="7.5" fill="#1E293B" fontWeight="bold">
                    Mũi Cà Mau
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 6. THIÊNG LIÊNG BIỂN ĐẢO: HOÀNG SA, TRƯỜNG SA & PHÚ QUỐC */}
                {/* ======================================================== */}

                {/* QUẦN ĐẢO HOÀNG SA (PARACEL ISLANDS - TP. ĐÀ NẴNG, VIỆT NAM) */}
                <g
                  id="island-hoang-sa"
                  className="cursor-pointer group"
                  onClick={() => {
                    const loc = VIETNAM_MAP_LOCATIONS.find((l) => l.id === 'hoang-sa');
                    if (loc) handleLocationClick(loc);
                  }}
                >
                  {/* Vầng nước san hô xanh ngọc bích quanh rạn đảo */}
                  <ellipse cx="490" cy="435" rx="38" ry="28" fill="url(#atollGlow)" />
                  {/* Khung hải đồ bảo vệ chủ quyền dát vàng thanh lịch */}
                  <rect
                    x="455"
                    y="405"
                    width="74"
                    height="62"
                    rx="8"
                    fill="#FFFFFF"
                    stroke="#D97706"
                    strokeWidth="1.4"
                    strokeDasharray="4 3"
                    className="group-hover:stroke-red-600 transition-all shadow-md"
                  />

                  {/* Các đảo & rạn san hô chân thực */}
                  <circle cx="475" cy="425" r="4.5" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="490" cy="420" r="4.0" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="502" cy="432" r="4.2" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="470" cy="442" r="3.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="484" cy="452" r="4.0" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="510" cy="446" r="3.2" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="494" cy="458" r="3.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />

                  {/* Vòng đai rạn san hô tự nhiên */}
                  <ellipse cx="488" cy="436" rx="26" ry="18" fill="none" stroke="#0891B2" strokeWidth="1" opacity="0.85" />

                  {/* Tên thiêng liêng: Quần đảo Hoàng Sa (Việt Nam) */}
                  <text
                    x="492"
                    y="396"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#8B1528"
                    className="font-serif drop-shadow-xs tracking-wider"
                  >
                    {t.paracelIslands}
                  </text>
                  <text
                    x="492"
                    y="406"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="600"
                    fill="#0369A1"
                  >
                    {t.paracelSubtitle}
                  </text>
                </g>

                {/* QUẦN ĐẢO TRƯỜNG SA (SPRATLY ISLANDS - TỈNH KHÁNH HÒA, VIỆT NAM) */}
                <g
                  id="island-truong-sa"
                  className="cursor-pointer group"
                  onClick={() => {
                    const loc = VIETNAM_MAP_LOCATIONS.find((l) => l.id === 'truong-sa');
                    if (loc) handleLocationClick(loc);
                  }}
                >
                  {/* Vầng nước san hô xanh ngọc bích quanh quần đảo Trường Sa */}
                  <ellipse cx="485" cy="795" rx="46" ry="40" fill="url(#atollGlow)" />
                  {/* Khung hải đồ bảo vệ chủ quyền dát vàng thanh lịch */}
                  <rect
                    x="440"
                    y="750"
                    width="88"
                    height="88"
                    rx="10"
                    fill="#FFFFFF"
                    stroke="#D97706"
                    strokeWidth="1.4"
                    strokeDasharray="4 3"
                    className="group-hover:stroke-red-600 transition-all shadow-md"
                  />

                  {/* Các đảo & rạn đá tiêu biểu */}
                  <circle cx="458" cy="768" r="4.6" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="478" cy="762" r="4.2" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="498" cy="774" r="4.4" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="454" cy="792" r="3.8" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="474" cy="796" r="4.8" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
                  <circle cx="494" cy="806" r="3.6" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="512" cy="798" r="3.4" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="468" cy="820" r="4.0" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                  <circle cx="488" cy="826" r="3.6" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />

                  {/* Vòng rạn san hô lồng ghép */}
                  <ellipse cx="482" cy="795" rx="34" ry="26" fill="none" stroke="#0891B2" strokeWidth="1" opacity="0.85" />

                  {/* Tên thiêng liêng: Quần đảo Trường Sa (Việt Nam) */}
                  <text
                    x="484"
                    y="741"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#8B1528"
                    className="font-serif drop-shadow-xs tracking-wider"
                  >
                    {t.spratlyIslands}
                  </text>
                  <text
                    x="484"
                    y="751"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="600"
                    fill="#0369A1"
                  >
                    {t.spratlySubtitle}
                  </text>
                </g>

                {/* ĐẢO PHÚ QUỐC (KIÊN GIANG) - HÌNH DÁNG NÚI ĐẢO ĐẶC TRƯNG */}
                <g
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    const loc = VIETNAM_MAP_LOCATIONS.find((l) => l.id === 'phu-quoc');
                    if (loc) handleLocationClick(loc);
                  }}
                >
                  <path
                    d="M 188 775 
                       C 196 780, 198 795, 194 808 
                       C 190 816, 185 818, 182 812 
                       C 180 802, 182 788, 188 775 Z"
                    fill="#15803D"
                    stroke="#B45309"
                    strokeWidth="1.2"
                  />
                  <text x="188" y="825" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">
                    Đ. Phú Quốc
                  </text>
                </g>

                {/* CÔN ĐẢO (BÀ RỊA - VŨNG TÀU) */}
                <g
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => {
                    const loc = VIETNAM_MAP_LOCATIONS.find((l) => l.id === 'con-dao');
                    if (loc) handleLocationClick(loc);
                  }}
                >
                  <ellipse cx="325" cy="865" rx="7" ry="5" fill="#15803D" stroke="#B45309" strokeWidth="1" />
                  <text x="325" y="878" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">
                    Côn Đảo
                  </text>
                </g>

                {/* CÁC ĐẢO TIÊU BIỂU DỌC BỜ BIỂN VIỆT NAM */}
                {/* Đảo Cát Bà & Vịnh Hạ Long (Quảng Ninh) */}
                <circle cx="348" cy="188" r="4.2" fill="#15803D" stroke="#B45309" strokeWidth="1" />
                <text x="348" y="200" textAnchor="middle" fontSize="7" fontWeight="600" fill="#1E293B">
                  Cát Bà
                </text>

                {/* Đảo Bạch Long Vĩ (Vịnh Bắc Bộ) */}
                <circle cx="370" cy="182" r="3.5" fill="#15803D" stroke="#B45309" strokeWidth="1" />
                <text x="378" y="182" fontSize="7" fontWeight="600" fill="#1E293B">
                  Bạch Long Vĩ
                </text>

                {/* Đảo Lý Sơn (Quảng Ngãi) */}
                <circle cx="410" cy="510" r="3.8" fill="#15803D" stroke="#B45309" strokeWidth="1" />
                <text x="418" y="512" fontSize="7.5" fontWeight="600" fill="#1E293B">
                  Lý Sơn
                </text>

                {/* Đảo Phú Quý (Bình Thuận) */}
                <circle cx="406" cy="705" r="3.8" fill="#15803D" stroke="#B45309" strokeWidth="1" />
                <text x="416" y="707" fontSize="7.5" fontWeight="600" fill="#1E293B">
                  Phú Quý
                </text>

                {/* Quần đảo Thổ Chu (Kiên Giang) */}
                <circle cx="155" cy="840" r="3.2" fill="#15803D" stroke="#B45309" strokeWidth="0.9" />
                <text x="155" y="850" textAnchor="middle" fontSize="7" fontWeight="600" fill="#1E293B">
                  Thổ Chu
                </text>

                {/* ======================================================== */}
                {/* 7. CLASSICAL MARITIME LABELS & CARTOUCHE                 */}
                {/* ======================================================== */}
                {/* BIỂN ĐÔNG (EAST SEA) - DÒNG CHỮ HẢI HỌA TRANG TRỌNG */}
                <g className="select-none pointer-events-none">
                  <text
                    x="485"
                    y="315"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill="#0369A1"
                    letterSpacing="6"
                    className="font-serif drop-shadow-xs"
                  >
                    {t.eastSea}
                  </text>
                  <text
                    x="485"
                    y="332"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="700"
                    fill="#0284C7"
                    letterSpacing="2"
                    className="font-sans"
                  >
                    (EAST SEA · MARITIME SOVEREIGNTY)
                  </text>

                  {/* VỊNH BẮC BỘ */}
                  <text
                    x="375"
                    y="225"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#0369A1"
                    letterSpacing="1.5"
                    className="font-serif"
                  >
                    {t.gulfOfTonkin}
                  </text>

                  {/* VỊNH THÁI LAN */}
                  <text
                    x="145"
                    y="830"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#0369A1"
                    letterSpacing="1.5"
                    className="font-serif"
                  >
                    {t.gulfOfThailand}
                  </text>
                </g>

                {/* KHUNG TIÊU ĐỀ BẢN ĐỒ CỔ HOÀNG GIA (CARTOUCHE BẢN ĐỒ ĐỊA LÝ) */}
                <g transform="translate(45, 30)" className="select-none pointer-events-none opacity-95">
                  <rect
                    x="0"
                    y="0"
                    width="186"
                    height="60"
                    rx="8"
                    fill="#FFFFFF"
                    stroke="#D4AF37"
                    strokeWidth="1.8"
                    className="shadow-md"
                  />
                  <rect x="3" y="3" width="180" height="54" rx="6" fill="#FAF7EE" stroke="#E5D7BE" strokeWidth="0.8" strokeDasharray="3 2" />
                  <text x="93" y="23" textAnchor="middle" fontSize="11" fontWeight="900" fill="#8B1528" className="font-serif tracking-wider">
                    ĐẠI NAM TOÀN ĐỒ
                  </text>
                  <text x="93" y="37" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#2A1D17" className="font-sans">
                    Bản Đồ Địa Lý & Cổ Phục Việt Nam
                  </text>
                  <text x="93" y="49" textAnchor="middle" fontSize="7" fill="#64748B" className="font-sans">
                    Chủ quyền Lãnh thổ & Biển đảo Toàn vẹn
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 8. NAUTICAL COMPASS ROSE (HOA TIÊU LA BÀN HẢI ĐỒ CỔ ĐIỂN) */}
                {/* ======================================================== */}
                <g transform="translate(565, 855)" className="select-none opacity-95 pointer-events-none">
                  {/* Vành hoa tiêu la bàn dát vàng trang nhã trên nền trắng */}
                  <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="url(#cartoucheGoldGrad)" strokeWidth="1.8" className="shadow-md" />
                  <circle cx="0" cy="0" r="21" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#0284C7" strokeWidth="0.6" />

                  {/* 8 cánh hoa tiêu định hướng: Bắc (N - Đỏ), Nam (S), Đông (E), Tây (W) */}
                  {/* Hướng Bắc */}
                  <polygon points="0,-24 4,-4 0,-7" fill="#EF4444" />
                  <polygon points="0,-24 -4,-4 0,-7" fill="#DC2626" />
                  {/* Hướng Nam */}
                  <polygon points="0,24 4,4 0,7" fill="#94A3B8" />
                  <polygon points="0,24 -4,4 0,7" fill="#64748B" />
                  {/* Hướng Đông */}
                  <polygon points="24,0 4,4 7,0" fill="#94A3B8" />
                  <polygon points="24,0 4,-4 7,0" fill="#64748B" />
                  {/* Hướng Tây */}
                  <polygon points="-24,0 -4,4 -7,0" fill="#94A3B8" />
                  <polygon points="-24,0 -4,-4 -7,0" fill="#64748B" />

                  {/* 4 cánh chéo phụ */}
                  <polygon points="16,-16 2,-2 4,-6" fill="#D4AF37" opacity="0.9" />
                  <polygon points="-16,-16 -2,-2 -4,-6" fill="#D4AF37" opacity="0.9" />
                  <polygon points="16,16 2,2 4,6" fill="#D4AF37" opacity="0.9" />
                  <polygon points="-16,16 -2,-2 -4,-6" fill="#D4AF37" opacity="0.9" />

                  <circle cx="0" cy="0" r="3.5" fill="#FEF08A" stroke="#78350F" strokeWidth="1" />
                  <text x="0" y="-28" textAnchor="middle" fontSize="10" fontWeight="900" fill="#EF4444" className="font-serif">
                    N
                  </text>
                </g>

                {/* THƯỚC TỈ LỆ BẢN ĐỒ (SCALE BAR) */}
                <g transform="translate(45, 875)" className="select-none pointer-events-none opacity-90">
                  <rect x="0" y="0" width="80" height="4" fill="#FFFFFF" stroke="#64748B" strokeWidth="0.8" />
                  <rect x="0" y="0" width="40" height="4" fill="#0284C7" />
                  <text x="0" y="-3" fontSize="7" fill="#1E293B" fontWeight="bold">0</text>
                  <text x="40" y="-3" fontSize="7" fill="#1E293B" fontWeight="bold">150km</text>
                  <text x="80" y="-3" fontSize="7" fill="#1E293B" fontWeight="bold">300km</text>
                </g>

                {/* CÁC ĐÔ THỊ TRUNG TÂM (NGÔI SAO VÀNG / ĐỎ) */}
                <g className="select-none pointer-events-none">
                  {/* ⭐ Hà Nội (Thủ Đô) */}
                  <g transform="translate(275, 172)">
                    <polygon
                      points="0,-7 2,-2 7,-2 3,1.5 5,6.5 0,3.5 -5,6.5 -3,1.5 -7,-2 -2,-2"
                      fill="#EF4444"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      className="drop-shadow-xs"
                    />
                    <text x="0" y="16" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#8B1528" className="font-serif">
                      Hà Nội (Thủ đô)
                    </text>
                  </g>

                  {/* ⭐ Huế (Cố Đô Phú Xuân) */}
                  <g transform="translate(345, 435)">
                    <circle cx="0" cy="0" r="4.5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.4" />
                    <text x="10" y="3" textAnchor="start" fontSize="9" fontWeight="bold" fill="#8B1528" className="font-serif">
                      Cố Đô Huế
                    </text>
                  </g>

                  {/* ⭐ Đà Nẵng */}
                  <g transform="translate(375, 458)">
                    <polygon
                      points="0,-5 1.5,-1.5 5,-1.5 2,1 3.5,4.5 0,2.5 -3.5,4.5 -2,1 -5,-1.5 -1.5,-1.5"
                      fill="#2563EB"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                    <text x="10" y="3" textAnchor="start" fontSize="8.5" fontWeight="bold" fill="#1E293B">
                      Đà Nẵng
                    </text>
                  </g>

                  {/* ⭐ TP. Hồ Chí Minh */}
                  <g transform="translate(325, 725)">
                    <polygon
                      points="0,-5 1.5,-1.5 5,-1.5 2,1 3.5,4.5 0,2.5 -3.5,4.5 -2,1 -5,-1.5 -1.5,-1.5"
                      fill="#EF4444"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                    <text x="10" y="3" textAnchor="start" fontSize="8.5" fontWeight="bold" fill="#8B1528">
                      TP.HCM
                    </text>
                  </g>

                  {/* ⭐ Cần Thơ */}
                  <g transform="translate(260, 785)">
                    <polygon
                      points="0,-5 1.5,-1.5 5,-1.5 2,1 3.5,4.5 0,2.5 -3.5,4.5 -2,1 -5,-1.5 -1.5,-1.5"
                      fill="#2563EB"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                    <text x="0" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">
                      Cần Thơ
                    </text>
                  </g>
                </g>

                {/* ======================================================== */}
                {/* 9. INTERACTIVE LOCATION PINS & HERITAGE COSTUME CARDS   */}
                {/* ======================================================== */}
                {displayedLocations.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  const hasCostumes = loc.prominentCostumes.length > 0;
                  const costumeCount = loc.prominentCostumes.length;

                  return (
                    <g key={loc.id} className="cursor-pointer" onClick={() => handleLocationClick(loc)}>
                      {/* Base coordinate pin */}
                      <circle
                        cx={loc.coordinates.x}
                        cy={loc.coordinates.y}
                        r={isSelected ? 6 : 4}
                        fill={hasCostumes ? '#E11D48' : '#64748B'}
                        stroke="#FFFFFF"
                        strokeWidth="1.8"
                      />

                      {/* Ping animation pulse on selected pin */}
                      {isSelected && (
                        <circle
                          cx={loc.coordinates.x}
                          cy={loc.coordinates.y}
                          r={12}
                          fill="none"
                          stroke="#E11D48"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          className="animate-ping"
                        />
                      )}

                      {/* Province Name text if not island */}
                      {!['hoang-sa', 'truong-sa', 'phu-quoc', 'con-dao'].includes(loc.id) && (
                        <text
                          x={loc.coordinates.x + (loc.coordinates.x > 280 ? 12 : -12)}
                          y={loc.coordinates.y + (loc.prominentCostumes.length > 0 ? -38 : 4)}
                          textAnchor={loc.coordinates.x > 280 ? 'start' : 'end'}
                          fontSize="9.5"
                          fontWeight={isSelected ? 'bold' : '700'}
                          fill={isSelected ? '#8B1528' : '#1E293B'}
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                          paintOrder="stroke"
                          className="transition-colors"
                        >
                          {loc.province}
                        </text>
                      )}

                      {/* Heritage Costume Cards over the Map if prominentCostumes exist */}
                      {hasCostumes && showCostumeBadges && (
                        <g>
                          {loc.prominentCostumes.map((costume, cIdx) => {
                            const total = costumeCount;
                            let offsetX = 0;
                            let offsetY = -34;

                            if (total === 1) {
                              offsetX = 0;
                              offsetY = -34;
                            } else if (total === 2) {
                              offsetX = cIdx === 0 ? -26 : 26;
                              offsetY = -34;
                            } else if (total === 3) {
                              const angle = (-135 + cIdx * 45) * (Math.PI / 180);
                              offsetX = Math.cos(angle) * 38;
                              offsetY = Math.sin(angle) * 38;
                            } else if (total >= 4) {
                              // Huế cluster: 4 signature royal costumes
                              const angles = [-145, -90, -35, 20];
                              const angle = angles[cIdx] * (Math.PI / 180);
                              offsetX = Math.cos(angle) * 44;
                              offsetY = Math.sin(angle) * 40;
                            }

                            const iconX = loc.coordinates.x + offsetX;
                            const iconY = loc.coordinates.y + offsetY;

                            return (
                              <g key={costume.costumeId}>
                                {total > 1 && (
                                  <line
                                    x1={loc.coordinates.x}
                                    y1={loc.coordinates.y}
                                    x2={iconX}
                                    y2={iconY}
                                    stroke="#D4AF37"
                                    strokeWidth="1.2"
                                    strokeDasharray="2 2"
                                  />
                                )}

                                {/* Solid Flat Heritage Badge */}
                                <g
                                  className="group cursor-pointer transition-transform duration-150 hover:scale-[1.05]"
                                  style={{
                                    transformOrigin: `${iconX}px ${iconY}px`,
                                    transformBox: 'view-box',
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (dragDistanceRef.current > 6) return;
                                    setSelectedLocation(loc);
                                    setSelectedCostumeDetail(costume.costumeId);
                                  }}
                                >
                                  <g transform={`translate(${iconX - 22}, ${iconY - 24})`}>
                                    {/* Card Container: Clean Solid Background, No Gradient */}
                                    <rect
                                      x="0"
                                      y="0"
                                      width="44"
                                      height="48"
                                      rx="6"
                                      fill="#FFFFFF"
                                      stroke={isSelected ? '#8B1528' : '#D4AF37'}
                                      strokeWidth={isSelected ? '2' : '1.2'}
                                      className="shadow-md"
                                    />

                                    {/* Badge Header Strip */}
                                    <rect
                                      x="1.5"
                                      y="1.5"
                                      width="41"
                                      height="9"
                                      rx="3"
                                      fill="#8B1528"
                                    />
                                    <text
                                      x="22"
                                      y="8"
                                      textAnchor="middle"
                                      fontSize="6"
                                      fontWeight="bold"
                                      fill="#FFFFFF"
                                    >
                                      {costume.badge}
                                    </text>

                                    {/* 2D Costume Mini Preview Thumbnail */}
                                    <g transform="translate(6, 12)">
                                      <foreignObject width="32" height="32">
                                        <div className="w-full h-full rounded-md overflow-hidden bg-[#FAF7EE] border border-stone-200 flex items-center justify-center p-0.5 pointer-events-none">
                                          <Costume2DPreview
                                            outfitId={costume.costumeId as OutfitId}
                                            className="w-full h-full"
                                          />
                                        </div>
                                      </foreignObject>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            );
                          })}
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Quick Info Bar for Mobile */}
          <div className="lg:hidden absolute bottom-3 left-3 right-3 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-[#E5D7BE] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-white bg-[#8B1528] px-2 py-0.5 rounded-md">
                  {selectedLocation.province}
                </span>
                <span className="text-[10px] text-stone-500 font-medium truncate">
                  {selectedLocation.prominentCostumes.length > 0
                    ? `${selectedLocation.prominentCostumes.length} ${t.costumeCount}`
                    : t.noCostumesCount}
                </span>
              </div>
              <h4 className="font-serif font-bold text-xs text-stone-900 truncate mt-0.5">
                {selectedLocation.name}
              </h4>
            </div>
            <button
              onClick={() => setMobileViewTab('detail')}
              className="px-2.5 py-1.5 rounded-lg bg-[#8B1528] text-white text-[11px] font-bold shadow-xs hover:bg-[#A11930] shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>{t.viewDetails}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </main>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: HISTORICAL COSTUME & REGIONAL HERITAGE PANEL */}
        {/* ======================================================== */}
        <aside
          className={`lg:col-span-5 h-full flex flex-col bg-[#FAF7EE] overflow-y-auto p-4 sm:p-5 border-l border-[#E5D7BE] ${
            mobileViewTab === 'detail' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-3 pb-2 border-b border-[#E5D7BE] flex items-center justify-between">
            <button
              onClick={() => setMobileViewTab('map')}
              className="text-xs font-bold text-[#8B1528] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>⬅ {t.backToMap}</span>
            </button>
            <span className="text-[11px] font-mono text-stone-500">
              {selectedLocation.province}
            </span>
          </div>

          {/* Active Location Header */}
          <div className="border-b border-[#E5D7BE] pb-4 mb-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-white bg-[#8B1528] px-2.5 py-0.5 rounded-full shadow-2xs">
                {selectedLocation.region} · {selectedLocation.province}
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                {selectedLocation.prominentCostumes.length > 0
                  ? `${selectedLocation.prominentCostumes.length} ${t.costumeCount}`
                  : t.noCostumesCount}
              </span>
            </div>

            <h3 className="text-xl font-bold font-serif text-stone-900 mt-2">
              {selectedLocation.name}
            </h3>
            <p className="text-xs text-stone-700 mt-1.5 leading-relaxed">
              {selectedLocation.description}
            </p>

            {selectedLocation.historicalContext && (
              <div className="mt-2 text-xs text-stone-600 italic leading-relaxed bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60">
                {selectedLocation.historicalContext}
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#E5D7BE]">
              <button
                onClick={() => focusOnLocation(selectedLocation)}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#8B1528] hover:bg-[#A11930] px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-xs"
                title={t.focusLocation}
              >
                <LocateFixed className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {t.focusLocation} ({selectedLocation.province})
                </span>
              </button>
              {(zoom !== 1 || pan.x !== 0 || pan.y !== 0) && (
                <button
                  onClick={handleResetZoom}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.resetZoom}</span>
                </button>
              )}
            </div>
          </div>

          {/* List of Costumes from this Province */}
          <div className="flex-1 min-h-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1528] mb-3 flex items-center gap-1.5 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {t.prominentCostumesHeader}
            </h4>

            {selectedLocation.prominentCostumes.length === 0 ? (
              <div className="p-6 text-center bg-white rounded-xl border border-[#E5D7BE] text-stone-600 text-xs shadow-xs">
                <MapPin className="w-7 h-7 mx-auto mb-2 text-[#8B1528]" />
                <p className="font-bold text-stone-900">{t.noCostumesTitle}</p>
                <p className="mt-1.5 text-[11px] text-stone-500 leading-relaxed">
                  {t.noCostumesDesc}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedLocation.prominentCostumes.map((costume) => {
                  const research = COSTUME_ORIGIN_RESEARCH[costume.costumeId];
                  const isCostumeSelected = selectedCostumeDetail === costume.costumeId;

                  return (
                    <div
                      key={costume.costumeId}
                      onClick={() => setSelectedCostumeDetail(costume.costumeId)}
                      className={`rounded-xl p-3.5 transition-all duration-150 cursor-pointer border ${
                        isCostumeSelected
                          ? 'bg-[#FFFDF9] border-2 border-[#8B1528] shadow-md ring-1 ring-[#8B1528]/10'
                          : 'bg-white border-[#E5D7BE] hover:border-amber-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* 2D Costume Preview Box */}
                        <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-[#FAF7EE] border border-amber-200/70 flex items-center justify-center p-1 relative shadow-2xs">
                          <Costume2DPreview
                            outfitId={costume.costumeId as OutfitId}
                            className="w-full h-full"
                          />
                          <span className="absolute bottom-0.5 right-1 text-[7px] font-bold text-white bg-[#8B1528] px-1 rounded">
                            2D
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold bg-[#8B1528] text-white px-1.5 py-0.5 rounded shadow-2xs">
                              {costume.badge}
                            </span>
                            <span className="text-[10px] text-stone-500 font-medium">
                              {costume.era}
                            </span>
                          </div>

                          <h5 className="font-serif font-bold text-sm text-stone-900 mt-1 hover:text-[#8B1528] transition-colors">
                            {costume.costumeName}
                          </h5>

                          <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                            {costume.historicalSignificance}
                          </p>

                          <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 border-t border-stone-100">
                            <span className="text-[10px] text-amber-900 font-semibold bg-amber-100/70 border border-amber-200/60 px-2 py-0.5 rounded">
                              {costume.role}
                            </span>

                            {onSelectCostume && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectCostume(costume.costumeId as OutfitId);
                                }}
                                className="text-[11px] font-bold text-[#8B1528] hover:text-[#A11930] flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <span>{t.tryOutfitNow}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Origin Research details */}
                      {research && (
                        <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-600 space-y-1 bg-[#FAF7EE]/60 p-2.5 rounded-lg border border-[#E5D7BE]/40">
                          <p>
                            <strong className="text-stone-900 font-semibold">{t.historicalOrigin} </strong>
                            {research.originSummary}
                          </p>
                          <p>
                            <strong className="text-stone-900 font-semibold">{t.frequentLocations} </strong>
                            {research.primaryLocations.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
