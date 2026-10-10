import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Users,
  Palette,
  Calendar,
  Shirt,
  Lightbulb,
  RefreshCw,
  Copy,
  Check,
  Award,
} from 'lucide-react';
import { TeamMember, TeamAiEvaluationResult } from '../types/costume';
import { Costume2DPreview } from './Costume2DPreview';
import { CircularEnergyScore } from './CircularEnergyScore';

interface TeamAiEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  eventName: string;
  members: TeamMember[];
  result: TeamAiEvaluationResult | null;
  onReEvaluate: () => void;
}

export const TeamAiEvaluationModal: React.FC<TeamAiEvaluationModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  eventName,
  members,
  result,
  onReEvaluate,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Lắng nghe phím ESC để đóng cửa sổ nhanh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `[KẾT QUẢ AI CHẤM ĐIỂM PHỐI TEAM - VIETSSTYL]
🏆 Danh hiệu: ${result.title}
⭐ Điểm tổng kết: ${result.overallScore}/10
📍 Dịp tham gia: ${eventName} (${members.length} người)

1. Độ hòa hợp màu sắc: ${result.colorHarmonyScore}/10
${result.colorHarmonyComment}

2. Tính đúng sự kiện: ${result.eventSuitabilityScore}/10
${result.eventSuitabilityComment}

3. Tương thích kiểu áo: ${result.styleCompatibilityScore}/10
${result.styleCompatibilityComment}

📜 Lời bình giám khảo: "${result.overallVerdict}"

💡 Gợi ý cải thiện:
${result.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-eval-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl bg-[#FAF7EE] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2 border-[#D4AF37]/40">
        {/* Viền vàng hoàng gia phía trên */}
        <div className="h-1.5 w-full bg-[#D4AF37]" />

        {/* Header Modal */}
        <header className="bg-[#8B1528] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-stone-900 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-[#8B1528]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="team-eval-title"
                  className="font-serif font-black text-base sm:text-lg tracking-wide text-amber-100"
                >
                  AI Thẩm Định Phối Team
                </h2>
                <span className="text-[10px] font-bold bg-[#FAF7EE] text-[#8B1528] px-2 py-0.5 rounded-full">
                  {members.length} Thành Viên
                </span>
              </div>
              <p className="text-xs text-rose-200 mt-0.5">
                Đánh giá theo 3 tiêu chí: Hòa sắc · Đúng sự kiện · Phẩm cấp tương hỗ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ chấm điểm"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Nội dung chính */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TRẠNG THÁI ĐANG TẢI */}
          {isLoading && (
            <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4 bg-white rounded-2xl shadow-xs">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-amber-200 border-t-[#8B1528] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#8B1528]" />
                </div>
              </div>

              <div className="space-y-1.5 max-w-md">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Gemini AI Đang Phân Tích Đội Hình Nhóm...
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Đang đối chiếu ngũ hành hòa sắc giữa {members.length} trang phục và khảo sát mức độ phù hợp với dịp{' '}
                  <span className="font-bold text-[#8B1528]">{eventName}</span>.
                </p>
              </div>

              {/* Danh sách thành viên đang được quét */}
              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                {members.map((m, idx) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7EE] text-[11px] font-semibold text-stone-800"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: m.shirtColor }}
                    />
                    <span>{m.name}: {m.outfitName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRẠNG THÁI CÓ KẾT QUẢ */}
          {!isLoading && result && (
            <>
              {/* Banner vinh danh kết quả tổng quát */}
              <div className="bg-[#8B1528] text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[11px] uppercase font-bold tracking-widest text-[#D4AF37]">
                      DANH HIỆU ĐỒNG PHỤC NHÓM
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl font-black text-amber-100">
                    {result.title}
                  </h3>
                  <p className="text-xs text-rose-200">
                    Dịp tham gia: <b className="text-white">{eventName}</b> · Đội hình <b className="text-white">{members.length} người</b>
                  </p>
                </div>

                {/* Điểm tổng kết vòng tròn năng lượng lớn */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center bg-black/20 p-2.5 rounded-2xl border border-amber-300/30">
                  <CircularEnergyScore
                    score={result.overallScore}
                    maxScore={10}
                    size={72}
                    strokeWidth={5}
                    variant="gold"
                    fontClass="text-2xl sm:text-3xl font-black font-serif text-amber-300"
                    showLabel={true}
                    label="TỔNG ĐIỂM"
                  />
                  <div className="text-left pr-2">
                    <span className="text-[10px] uppercase font-bold text-amber-200 block">
                      ĐÁNH GIÁ
                    </span>
                    <span className="text-sm font-bold text-white">
                      {result.overallScore >= 9.0 ? 'Tuyệt Hảo' : result.overallScore >= 8.0 ? 'Hài Hòa' : 'Khá Ổn'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tóm tắt đội hình trực quan mini */}
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-xs">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2.5">
                  Đội hình vừa thẩm định ({members.length} người):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {members.map((m, idx) => (
                    <div
                      key={m.id}
                      className="bg-[#FAF7EE] p-2 rounded-xl flex flex-col items-center text-center shadow-2xs"
                    >
                      <div className="w-14 h-16 rounded-lg bg-white p-1 flex items-center justify-center mb-1.5 shadow-2xs">
                        <Costume2DPreview
                          outfitId={m.outfitId}
                          primaryColor={m.shirtColor}
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-stone-900 truncate w-full">
                        {m.name}
                      </span>
                      <span className="text-[10px] text-stone-600 truncate w-full">
                        {m.outfitName}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10"
                          style={{ backgroundColor: m.shirtColor }}
                          title={`Màu áo: ${m.shirtColorName || m.shirtColor}`}
                        />
                        <span className="text-[9px] text-stone-500 truncate">
                          {m.shirtColorName || 'Màu áo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 TIÊU CHÍ CỐT LÕI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. Độ Hòa Hợp Phối Màu */}
                <div className="bg-white p-4 rounded-xl shadow-xs border-t-3 border-[#8B1528] flex flex-col justify-between gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-[#8B1528]" />
                      <span>1. Hòa Hợp Màu Sắc</span>
                    </span>
                    <CircularEnergyScore
                      score={result.colorHarmonyScore}
                      maxScore={10}
                      size={42}
                      strokeWidth={3.8}
                      variant="ruby"
                      fontClass="text-xs sm:text-sm font-black font-mono text-[#8B1528]"
                    />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF7EE] p-3 rounded-lg flex-1">
                    {result.colorHarmonyComment}
                  </p>
                </div>

                {/* 2. Tính Đúng Sự Kiện */}
                <div className="bg-white p-4 rounded-xl shadow-xs border-t-3 border-amber-600 flex flex-col justify-between gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      <span>2. Tính Đúng Sự Kiện</span>
                    </span>
                    <CircularEnergyScore
                      score={result.eventSuitabilityScore}
                      maxScore={10}
                      size={42}
                      strokeWidth={3.8}
                      variant="amber"
                      fontClass="text-xs sm:text-sm font-black font-mono text-amber-700"
                    />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF7EE] p-3 rounded-lg flex-1">
                    {result.eventSuitabilityComment}
                  </p>
                </div>

                {/* 3. Tương Thích Trang Phục */}
                <div className="bg-white p-4 rounded-xl shadow-xs border-t-3 border-emerald-600 flex flex-col justify-between gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                      <Shirt className="w-4 h-4 text-emerald-700" />
                      <span>3. Tương Thích Kiểu Áo</span>
                    </span>
                    <CircularEnergyScore
                      score={result.styleCompatibilityScore}
                      maxScore={10}
                      size={42}
                      strokeWidth={3.8}
                      variant="emerald"
                      fontClass="text-xs sm:text-sm font-black font-mono text-emerald-700"
                    />
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF7EE] p-3 rounded-lg flex-1">
                    {result.styleCompatibilityComment}
                  </p>
                </div>
              </div>

              {/* Lời Bình Tổng Quan & Gợi Ý Cải Thiện */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Lời Bình Giám Khảo */}
                <div className="bg-white p-4 rounded-xl shadow-xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1528] flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#8B1528]" />
                    <span>Lời Bình Giám Khảo Cổ Phong:</span>
                  </span>
                  <p className="text-xs text-stone-800 italic leading-relaxed bg-[#FAF7EE] p-3 rounded-lg">
                    "{result.overallVerdict}"
                  </p>
                </div>

                {/* Gợi Ý Cải Thiện */}
                <div className="bg-[#FFFBEB] p-4 rounded-xl shadow-xs space-y-2 border border-amber-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                    <span>Gợi Ý Cải Thiện Cho Nhóm:</span>
                  </span>
                  <ul className="text-xs text-stone-800 space-y-1.5">
                    {result.suggestions.map((sug, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/70 p-2 rounded-lg">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <footer className="bg-white px-4 sm:px-6 py-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            {!isLoading && result && (
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-amber-100 text-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                title="Sao chép toàn bộ nhận xét vào bộ nhớ tạm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã Sao Chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-600" />
                    <span>Sao Chép Nhận Xét</span>
                  </>
                )}
              </button>
            )}

            {!isLoading && result && (
              <button
                type="button"
                onClick={onReEvaluate}
                className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-amber-100 text-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-600" />
                <span>Chấm Điểm Lại</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#8B1528] hover:bg-[#721020] text-white text-xs font-bold shadow-xs cursor-pointer transition-all ml-auto"
          >
            Đóng Cửa Sổ
          </button>
        </footer>
      </div>
    </div>
  );
};
