import React, { useState } from 'react';
import {
  Shirt,
  Compass,
  MapPin,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Camera,
  Layers,
  History,
  Sparkle,
  Users,
} from 'lucide-react';
import { OutfitId } from '../types/costume';
import { VietSStylLogo } from './VietSStylLogo';

// Import hình ảnh tư liệu lịch sử THẬT 100% (Wikimedia Commons / Ảnh chụp di sản thực tế)
import heroBannerImg from '../assets/images/viet_phuc_hero_1791538159015.jpg';
import realNhatBinhImg from '../assets/images/real_history/real_ao_nhat_binh_1936.jpg';
import realNguThanImg from '../assets/images/real_history/real_ao_ngu_than_wedding_1936.jpg';
import realTuThanImg from '../assets/images/real_history/real_ao_tu_than.jpg';
import realAoDaiImg from '../assets/images/real_history/real_ao_dai.jpg';
import realBaBaImg from '../assets/images/real_history/real_ao_ba_ba_1955.jpg';

interface UserAuth {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface HomePageViewProps {
  currentUser: UserAuth | null;
  savedOutfitsCount: number;
  onNavigateTo: (tab: 'phong-thu-do' | 'kham-pha' | 'ban-do' | 'phoi-team') => void;
  onSelectAndTryOutfit: (outfitId: OutfitId) => void;
  onOpenWardrobe: () => void;
  onSignInWithGoogle: () => void;
  onSignOut: () => void;
}

interface CostumeResearchEntry {
  id: OutfitId;
  name: string;
  subTitle: string;
  era: string;
  badge: string;
  realPhoto: string;
  photoCaption: string;
  photoYear: string;
  historicalContext: string;
  structureNotes: {
    collar: string;
    body: string;
    sleeves: string;
    significance: string;
  };
  quote: string;
  highlights: string[];
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  currentUser,
  savedOutfitsCount,
  onNavigateTo,
  onSelectAndTryOutfit,
  onOpenWardrobe,
  onSignInWithGoogle,
  onSignOut,
}) => {
  // Danh sách các y phục cổ truyền với ẢNH TƯ LIỆU THẬT 100% (Không dùng AI)
  const costumeResearchList: CostumeResearchEntry[] = [
    {
      id: 'ao-nhat-binh',
      name: 'Áo Nhật Bình',
      subTitle: 'Thường phục hoàng tộc của Hoàng hậu, Công chúa và Mệnh phụ triều Nguyễn',
      era: 'Triều Nguyễn · 1802 - 1945',
      badge: 'Cung Đình Huế',
      realPhoto: realNhatBinhImg,
      photoCaption: 'Bà Vi Kim Ngọc (phu nhân GS. Nguyễn Văn Huyên) trong y phục Áo Nhật Bình truyền thống năm 1936',
      photoYear: 'Năm 1936 · Nguồn tư liệu lưu trữ Wikimedia Commons',
      historicalContext:
        'Nhật Bình là thường phục hoàng tộc cao quý của các bậc Hậu phi, Công chúa và mệnh phụ quý tộc triều đình nhà Nguyễn. Tên gọi "Nhật Bình" bắt nguồn từ chiếc cổ áo to bản ghép hai vạt tạo thành hình chữ nhật khép kín phía trước ngực. Đây là biểu tượng của phẩm vị đài các chốn cung đình, thường được mặc trong các dịp tiết lễ, khánh hỷ và nghi lễ hoàng gia trang nghiêm.',
      structureNotes: {
        collar: 'Cổ bình lĩnh to bản hình chữ nhật thêu hoa văn ngũ sắc tinh xảo viền kim tuyến.',
        body: 'Hai thân trước buông thẳng song song, xẻ tà hai bên hông, cài nút ngọc khấu trước ngực.',
        sleeves: 'Cửa tay áo may dải lụa ngũ sắc biểu trưng cho triết lý Ngũ hành tương sinh (Kim - Mộc - Thủy - Hỏa - Thổ).',
        significance: 'Thể hiện điển chế phẩm hàm nghiêm cẩn triều đình và đỉnh cao mỹ thuật thêu may cung đình Huế.',
      },
      quote: 'Cổ bình lĩnh thêu ngũ sắc hoa văn, uy nghi tôn quý muôn đời chốn kinh kỳ Cố đô.',
      highlights: ['Cổ bình lĩnh ngũ sắc', 'Dải lụa ngũ hành cửa tay', 'Khuy ngọc cài chéo', 'Phẩm vị hoàng gia'],
    },
    {
      id: 'ao-ngu-than',
      name: 'Áo Ngũ Thân',
      subTitle: 'Quốc phục truyền thống thể hiện cốt cách nho phong, trí thức Việt Nam',
      era: 'Thế kỷ XVIII - Đầu TK XX',
      badge: 'Nho Phong Trí Thức',
      realPhoto: realNguThanImg,
      photoCaption: 'GS. Nguyễn Văn Huyên mặc Áo Ngũ Thân tay chẽn truyền thống đội khăn đóng tại lễ cưới năm 1936',
      photoYear: 'Năm 1936 · Di sản gia đình GS. Nguyễn Văn Huyên',
      historicalContext:
        'Áo Ngũ Thân được Chúa Nguyễn Phúc Khoát định hình năm 1744 và vua Minh Mạng chuẩn định thành quốc phục toàn cõi Việt Nam từ năm 1837. Trang phục gắn liền với cốt cách nho phong, sự tề chỉnh, khiêm cung và chuẩn mực đạo đức của tầng lớp trí thức, sĩ phu và quan lại Việt Nam xưa qua nhiều thời kỳ.',
      structureNotes: {
        collar: 'Cổ đứng lập lĩnh cao vút, ôm khít cổ thể hiện sự đoan chính, nghiêm cẩn của người quân tử.',
        body: 'Gồm 5 thân ghép lại: 4 thân ngoài tượng trưng "tứ thân phụ mẫu" (cha mẹ mình và cha mẹ người phối ngẫu), thân thứ 5 bên trong tượng trưng cho bản thân được che chở.',
        sleeves: 'Tay chẽn gọn gàng thanh thoát (Áo ngũ thân tay chẽn) hoặc tay thụng rộng (Áo tấc trong tế tự).',
        significance: 'Hàng 5 cúc áo cài chéo sườn phải biểu trưng cho Ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín.',
      },
      quote: 'Năm thân áo gói trọn ơn sinh dưỡng, năm hạt khuy gìn giữ trọn ngũ thường.',
      highlights: ['5 thân áo tứ thân phụ mẫu', '5 hạt khuy Ngũ thường', 'Cổ đứng lập lĩnh', 'Khăn đóng nho sĩ'],
    },
    {
      id: 'ao-tu-than',
      name: 'Áo Tứ Thân',
      subTitle: 'Y phục dân gian cổ truyền thướt tha của phụ nữ vùng đồng bằng Bắc Bộ',
      era: 'Thế kỷ XII - Thế kỷ XX',
      badge: 'Kinh Bắc Dân Gian',
      realPhoto: realTuThanImg,
      photoCaption: 'Thiếu nữ Kinh Bắc trong trang phục Áo Tứ Thân truyền thống, yếm đào và nón quai thao',
      photoYear: 'Ảnh khảo cứu di sản văn hóa · Wikimedia Commons',
      historicalContext:
        'Áo Tứ Thân là một trong những biểu tượng trang phục cổ xưa nhất của người Việt, gắn liền với văn hóa lúa nước sông Hồng, các canh hát Quan họ Kinh Bắc và những ngày hội xuân truyền thống. Y phục tôn vinh vẻ đẹp mộc mạc, đoan trang, khéo léo và thảo hiền của người phụ nữ Việt Nam.',
      structureNotes: {
        collar: 'Cổ áo không có ve, khoét mở ngực để khoe chiếc yếm đào lụa thắm cổ xây bên trong.',
        body: 'Gồm 4 vạt: 2 vạt sau ghép sống lưng tượng trưng cho cha mẹ; 2 vạt trước buông tự do hoặc thắt nút nơ trước bụng tượng trưng tình nghĩa vợ chồng.',
        sleeves: 'Tay áo dài hơi thụng vừa phải, kết hợp cùng dải thắt lưng lụa vàng óng buông rủ tha thướt.',
        significance: 'Đầu đội nón quai thao (nón ba tầm) tròn vành lớn, mang lại vẻ duyên dáng dịu dàng khi trẩy hội xuân.',
      },
      quote: 'Bốn vạt thắt lưng yếm thắm, nón quai thao duyên dáng trẩy hội xuân.',
      highlights: ['4 vạt áo tình nghĩa vợ chồng', 'Yếm đào lụa thắm', 'Dải thắt lưng vàng nghệ', 'Nón quai thao ba tầm'],
    },
    {
      id: 'ao-dai',
      name: 'Áo Dài Truyền Thống',
      subTitle: 'Quốc phục biểu tượng đương đại, sự giao thoa hoàn mỹ giữa truyền thống và cách tân',
      era: 'Thế kỷ XX Đến Nay',
      badge: 'Quốc Phục Đương Đại',
      realPhoto: realAoDaiImg,
      photoCaption: 'Thiếu nữ Việt Nam thanh nhã trong tà Áo Dài truyền thống bên tháp cổ rêu phong',
      photoYear: 'Nhiếp ảnh di sản văn hóa · Wikimedia Commons',
      historicalContext:
        'Áo Dài là kết tinh của quá trình cách tân uyển chuyển từ chiếc Áo Ngũ Thân lập lĩnh cổ truyền. Qua cuộc cách tân thập niên 1930 của các danh họa Cát Tường (Le Mur) và Lê Phổ, Áo Dài trở thành quốc phục tiêu biểu của phụ nữ Việt Nam, dung hòa hài hòa giữa vẻ đẹp kín đáo truyền thống và sự thanh thoát đương đại.',
      structureNotes: {
        collar: 'Cổ đứng lập lĩnh cao ôm nhẹ phần cổ thanh tú, kín đáo mà trang nhã.',
        body: 'Thân áo ôm sát đường cong cơ thể, xẻ tà cao hai bên hông tạo thành hai tà trước sau buông thướt tha chấm gót.',
        sleeves: 'Cắt may nối vai raglan tinh tế, giúp bờ vai cử động mềm mại tự nhiên.',
        significance: 'Mặc cùng quần lụa suông trắng hoặc đen, thể hiện trọn vẹn nét đoan trang của người phụ nữ Việt.',
      },
      quote: 'Tung bay tà áo dịu dàng, gói trọn hồn thiêng sông núi qua trăm năm thời gian.',
      highlights: ['Tà áo buông chấm gót', 'Cổ đứng lập lĩnh cách tân', 'Đường xẻ tà cao duyên dáng', 'Quốc phục Việt Nam'],
    },
    {
      id: 'ao-ba-ba',
      name: 'Áo Bà Ba',
      subTitle: 'Trang phục mộc mạc, phóng khoáng gắn liền với miền Tây Nam Bộ sông nước',
      era: 'Nam Bộ · Thế kỷ XIX - Nay',
      badge: 'Sông Nước Nam Bộ',
      realPhoto: realBaBaImg,
      photoCaption: 'Ảnh tư liệu người phụ nữ Nam Bộ trong chiếc Áo Bà Ba mộc mạc năm 1955',
      photoYear: 'Năm 1955 · Tư liệu lưu trữ lịch sử Nam Bộ',
      historicalContext:
        'Gắn liền với vùng đất phù sa trù phú sông nước Cửu Long, chiếc Áo Bà Ba là hình ảnh thân thuộc của người phụ nữ phương Nam hiền hòa, chịu thương chịu khó. Chiếc áo mang đậm tính phóng khoáng, thực dụng, thích ứng hoàn hảo với điều kiện khí hậu và đời sống chèo xuồng, làm đồng của phương Nam.',
      structureNotes: {
        collar: 'Cổ tròn thanh thoát khoét nhẹ, tạo cảm giác thoáng mát, thoải mái khi làm việc.',
        body: 'Thân áo ngắn vừa vặn, xẻ tà hai bên hông tầm 15-20cm giúp cử động bước chân dễ dàng khi lên xuống xuồng ghe.',
        sleeves: 'Tay áo dài buông thẳng, có hai túi nhỏ may ốp phía trước vạt để đựng vật dụng.',
        significance: 'Phối cùng quần lụa đen, chiếc nón lá nan tre và chiếc khăn rằn caro vắt vai đặc trưng.',
      },
      quote: 'Áo bà ba mộc mạc tình quê, chiếc khăn rằn vắt vai đong đầy hào sảng đất phương Nam.',
      highlights: ['Cổ tròn thoáng mát', 'Xẻ tà hai bên hông', 'Khăn rằn caro', 'Nón lá Nam Bộ'],
    },
  ];

  // Trạng thái trang phục được chọn để xem khảo cứu chi tiết
  const [selectedCostumeId, setSelectedCostumeId] = useState<OutfitId>('ao-nhat-binh');

  // Lấy dữ liệu trang phục đang được chọn
  const activeCostume =
    costumeResearchList.find((item) => item.id === selectedCostumeId) || costumeResearchList[0];

  return (
    <div className="w-full h-full overflow-y-auto bg-[#FAF7EE] text-stone-900 pb-16 selection:bg-[#8B1528] selection:text-white">
      {/* ============================================================== */}
      {/* 1. HERO BANNER THỊ GIÁC TỐI GIẢN (VISUAL HERO)                 */}
      {/* ============================================================== */}
      <section className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Ảnh nền thị giác cung đình sắc nét */}
        <img
          src={heroBannerImg}
          alt="Việt Phục Niên Hoa - Di Sản Y Phục Truyền Thống Việt Nam"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 transition-transform duration-1000 scale-100 hover:scale-[1.02]"
        />

        {/* Lớp phủ chuyển màu dịu nhẹ (Tối giản, tao nhã) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7EE] via-black/40 to-black/60 backdrop-blur-[0.5px]" />

        {/* Nội dung chữ tinh gọn, ít thông tin */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Tiêu đề chính VietSStyl */}
          <div className="flex flex-col items-center mb-3">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Viet<span className="text-amber-400">S</span><span className="text-amber-200">Styl</span>
            </h1>
            <p className="font-serif text-xs sm:text-sm tracking-widest uppercase text-amber-200/90 font-semibold mt-1">
              Phối Đồ Cổ Phục Truyền Thống Việt Nam
            </p>
          </div>

          {/* Đoạn mô tả cô đọng */}
          <p className="text-stone-200 text-sm sm:text-base lg:text-lg max-w-2xl font-light leading-relaxed mb-6 drop-shadow-sm">
            Không gian trải nghiệm, bảo tồn và phối ngẫu y phục truyền thống Việt Nam qua đồ họa tương tác và trí tuệ nhân tạo.
          </p>

          {/* Các nút hành động chính */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigateTo('phong-thu-do')}
              className="px-6 py-3 rounded-full bg-[#8B1528] text-white hover:bg-[#721020] text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer border border-amber-400/40"
            >
              <Shirt className="w-4 h-4 text-amber-300" />
              <span>Thử Đồ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTo('phoi-team')}
              className="px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-900 text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer border border-amber-300"
            >
              <Users className="w-4 h-4 text-stone-950" />
              <span>Phối Team</span>
              <span className="bg-[#8B1528] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase shadow-2xs">
                Mới
              </span>
            </button>

            <button
              onClick={() => onNavigateTo('ban-do')}
              className="px-5 py-3 rounded-full bg-white/90 hover:bg-white text-stone-900 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-[#8B1528]" />
              <span>Bản Đồ</span>
            </button>

            <button
              onClick={() => onNavigateTo('kham-pha')}
              className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white text-sm font-semibold border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Khám Phá</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CHUYÊN MỤC KHẢO CỨU & GIỚI THIỆU CỔ PHỤC (ẢNH THẬT 100%)    */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#8B1528] text-xs font-bold tracking-wider uppercase mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Tư Liệu Lịch Sử & Ảnh Thật Khảo Cứu</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Sắc Diện Y Phục Cổ Phong
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto mt-2 leading-relaxed">
            Khảo cứu giá trị văn hóa, cấu trúc may đo và ý niệm triết lý của các trang phục tiêu biểu qua hình ảnh tư liệu lịch sử thực tế.
          </p>
          <div className="w-12 h-0.5 bg-[#8B1528] mx-auto mt-3 rounded-full" />
        </div>

        {/* Thanh chọn nhanh 5 Cổ phục tiêu biểu */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-thin">
          {costumeResearchList.map((item) => {
            const isSelected = selectedCostumeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCostumeId(item.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#8B1528] text-white shadow-md scale-102 ring-2 ring-[#8B1528]/20'
                    : 'bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200'
                }`}
              >
                <span>{item.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-300 text-stone-900' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* KHUNG TRIỂN LÃM & KHẢO CỨU CHI TIẾT (BỐ CỤC TẠP CHÍ DI SẢN) */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-md border border-stone-200/80 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* CỘT TRÁI: ẢNH TƯ LIỆU THẬT 100% CÓ KHUNG BẢO TÀNG */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden bg-stone-950 border-4 border-amber-900/10 shadow-xl group">
                <img
                  src={activeCostume.realPhoto}
                  alt={activeCostume.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-top filter contrast-105 group-hover:scale-103 transition-transform duration-700"
                />

                {/* Lớp phủ góc ảnh */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                {/* Huy hiệu xác nhận ảnh tư liệu thật */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/30 flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Ảnh Tư Liệu Thật · Không Qua AI</span>
                </div>

                {/* Nhãn thời kỳ trên ảnh */}
                <div className="absolute top-3 right-3 bg-[#8B1528]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  {activeCostume.era}
                </div>

                {/* Chú thích nguồn ảnh phía dưới */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 text-white">
                  <p className="text-xs font-semibold leading-snug drop-shadow-md text-stone-100">
                    {activeCostume.photoCaption}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-amber-300 font-medium">
                    <History className="w-3 h-3" />
                    <span>{activeCostume.photoYear}</span>
                  </div>
                </div>
              </div>

              {/* Lời trích dẫn văn hóa cổ phong */}
              <div className="mt-4 p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs italic text-amber-950 font-serif leading-relaxed flex items-start gap-2.5">
                <span className="text-xl text-[#8B1528] font-serif select-none leading-none">“</span>
                <span className="flex-1">{activeCostume.quote}</span>
              </div>
            </div>

            {/* CỘT PHẢI: BÀI VIẾT KHẢO CỨU, CẤU TRÚC VÀ GIÁ TRỊ VĂN HÓA */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-5">
              <div>
                {/* Header phần khảo cứu */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8B1528] text-white text-[10px] font-bold uppercase tracking-wider">
                    {activeCostume.badge}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Niên đại: {activeCostume.era}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                  {activeCostume.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#8B1528] font-semibold mt-1">
                  {activeCostume.subTitle}
                </p>

                {/* Đoạn giới thiệu lịch sử chi tiết */}
                <div className="mt-4 pt-3 border-t border-stone-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#8B1528]" />
                    <span>Nguồn Gốc Lịch Sử & Vị Thế Văn Hóa</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
                    {activeCostume.historicalContext}
                  </p>
                </div>

                {/* Bảng phân tích 4 đặc trưng cấu trúc y phục */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-[#8B1528]" />
                    <span>Chi Tiết Cấu Trúc & Điển Chế May Đo</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-bold text-[#8B1528] uppercase block mb-0.5">
                        1. Kiểu Dáng Cổ Áo
                      </span>
                      <p className="text-xs text-stone-700 leading-snug">
                        {activeCostume.structureNotes.collar}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-bold text-[#8B1528] uppercase block mb-0.5">
                        2. Thân Áo & Vạt Áo
                      </span>
                      <p className="text-xs text-stone-700 leading-snug">
                        {activeCostume.structureNotes.body}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-bold text-[#8B1528] uppercase block mb-0.5">
                        3. Cánh Tay & Viền Áo
                      </span>
                      <p className="text-xs text-stone-700 leading-snug">
                        {activeCostume.structureNotes.sleeves}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-bold text-[#8B1528] uppercase block mb-0.5">
                        4. Ý Niệm Triết Lý
                      </span>
                      <p className="text-xs text-stone-700 leading-snug">
                        {activeCostume.structureNotes.significance}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Các từ khóa điểm nhấn */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {activeCostume.highlights.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200/60"
                    >
                      ✦ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nút hành động trải nghiệm thử đồ */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectAndTryOutfit(activeCostume.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#8B1528] text-white hover:bg-[#721020] text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Shirt className="w-3.5 h-3.5 text-amber-300" />
                  <span>Trải Nghiệm Thử Mẫu {activeCostume.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigateTo('ban-do')}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-stone-200"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#8B1528]" />
                  <span>Xem Phân Bố Trên Bản Đồ</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BĂNG KHẢO CỨU ĐỐI SOÁT 5 CỔ PHỤC (DANH SÁCH NHANH CÓ ẢNH THẬT) */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Khám Phá Toàn Diện 5 Y Phục Tiêu Biểu
            </span>
            <span className="text-[11px] text-stone-500 italic">
              Nhấp vào hình ảnh để xem khảo cứu chi tiết
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {costumeResearchList.map((item) => {
              const isSelected = selectedCostumeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCostumeId(item.id)}
                  className={`group p-2.5 rounded-2xl bg-white transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#8B1528] ring-2 ring-[#8B1528]/20 shadow-md -translate-y-1'
                      : 'border-stone-200/80 hover:border-[#8B1528]/40 hover:shadow-sm'
                  }`}
                >
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-900 mb-2">
                    <img
                      src={item.realPhoto}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                      {item.badge}
                    </div>
                  </div>

                  <div>
                    <h5
                      className={`text-xs font-bold truncate ${
                        isSelected ? 'text-[#8B1528]' : 'text-stone-900 group-hover:text-[#8B1528]'
                      }`}
                    >
                      {item.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 truncate mt-0.5">
                      {item.era}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. 3 ĐIỂM CHẠM TRẢI NGHIỆM CỐT LÕI (MINIMALIST TRIAD)           */}
      {/* ============================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tính năng 1 */}
          <div
            onClick={() => onNavigateTo('phong-thu-do')}
            className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-[#8B1528] text-[#8B1528] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
              <Shirt className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
              Phòng Thử Đồ 2D
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Tùy biến phối màu ngũ hành, áo, quần, nón lá, khăn vấn và hài thêu theo ý niệm cá nhân.
            </p>
          </div>

          {/* Tính năng 2 */}
          <div
            onClick={() => onNavigateTo('phong-thu-do')}
            className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-500 text-amber-700 group-hover:text-stone-900 flex items-center justify-center mb-4 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
              Trí Tuệ Nhân Tạo AI
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Thẩm định mức độ hài hòa sắc phục, điển lệ cung đình và gợi ý phối đồ theo sự kiện.
            </p>
          </div>

          {/* Tính năng 3 */}
          <div
            onClick={currentUser ? onOpenWardrobe : onSignInWithGoogle}
            className="p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-[#8B1528] text-[#8B1528] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
              <Bookmark className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
              Lưu Trữ Đám Mây
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Đăng nhập Google email đồng bộ thẻ bài tủ đồ cá nhân an toàn trên mọi thiết bị.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. KHỐI ĐỒNG BỘ TÀI KHOẢN GOOGLE TỐI GIẢN                        */}
      {/* ============================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#8B1528] to-[#600C1B] text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Họa tiết trang trí nền tinh tế */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-20 top-2 w-28 h-28 rounded-full bg-amber-400/10 pointer-events-none" />

          <div className="flex-1 text-center sm:text-left z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
              LƯU TRỮ VÀ ĐỒNG BỘ
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
              Lưu Giữ Bộ Sưu Tập Cổ Phục Của Bạn
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm max-w-lg leading-relaxed">
              {currentUser ? (
                <span>
                  Bạn đang đăng nhập với <strong>{currentUser.email}</strong>. Hiện đã lưu{' '}
                  <span className="text-amber-300 font-bold">{savedOutfitsCount}</span> thẻ bài trong tủ đồ đám mây.
                </span>
              ) : (
                'Đăng nhập với Google Email để lưu lại các mẫu phối yêu thích và xem lại bất kỳ lúc nào trên máy tính hay điện thoại.'
              )}
            </p>
          </div>

          <div className="z-10 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenWardrobe}
                  className="px-5 py-2.5 rounded-full bg-amber-400 text-stone-900 font-bold text-xs hover:bg-amber-300 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Mở Tủ Đồ ({savedOutfitsCount})</span>
                </button>
                <button
                  onClick={onSignOut}
                  className="px-3 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all cursor-pointer"
                >
                  Đăng Xuất
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInWithGoogle}
                className="px-6 py-3 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                {/* Logo Google SVG */}
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
                <span>Đăng Nhập Với Google</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. CHÂN TRANG TỐI GIẢN (MINIMAL FOOTER)                        */}
      {/* ============================================================== */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 text-center mt-16 pt-8 border-t border-stone-200/60 flex flex-col items-center">
        <VietSStylLogo size={32} showText={true} />
        <p className="text-[11px] text-stone-500 max-w-md mx-auto leading-relaxed mt-2">
          VietSStyl · Không gian số hóa và tương tác phối đồ di sản y phục truyền thống Việt Nam.
        </p>
      </footer>
    </div>
  );
};
