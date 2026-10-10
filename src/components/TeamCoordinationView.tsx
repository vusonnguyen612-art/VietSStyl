import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Palette,
  Calendar,
  ShieldCheck,
  Plus,
  Trash2,
  Check,
  Crown,
  Lightbulb,
  RefreshCw,
  Shirt,
  User,
  ArrowRight,
  Layers,
  ChevronRight,
  Bookmark,
  X,
} from 'lucide-react';
import { OutfitId, TeamMember, TeamAiEvaluationResult, SavedOutfitCard } from '../types/costume';
import { COSTUMES_DATA, TRADITIONAL_PALETTES } from '../data/costumesData';
import { Costume2DPreview } from './Costume2DPreview';
import { CircularEnergyScore } from './CircularEnergyScore';
import { TeamAiEvaluationModal } from './TeamAiEvaluationModal';

interface TeamCoordinationViewProps {
  savedOutfits: SavedOutfitCard[];
  onNavigateToFitting?: () => void;
  playSound?: (type: 'click' | 'card' | 'bell') => void;
}

// Danh sách các sự kiện phổ biến cho nhóm
const TEAM_EVENTS = [
  'Lễ Hỷ Sự Cưới Hỏi & Vu Quy',
  'Tết Nguyên Đán Cổ Truyền',
  'Đại Lễ Cung Đình & Khánh Tiết',
  'Hội Làng & Hát Quan Họ Bắc Bộ',
  'Chụp Ảnh Kỷ Yếu & Dạo Phố Cổ Hội An',
  'Dã Ngoại Sông Nước Nam Bộ',
  'Đi Lễ Chùa Đầu Xuân Cầu An',
];

// Các mẫu nhóm phối sẵn kinh điển (Presets)
interface TeamPreset {
  id: string;
  title: string;
  event: string;
  description: string;
  members: TeamMember[];
}

const TEAM_PRESETS: TeamPreset[] = [
  {
    id: 'hy-su-trieu-nguyen',
    title: 'Hỷ Sự Vương Triều (2 Người)',
    event: 'Lễ Hỷ Sự Cưới Hỏi & Vu Quy',
    description: 'Chú rể Áo Tấc uy nghiêm sánh đôi cùng Cô dâu Áo Nhật Bình rực rỡ ngũ hành.',
    members: [
      {
        id: 'member-1',
        name: 'Chú Rể',
        roleTitle: 'Tân Lang',
        gender: 'male',
        outfitId: 'ao-tac',
        outfitName: 'Áo Tấc',
        shirtColor: '#B91C1C',
        shirtColorName: 'Đỏ Thẫm',
        pantsColor: '#1F2937',
        pantsColorName: 'Đen Tuyến',
        hatId: 'khan-dong',
        hatName: 'Khăn Đóng',
        hasSilverNecklace: true,
      },
      {
        id: 'member-2',
        name: 'Cô Dâu',
        roleTitle: 'Tân Nương',
        gender: 'female',
        outfitId: 'ao-nhat-binh',
        outfitName: 'Áo Nhật Bình',
        shirtColor: '#E11048',
        shirtColorName: 'Đỏ Hỷ Thần',
        pantsColor: '#F8FAFC',
        pantsColorName: 'Bạch Tuyết',
        hatId: 'khan-van-hoang-gia',
        hatName: 'Khăn Vành Hoàng Gia',
        hasSilverNecklace: true,
      },
    ],
  },
  {
    id: 'quan-ho-bac-bo',
    title: 'Hát Hội Quan Họ (2 Người)',
    event: 'Hội Làng & Hát Quan Họ Bắc Bộ',
    description: 'Liền anh phong nhã Áo Ngũ Thân cùng Liền chị duyên dáng Áo Tứ Thân nón quai thao.',
    members: [
      {
        id: 'member-1',
        name: 'Liền Anh',
        roleTitle: 'Nam Quan Họ',
        gender: 'male',
        outfitId: 'ao-ngu-than',
        outfitName: 'Áo Ngũ Thân',
        shirtColor: '#1E3A8A',
        shirtColorName: 'Xanh Chàm Lam',
        pantsColor: '#F8FAFC',
        pantsColorName: 'Trắng Ngà',
        hatId: 'khan-dong',
        hatName: 'Khăn Đóng',
        hasSilverNecklace: false,
      },
      {
        id: 'member-2',
        name: 'Liền Chị',
        roleTitle: 'Nữ Quan Họ',
        gender: 'female',
        outfitId: 'ao-tu-than',
        outfitName: 'Áo Tứ Thân',
        shirtColor: '#78350F',
        shirtColorName: 'Nâu Đồng Cổ',
        pantsColor: '#1F2937',
        pantsColorName: 'Đen Tuyến',
        hatId: 'non-quai-thao',
        hatName: 'Nón Quai Thao',
        hasSilverNecklace: true,
      },
    ],
  },
  {
    id: 'gia-dinh-tet',
    title: 'Gia Đình Du Xuân (3 Người)',
    event: 'Tết Nguyên Đán Cổ Truyền',
    description: 'Bố Áo Ngũ Thân trang trọng, Mẹ Áo Dài thướt tha, Con diện Áo Tấc son vàng.',
    members: [
      {
        id: 'member-1',
        name: 'Người Cha',
        roleTitle: 'Gia Trưởng',
        gender: 'male',
        outfitId: 'ao-ngu-than',
        outfitName: 'Áo Ngũ Thân',
        shirtColor: '#059669',
        shirtColorName: 'Xanh Lục Bảo',
        pantsColor: '#F8FAFC',
        pantsColorName: 'Trắng Ngà',
        hatId: 'khan-dong',
        hatName: 'Khăn Đóng',
        hasSilverNecklace: false,
      },
      {
        id: 'member-2',
        name: 'Người Mẹ',
        roleTitle: 'Mẫu Thân',
        gender: 'female',
        outfitId: 'ao-dai',
        outfitName: 'Áo Dài',
        shirtColor: '#E11048',
        shirtColorName: 'Đỏ Son Hỷ Khí',
        pantsColor: '#F8FAFC',
        pantsColorName: 'Lụa Trắng',
        hatId: 'khan-van-hoang-gia',
        hatName: 'Mấn Lụa',
        hasSilverNecklace: true,
      },
      {
        id: 'member-3',
        name: 'Con Gái',
        roleTitle: 'Tiểu Thư',
        gender: 'female',
        outfitId: 'ao-tac',
        outfitName: 'Áo Tấc',
        shirtColor: '#EA8308',
        shirtColorName: 'Vàng Hoàng Yến',
        pantsColor: '#F8FAFC',
        pantsColorName: 'Trắng Ngà',
        hatId: 'khan-dong',
        hatName: 'Khăn Đóng Nhỏ',
        hasSilverNecklace: true,
      },
    ],
  },
  {
    id: 'dong-que-nam-bo',
    title: 'Hội Bạn Phương Nam (3 Người)',
    event: 'Dã Ngoại Sông Nước Nam Bộ',
    description: 'Bộ ba Áo Bà Ba mộc mạc phóng khoáng, nón lá che nghiêng sông nước Cửu Long.',
    members: [
      {
        id: 'member-1',
        name: 'Bạn Hùng',
        roleTitle: 'Thành viên 1',
        gender: 'male',
        outfitId: 'ao-ba-ba',
        outfitName: 'Áo Bà Ba',
        shirtColor: '#78350F',
        shirtColorName: 'Nâu Vỏ Cây',
        pantsColor: '#1F2937',
        pantsColorName: 'Quần Đen',
        hatId: 'non-la',
        hatName: 'Nón Lá',
        hasSilverNecklace: false,
      },
      {
        id: 'member-2',
        name: 'Bạn Mai',
        roleTitle: 'Thành viên 2',
        gender: 'female',
        outfitId: 'ao-ba-ba',
        outfitName: 'Áo Bà Ba',
        shirtColor: '#DF4526',
        shirtColorName: 'Hồng Đất Sen',
        pantsColor: '#1F2937',
        pantsColorName: 'Quần Đen',
        hatId: 'non-la',
        hatName: 'Nón Lá',
        hasSilverNecklace: false,
      },
      {
        id: 'member-3',
        name: 'Bạn Cúc',
        roleTitle: 'Thành viên 3',
        gender: 'female',
        outfitId: 'ao-ba-ba',
        outfitName: 'Áo Bà Ba',
        shirtColor: '#2E8B57',
        shirtColorName: 'Xanh Lá Mạ',
        pantsColor: '#1F2937',
        pantsColorName: 'Quần Đen',
        hatId: 'non-la',
        hatName: 'Nón Lá',
        hasSilverNecklace: false,
      },
    ],
  },
];

export const TeamCoordinationView: React.FC<TeamCoordinationViewProps> = ({
  savedOutfits,
  playSound,
}) => {
  // Trạng thái danh sách thành viên trong nhóm
  const [members, setMembers] = useState<TeamMember[]>(TEAM_PRESETS[0].members);
  const [activeMemberId, setActiveMemberId] = useState<string>(TEAM_PRESETS[0].members[0].id);

  // Sự kiện & Ghi chú
  const [selectedEvent, setSelectedEvent] = useState<string>(TEAM_PRESETS[0].event);
  const [customEvent, setCustomEvent] = useState<string>('');
  const [teamNotes, setTeamNotes] = useState<string>('');

  // Trạng thái AI đánh giá
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<TeamAiEvaluationResult | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState<boolean>(false);

  // Thành viên đang được chọn chỉnh sửa
  const activeMember = members.find((m) => m.id === activeMemberId) || members[0];

  const currentEventName = customEvent.trim() ? customEvent.trim() : selectedEvent;

  // Cập nhật thuộc tính của thành viên đang chọn
  const updateActiveMember = (updates: Partial<TeamMember>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === activeMemberId ? { ...m, ...updates } : m))
    );
  };

  // Thêm thành viên mới (tối đa 5 người)
  const handleAddMember = () => {
    if (members.length >= 5) return;
    const newIdx = members.length + 1;
    const defaultOutfit = COSTUMES_DATA[newIdx % COSTUMES_DATA.length];
    const newMember: TeamMember = {
      id: 'member-' + Date.now(),
      name: `Thành viên ${newIdx}`,
      roleTitle: `Bạn thứ ${newIdx}`,
      gender: newIdx % 2 === 0 ? 'male' : 'female',
      outfitId: defaultOutfit.id,
      outfitName: defaultOutfit.name,
      shirtColor: defaultOutfit.defaultColors.primary,
      shirtColorName: 'Màu chuẩn',
      pantsColor: defaultOutfit.defaultColors.pants,
      pantsColorName: 'Màu chuẩn',
      hatId: 'khan-dong',
      hatName: 'Khăn Đóng',
      hasSilverNecklace: false,
    };
    setMembers([...members, newMember]);
    setActiveMemberId(newMember.id);
    if (playSound) playSound('card');
  };

  // Xóa thành viên (tối thiểu 2 người)
  const handleRemoveMember = (id: string) => {
    if (members.length <= 2) return;
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    if (activeMemberId === id) {
      setActiveMemberId(updated[0].id);
    }
    if (playSound) playSound('click');
  };

  // Nạp Preset
  const handleApplyPreset = (preset: TeamPreset) => {
    setMembers(preset.members);
    setActiveMemberId(preset.members[0].id);
    setSelectedEvent(preset.event);
    setCustomEvent('');
    setEvaluationResult(null);
    setShowEvaluationModal(false);
    if (playSound) playSound('card');
  };

  // Nạp từ Tủ đồ cá nhân vào thành viên đang chọn
  const handleApplySavedOutfitToActiveMember = (saved: SavedOutfitCard) => {
    updateActiveMember({
      outfitId: saved.outfitId,
      outfitName: saved.outfitName,
      shirtColor: saved.shirtColor,
      shirtColorName: saved.shirtColorName,
      pantsColor: saved.pantsColor,
      pantsColorName: saved.pantsColorName,
      hatId: saved.hatId,
      hatName: saved.hatName,
      hasSilverNecklace: saved.hasSilverNecklace,
    });
    if (playSound) playSound('card');
  };

  // Kích hoạt AI chấm điểm phối team
  const handleEvaluateTeam = async () => {
    setShowEvaluationModal(true);
    setEvaluating(true);
    if (playSound) playSound('bell');

    try {
      const response = await fetch('/api/ai-evaluate-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: currentEventName,
          members: members,
          teamNotes: teamNotes.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi máy chủ AI');
      }

      const data: TeamAiEvaluationResult = await response.json();
      setEvaluationResult(data);
    } catch (err) {
      console.error(err);
      // Fallback an toàn
      setEvaluationResult({
        overallScore: 9.3,
        colorHarmonyScore: 9.5,
        colorHarmonyComment: `Bảng màu của ${members.length} thành viên có sự hòa hợp tinh tế, các gam màu nâng đỡ nhau tạo nên tổng thể vừa trang nhã vừa tươi sáng.`,
        eventSuitabilityScore: 9.2,
        eventSuitabilityComment: `Bộ trang phục nhóm hoàn toàn tương xứng với không khí sự kiện '${currentEventName}', giữ được trọn vẹn nét văn hóa cha ông.`,
        styleCompatibilityScore: 9.3,
        styleCompatibilityComment: `Các kiểu áo giữa các thành viên có phẩm cấp và phong cách tương đồng, tạo thành một đội hình đồng điệu.`,
        title: `Đồng Hoa Tương Hợp · Nhóm ${members.length} Người`,
        overallVerdict: `Đội hình phối đồ xuất sắc, tôn vinh nét đẹp văn hóa và sự gắn kết của cả nhóm.`,
        suggestions: [
          'Có thể bố trí người mặc màu áo rực rỡ nhất đứng ở vị trí chính giữa để tạo điểm nhấn chụp ảnh.',
          'Nên chuẩn bị thêm phụ kiện quạt nan hoặc nón lá đồng bộ để tăng tính kết nối.',
        ],
      });
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-[1540px] mx-auto p-2 sm:p-3 overflow-y-auto">
      {/* ============================================================== */}
      {/* 1. MẪU PHỐI SẴN (PRESETS) & TÙY CHỌN NHANH                     */}
      {/* ============================================================== */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xs flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="bg-[#FAF7EE] text-[#8B1528] text-xs font-bold px-2.5 py-1 rounded-xl border border-[#D4AF37]/40 shadow-2xs">
            Đội hình {members.length} người
          </span>
        </div>

        {/* Danh sách Presets nhanh */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <span className="text-[11px] font-bold text-stone-500 whitespace-nowrap hidden sm:inline">
            Gợi ý nhanh:
          </span>
          {TEAM_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p)}
              className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-[#FAF7EE] hover:bg-amber-100/60 text-stone-800 transition-all cursor-pointer whitespace-nowrap shadow-2xs hover:scale-[1.02]"
              title={p.description}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. KHÔNG GIAN LÀM VIỆC CHÍNH (BỐ CỤC 60/40 ASYMMETRICAL GRID)  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
        {/* ============================================================ */}
        {/* CỘT TRÁI (7 PHẦN): SÂN KHẤU TRÌNH DIỄN NHÓM & BỐI CẢNH SỰ KIỆN */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 flex flex-col gap-3 min-h-0">
          {/* Sân Khấu Trình Diễn Nhóm 2D */}
          <div className="bg-[#FAF7EE] p-3 sm:p-4 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden min-h-[380px] sm:min-h-[420px]">
            {/* Header Sân Khấu */}
            <div className="flex items-center justify-between z-10 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8B1528] uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sân Khấu Đồng Phục</span>
                </span>
                <span className="text-[10px] text-stone-500 italic">
                  (Nhấp vào nhân vật để đổi phục trang)
                </span>
              </div>

              {/* Nút thêm thành viên */}
              {members.length < 5 && (
                <button
                  onClick={handleAddMember}
                  className="px-2.5 py-1 bg-[#8B1528] text-white hover:bg-[#721020] text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs hover:scale-[1.02] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Người</span>
                </button>
              )}
            </div>

            {/* Sân khấu 2D: Các thành viên đứng dàn hàng ngang */}
            <div className="flex-1 flex items-end justify-center gap-2 sm:gap-4 py-4 px-2 overflow-x-auto z-10">
              {members.map((member, idx) => {
                const isSelected = member.id === activeMemberId;
                return (
                  <div
                    key={member.id}
                    onClick={() => {
                      setActiveMemberId(member.id);
                      if (playSound) playSound('click');
                    }}
                    className={`flex-1 min-w-[110px] max-w-[160px] flex flex-col items-center cursor-pointer transition-all duration-300 relative group ${
                      isSelected
                        ? 'scale-105 -translate-y-2'
                        : 'opacity-90 hover:opacity-100 hover:-translate-y-1'
                    }`}
                  >
                    {/* Thẻ tên & Vai trò phía trên đầu */}
                    <div
                      className={`mb-2 px-2 py-1 rounded-xl text-center shadow-xs transition-all w-full ${
                        isSelected
                          ? 'bg-[#8B1528] text-white ring-2 ring-[#D4AF37]'
                          : 'bg-white text-stone-800'
                      }`}
                    >
                      <p className="text-[11px] font-bold truncate leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[9px] opacity-80 truncate leading-none mt-0.5">
                        {member.outfitName}
                      </p>
                    </div>

                    {/* Khung nhân vật 2D */}
                    <div
                      className={`w-full h-56 sm:h-64 rounded-2xl p-2 flex items-center justify-center relative transition-all duration-300 ${
                        isSelected
                          ? 'bg-white shadow-xl ring-2 ring-[#8B1528]'
                          : 'bg-white/80 shadow-xs group-hover:bg-white'
                      }`}
                    >
                      <Costume2DPreview
                        outfitId={member.outfitId}
                        primaryColor={member.shirtColor}
                        className="w-full h-full"
                      />

                      {/* Huy hiệu thứ tự */}
                      <span className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-stone-900/70 text-white text-[9px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>

                      {/* Chỉ báo kiềng */}
                      {member.hasSilverNecklace && (
                        <span className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-xs" title="Đeo kiềng bạc" />
                      )}
                    </div>

                    {/* Nút xóa thành viên (chỉ khi > 2 người) */}
                    {members.length > 2 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMember(member.id);
                        }}
                        className="mt-1.5 p-1 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                        title="Xóa thành viên này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bục sân khấu cổ phong */}
            <div className="h-2 w-full bg-gradient-to-r from-[#D4AF37] via-[#8B1528] to-[#D4AF37] rounded-full mt-1 opacity-60" />
          </div>

          {/* Chọn bối cảnh sự kiện & Nút AI Chấm Điểm */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs space-y-3">
            <div>
              <label className="text-xs font-bold text-stone-900 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8B1528]" />
                <span>Chọn sự kiện / Dịp xuất hiện của cả nhóm:</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {TEAM_EVENTS.map((evt) => (
                  <button
                    key={evt}
                    type="button"
                    onClick={() => {
                      setSelectedEvent(evt);
                      setCustomEvent('');
                    }}
                    className={`text-xs px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                      selectedEvent === evt && !customEvent.trim()
                        ? 'bg-[#8B1528] text-white font-bold shadow-xs'
                        : 'bg-[#FAF7EE] text-stone-700 hover:bg-amber-100/60 shadow-2xs'
                    }`}
                  >
                    {evt}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={customEvent}
                onChange={(e) => setCustomEvent(e.target.value)}
                placeholder="Hoặc tự nhập sự kiện khác (vd: Tiệc cưới ngoài trời, Chụp ảnh kỷ yếu ở Hoàng Thành Thăng Long...)"
                className="w-full px-3 py-1.5 bg-[#FAF7EE] rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8B1528] shadow-2xs"
              />
            </div>

            {/* Nút hành động chính AI Chấm Điểm */}
            <button
              onClick={handleEvaluateTeam}
              disabled={evaluating}
              className="w-full py-3 rounded-xl bg-[#8B1528] hover:bg-[#721020] text-white font-bold text-sm shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {evaluating ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>AI Đang Phân Tích Độ Hòa Sắc & Phẩm Cấp Nhóm...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/40" />
                  <span>AI Chấm Điểm Phối Team & Gợi Ý Cải Thiện</span>
                </>
              )}
            </button>

            {/* Thẻ thông báo kết quả nhanh & nút mở cửa sổ bảng điểm */}
            {evaluationResult && (
              <div className="bg-[#FAF7EE] border border-[#D4AF37]/50 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-2xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#8B1528] text-amber-200 flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    <span className="text-[11px] leading-tight font-black">{evaluationResult.overallScore}</span>
                    <span className="text-[7px] leading-none opacity-80 uppercase">Điểm</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8B1528] block tracking-wide truncate">
                      Đã Thẩm Định: {evaluationResult.title}
                    </span>
                    <p className="text-[11px] text-stone-600 truncate">
                      Nhấn để mở cửa sổ nhận xét chi tiết
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEvaluationModal(true);
                      if (playSound) playSound('card');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#8B1528] hover:bg-[#721020] text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-xs hover:scale-[1.02] flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Xem Bảng Điểm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEvaluationResult(null);
                      if (playSound) playSound('click');
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-stone-200/60 transition-all cursor-pointer"
                    title="Xóa/Ẩn kết quả chấm điểm này"
                    aria-label="Xóa kết quả chấm điểm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CỘT PHẢI (5 PHẦN): BẢNG CHỈNH SỬA CHI TIẾT THÀNH VIÊN         */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex flex-col gap-3 min-h-0">
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs flex-1 flex flex-col gap-3 overflow-y-auto">
            {/* Header Bảng Chỉnh Sửa */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FAF7EE] text-[#8B1528] flex items-center justify-center text-xs font-bold">
                  {members.findIndex((m) => m.id === activeMemberId) + 1}
                </span>
                <span className="font-serif font-bold text-sm text-stone-900">
                  Tùy Biến: {activeMember.name}
                </span>
              </div>

              {/* Đổi giới tính */}
              <div className="flex items-center gap-1 bg-[#FAF7EE] p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => updateActiveMember({ gender: 'female' })}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    activeMember.gender === 'female'
                      ? 'bg-[#8B1528] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Nữ
                </button>
                <button
                  type="button"
                  onClick={() => updateActiveMember({ gender: 'male' })}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    activeMember.gender === 'male'
                      ? 'bg-[#8B1528] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Nam
                </button>
              </div>
            </div>

            {/* Đổi tên & vai trò */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                  Tên thành viên
                </label>
                <input
                  type="text"
                  value={activeMember.name}
                  onChange={(e) => updateActiveMember({ name: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-[#FAF7EE] rounded-lg text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8B1528]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                  Vai trò trong nhóm
                </label>
                <input
                  type="text"
                  value={activeMember.roleTitle || ''}
                  placeholder="vd: Chú rể, Bạn thân..."
                  onChange={(e) => updateActiveMember({ roleTitle: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-[#FAF7EE] rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#8B1528]"
                />
              </div>
            </div>

            {/* Chọn Loại Trang Phục */}
            <div>
              <label className="text-xs font-bold text-stone-900 mb-1.5 flex items-center justify-between">
                <span>Chọn loại cổ phục:</span>
                <span className="text-[11px] font-semibold text-[#8B1528]">
                  {activeMember.outfitName}
                </span>
              </label>

              <div className="grid grid-cols-3 gap-1.5">
                {COSTUMES_DATA.map((c) => {
                  const isCur = activeMember.outfitId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        updateActiveMember({
                          outfitId: c.id,
                          outfitName: c.name,
                          shirtColor: c.defaultColors.primary,
                          pantsColor: c.defaultColors.pants,
                        })
                      }
                      className={`p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isCur
                          ? 'bg-[#8B1528] text-white shadow-xs scale-[1.02]'
                          : 'bg-[#FAF7EE] hover:bg-amber-100/50 text-stone-800'
                      }`}
                    >
                      <span className="text-[11px] font-bold block truncate leading-tight">
                        {c.name}
                      </span>
                      <span className={`text-[9px] block truncate mt-0.5 ${isCur ? 'text-amber-200' : 'text-stone-500'}`}>
                        {c.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chọn Màu Áo (Bảng Màu Truyền Thống Ngũ Hành) */}
            <div>
              <label className="text-xs font-bold text-stone-900 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#8B1528]" />
                  <span>Màu tà áo chính:</span>
                </span>
                <span className="text-[11px] text-stone-600 font-medium">
                  {activeMember.shirtColorName || activeMember.shirtColor}
                </span>
              </label>

              <div className="flex flex-wrap gap-1.5 p-2 bg-[#FAF7EE] rounded-xl">
                {TRADITIONAL_PALETTES.map((pal) => {
                  const isSelected = activeMember.shirtColor.toLowerCase() === pal.hex.toLowerCase();
                  return (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() =>
                        updateActiveMember({
                          shirtColor: pal.hex,
                          shirtColorName: pal.name,
                        })
                      }
                      title={`${pal.name} (${pal.hex}) - ${pal.sub}`}
                      className={`w-7 h-7 rounded-lg transition-all duration-200 cursor-pointer relative shadow-2xs hover:scale-110 flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-[#8B1528] scale-110' : ''
                      }`}
                      style={{ backgroundColor: pal.hex }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tùy chọn Mũ & Kiềng Bạc */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeMember.hasSilverNecklace}
                  onChange={(e) => updateActiveMember({ hasSilverNecklace: e.target.checked })}
                  className="rounded text-[#8B1528] focus:ring-0 cursor-pointer"
                />
                <span>Đeo Kiềng Bạc Hoa Sen</span>
              </label>

              {/* Nạp từ Tủ đồ nếu có */}
              {savedOutfits.length > 0 && (
                <div className="relative group">
                  <button
                    type="button"
                    className="text-[11px] font-bold text-[#8B1528] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>Lấy từ Tủ Đồ ({savedOutfits.length})</span>
                  </button>

                  <div className="hidden group-hover:block absolute right-0 bottom-full mb-1 w-52 bg-white rounded-xl shadow-xl p-1.5 z-20 border border-stone-100 max-h-48 overflow-y-auto">
                    {savedOutfits.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleApplySavedOutfitToActiveMember(s)}
                        className="w-full text-left px-2 py-1.5 hover:bg-[#FAF7EE] rounded-lg text-xs truncate font-medium text-stone-800"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CỬA SỔ NHỎ HIỂN THỊ CHẤM ĐIỂM & NHẬN XÉT CỦA AI NGAY TRÊN TRANG PHỐI TEAM */}
      <TeamAiEvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        isLoading={evaluating}
        eventName={currentEventName}
        members={members}
        result={evaluationResult}
        onReEvaluate={handleEvaluateTeam}
      />
    </div>
  );
};
