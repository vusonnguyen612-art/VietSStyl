import React, { useState } from 'react';
import {
  X,
  LogIn,
  LogOut,
  ShieldCheck,
  Bookmark,
  CheckCircle2,
  Sparkles,
  User,
} from 'lucide-react';
import { VietSStylLogo } from './VietSStylLogo';

export type AuthPromptReason = 'save' | 'ai-suggest' | 'ai-eval' | 'general' | null;

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  } | null;
  savedOutfitsCount: number;
  promptReason?: AuthPromptReason;
  onSignInWithGoogle: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  savedOutfitsCount,
  promptReason = null,
  onSignInWithGoogle,
  onSignOut,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await onSignInWithGoogle();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Đăng nhập không thành công.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOutClick = async () => {
    try {
      setLoading(true);
      await onSignOut();
      onClose();
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border-2 border-stone-100 flex flex-col">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* TRẠNG THÁI: ĐÃ ĐĂNG NHẬP */
          <div className="flex flex-col items-center text-center">
            {/* Logo VietSStyl mới */}
            <div className="flex flex-col items-center justify-center mb-3">
              <VietSStylLogo size={36} showText={true} />
            </div>

            {/* Ảnh đại diện Google */}
            <div className="relative mb-3">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Người dùng'}
                  className="w-18 h-18 rounded-full border-2 border-[#8B1528] shadow-md object-cover"
                />
              ) : (
                <div className="w-18 h-18 rounded-full bg-amber-100 border-2 border-[#8B1528] flex items-center justify-center text-[#8B1528]">
                  <User className="w-8 h-8" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-stone-900">
              {currentUser.displayName || 'Nhà Sưu Tầm Cổ Phục'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">{currentUser.email}</p>

            {/* Thống kê tủ đồ */}
            <div className="w-full bg-[#FAF7EE] rounded-2xl p-3 mb-5 flex items-center justify-around border border-amber-900/10">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-stone-500 font-medium">Thẻ bài tủ đồ</span>
                <span className="font-serif text-lg font-bold text-[#8B1528]">
                  {savedOutfitsCount}
                </span>
              </div>
              <div className="w-px h-8 bg-stone-300" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-stone-500 font-medium">Trạng thái</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  Đã đồng bộ
                </span>
              </div>
            </div>

            {/* Nút đăng xuất */}
            <button
              onClick={handleSignOutClick}
              disabled={loading}
              className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-stone-500" />
              <span>Đăng Xuất Tài Khoản</span>
            </button>
          </div>
        ) : (
          /* TRẠNG THÁI: CHƯA ĐĂNG NHẬP */
          <div className="flex flex-col items-center text-center">
            {/* Hộp thông báo lý do yêu cầu đăng nhập nếu người dùng bấm lưu hoặc gợi ý AI */}
            {promptReason === 'save' && (
              <div className="w-full mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                <Bookmark className="w-5 h-5 text-[#8B1528] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#8B1528]">
                    Yêu cầu đăng nhập để lưu bộ phối
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                    Vui lòng đăng nhập với Google để lưu thẻ bài bộ phối vào kho tủ đồ đám mây và đồng bộ vĩnh viễn trên mọi thiết bị.
                  </p>
                </div>
              </div>
            )}

            {promptReason === 'ai-suggest' && (
              <div className="w-full mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#8B1528]">
                    Yêu cầu đăng nhập để xem gợi ý AI
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                    Vui lòng đăng nhập với Google để sử dụng tính năng AI gợi ý phối đồ chuẩn văn hóa theo từng sự kiện và điển lễ.
                  </p>
                </div>
              </div>
            )}

            {promptReason === 'ai-eval' && (
              <div className="w-full mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                <Sparkles className="w-5 h-5 text-[#8B1528] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#8B1528]">
                    Yêu cầu đăng nhập để AI chấm điểm
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                    Vui lòng đăng nhập với Google để AI thẩm định hòa sắc y phục và cấp chứng nhận thẻ bài cho bạn.
                  </p>
                </div>
              </div>
            )}

            {/* Logo VietSStyl mới */}
            <div className="flex flex-col items-center justify-center mb-3">
              <VietSStylLogo size={52} showText={true} />
            </div>

            <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
              Đăng Nhập Với Google
            </h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              {promptReason === 'save'
                ? 'Đăng nhập ngay để hoàn tất việc lưu bộ phối vào kho tủ đồ cá nhân.'
                : promptReason === 'ai-suggest'
                ? 'Đăng nhập ngay để AI mở khóa các bộ gợi ý y phục truyền thống.'
                : promptReason === 'ai-eval'
                ? 'Đăng nhập ngay để AI phân tích và lưu kết quả thẩm định.'
                : 'Lưu giữ các bộ phối trang phục và đồng bộ trên mọi thiết bị cá nhân của bạn.'}
            </p>

            {errorMsg && (
              <div className="w-full mb-4 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs text-left">
                {errorMsg}
              </div>
            )}

            {/* Nút đăng nhập Google */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-3 cursor-pointer mb-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Tiếp tục với Google Email</span>
            </button>

            {/* Quyền lợi tối giản */}
            <div className="w-full space-y-2 text-left pt-2 border-t border-stone-100">
              <div className="flex items-center gap-2 text-[11px] text-stone-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tự động lưu tủ đồ thẻ bài lên đám mây</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Không mất dữ liệu khi đổi trình duyệt hoặc thiết bị</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Đồng bộ nhanh chóng chỉ với một chạm</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
