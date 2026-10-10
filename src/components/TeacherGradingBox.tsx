import React from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { CircularEnergyScore } from './CircularEnergyScore';

interface TeacherGradingBoxProps {
  score: string;
  comment: string;
  isGrading: boolean;
  onGradeRandomly: () => void;
  lastClickedPart: string | null;
}

export const TeacherGradingBox: React.FC<TeacherGradingBoxProps> = ({
  score,
  comment,
  isGrading,
  onGradeRandomly,
  lastClickedPart,
}) => {
  return (
    <div className="bg-white/95 rounded-xl border-2 border-[#ea384d] p-3.5 sm:p-4 mb-3.5 shadow-sm relative transition-all duration-300">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Điểm số với thanh năng lượng hình tròn bao quanh, số điểm ở giữa */}
        <div className="relative flex-shrink-0">
          <div
            className={`p-1 rounded-full bg-red-50/80 shadow-sm flex items-center justify-center transition-transform duration-300 ${
              isGrading ? 'scale-110 rotate-6' : 'scale-100'
            }`}
          >
            <CircularEnergyScore
              score={score}
              maxScore={10}
              size={64}
              strokeWidth={4.5}
              variant="teacher-red"
              fontClass="text-2xl sm:text-3xl font-bold font-handwriting text-[#ea384d]"
              showLabel={true}
              label="Điểm"
            />
          </div>

          {/* Dấu mộc đỏ khen ngợi */}
          <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow">
            <Award className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Lời phê viết tay mực đỏ */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ea384d] flex items-center gap-1">
              <span>Lời phê của cô giáo:</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping" />
            </span>
            <button
              onClick={onGradeRandomly}
              disabled={isGrading}
              className="text-[11px] font-semibold text-[#3f3398] hover:text-[#282064] underline flex items-center gap-1 cursor-pointer"
              title="Nhờ cô giáo nhận xét lại"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Chấm lại</span>
            </button>
          </div>
          <p className="font-handwriting text-base sm:text-lg text-red-800 leading-snug break-words">
            "{comment}"
          </p>
        </div>
      </div>

      {/* Thông báo tương tác nhanh */}
      <div className="mt-2.5 pt-2 border-t border-red-100 flex items-center justify-between text-[11px] text-stone-600">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {lastClickedPart ? (
              <>
                Vừa sửa: <b className="text-[#3f3398]">{lastClickedPart}</b>
              </>
            ) : (
              <span>Chạm trực tiếp vào nhân vật để đổi màu nhanh</span>
            )}
          </span>
        </div>
        <span className="text-stone-400 font-serif italic hidden sm:inline">
          Vở bài tập lớp 5 · Tiết 12
        </span>
      </div>
    </div>
  );
};

