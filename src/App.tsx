/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  Crown,
  Flame,
  Info,
  Compass,
  Shirt,
  Bookmark,
  Camera,
  Globe,
  ArrowRight,
  MapPin,
  ExternalLink,
  Plus,
  RefreshCw,
  Home,
  User as UserIcon,
  LogIn,
  LogOut,
  Cloud,
  Users,
} from 'lucide-react';

import { OutfitId, SavedOutfitCard, AiEvaluationResult } from './types/costume';
import {
  COSTUMES_DATA,
  TRADITIONAL_PALETTES,
  BOTTOM_OPTIONS,
  HAT_OPTIONS,
  ACCESSORY_OPTIONS,
  SHOE_OPTIONS,
  TEACHER_REVIEWS_EXTENDED,
  SKIN_TONES,
  HAIR_STYLES,
} from './data/costumesData';
import { PavilionDollStage } from './components/PavilionDollStage';
import { Costume2DPreview } from './components/Costume2DPreview';
import { CostumeGalleryModal } from './components/CostumeGalleryModal';
import { EventSuggestModal } from './components/EventSuggestModal';
import { AiEvaluationModal } from './components/AiEvaluationModal';
import { SaveOutfitModal } from './components/SaveOutfitModal';
import { WardrobeCardsModal } from './components/WardrobeCardsModal';
import { VietnamCostumeMap } from './components/VietnamCostumeMap';
import { CostumeExploreCarousel } from './components/CostumeExploreCarousel';
import { Item2DPreview } from './components/Item2DPreview';
import { HomePageView } from './components/HomePageView';
import { UserAuthModal, AuthPromptReason } from './components/UserAuthModal';
import { TeamCoordinationView } from './components/TeamCoordinationView';
import { VietSStylLogo } from './components/VietSStylLogo';

import { auth, googleProvider } from './firebase/config';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import {
  syncUserProfile,
  syncLocalOutfitsToFirestore,
  saveOutfitToFirestore,
  deleteOutfitFromFirestore,
} from './firebase/userService';

type CategoryTab = 'ao' | 'quan' | 'mu' | 'phukien' | 'giay' | 'khuonmat';
type ColorTab = 'ao' | 'quan' | 'mu';
type PresetId = 1 | 2 | 3 | 4;
type NavTab = 'trang-chu' | 'kham-pha' | 'ban-do' | 'phong-thu-do' | 'phoi-team';
type GenderFilter = 'all' | 'female' | 'male';

// 5 Biểu tượng đại diện chuẩn xác theo từng phần (Áo, Quần, Mũ, Phụ Kiện, Hài/Guốc)
const IconTabAo = ({ isSelected }: { isSelected: boolean }) => (
  <svg viewBox="0 0 40 32" className="w-8 h-7 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 12 7 L 3 7 L 3 14 L 8 14 L 8 28 L 32 28 L 32 14 L 37 14 L 37 7 L 28 7 Z"
      fill={isSelected ? '#F8ECE2' : '#F4EAE0'}
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M 16 7 C 16 4.5 24 4.5 24 7"
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M 18 7 C 20 11 23 13 32 14"
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="14"
      x2="16"
      y2="28"
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.4"
      strokeDasharray="2 2"
    />
    <line x1="8" y1="7" x2="8" y2="14" stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.2" />
    <line x1="32" y1="7" x2="32" y2="14" stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.2" />
  </svg>
);

const IconTabQuan = ({ isSelected }: { isSelected: boolean }) => (
  <svg viewBox="0 0 36 32" className="w-8 h-7 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 12 5 L 24 5 L 26 8 L 10 8 Z"
      fill={isSelected ? '#F8ECE2' : '#F4EAE0'}
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M 10 8 C 7 13 6 22 9 27 C 12 28 15 27 17 18 C 19 27 22 28 25 27 C 28 22 27 13 24 8 Z"
      fill={isSelected ? '#F8ECE2' : '#F4EAE0'}
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M 13 8 C 11 14 11 20 12 26"
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M 21 8 C 23 14 23 20 22 26"
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const IconTabMu = ({ isSelected }: { isSelected: boolean }) => (
  <svg viewBox="0 0 38 32" className="w-8 h-7 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 19 6 L 6 20 C 12 22 26 22 32 20 Z"
      fill={isSelected ? '#FDE68A' : '#EBD085'}
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M 10 16.5 C 15 18 23 18 28 16.5"
      stroke={isSelected ? '#D97706' : '#B48C36'}
      strokeWidth="1.2"
    />
    <path
      d="M 11 19.5 C 12 26 16 28 19 28 C 22 28 26 26 27 19.5"
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const IconTabPhuKien = ({ isSelected }: { isSelected: boolean }) => (
  <svg viewBox="0 0 38 32" className="w-8 h-7 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 19 26 L 6 17 C 9 9 29 9 32 17 Z"
      fill={isSelected ? '#F8ECE2' : '#F4EAE0'}
      stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <line x1="19" y1="26" x2="11" y2="12" stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.3" />
    <line x1="19" y1="26" x2="16" y2="10.5" stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.3" />
    <line x1="19" y1="26" x2="22" y2="10.5" stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.3" />
    <line x1="19" y1="26" x2="27" y2="12" stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.3" />
    <circle cx="19" cy="26" r="1.8" fill={isSelected ? '#FDE68A' : '#D97706'} stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.2" />
  </svg>
);

const IconTabGiay = ({ isSelected }: { isSelected: boolean }) => (
  <svg viewBox="0 0 38 32" className="w-8 h-7 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-6 15 16)">
      <path
        d="M 10 9 C 10 9 14 9 15 14 C 16 19 15 24 13 25 C 9.5 25 7.5 19 8.5 14 Z"
        fill="#8B1528"
        stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 11 11 C 12 13 13 16 12 20"
        stroke="#FDE68A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="11.5" cy="22.5" r="1" fill="#FDE68A" />
      <path d="M 10 23.5 Q 11.5 21.5 13 23.5" stroke="#FDE68A" strokeWidth="0.8" fill="none" />
    </g>
    <g transform="rotate(6 23 16)">
      <path
        d="M 21 9 C 21 9 25 9 26 14 C 27 19 26 24 24 25 C 20.5 25 18.5 19 19.5 14 Z"
        fill="#8B1528"
        stroke={isSelected ? '#FFFFFF' : '#2A1D17'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 22 11 C 23 13 24 16 23 20"
        stroke="#FDE68A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="22.5" r="1" fill="#FDE68A" />
      <path d="M 21 23.5 Q 22.5 21.5 24 23.5" stroke="#FDE68A" strokeWidth="0.8" fill="none" />
    </g>
  </svg>
);

const IconTabKhuonMat = ({ isSelected }: { isSelected: boolean }) => (
  <svg viewBox="0 0 38 32" className="w-8 h-7 drop-shadow-2xs" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="19" cy="16" rx="9.5" ry="10.5" fill={isSelected ? '#FDE5D4' : '#FCE7D6'} stroke={isSelected ? '#FFFFFF' : '#2A1D17'} strokeWidth="1.8" />
    <circle cx="16" cy="15" r="1.3" fill="#18181B" />
    <circle cx="22" cy="15" r="1.3" fill="#18181B" />
    <path d="M 17 20 Q 19 23 21 20" stroke="#18181B" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <ellipse cx="14" cy="18" rx="2" ry="1.4" fill="#FB7185" opacity="0.75" />
    <ellipse cx="24" cy="18" rx="2" ry="1.4" fill="#FB7185" opacity="0.75" />
    <path d="M 12 12 C 12 7 26 7 26 12 C 23 9 20 9 19 10 C 18 9 15 9 12 12 Z" fill="#18181B" stroke="#18181B" strokeWidth="1.2" />
  </svg>
);

const DEFAULT_SAVED_OUTFITS: SavedOutfitCard[] = [
  {
    id: 'sample-1',
    cardCode: 'TỦ-8801',
    name: 'Áo Bà Ba Hồng Duyên Dáng',
    outfitId: 'ao-ba-ba',
    outfitName: 'Áo Bà Ba Nam Bộ',
    shirtColor: '#F87171',
    shirtColorName: 'Hồng San Hô',
    pantsColor: '#1F2937',
    pantsColorName: 'Lụa Đen',
    bottomId: 'quan-den',
    hatId: 'non-la',
    hatName: 'Nón Lá Nan Tre',
    hatColor: '#EBD085',
    hasSilverNecklace: false,
    selectedAccessories: [],
    shoeId: 'guoc-moc',
    shoesName: 'Guốc Mộc Mộc Mạc',
    skinColor: '#fde5d4',
    hairStyle: 'braids',
    eventName: 'Đồng Quê Nam Bộ',
    rarity: 'SSR',
    createdAt: '08/10/2026',
    aiEvaluation: {
      overallScore: 9.6,
      colorHarmonyScore: 9.7,
      colorHarmonyComment: 'Sắc hồng san hô của tà áo bà ba nổi bật rạng ngời trên nền quần lụa đen tuyền và nón lá rơm vàng, tạo nên sự cân bằng âm dương trang nhã tuyệt đối.',
      eventSuitabilityScore: 9.5,
      eventSuitabilityComment: 'Trang phục đậm chất chân phương, phóng khoáng của vùng đất phương Nam, cực kỳ hài hòa với không gian sông nước và miệt vườn.',
      title: 'Hồng Sắc Phương Nam Nhã Nhặn',
      overallVerdict: 'Một tác phẩm phối đồ mộc mạc mà duyên dáng lạ kỳ, gợi nhớ vẻ đẹp nữ sinh Nam Bộ xưa.',
      suggestions: [
        'Có thể thêm khăn rằn vắt vai khi tham gia các lễ hội miệt vườn để tăng độ chân thực.',
        'Kết hợp cùng mái tóc thắt bím hai bên buông lơi để tôn nét ngây thơ.'
      ]
    }
  },
  {
    id: 'sample-2',
    cardCode: 'TỦ-8802',
    name: 'Đại Lễ Nhật Bình Son Cung Đình',
    outfitId: 'ao-nhat-binh',
    outfitName: 'Áo Nhật Bình',
    shirtColor: '#E11048',
    shirtColorName: 'Đỏ Son Cung Đình',
    pantsColor: '#F8FAFC',
    pantsColorName: 'Bạch Tuyết Hoàng Cung',
    bottomId: 'quan-trang',
    hatId: 'khan-van-hoang-gia',
    hatName: 'Khăn Vấn Hoàng Tộc',
    hatColor: '#EA8308',
    hasSilverNecklace: true,
    selectedAccessories: ['kieng-bac'],
    shoeId: 'hai-theu',
    shoesName: 'Hài Thêu Phượng Vũ',
    skinColor: '#fde5d4',
    hairStyle: 'braids',
    eventName: 'Đại Lễ Cung Đình Huế',
    rarity: 'SSR',
    createdAt: '08/10/2026',
    aiEvaluation: {
      overallScore: 9.8,
      colorHarmonyScore: 9.9,
      colorHarmonyComment: 'Sắc đỏ son uy quyền kết hợp hoàn mỹ cùng khăn vấn ngũ sắc hoàng tộc và quần lụa trắng, thể hiện đúng điển chế phẩm trật cao quý triều Nguyễn.',
      eventSuitabilityScore: 9.7,
      eventSuitabilityComment: 'Tuyệt đối tương xứng với không gian đại lễ, tôn nghiêm và mang đậm tính nghi thức quốc lễ.',
      title: 'Phượng Vũ Uy Nghi Hoàng Triều',
      overallVerdict: 'Bộ lễ phục toát lên phẩm vị đài các, rực rỡ và tôn kính lịch sử dân tộc.',
      suggestions: [
        'Giữ dáng đứng đoan trang, hai tay chắp trước ngực để khoe trọn hoa văn viền cổ áo Nhật Bình.'
      ]
    }
  },
  {
    id: 'sample-3',
    cardCode: 'TỦ-8803',
    name: 'Khoa Cử Nho Phong Thanh Đạm',
    outfitId: 'ao-ngu-than',
    outfitName: 'Áo Ngũ Thân Truyền Thống',
    shirtColor: '#78350F',
    shirtColorName: 'Nâu Trầm Trượng Phu',
    pantsColor: '#1F2937',
    pantsColorName: 'Quần Lụa Đen',
    bottomId: 'quan-den',
    hatId: 'khan-van-hoang-gia',
    hatName: 'Khăn Đóng Nho Sĩ',
    hatColor: '#1F2937',
    hasSilverNecklace: false,
    selectedAccessories: [],
    shoeId: 'guoc-moc',
    shoesName: 'Guốc Mộc Cổ Truyền',
    skinColor: '#fde5d4',
    hairStyle: 'bun',
    eventName: 'Khoa Cử Nho Phong',
    rarity: 'SR',
    createdAt: '08/10/2026',
  }
];

export default function App() {
  // Điều hướng đầu trang & bộ lọc thẻ bài (mặc định trang chủ giới thiệu tối giản)
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('trang-chu');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');

  // Trạng thái người dùng Firebase & Đồng bộ dữ liệu
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authPromptReason, setAuthPromptReason] = useState<AuthPromptReason>('general');
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);

  // Trạng thái trang phục chính
  const [outfitId, setOutfitId] = useState<OutfitId>('ao-ba-ba'); // Mặc định Áo Bà Ba theo yêu cầu
  const [shirtColor, setShirtColor] = useState<string>('#F87171'); // Hồng san hô / hồng cánh sen
  const [pantsColor, setPantsColor] = useState<string>('#1F2937'); // Quần lụa đen truyền thống
  const [bottomId, setBottomId] = useState<string>('quan-den'); // ID Quần hoặc Váy đang mặc
  const [hatColor, setHatColor] = useState<string>('#18181b'); // Khăn xếp truyền thống màu đen
  const [hatId, setHatId] = useState<string>('khan-van-hoang-gia'); // Khăn xếp (khăn vấn) dáng dẹt hình chữ nhật ngang ôm sát đỉnh đầu
  const [hasSilverNecklace, setHasSilverNecklace] = useState<boolean>(false);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [shoeId, setShoeId] = useState<string>('guoc-moc');
  const [skinColor, setSkinColor] = useState<string>('#fde5d4'); // Màu da trắng hồng tự nhiên
  const [hairStyle, setHairStyle] = useState<string>('braids'); // Mái tóc tết hai bên chuẩn mực

  // Tên sự kiện / bối cảnh đang áp dụng
  const [currentEventName, setCurrentEventName] = useState<string>('Đồng Quê Nam Bộ');

  // Tabs điều hướng cột trái & cột phải
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('ao');
  const [activeColorTab, setActiveColorTab] = useState<ColorTab>('ao');
  const [mobileFittingTab, setMobileFittingTab] = useState<'items' | 'colors' | 'presets'>('items');

  // Nạp nhanh 4 mẫu minh họa chuẩn
  const [activePreset, setActivePreset] = useState<PresetId>(4);

  // Thu phóng mannequin
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Kho Tủ Đồ dạng Thẻ Bài (Lưu trữ lâu dài trong LocalStorage)
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfitCard[]>(() => {
    try {
      const raw = localStorage.getItem('viet_phuc_saved_wardrobe_v1');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SAVED_OUTFITS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('viet_phuc_saved_wardrobe_v1', JSON.stringify(savedOutfits));
    } catch (e) {
      console.error(e);
    }
  }, [savedOutfits]);

  // Lắng nghe và đồng bộ dữ liệu người dùng khi đăng nhập Google
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsCloudSyncing(true);
        try {
          await syncUserProfile({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          // Gộp các bộ phối đã lưu với Firestore
          const merged = await syncLocalOutfitsToFirestore(user.uid, savedOutfits);
          if (merged && merged.length > 0) {
            setSavedOutfits(merged);
          }
          setToastMessage(`Đã đăng nhập: ${user.displayName || user.email}. Đã đồng bộ tủ đồ!`);
          setTimeout(() => setToastMessage(null), 3500);
        } catch (err) {
          console.warn('Lỗi khi đồng bộ đám mây:', err);
        } finally {
          setIsCloudSyncing(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      playSoundEffect('click');
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setToastMessage(`Xin chào, ${result.user.displayName || result.user.email}!`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error);
      setToastMessage('Đăng nhập Google thất bại hoặc đã bị đóng.');
      setTimeout(() => setToastMessage(null), 3000);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      playSoundEffect('click');
      await signOut(auth);
      setCurrentUser(null);
      setToastMessage('Đã đăng xuất tài khoản.');
      setTimeout(() => setToastMessage(null), 2500);
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    }
  };

  // Thông báo Toast phản hồi người dùng
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);
  const [showTeacherModal, setShowTeacherModal] = useState<boolean>(false);
  const [showSaveOutfitModal, setShowSaveOutfitModal] = useState<boolean>(false);
  const [showAiEvaluationModal, setShowAiEvaluationModal] = useState<boolean>(false);
  const [showWardrobeModal, setShowWardrobeModal] = useState<boolean>(false);
  const [grade, setGrade] = useState<{ score: string; comment: string }>(TEACHER_REVIEWS_EXTENDED[0]);

  // Âm thanh Web Audio API nhẹ nhàng
  const playSoundEffect = (type: 'click' | 'bell' | 'card') => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'bell') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'card') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Ignore audio error
    }
  };

  // Nạp nhanh 4 Mẫu Minh Họa Chuẩn
  const handleSelectPreset = (presetId: PresetId) => {
    playSoundEffect('card');
    setActivePreset(presetId);

    if (presetId === 1) {
      setOutfitId('ao-nhat-binh');
      setShirtColor('#E11048');
      setPantsColor('#F8FAFC');
      setBottomId('quan-trang');
      setHatId('khan-van-hoang-gia');
      setHatColor('#EA8308');
      setHasSilverNecklace(true);
      setSelectedAccessories(['kieng-bac', 'tram-cai']);
      setShoeId('hai-theu');
      setCurrentEventName('Đại Lễ Cung Đình');
    } else if (presetId === 2) {
      setOutfitId('ao-tac');
      setShirtColor('#B91C1C');
      setPantsColor('#1F2937');
      setBottomId('quan-den');
      setHatId('khan-van-hoang-gia');
      setHatColor('#B91C1C');
      setHasSilverNecklace(true);
      setSelectedAccessories(['kieng-bac']);
      setShoeId('hai-cong');
      setCurrentEventName('Lễ Hỷ Sự Cưới Hỏi');
    } else if (presetId === 3) {
      setOutfitId('ao-ngu-than');
      setShirtColor('#78350F');
      setPantsColor('#1F2937');
      setBottomId('quan-den');
      setHatId('khan-dong');
      setHatColor('#1F2937');
      setHasSilverNecklace(false);
      setSelectedAccessories([]);
      setShoeId('guoc-moc');
      setCurrentEventName('Khoa Cử Nho Phong');
    } else {
      setOutfitId('ao-ba-ba');
      setShirtColor('#F87171');
      setPantsColor('#1F2937');
      setBottomId('quan-den');
      setHatId('non-la');
      setHatColor('#EBD085');
      setHasSilverNecklace(false);
      setSelectedAccessories(['khan-ran']);
      setShoeId('guoc-moc');
      setCurrentEventName('Đồng Quê Nam Bộ');
    }
  };

  // Chọn loại cổ phục ở cột trái
  const handleSelectOutfit = (id: OutfitId) => {
    playSoundEffect('card');
    setOutfitId(id);
    const def = COSTUMES_DATA.find((c) => c.id === id);
    if (def) {
      setShirtColor(def.defaultColors.primary);
      setPantsColor(def.defaultColors.pants);
      if (id === 'ao-ba-ba') {
        setHatId('khan-van-hoang-gia');
        setHatColor('#18181b');
        setSelectedAccessories(['khan-ran']);
        setBottomId('quan-den');
      } else if (id === 'ao-tu-than') {
        setHatId('khan-van-hoang-gia');
        setHatColor('#18181b');
        setSelectedAccessories(['that-lung-vang']);
        setBottomId('vay-dup');
      } else if (id === 'ao-giao-linh') {
        setHatId('khan-van-hoang-gia');
        setHatColor('#18181b');
        setSelectedAccessories(['tram-cai']);
        setBottomId('vay-dup');
      } else if (id === 'ao-nhat-binh') {
        setHatId('khan-van-hoang-gia');
        setHatColor('#18181b');
        setSelectedAccessories(['kieng-bac']);
        setHasSilverNecklace(true);
        setBottomId('quan-trang');
      } else {
        setHatId('khan-van-hoang-gia');
        setHatColor('#18181b');
        setSelectedAccessories(['kieng-bac']);
        setHasSilverNecklace(true);
        setBottomId('quan-den');
      }
    }
  };

  // Bật/tắt phụ kiện đồng bộ 100%
  const handleToggleAccessory = (accessoryId: string) => {
    playSoundEffect('click');
    setSelectedAccessories((prev) => {
      const isEquipped = prev.includes(accessoryId);
      const updated = isEquipped ? prev.filter((id) => id !== accessoryId) : [...prev, accessoryId];
      if (accessoryId === 'kieng-bac') {
        setHasSilverNecklace(!isEquipped);
      }
      return updated;
    });
  };

  // Áp dụng gợi ý từ Popup Sự Kiện
  const handleApplySuggestion = (config: {
    outfitId: OutfitId;
    shirtColor: string;
    pantsColor: string;
    hatColor: string;
    hasSilverNecklace: boolean;
    eventName: string;
  }) => {
    playSoundEffect('bell');
    setOutfitId(config.outfitId);
    setShirtColor(config.shirtColor);
    setPantsColor(config.pantsColor);
    setHatColor(config.hatColor);
    setHasSilverNecklace(config.hasSilverNecklace);
    if (config.outfitId === 'ao-tu-than' || config.outfitId === 'ao-giao-linh') {
      setBottomId('vay-dup');
    } else {
      setBottomId(config.pantsColor.toLowerCase() === '#f8fafc' ? 'quan-trang' : 'quan-den');
    }
    if (config.hasSilverNecklace) {
      setSelectedAccessories((prev) => prev.includes('kieng-bac') ? prev : [...prev, 'kieng-bac']);
    } else {
      setSelectedAccessories((prev) => prev.filter((id) => id !== 'kieng-bac'));
    }
    setCurrentEventName(config.eventName);
    if (config.outfitId === 'ao-ba-ba') {
      setHatId('non-la');
    } else if (config.outfitId === 'ao-tu-than') {
      setHatId('non-quai-thao');
    } else {
      setHatId('khan-van-hoang-gia');
    }
  };

  // Chọn màu từ bảng màu cột phải
  const handleSelectColor = (hex: string) => {
    playSoundEffect('click');
    if (activeColorTab === 'ao') {
      setShirtColor(hex);
    } else if (activeColorTab === 'quan') {
      setPantsColor(hex);
    } else {
      // Nếu đang chọn không đội mũ hoặc nón chuẩn nan tre mà chọn màu ở bảng màu, tự động chuyển sang Khăn Vấn Hoàng Tộc để áp dụng màu đó
      if (hatId === 'khong-doi' || hatId === 'non-la' || hatId === 'non-quai-thao') {
        setHatId('khan-van-hoang-gia');
      }
      setHatColor(hex);
    }
  };

  // Màu đang chọn hiển thị ở ô "Đổi Màu Đang Mặc"
  const getCurrentActiveColor = () => {
    if (activeColorTab === 'ao') return shirtColor;
    if (activeColorTab === 'quan') return pantsColor;
    if (hatId === 'khong-doi') return '#FAF7EE';
    if (hatId === 'non-la') return '#EBD085';
    if (hatId === 'non-quai-thao') return '#E8D5A4';
    return hatColor;
  };

  const getCurrentActiveColorLabel = () => {
    if (activeColorTab === 'ao') return 'Màu Áo Đang Mặc';
    if (activeColorTab === 'quan') return 'Màu Quần Đang Mặc';
    if (hatId === 'khong-doi') return 'Để Mộc (Không Đội Mũ/Nón)';
    if (hatId === 'non-la') return 'Nón Lá Nam Bộ (Bản Chuẩn 1 Màu)';
    if (hatId === 'non-quai-thao') return 'Nón Quai Thao (Bản Chuẩn 1 Màu)';
    if (hatId === 'khan-van-hoang-gia') return 'Màu Khăn Vấn Hoàng Tộc (Đa Sắc)';
    return 'Màu Mũ/Khăn Đang Đội';
  };

  // Thẻ cổ phục hiện tại đang chọn
  const activeCostume = COSTUMES_DATA.find((c) => c.id === outfitId) || COSTUMES_DATA[0];

  // Danh sách cổ phục theo bộ lọc Nam / Nữ / Toàn bộ
  const filteredCostumes = COSTUMES_DATA.filter((costume) => {
    if (genderFilter === 'female') return costume.gender === 'female' || costume.gender === 'all';
    if (genderFilter === 'male') return costume.gender === 'male' || costume.gender === 'all';
    return true;
  });

  // Tên màu hiện tại phục vụ hiển thị & AI
  const currentShirtColorItem = TRADITIONAL_PALETTES.find(
    (p) => p.hex.toLowerCase() === shirtColor.toLowerCase()
  );
  const currentPantsColorItem = BOTTOM_OPTIONS.find(
    (b) => b.defaultColor.toLowerCase() === pantsColor.toLowerCase()
  );
  const currentHatItem = HAT_OPTIONS.find((h) => h.id === hatId);

  // Cấu hình bộ đồ đang mặc phục vụ Modal Lưu & Đánh giá AI
  const currentOutfitConfig = {
    outfitId,
    outfitName: activeCostume.name,
    shirtColor,
    shirtColorName: currentShirtColorItem?.name || 'Màu Đang Chọn',
    pantsColor,
    pantsColorName: currentPantsColorItem?.name || 'Màu Quần Đang Chọn',
    bottomId,
    hatId,
    hatName: currentHatItem?.name || 'Mũ Cổ Truyền',
    hatColor,
    hasSilverNecklace: hasSilverNecklace || selectedAccessories.includes('kieng-bac'),
    selectedAccessories,
    shoeId,
    shoesName: SHOE_OPTIONS.find((s) => s.id === shoeId)?.name || 'Guốc mộc / Hài thêu cổ truyền',
    skinColor,
    hairStyle,
    dollImage: activeCostume.dollImage,
    eventName: currentEventName,
  };

  // 1. TẢI VÀ TIẾP TỤC CHỈNH SỬA BỘ PHỐI TỪ KHO TỦ ĐỒ (THEO YÊU CẦU NGƯỜI DÙNG)
  const handleLoadAndEditOutfit = (card: SavedOutfitCard) => {
    playSoundEffect('card');
    setOutfitId(card.outfitId);
    setShirtColor(card.shirtColor);
    setPantsColor(card.pantsColor);
    if (card.bottomId) {
      setBottomId(card.bottomId);
    } else if (card.outfitId === 'ao-tu-than' || card.outfitId === 'ao-giao-linh') {
      setBottomId('vay-dup');
    } else {
      setBottomId(card.pantsColor.toLowerCase() === '#f8fafc' ? 'quan-trang' : 'quan-den');
    }
    setHatId(card.hatId);
    setHatColor(card.hatColor);
    setHasSilverNecklace(card.hasSilverNecklace);
    if (card.selectedAccessories) {
      setSelectedAccessories(card.selectedAccessories);
    } else {
      setSelectedAccessories(card.hasSilverNecklace ? ['kieng-bac'] : []);
    }
    if (card.shoeId) {
      setShoeId(card.shoeId);
    }
    if (card.skinColor) {
      setSkinColor(card.skinColor);
    }
    if (card.hairStyle) {
      setHairStyle(card.hairStyle);
    }
    setCurrentEventName(card.eventName);
    setActiveNavTab('phong-thu-do');
    setShowWardrobeModal(false);
    setToastMessage(`Đã nạp bộ phối "${card.name}" để tiếp tục chỉnh sửa!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1.5. MỞ MODAL LƯU BỘ PHỐI (BẮT BUỘC ĐĂNG NHẬP GOOGLE)
  const handleOpenSaveOutfit = () => {
    if (!currentUser) {
      setAuthPromptReason('save');
      setShowAuthModal(true);
      playSoundEffect('bell');
      setToastMessage('Vui lòng đăng nhập Google để lưu bộ phối vào tủ đồ.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    setShowSaveOutfitModal(true);
    playSoundEffect('bell');
  };

  // 1.6. MỞ MODAL GỢI Ý PHỐI ĐỒ AI (BẮT BUỘC ĐĂNG NHẬP GOOGLE)
  const handleOpenAiSuggest = () => {
    if (!currentUser) {
      setAuthPromptReason('ai-suggest');
      setShowAuthModal(true);
      playSoundEffect('bell');
      setToastMessage('Vui lòng đăng nhập Google để sử dụng tính năng Gợi Ý Phối Đồ AI.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    setShowEventModal(true);
    playSoundEffect('bell');
  };

  // 1.7. MỞ MODAL AI CHẤM ĐIỂM (BẮT BUỘC ĐĂNG NHẬP GOOGLE)
  const handleOpenAiEvaluation = () => {
    if (!currentUser) {
      setAuthPromptReason('ai-eval');
      setShowAuthModal(true);
      playSoundEffect('bell');
      setToastMessage('Vui lòng đăng nhập Google để sử dụng AI Chấm Điểm bộ phối.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    setShowAiEvaluationModal(true);
    playSoundEffect('bell');
  };

  // 2. LƯU BỘ PHỐI VÀO KHO TỦ ĐỒ DƯỚI DẠNG THẺ BÀI
  const handleConfirmSaveOutfit = (newCard: SavedOutfitCard) => {
    if (!currentUser) {
      setAuthPromptReason('save');
      setShowAuthModal(true);
      setToastMessage('Vui lòng đăng nhập Google để lưu bộ phối vào tủ đồ.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    playSoundEffect('bell');
    setSavedOutfits((prev) => [newCard, ...prev]);
    saveOutfitToFirestore(currentUser.uid, newCard);
    setToastMessage(`Đã lưu "${newCard.name}" vào Kho Tủ Đồ (Đã đồng bộ Cloud)!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 3. XÓA BỘ PHỐI KHỎI TỦ ĐỒ
  const handleDeleteSavedOutfit = (id: string) => {
    setSavedOutfits((prev) => prev.filter((item) => item.id !== id));
    if (currentUser) {
      deleteOutfitFromFirestore(currentUser.uid, id);
    }
    playSoundEffect('click');
    setToastMessage('Đã xóa thẻ bài khỏi tủ đồ.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 4. LƯU KÈM ĐIỂM ĐÁNH GIÁ AI
  const handleSaveWithAiEvaluation = (evaluation: AiEvaluationResult, eventName: string) => {
    if (!currentUser) {
      setAuthPromptReason('save');
      setShowAuthModal(true);
      setToastMessage('Vui lòng đăng nhập Google để lưu kết quả đánh giá vào tủ đồ.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }
    const newCard: SavedOutfitCard = {
      id: 'outfit-' + Date.now(),
      cardCode: 'TỦ-' + Math.floor(1000 + Math.random() * 9000),
      name: evaluation.title || `Bộ Phối ${activeCostume.name} - ${eventName}`,
      outfitId: outfitId,
      outfitName: activeCostume.name,
      shirtColor: shirtColor,
      shirtColorName: currentShirtColorItem?.name,
      pantsColor: pantsColor,
      pantsColorName: currentPantsColorItem?.name,
      bottomId: bottomId,
      hatId: hatId,
      hatName: currentHatItem?.name,
      hatColor: hatColor,
      hasSilverNecklace: hasSilverNecklace || selectedAccessories.includes('kieng-bac'),
      selectedAccessories: selectedAccessories,
      shoeId: shoeId,
      shoesName: SHOE_OPTIONS.find((s) => s.id === shoeId)?.name || 'Guốc mộc / Hài thêu',
      skinColor: skinColor,
      hairStyle: hairStyle,
      dollImage: activeCostume.dollImage,
      eventName: eventName,
      rarity: evaluation.overallScore >= 9.5 ? 'SSR' : evaluation.overallScore >= 8.5 ? 'SR' : 'R',
      createdAt: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      aiEvaluation: evaluation,
    };
    setSavedOutfits((prev) => [newCard, ...prev]);
    saveOutfitToFirestore(currentUser.uid, newCard);
    playSoundEffect('bell');
    setToastMessage(`Đã lưu "${newCard.name}" kèm điểm AI (${evaluation.overallScore}/10) vào Tủ Đồ (Cloud)!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // =========================================================================
  // CÁC HÀM RENDER MODULAR CHO CẢ DESKTOP (3 CỘT) VÀ MOBILE (2 TẦNG CHUYỂN TAB)
  // =========================================================================

  // 1. THANH TABS DANH MỤC BIỂU TƯỢNG (ÁO, QUẦN, MŨ, PHỤ KIỆN, HÀI)
  const renderCategoryNav = () => (
    <div className="shrink-0 flex items-center justify-between gap-1 p-1 bg-[#F4EFE2] rounded-2xl shadow-xs transition-all duration-300 ease-in-out">
      {[
        { id: 'ao' as CategoryTab, title: 'Áo (2D)' },
        { id: 'quan' as CategoryTab, title: 'Quần / Váy' },
        { id: 'mu' as CategoryTab, title: 'Mũ / Khăn' },
        { id: 'phukien' as CategoryTab, title: 'Phụ Kiện' },
        { id: 'giay' as CategoryTab, title: 'Hài / Guốc' },
        { id: 'khuonmat' as CategoryTab, title: 'Người Mẫu & Tóc' },
      ].map((tab) => {
        const isSelected = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id);
              playSoundEffect('click');
            }}
            title={tab.title}
            aria-label={tab.title}
            className={`relative flex-1 py-1.5 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-[#8B1528] text-white shadow-sm'
                : 'hover:bg-white/70 text-stone-700'
            }`}
          >
            {tab.id === 'ao' && <IconTabAo isSelected={isSelected} />}
            {tab.id === 'quan' && <IconTabQuan isSelected={isSelected} />}
            {tab.id === 'mu' && <IconTabMu isSelected={isSelected} />}
            {tab.id === 'phukien' && <IconTabPhuKien isSelected={isSelected} />}
            {tab.id === 'giay' && <IconTabGiay isSelected={isSelected} />}
            {tab.id === 'khuonmat' && <IconTabKhuonMat isSelected={isSelected} />}
            {isSelected && (
              <span className="absolute top-0.5 right-1 text-amber-200 text-[9px] leading-none opacity-90 pointer-events-none select-none">
                ✦
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  // 2. LƯỚI DANH SÁCH LINH KIỆN 2D (THEO TAB HIỆN TẠI)
  const renderItemsGrid = () => (
    <>
      {/* 1. NẾU TAB LÀ "ÁO" */}
      {activeCategory === 'ao' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-2 gap-2 sm:gap-2.5 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {filteredCostumes.map((costume) => {
            const isSelected = outfitId === costume.id;
            const displayColor = isSelected ? shirtColor : costume.defaultColors.primary;

            return (
              <div
                key={costume.id}
                onClick={() => handleSelectOutfit(costume.id)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between relative group hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-white shadow-md ring-2 ring-[#8B1528]/25 -translate-y-0.5'
                    : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                    <h3 className="font-bold text-xs text-stone-900 leading-tight truncate">
                      {costume.name}
                    </h3>
                    {isSelected && (
                      <span className="flex items-center gap-0.5 font-bold text-[9px] text-[#8B1528] bg-red-50 px-1.5 py-0.5 rounded shadow-2xs shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#8B1528] stroke-[3]" />
                        <span className="hidden sm:inline">Đang Mặc</span>
                      </span>
                    )}
                  </div>

                  <div className="w-full h-20 sm:h-24 rounded-lg overflow-hidden bg-[#FAF7EE] group-hover:bg-[#F5EFE0] flex items-center justify-center p-1 relative transition-colors duration-200">
                    <Costume2DPreview
                      outfitId={costume.id}
                      primaryColor={displayColor}
                      className="w-full h-full"
                    />
                    <div className="absolute bottom-1 right-1 bg-white/85 text-stone-600 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      2D
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 mt-1 border-t border-stone-100 flex items-center justify-between text-[10px]">
                  <span className="text-[9px] text-stone-500 font-medium truncate">
                    {costume.region}
                  </span>
                  <span
                    className={`font-semibold transition-colors ${
                      isSelected
                        ? 'text-[#8B1528] font-bold'
                        : 'text-stone-400 group-hover:text-[#8B1528]'
                    }`}
                  >
                    {isSelected ? 'Đang chọn' : 'Mặc ngay'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. NẾU TAB LÀ "QUẦN/VÁY" */}
      {activeCategory === 'quan' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-2 gap-2 sm:gap-2.5 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {BOTTOM_OPTIONS.map((item) => {
            const isSelected = bottomId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setBottomId(item.id);
                  setPantsColor(item.defaultColor);
                  playSoundEffect('click');
                }}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-white shadow-md ring-2 ring-[#8B1528]/25 -translate-y-0.5'
                    : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                    <h4 className="font-bold text-xs text-stone-900 truncate">{item.name}</h4>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.defaultColor }}
                    />
                  </div>

                  <div className="w-full h-18 sm:h-20 rounded-lg overflow-hidden bg-[#FAF7EE] group-hover:bg-[#F5EFE0] flex items-center justify-center p-1 transition-colors duration-200">
                    <Item2DPreview
                      category="quan"
                      itemId={item.id}
                      color={isSelected ? pantsColor : item.defaultColor}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="pt-1.5 mt-1 border-t border-stone-100 flex items-center justify-between text-[9px]">
                  {isSelected ? (
                    <span className="flex items-center gap-0.5 font-bold text-[#8B1528]">
                      <Check className="w-3 h-3 text-[#8B1528] stroke-[3]" />
                      <span>{item.id.startsWith('vay') ? 'Đang Mặc Váy' : 'Đang Mặc Quần'}</span>
                    </span>
                  ) : (
                    <span className="text-stone-400 group-hover:text-[#8B1528] font-semibold transition-colors">
                      {item.id.startsWith('vay') ? 'Mặc váy đụp' : 'Mặc quần'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. NẾU TAB LÀ "MŨ/NÓN" */}
      {activeCategory === 'mu' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-2 gap-2 sm:gap-2.5 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {HAT_OPTIONS.map((item) => {
            const isSelected = hatId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setHatId(item.id);
                  setHatColor(item.defaultColor);
                  playSoundEffect('click');
                }}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-white shadow-md ring-2 ring-[#8B1528]/25 -translate-y-0.5'
                    : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                    <h4 className="font-bold text-xs text-stone-900 leading-tight truncate">{item.name}</h4>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.isFixedColor ? item.defaultColor : isSelected ? hatColor : item.defaultColor }}
                      title={item.isFixedColor ? 'Bản màu chuẩn nan tre' : 'Màu sắc tùy chỉnh'}
                    />
                  </div>

                  <div className="w-full h-18 sm:h-20 rounded-lg overflow-hidden bg-[#FAF7EE] group-hover:bg-[#F5EFE0] flex items-center justify-center p-1 transition-colors duration-200">
                    <Item2DPreview
                      category="mu"
                      itemId={item.id}
                      color={item.isFixedColor ? item.defaultColor : isSelected ? hatColor : item.defaultColor}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="pt-1.5 mt-1 border-t border-stone-100 flex items-center justify-between text-[9px]">
                  {isSelected ? (
                    <span className="flex items-center gap-0.5 font-bold text-[#8B1528]">
                      <Check className="w-3 h-3 text-[#8B1528] stroke-[3]" />
                      <span>{item.id === 'khong-doi' ? 'Để Mộc' : 'Đang Đội'}</span>
                    </span>
                  ) : (
                    <span className="text-stone-400 group-hover:text-[#8B1528] font-semibold transition-colors">
                      {item.id === 'khong-doi' ? 'Chọn để mộc' : 'Chọn đội'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. NẾU TAB LÀ "PHỤ KIỆN" */}
      {activeCategory === 'phukien' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-2 gap-2 sm:gap-2.5 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {ACCESSORY_OPTIONS.map((item) => {
            const isEquipped = selectedAccessories.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleToggleAccessory(item.id)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-[1.02] ${
                  isEquipped
                    ? 'bg-white shadow-md ring-2 ring-[#8B1528]/25 -translate-y-0.5'
                    : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                    <h4 className="font-bold text-xs text-stone-900 truncate">{item.name}</h4>
                  </div>

                  <div className="w-full h-18 sm:h-20 rounded-lg overflow-hidden bg-[#FAF7EE] group-hover:bg-[#F5EFE0] flex items-center justify-center p-1 transition-colors duration-200">
                    <Item2DPreview
                      category="phukien"
                      itemId={item.id}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="pt-1.5 mt-1 border-t border-stone-100 flex items-center justify-between text-[9px]">
                  {isEquipped ? (
                    <span className="flex items-center gap-0.5 font-bold text-[#8B1528]">
                      <Check className="w-3 h-3 text-[#8B1528] stroke-[3]" />
                      <span>Đang Đeo</span>
                    </span>
                  ) : (
                    <span className="text-stone-400 group-hover:text-[#8B1528] font-semibold transition-colors">
                      Bấm để đeo
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. NẾU TAB LÀ "GIÀY DÉP" */}
      {activeCategory === 'giay' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid grid-cols-2 gap-2 sm:gap-2.5 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {SHOE_OPTIONS.map((item) => {
            const isSelected = shoeId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setShoeId(item.id);
                  playSoundEffect('click');
                }}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-white shadow-md ring-2 ring-[#8B1528]/25 -translate-y-0.5'
                    : 'bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                    <h4 className="font-bold text-xs text-stone-900 truncate">{item.name}</h4>
                  </div>

                  <div className="w-full h-18 sm:h-20 rounded-lg overflow-hidden bg-[#FAF7EE] group-hover:bg-[#F5EFE0] flex items-center justify-center p-1 transition-colors duration-200">
                    <Item2DPreview
                      category="giay"
                      itemId={item.id}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="pt-1.5 mt-1 border-t border-stone-100 flex items-center justify-between text-[9px]">
                  {isSelected ? (
                    <span className="flex items-center gap-0.5 font-bold text-[#8B1528]">
                      <Check className="w-3 h-3 text-[#8B1528] stroke-[3]" />
                      <span>Đang Mang</span>
                    </span>
                  ) : (
                    <span className="text-stone-400 group-hover:text-[#8B1528] font-semibold transition-colors">
                      Chọn mang
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. NẾU TAB LÀ "NGƯỜI MẪU & KHUÔN MẶT" */}
      {activeCategory === 'khuonmat' && (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-2.5 transition-all duration-300 ease-in-out animate-in fade-in duration-200">
          {/* A. TÔNG DA NGƯỜI MẪU */}
          <div className="bg-white p-2.5 rounded-xl shadow-xs">
            <h4 className="font-bold text-xs text-stone-900 mb-2 flex items-center justify-between">
              <span>Tông Da Người Mẫu:</span>
              <span className="text-[10px] text-[#8B1528] font-bold">
                {SKIN_TONES.find((s) => s.color === skinColor)?.name || 'Trắng hồng'}
              </span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {SKIN_TONES.map((tone) => {
                const isSelected = skinColor === tone.color;
                return (
                  <button
                    key={tone.id}
                    onClick={() => {
                      setSkinColor(tone.color);
                      playSoundEffect('click');
                    }}
                    className={`p-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-[#8B1528] bg-red-50/50 shadow-2xs font-bold'
                        : 'border-stone-200/80 hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-stone-300 shrink-0 shadow-2xs"
                      style={{ backgroundColor: tone.color }}
                    />
                    <div className="text-left min-w-0">
                      <div className="text-xs text-stone-800 leading-tight truncate">{tone.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. KIỂU TÓC TRUYỀN THỐNG */}
          <div className="bg-white p-2.5 rounded-xl shadow-xs">
            <h4 className="font-bold text-xs text-stone-900 mb-2 flex items-center justify-between">
              <span>Kiểu Tóc Dân Tộc:</span>
              <span className="text-[10px] text-[#8B1528] font-bold">
                {HAIR_STYLES.find((h) => h.id === hairStyle)?.name || 'Tóc tết hai bên'}
              </span>
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {HAIR_STYLES.map((hair) => {
                const isSelected = hairStyle === hair.id;
                return (
                  <button
                    key={hair.id}
                    onClick={() => {
                      setHairStyle(hair.id);
                      playSoundEffect('click');
                    }}
                    className={`p-2 rounded-xl flex items-center justify-between gap-2 transition-all cursor-pointer border text-left ${
                      isSelected
                        ? 'border-[#8B1528] bg-red-50/50 shadow-2xs'
                        : 'border-stone-200/80 hover:bg-stone-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-900 leading-tight">{hair.name}</div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#8B1528] stroke-[3] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* C. NÉT ĐẶC TRƯNG BÚP BÊ HỌC SINH */}
          <div className="bg-[#FAF7EE] p-2.5 rounded-xl border border-amber-200/80 text-[11px] text-stone-800 flex flex-col gap-1 shadow-2xs">
            <div className="font-bold flex items-center gap-1.5 text-[#8B1528]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Nét vẽ Búp Bê Học Sinh Thủ Công:</span>
            </div>
            <p className="text-[10px] text-stone-600 leading-relaxed">
              ✦ Khuôn mặt trái xoan ngây thơ với đôi mắt to tròn long lanh, hai đốm má hồng phúng phính.
              <br />
              ✦ Mái tóc tết hai bên buông trước ngực thắt nơ đỏ xinh xắn.
              <br />
              ✦ Quai nón đỏ thắm ôm nhẹ cằm chuẩn nét thủ công mộc mạc.
            </p>
          </div>
        </div>
      )}
    </>
  );

  // 3. THANH NẠP NHANH 4 MẪU MINH HỌA CHUẨN
  const renderPresetsBar = (isMobile: boolean) => (
    <div
      className={`shrink-0 bg-white rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-xs flex ${
        isMobile ? 'flex-col gap-1.5' : 'flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5'
      } transition-all duration-300 ease-in-out`}
    >
      <span className="text-xs font-bold text-stone-900 whitespace-nowrap flex items-center gap-1.5">
        <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Nạp Nhanh 4 Mẫu Minh Họa Chuẩn:</span>
      </span>

      <div
        className={`flex items-center gap-1.5 w-full ${
          isMobile ? 'grid grid-cols-2' : 'sm:w-auto overflow-x-auto'
        }`}
      >
        {[
          { id: 1 as PresetId, label: 'Mẫu 1: Nhật Bình' },
          { id: 2 as PresetId, label: 'Mẫu 2: Áo Tấc' },
          { id: 3 as PresetId, label: 'Mẫu 3: Ngũ Thân' },
          { id: 4 as PresetId, label: 'Mẫu 4: Áo Bà Ba' },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p.id)}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap text-center ${
              activePreset === p.id
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'bg-stone-100/80 hover:bg-stone-200/80 text-stone-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );

  // 4. CỤM NÚT HÀNH ĐỘNG (LƯU BỘ PHỐI, AI CHẤM ĐIỂM, KHO TỦ ĐỒ)
  const renderActionButtons = (isMobile: boolean) => (
    <div className="shrink-0 bg-white rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 shadow-xs flex items-center justify-between gap-1.5 sm:gap-2 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0">
        {/* Nút 1: Lưu Bộ Phối */}
        <button
          onClick={handleOpenSaveOutfit}
          className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg bg-[#8B1528] text-white text-[11px] sm:text-xs font-bold hover:bg-[#721020] transition-all duration-200 flex items-center justify-center gap-1 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
          title="Lưu bộ phối hiện tại vào kho tủ đồ dưới dạng thẻ bài"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Lưu Bộ Phối</span>
        </button>

        {/* Nút 2: AI Chấm Điểm */}
        <button
          onClick={handleOpenAiEvaluation}
          className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 text-[11px] sm:text-xs font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-200 flex items-center justify-center gap-1 shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
          title="AI chấm bộ đồ phối trang phục"
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-900 fill-stone-900/30 shrink-0" />
          <span>AI Chấm Điểm</span>
        </button>
      </div>

      {/* Nút 3: Mở Kho Tủ Đồ */}
      <button
        onClick={() => {
          setShowWardrobeModal(true);
          playSoundEffect('card');
        }}
        className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#FAF6EC] hover:bg-stone-100 text-stone-800 text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
        title="Mở kho tủ đồ xem các thẻ bài đã lưu"
      >
        <Layers className="w-3.5 h-3.5 text-[#8B1528] shrink-0" />
        <span className="hidden sm:inline">Kho Tủ Đồ</span>
        <span className="bg-[#8B1528] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
          {savedOutfits.length}
        </span>
      </button>
    </div>
  );

  // 5. SÂN KHẤU NGƯỜI MẪU PAVILION STAGE
  const renderDollStage = (isMobile: boolean) => (
    <div
      className={`flex-1 min-h-0 bg-white rounded-2xl p-2 sm:p-2.5 shadow-xs flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out ${
        isMobile ? 'h-full' : ''
      }`}
    >
      {/* Thanh Công Cụ Thu Phóng */}
      <div className="absolute top-2.5 right-2.5 z-20 flex items-center bg-white/95 p-1 rounded-xl shadow-xs gap-1">
        <button
          onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 1.4))}
          className="p-1 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          title="Phóng to"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.7))}
          className="p-1 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          title="Thu nhỏ"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="p-1 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          title="Đặt lại tỉ lệ"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Huy hiệu trang phục đang mặc */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-[#FAF7EE] px-2.5 py-1 rounded-xl shadow-2xs max-w-[55%] truncate">
        <span className="w-2 h-2 rounded-full bg-[#8B1528] animate-pulse shrink-0" />
        <span className="font-bold text-xs text-stone-900 truncate">{activeCostume.name}</span>
        <span className="text-[10px] text-stone-500 hidden sm:inline">({activeCostume.badge})</span>
      </div>

      {/* Sân khấu người mẫu tương tác */}
      <div className="flex-1 min-h-0 flex items-center justify-center relative w-full h-full overflow-hidden p-0.5">
        <PavilionDollStage
          outfitId={outfitId}
          shirtColor={shirtColor}
          pantsColor={pantsColor}
          bottomId={bottomId}
          hatColor={hatColor}
          hatId={hatId}
          hasSilverNecklace={hasSilverNecklace || selectedAccessories.includes('kieng-bac')}
          selectedAccessories={selectedAccessories}
          shoeId={shoeId}
          skinColor={skinColor}
          hairStyle={hairStyle}
          dollImage={activeCostume.dollImage}
          zoomLevel={zoomLevel}
          onPartClick={(part) => {
            playSoundEffect('click');
            if (part === 'Áo') {
              setActiveCategory('ao');
              setActiveColorTab('ao');
              setMobileFittingTab('items');
            } else if (part === 'Quần' || part === 'Váy') {
              setActiveCategory('quan');
              setActiveColorTab('quan');
              setMobileFittingTab('items');
            } else if (part === 'Mũ/Nón') {
              setActiveCategory('mu');
              setActiveColorTab('mu');
              setMobileFittingTab('items');
            } else if (part === 'Phụ kiện') {
              setActiveCategory('phukien');
              setMobileFittingTab('items');
            } else if (part === 'Giày') {
              setActiveCategory('giay');
              setMobileFittingTab('items');
            } else if (part === 'Khuôn mặt' || part === 'Bàn tay') {
              setActiveCategory('khuonmat');
              setMobileFittingTab('items');
            }
          }}
        />
      </div>

      {/* Ghi chú */}
      <div className="shrink-0 text-center text-[10px] text-stone-500 italic pt-0.5 truncate">
        💡 Chạm trực tiếp vào áo, quần, mũ, phụ kiện, hài để chọn món hoặc đổi màu.
      </div>
    </div>
  );

  // 6. CỘT / KHUNG BẢNG MÀU CỔ PHONG
  const renderColorSection = (isMobile: boolean) => (
    <div className="w-full h-full flex flex-col gap-2 min-h-0 transition-all duration-300 ease-in-out">
      {/* Hàng Tabs Màu: Màu Áo | Màu Quần | Màu Mũ */}
      <div className="shrink-0 flex items-center gap-1 p-1 bg-[#F4EFE2] rounded-xl shadow-xs transition-all duration-300 ease-in-out">
        {[
          { id: 'ao' as ColorTab, label: 'Màu Áo' },
          { id: 'quan' as ColorTab, label: 'Màu Quần' },
          { id: 'mu' as ColorTab, label: 'Màu Mũ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveColorTab(tab.id);
              playSoundEffect('click');
            }}
            className={`flex-1 py-1.5 px-1.5 text-xs font-bold rounded-lg transition-all duration-200 text-center whitespace-nowrap cursor-pointer ${
              activeColorTab === tab.id
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-700 hover:bg-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ô Hiển Thị Màu Đang Mặc */}
      <div className="shrink-0 bg-white rounded-xl p-2.5 shadow-xs flex items-center gap-2.5 transition-all duration-300 ease-in-out">
        <span
          className="w-8 h-8 rounded-lg border border-black/10 shadow-2xs shrink-0"
          style={{ backgroundColor: getCurrentActiveColor() }}
        />
        <div className="min-w-0">
          <h4 className="font-bold text-xs text-stone-900 leading-tight truncate">
            {getCurrentActiveColorLabel()}
          </h4>
        </div>
      </div>

      {/* Thông báo nếu nón đang đội là bản chuẩn 1 màu */}
      {activeColorTab === 'mu' && (hatId === 'non-la' || hatId === 'non-quai-thao') && (
        <div className="shrink-0 bg-amber-50 p-2 rounded-xl text-[10px] text-amber-900 leading-snug flex items-start gap-1.5 shadow-2xs transition-all duration-300 ease-in-out">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <b>Bản chuẩn 1 màu:</b> {hatId === 'non-la' ? 'Nón Lá Nam Bộ' : 'Nón Quai Thao'} giữ màu nan tre.
          </div>
        </div>
      )}

      {/* Danh Sách Bảng Màu Cổ Phong Cuộn Dọc */}
      <div className="bg-white rounded-xl p-2 shadow-xs flex-1 min-h-0 flex flex-col transition-all duration-300 ease-in-out">
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1 transition-all duration-300 ease-in-out">
          {TRADITIONAL_PALETTES.map((colorItem) => {
            const isSelected =
              getCurrentActiveColor().toLowerCase() === colorItem.hex.toLowerCase();
            return (
              <button
                key={colorItem.id}
                onClick={() => handleSelectColor(colorItem.hex)}
                className={`w-full p-2 rounded-xl text-left flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-red-50/80 ring-1 ring-[#8B1528]/30 shadow-xs'
                    : 'bg-stone-50/60 hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-6 h-6 rounded-md border border-black/10 shrink-0 shadow-2xs"
                    style={{ backgroundColor: colorItem.hex }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-stone-900 truncate">
                        {colorItem.name}
                      </span>
                    </div>
                    <span className="text-[9px] text-stone-500 italic block truncate">
                      {colorItem.sub}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-[#8B1528] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-[#FAF7EE] text-stone-900 flex flex-col font-sans select-none">
      {/* ============================================================== */}
      {/* 1. THANH ĐIỀU HƯỚNG TRÊN CÙNG (LIỀN MẠCH, BỎ VIỀN THÔ CỨNG)     */}
      {/* ============================================================== */}
      <header className="shrink-0 w-full bg-white/95 backdrop-blur-md px-3 sm:px-5 lg:px-6 py-2.5 flex items-center justify-between shadow-xs relative z-30">
        {/* LOGO & THƯƠNG HIỆU VIETSSTYL */}
        <div
          onClick={() => {
            setActiveNavTab('trang-chu');
            playSoundEffect('click');
          }}
          className="cursor-pointer"
        >
          <VietSStylLogo size={36} showText={true} />
        </div>

        {/* CÁC NÚT ĐIỀU HƯỚNG TRUNG TÂM */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {/* Tab 0: Trang Chủ Tối Giản */}
          <button
            onClick={() => {
              setActiveNavTab('trang-chu');
              playSoundEffect('click');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeNavTab === 'trang-chu'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#8B1528] hover:bg-stone-100/80'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Trang Chủ</span>
          </button>

          {/* Tab 1: Khám Phá */}
          <button
            onClick={() => {
              setActiveNavTab('kham-pha');
              playSoundEffect('click');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeNavTab === 'kham-pha'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#8B1528] hover:bg-stone-100/80'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Khám Phá</span>
          </button>

          {/* Tab 2: Bản Đồ */}
          <button
            onClick={() => {
              setActiveNavTab('ban-do');
              playSoundEffect('click');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeNavTab === 'ban-do'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#8B1528] hover:bg-stone-100/80'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Bản Đồ</span>
          </button>

          {/* Tab 3: Thử Đồ */}
          <button
            onClick={() => {
              setActiveNavTab('phong-thu-do');
              playSoundEffect('click');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeNavTab === 'phong-thu-do'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#8B1528] hover:bg-stone-100/80'
            }`}
          >
            <Shirt className="w-3.5 h-3.5 text-amber-500" />
            <span>Thử Đồ</span>
          </button>

          {/* Tab 3.5: Phối Team (Mới) */}
          <button
            onClick={() => {
              setActiveNavTab('phoi-team');
              playSoundEffect('click');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeNavTab === 'phoi-team'
                ? 'bg-[#8B1528] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#8B1528] hover:bg-stone-100/80'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>Phối Team</span>
            <span className="bg-[#FAF2DE] text-[#8B1528] font-bold text-[8px] px-1.5 py-0.2 rounded-full shadow-2xs">
              Mới
            </span>
          </button>

          {/* Tab 4: Tủ Đồ */}
          <button
            onClick={() => {
              setShowWardrobeModal(true);
              playSoundEffect('click');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-[#8B1528] hover:bg-stone-100/80 transition-all duration-200 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-700" />
            <span>Tủ Đồ</span>
            {savedOutfits.length > 0 && (
              <span className="bg-[#8B1528] text-white font-bold text-[8px] min-w-3.5 h-3.5 px-1 rounded-full flex items-center justify-center shadow-2xs">
                {savedOutfits.length}
              </span>
            )}
          </button>
        </nav>

        {/* NÚT TIỆN ÍCH PHẢI (DESKTOP & MOBILE) */}
        <div className="flex items-center gap-1.5">
          {/* Phím tắt Gợi Ý AI trên mobile */}
          <button
            onClick={handleOpenAiSuggest}
            className="lg:hidden p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-stone-800 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
            title="Gợi ý phối đồ AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-400/30" />
            <span className="text-[11px] font-bold hidden sm:inline">Gợi Ý AI</span>
          </button>

          {/* Nút đăng nhập / thông tin tài khoản Google */}
          {currentUser ? (
            <button
              onClick={() => {
                setAuthPromptReason('general');
                setShowAuthModal(true);
                playSoundEffect('click');
              }}
              className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold shadow-2xs border border-stone-200 transition-all cursor-pointer"
              title={currentUser.email || 'Tài khoản Google'}
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Avatar'}
                  className="w-5 h-5 rounded-full object-cover border border-[#8B1528]"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#8B1528] text-white flex items-center justify-center text-[9px] font-bold">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>
              )}
              <span className="max-w-[70px] sm:max-w-[100px] truncate text-[11px] font-medium hidden sm:inline">
                {currentUser.displayName || currentUser.email}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Đã kết nối Firestore" />
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthPromptReason('general');
                setShowAuthModal(true);
                playSoundEffect('click');
              }}
              className="flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-full bg-[#801424] hover:bg-[#96182c] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer border border-amber-400/30"
              title="Đăng nhập tài khoản VietSStyl"
            >
              <VietSStylLogo size={20} showText={false} />
              <span className="hidden sm:inline">Đăng Nhập</span>
            </button>
          )}

          {/* Nút ngôn ngữ VI */}
          <button
            onClick={() => playSoundEffect('click')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100/80 hover:bg-stone-200/80 text-stone-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Globe className="w-3 h-3 text-stone-500" />
            <span>VI</span>
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. NỘI DUNG CHÍNH: TRANG CHỦ, KHÁM PHÁ VĂN HÓA HOẶC PHÒNG THỬ ĐỒ */}
      {/* ============================================================== */}

      {/* CHẾ ĐỘ 0: TRANG CHỦ TỐI GIẢN (CHỦ YẾU LÀ HÌNH ẢNH) */}
      {activeNavTab === 'trang-chu' && (
        <main className="flex-1 min-h-0 w-full overflow-hidden transition-all duration-300 ease-in-out">
          <HomePageView
            currentUser={currentUser}
            savedOutfitsCount={savedOutfits.length}
            onNavigateTo={(tab) => {
              setActiveNavTab(tab);
              playSoundEffect('click');
            }}
            onSelectAndTryOutfit={(newOutfitId) => {
              handleSelectOutfit(newOutfitId);
              setActiveNavTab('phong-thu-do');
              playSoundEffect('card');
            }}
            onOpenWardrobe={() => {
              setShowWardrobeModal(true);
              playSoundEffect('card');
            }}
            onSignInWithGoogle={handleSignInWithGoogle}
            onSignOut={handleSignOut}
          />
        </main>
      )}

      {/* CHẾ ĐỘ 1: KHÁM PHÁ VĂN HÓA (BĂNG CHUYỀN THẺ DI SẢN 2D NHƯ HÌNH MẪU YÊU CẦU) */}
      {activeNavTab === 'kham-pha' && (
        <main className="flex-1 min-h-0 w-full max-w-[1540px] mx-auto p-2 sm:p-2.5 lg:p-3 overflow-hidden transition-all duration-300 ease-in-out">
          <CostumeExploreCarousel
            costumes={filteredCostumes}
            currentOutfitId={outfitId}
            onSelectOutfit={(newId) => {
              handleSelectOutfit(newId);
              playSoundEffect('card');
            }}
            onNavigateToFittingRoom={() => {
              setActiveNavTab('phong-thu-do');
              playSoundEffect('click');
            }}
            onNavigateToMap={() => {
              setActiveNavTab('ban-do');
              playSoundEffect('click');
            }}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
          />
        </main>
      )}

      {/* CHẾ ĐỘ 1.5: BẢN ĐỒ KHÁM PHÁ NGUỒN GỐC & ĐỊA ĐIỂM CỔ PHỤC VIỆT NAM (THEO YÊU CẦU MỚI) */}
      {activeNavTab === 'ban-do' && (
        <main className="flex-1 min-h-0 w-full max-w-[1540px] mx-auto p-2 sm:p-3 overflow-hidden transition-all duration-300 ease-in-out">
          <VietnamCostumeMap
            onSelectCostume={(costumeId) => {
              handleSelectOutfit(costumeId);
              setActiveNavTab('phong-thu-do');
              playSoundEffect('card');
            }}
          />
        </main>
      )}

      {/* CHẾ ĐỘ 2: PHÒNG THỬ ĐỒ (ĐỒNG BỘ CẢ DESKTOP 3 CỘT LẪN MOBILE 2 TẦNG CHUYỂN TAB) */}
      {activeNavTab === 'phong-thu-do' && (
        <main className="flex-1 min-h-0 w-full max-w-[1540px] mx-auto p-2 sm:p-2.5 lg:p-3 overflow-hidden transition-all duration-300 ease-in-out">
          {/* ======================================================== */}
          {/* A. BẢN DESKTOP (LG TRỞ LÊN): BỐ CỤC 3 CỘT ĐỘC LẬP CHUẨN MỰC */}
          {/* ======================================================== */}
          <div className="hidden lg:flex w-full h-full gap-2.5 xl:gap-3 min-h-0 overflow-hidden">
            {/* CỘT TRÁI (LEFT COLUMN): CÁC THẺ ÁO 2D & LINH KIỆN CỔ PHONG */}
            <section className="w-[340px] xl:w-[370px] shrink-0 flex flex-col gap-2 min-h-0 h-full transition-all duration-300 ease-in-out">
              {renderCategoryNav()}
              {renderItemsGrid()}
              <div className="shrink-0 bg-white p-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all duration-300 ease-in-out">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <p className="text-[10px] text-stone-700 leading-snug">
                  Mỗi trang phục đều tra cứu chuẩn theo điển lệ Khâm định Đại Nam và khảo cứu cổ phong Việt Nam.
                </p>
              </div>
            </section>

            {/* CỘT GIỮA (CENTER COLUMN): NGƯỜI MẪU PAVILION STAGE */}
            <section className="flex-1 flex flex-col gap-2 min-w-0 min-h-0 h-full transition-all duration-300 ease-in-out">
              {renderPresetsBar(false)}
              {renderActionButtons(false)}
              {renderDollStage(false)}
            </section>

            {/* CỘT PHẢI (RIGHT COLUMN): BẢNG MÀU & ĐỔI MÀU */}
            <section className="w-[270px] xl:w-[290px] shrink-0 flex flex-col gap-2 min-h-0 h-full transition-all duration-300 ease-in-out">
              {renderColorSection(false)}
            </section>
          </div>

          {/* ======================================================== */}
          {/* B. BẢN MOBILE (< LG): BỐ CỤC 2 TẦNG (SÂN KHẤU TRÊN, ĐIỀU KHIỂN DƯỚI) */}
          {/* ======================================================== */}
          <div className="lg:hidden flex flex-col w-full h-full gap-2 min-h-0 overflow-hidden">
            {/* TẦNG TRÊN: SÂN KHẤU BÚP BÊ NGƯỜI MẪU + CÁC THAO TÁC HÀNH ĐỘNG */}
            <div className="shrink-0 h-[38vh] min-h-[250px] max-h-[320px] flex flex-col gap-1.5">
              <div className="flex-1 min-h-0">
                {renderDollStage(true)}
              </div>
              {renderActionButtons(true)}
            </div>

            {/* TẦNG DƯỚI: HỘP ĐIỀU KHIỂN CHUYỂN TAB (PHỤC SỨC / ĐỔI MÀU / MẪU CHUẨN) */}
            <div className="flex-1 min-h-0 bg-white rounded-2xl p-2 shadow-xs flex flex-col gap-1.5 overflow-hidden transition-all duration-300 ease-in-out">
              {/* THANH CHUYỂN TAB MOBILE */}
              <div className="shrink-0 flex items-center bg-[#F4EFE2] p-0.5 rounded-xl text-xs font-bold gap-1 shadow-2xs">
                <button
                  onClick={() => {
                    setMobileFittingTab('items');
                    playSoundEffect('click');
                  }}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    mobileFittingTab === 'items'
                      ? 'bg-[#8B1528] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <Shirt className="w-3.5 h-3.5" />
                  <span>Phục Sức</span>
                </button>
                <button
                  onClick={() => {
                    setMobileFittingTab('colors');
                    playSoundEffect('click');
                  }}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    mobileFittingTab === 'colors'
                      ? 'bg-[#8B1528] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bảng Màu</span>
                </button>
                <button
                  onClick={() => {
                    setMobileFittingTab('presets');
                    playSoundEffect('click');
                  }}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    mobileFittingTab === 'presets'
                      ? 'bg-[#8B1528] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-white/60'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mẫu Chuẩn</span>
                </button>
              </div>

              {/* NỘI DUNG TƯƠNG ỨNG VỚI TAB TRÊN MOBILE */}
              {mobileFittingTab === 'items' && (
                <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
                  {renderCategoryNav()}
                  {renderItemsGrid()}
                </div>
              )}
              {mobileFittingTab === 'colors' && (
                <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">
                  {renderColorSection(true)}
                </div>
              )}
              {mobileFittingTab === 'presets' && (
                <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto pr-0.5">
                  {renderPresetsBar(true)}
                  <div className="bg-[#FAF7EE] p-2.5 rounded-xl flex items-start gap-2 text-stone-700 text-xs shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      Mỗi mẫu phối sẵn được đối chiếu theo điển lệ Khâm định Đại Nam và khảo cứu cổ phong Việt Nam.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* CHẾ ĐỘ 3: PHỐI TEAM (HÒA SẮC ĐỒNG PHỤC NHÓM & AI CHẤM ĐIỂM) */}
      {activeNavTab === 'phoi-team' && (
        <main className="flex-1 min-h-0 w-full overflow-hidden transition-all duration-300 ease-in-out">
          <TeamCoordinationView
            savedOutfits={savedOutfits}
            playSound={playSoundEffect}
          />
        </main>
      )}

      {/* ============================================================== */}
      {/* CÁC MODAL HỖ TRỢ (TỦ ĐỒ THẺ BÀI, CHẤM ĐIỂM AI, EVENT, GALLERY)  */}
      {/* ============================================================== */}

      {/* TOAST THÔNG BÁO TƯƠNG TÁC */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#8B1528] text-white px-4 py-2 rounded-xl border-2 border-[#D4AF37] shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-amber-300 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL LƯU BỘ PHỐI VÀO KHO TỦ ĐỒ (DẠNG THẺ BÀI) */}
      <SaveOutfitModal
        isOpen={showSaveOutfitModal}
        onClose={() => setShowSaveOutfitModal(false)}
        outfitConfig={currentOutfitConfig}
        onConfirmSave={handleConfirmSaveOutfit}
        onOpenWardrobe={() => setShowWardrobeModal(true)}
      />

      {/* MODAL AI ĐÁNH GIÁ & CHẤM ĐIỂM BỘ PHỐI (HÒA SẮC & SỰ KIỆN) */}
      <AiEvaluationModal
        isOpen={showAiEvaluationModal}
        onClose={() => setShowAiEvaluationModal(false)}
        outfitConfig={currentOutfitConfig}
        onSaveWithEvaluation={handleSaveWithAiEvaluation}
      />

      {/* MODAL KHO TỦ ĐỒ CÁ NHÂN (DẠNG THẺ BÀI - TIẾP TỤC CHỈNH SỬA) */}
      <WardrobeCardsModal
        isOpen={showWardrobeModal}
        onClose={() => setShowWardrobeModal(false)}
        savedOutfits={savedOutfits}
        onLoadAndEdit={handleLoadAndEditOutfit}
        onDeleteOutfit={handleDeleteSavedOutfit}
        onOpenSaveCurrent={handleOpenSaveOutfit}
        onTriggerAiForOutfit={(card) => {
          if (!currentUser) {
            setAuthPromptReason('ai-eval');
            setShowAuthModal(true);
            setToastMessage('Vui lòng đăng nhập Google để AI chấm điểm bộ phối.');
            setTimeout(() => setToastMessage(null), 3500);
            return;
          }
          setOutfitId(card.outfitId);
          setShirtColor(card.shirtColor);
          setPantsColor(card.pantsColor);
          if (card.bottomId) setBottomId(card.bottomId);
          setHatId(card.hatId);
          setHatColor(card.hatColor);
          setHasSilverNecklace(card.hasSilverNecklace);
          if (card.selectedAccessories) setSelectedAccessories(card.selectedAccessories);
          if (card.shoeId) setShoeId(card.shoeId);
          if (card.skinColor) setSkinColor(card.skinColor);
          if (card.hairStyle) setHairStyle(card.hairStyle);
          setCurrentEventName(card.eventName);
          setShowWardrobeModal(false);
          setShowAiEvaluationModal(true);
        }}
      />

      {/* MODAL 1: GỢI Ý CỔ PHỤC THEO SỰ KIỆN (BẬT LÊN KHI VÀO TRANG) */}
      <EventSuggestModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onApplySuggestion={handleApplySuggestion}
      />

      {/* MODAL 2: ALBUM TOÀN BỘ TRANH CỔ PHỤC MINH HỌA */}
      <CostumeGalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        onSelectOutfit={(id) => {
          handleSelectOutfit(id);
          setShowGalleryModal(false);
        }}
        currentOutfitId={outfitId}
      />

      {/* MODAL ĐĂNG NHẬP GOOGLE & HỒ SƠ LƯU TRỮ ĐÁM MÂY */}
      <UserAuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setAuthPromptReason('general');
        }}
        currentUser={currentUser}
        savedOutfitsCount={savedOutfits.length}
        promptReason={authPromptReason}
        onSignInWithGoogle={handleSignInWithGoogle}
        onSignOut={handleSignOut}
      />

      {/* MODAL 4: LỜI PHÊ ĐIỂM 10 CỦA CÔ GIÁO */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border-4 border-[#8B1528] max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-bold text-[#8B1528] uppercase tracking-wider">
                Vở Bài Tập Mỹ Thuật · Mực Đỏ Cô Giáo
              </span>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-3 border-red-500 bg-red-50 flex flex-col items-center justify-center text-red-600 font-bold shrink-0">
                <span className="text-2xl leading-none">{grade.score}</span>
                <span className="text-[9px] uppercase tracking-wider">Điểm</span>
              </div>
              <div>
                <span className="text-xs font-bold text-red-700 block mb-0.5">Lời phê của cô:</span>
                <p className="text-sm font-handwriting text-red-900 leading-snug">
                  "{grade.comment}"
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  const idx = Math.floor(Math.random() * TEACHER_REVIEWS_EXTENDED.length);
                  setGrade(TEACHER_REVIEWS_EXTENDED[idx]);
                  playSoundEffect('bell');
                }}
                className="px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-xs font-semibold hover:bg-red-200"
              >
                Xin chấm lại
              </button>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="px-4 py-1.5 bg-[#8B1528] text-white rounded-lg text-xs font-semibold"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* THANH ĐIỀU HƯỚNG ĐÁY MÀN HÌNH CHO THIẾT BỊ DI ĐỘNG (BOTTOM NAV) */}
      {/* ============================================================== */}
      <nav className="lg:hidden shrink-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 flex items-center justify-around z-40 shadow-lg">
        <button
          onClick={() => {
            setActiveNavTab('trang-chu');
            playSoundEffect('click');
          }}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeNavTab === 'trang-chu' ? 'text-[#8B1528] font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className={`w-4 h-4 ${activeNavTab === 'trang-chu' ? 'text-[#8B1528]' : 'text-stone-500'}`} />
          <span className="text-[10px] leading-none">Trang Chủ</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('kham-pha');
            playSoundEffect('click');
          }}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeNavTab === 'kham-pha' ? 'text-[#8B1528] font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Compass className={`w-4 h-4 ${activeNavTab === 'kham-pha' ? 'text-[#8B1528]' : 'text-stone-500'}`} />
          <span className="text-[10px] leading-none">Khám Phá</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('ban-do');
            playSoundEffect('click');
          }}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeNavTab === 'ban-do' ? 'text-[#8B1528] font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <MapPin className={`w-4 h-4 ${activeNavTab === 'ban-do' ? 'text-[#8B1528]' : 'text-stone-500'}`} />
          <span className="text-[10px] leading-none">Bản Đồ</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('phong-thu-do');
            playSoundEffect('click');
          }}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all relative cursor-pointer ${
            activeNavTab === 'phong-thu-do' ? 'text-[#8B1528] font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Shirt className={`w-4 h-4 ${activeNavTab === 'phong-thu-do' ? 'text-[#8B1528]' : 'text-stone-500'}`} />
          <span className="text-[10px] leading-none">Thử Đồ</span>
          <span className="absolute top-0.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
        </button>

        <button
          onClick={() => {
            setActiveNavTab('phoi-team');
            playSoundEffect('click');
          }}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all relative cursor-pointer ${
            activeNavTab === 'phoi-team' ? 'text-[#8B1528] font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className={`w-4 h-4 ${activeNavTab === 'phoi-team' ? 'text-[#8B1528]' : 'text-stone-500'}`} />
          <span className="text-[10px] leading-none">Phối Team</span>
        </button>

        <button
          onClick={() => {
            setShowWardrobeModal(true);
            playSoundEffect('card');
          }}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-stone-500 hover:text-stone-800 transition-all relative cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-amber-700" />
          <span className="text-[10px] leading-none">Tủ Đồ</span>
        </button>

        <button
          onClick={() => {
            setShowAuthModal(true);
            playSoundEffect('click');
          }}
          className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-stone-500 hover:text-stone-800 transition-all cursor-pointer"
        >
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="User"
              className="w-4 h-4 rounded-full object-cover border border-[#8B1528]"
            />
          ) : (
            <UserIcon className="w-4 h-4 text-stone-600" />
          )}
          <span className="text-[10px] leading-none">
            {currentUser ? 'Hồ Sơ' : 'Đăng Nhập'}
          </span>
        </button>
      </nav>
    </div>
  );
}
