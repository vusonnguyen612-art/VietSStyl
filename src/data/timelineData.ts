import { OutfitId } from '../types/costume';

export interface TimelineMilestone {
  id: string;
  costumeId: OutfitId;
  costumeName: string;
  costumeNameEn: string;
  yearDisplay: string;
  yearDisplayEn: string;
  periodName: string;
  periodNameEn: string;
  dynasty: string;
  dynastyEn: string;
  orderYear: number;
  badge: string;
  badgeEn: string;
  shortHighlight: string;
  shortHighlightEn: string;
  historicalContext: string;
  historicalContextEn: string;
  evolutionSummary: string;
  evolutionSummaryEn: string;
  accentColor: string; // Solid accent color
}

export const COSTUME_TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'timeline-giao-linh',
    costumeId: 'ao-giao-linh',
    costumeName: 'Áo Giao Lĩnh Cổ Phong',
    costumeNameEn: 'Giao Linh Cross-Collar Robe',
    yearDisplay: 'TK XI - XV',
    yearDisplayEn: '11th - 15th Century',
    periodName: 'Thời Lý - Trần - Lê Sơ',
    periodNameEn: 'Ly - Tran - Early Le Dynasties',
    dynasty: 'Đại Việt Hoàng Triều',
    dynastyEn: 'Dai Viet Imperial Period',
    orderYear: 1010,
    badge: 'Cội Nguồn',
    badgeEn: 'Genesis',
    shortHighlight: 'Cổ áo vạt chéo giao lề, tay thụng buông dài, đai lụa thắt ngang lưng.',
    shortHighlightEn: 'Diagonal overlapping collar, wide flowing sleeves, silk belt wrapped at waist.',
    historicalContext:
      'Giao lĩnh là một trong những dạng thức y phục cổ xưa nhất của nền văn minh Đại Việt, phổ biến trong cả cung đình lẫn tầng lớp quý tộc thời Lý - Trần - Hậu Lê.',
    historicalContextEn:
      'Giao Linh is among the oldest garment styles of Dai Viet civilization, prevalent among royalty and aristocracy through the Ly, Tran, and Later Le dynasties.',
    evolutionSummary:
      'Đặt nền móng cho kiểu dáng vạt áo rộng và sự kết hợp giữa áo khoác ngoài và yếm lót bên trong của trang phục người Việt.',
    evolutionSummaryEn:
      'Established the foundation for wide overlapping robes and inner layering in Vietnamese sartorial tradition.',
    accentColor: '#059669', // Jade green
  },
  {
    id: 'timeline-tu-than',
    costumeId: 'ao-tu-than',
    costumeName: 'Áo Tứ Thân Kinh Bắc',
    costumeNameEn: 'Four-Panel Tunic (Ao Tu Than)',
    yearDisplay: 'TK XII - Đầu TK XX',
    yearDisplayEn: '12th - Early 20th Century',
    periodName: 'Đồng Bằng Bắc Bộ',
    periodNameEn: 'Red River Delta Folk Culture',
    dynasty: 'Dân Gian Ngàn Năm',
    dynastyEn: 'Centuries of Folk Heritage',
    orderYear: 1150,
    badge: 'Dân Gian',
    badgeEn: 'Folk Heritage',
    shortHighlight: 'Bốn vạt rủ mềm, yếm thắm bên trong, dải thắt lưng vàng và nón quai thao.',
    shortHighlightEn: 'Four draped panels, scarlet halter neck, yellow sash, and wide flat palm hat.',
    historicalContext:
      'Gắn liền với hội Lim, sông Cầu và các làn điệu Quan họ mượt mà. 4 vạt áo tượng trưng cho tứ thân phụ mẫu, 2 vạt trước buộc nút gắn kết tình phu thê.',
    historicalContextEn:
      'Inseparable from the Lim Festival, Cau River, and Quan Ho folk ballads. The four panels symbolize both sets of parents; the two front tied panels symbolize marital fidelity.',
    evolutionSummary:
      'Trở thành biểu tượng của vẻ đẹp dịu dàng, cần cù của người phụ nữ nông thôn miền Bắc qua nhiều thế kỷ.',
    evolutionSummaryEn:
      'Endured as the quintessential emblem of gentleness and industriousness of Northern rural women for centuries.',
    accentColor: '#9A3412', // Amber brick
  },
  {
    id: 'timeline-ngu-than',
    costumeId: 'ao-ngu-than',
    costumeName: 'Áo Ngũ Thân Tay Chẽn',
    costumeNameEn: 'Five-Panel Tailored Tunic (Ao Ngu Than)',
    yearDisplay: 'Năm 1744 & 1827',
    yearDisplayEn: '1744 & 1827',
    periodName: 'Cải Cách Đàng Trong',
    periodNameEn: 'Dang Trong Sartorial Reform',
    dynasty: 'Chúa Nguyễn & Vua Minh Mạng',
    dynastyEn: 'Lord Nguyen Phuc Khoat & Emperor Minh Mang',
    orderYear: 1744,
    badge: 'Định Chế',
    badgeEn: 'Statutory Standard',
    shortHighlight: 'Cổ đứng lập lĩnh tròn kín đáo, 5 vạt may ghép, 5 cúc khuy ngọc đơm sườn phải.',
    shortHighlightEn: 'Mandarin stand-up collar, 5 tailored panels, 5 jewel buttons along right flank.',
    historicalContext:
      'Năm 1744, Vũ Vương Nguyễn Phúc Khoát ban sắc lệnh cải cách y phục Đàng Trong. Đến năm 1827, vua Minh Mạng chuẩn hóa khắp cả nước. 5 cúc khuy tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín).',
    historicalContextEn:
      'In 1744, Lord Nguyen Phuc Khoat decreed clothing reform in southern Dang Trong. In 1827, Emperor Minh Mang made it standard nationwide. The 5 buttons embody the Five Virtues (Benevolence, Propriety, Righteousness, Wisdom, Integrity).',
    evolutionSummary:
      'Là tiền thân cốt lõi và trực tiếp nhất tạo nên tà áo dài truyền thống của người Việt.',
    evolutionSummaryEn:
      'The direct and fundamental precursor to the modern Vietnamese national Ao Dai.',
    accentColor: '#78350F', // Ochre timber
  },
  {
    id: 'timeline-nhat-binh',
    costumeId: 'ao-nhat-binh',
    costumeName: 'Áo Nhật Bình Hoàng Tộc',
    costumeNameEn: 'Nhat Binh Imperial Robe',
    yearDisplay: '1802 - 1945',
    yearDisplayEn: '1802 - 1945',
    periodName: 'Triều Nguyễn Cung Đình',
    periodNameEn: 'Nguyen Dynasty Imperial Court',
    dynasty: 'Hoàng Triều Nhà Nguyễn',
    dynastyEn: 'Nguyen Imperial House',
    orderYear: 1802,
    badge: 'Hoàng Tộc',
    badgeEn: 'Imperial Court',
    shortHighlight: 'Cổ bình lĩnh hình chữ nhật thêu ngũ sắc, cửa tay dải ngũ hành rực rỡ.',
    shortHighlightEn: 'Rectangular embroidered collar plate, magnificent five-element cuff stripes.',
    historicalContext:
      'Thường phục triều nghi tôn quý của Hoàng hậu, Công chúa và các bậc mệnh phụ quý tộc thời nhà Nguyễn tại kinh đô Huế.',
    historicalContextEn:
      'Ceremonial court attire for the Empress, Princesses, and noble consorts of the Nguyen Dynasty in Hue.',
    evolutionSummary:
      'Đỉnh cao của nghệ thuật thêu cung đình và biểu trưng của phẩm vị quý tộc hoàng cung Việt Nam.',
    evolutionSummaryEn:
      'The zenith of imperial embroidery craft and royal status designation in Vietnamese royal heritage.',
    accentColor: '#E11048', // Imperial crimson
  },
  {
    id: 'timeline-tac',
    costumeId: 'ao-tac',
    costumeName: 'Áo Tấc (Áo Thụng Đại Lễ)',
    costumeNameEn: 'Ao Tac Ceremonial Robe',
    yearDisplay: 'Thời Nguyễn - TK XX',
    yearDisplayEn: 'Nguyen Era - 20th Century',
    periodName: 'Điển Lễ & Tế Tự Quốc Gia',
    periodNameEn: 'State & Ancestral Rituals',
    dynasty: 'Khâm Định Đại Nam',
    dynastyEn: 'Kham Dinh Dai Nam Precedents',
    orderYear: 1830,
    badge: 'Lễ Phục',
    badgeEn: 'Formal Ritual',
    shortHighlight: 'Ống tay thụng buông thõng qua gối, vạt áo dài trang nghiêm cung kính.',
    shortHighlightEn: 'Elongated wide hanging sleeves past knees, graceful solemn floor-length tunic.',
    historicalContext:
      'Lễ phục bắt buộc trong các kỳ tế lễ tổ tiên, văn miếu, đại lễ triều đình và ngày hôn lễ cổ truyền trọng đại.',
    historicalContextEn:
      'Mandatory ritual robe for ancestral rites, Temple of Literature ceremonies, court assemblies, and wedding banquets.',
    evolutionSummary:
      'Giữ trọn tính tôn nghiêm, khiêm cung và cốt cách lễ giáo của nền văn hóa Nho gia truyền thống.',
    evolutionSummaryEn:
      'Preserved the decorum, solemnity, and ethical elegance of Confucian ritual culture in Vietnam.',
    accentColor: '#B91C1C', // Dark cinnabar
  },
  {
    id: 'timeline-ba-ba',
    costumeId: 'ao-ba-ba',
    costumeName: 'Áo Bà Ba Nam Bộ',
    costumeNameEn: 'Ao Ba Ba Southern Tunic',
    yearDisplay: 'TK XIX - Nay',
    yearDisplayEn: '19th Century - Present',
    periodName: 'Miền Tây Sông Nước',
    periodNameEn: 'Mekong River Delta',
    dynasty: 'Phương Nam Khẩn Hoang',
    dynastyEn: 'Southern Settlement & Culture',
    orderYear: 1860,
    badge: 'Nam Bộ',
    badgeEn: 'Southern Charm',
    shortHighlight: 'Cổ tròn thoáng đãng, xẻ tà hai bên hông linh hoạt, đi cùng nón lá và khăn rằn.',
    shortHighlightEn: 'Open rounded collar, side slits for agility, matched with conical hat and checkered scarf.',
    historicalContext:
      'Được cách tân để phù hợp với cuộc sống chèo xuồng, mở cõi trên vùng đất phù sa sông nước Nam Bộ, thấm đượm nét hào sảng, chân chất.',
    historicalContextEn:
      'Adapted for boating and farming across the fertile Mekong delta, embodying southern hospitality and warmth.',
    evolutionSummary:
      'Hòa trộn phong cách lao động thực tế với nét duyên ngầm đằm thắm của người phụ nữ miệt vườn.',
    evolutionSummaryEn:
      'Harmonized practical labor function with the natural grace of Southern Vietnamese women.',
    accentColor: '#F87171', // Coral pink
  },
  {
    id: 'timeline-ao-dai',
    costumeId: 'ao-dai',
    costumeName: 'Áo Dài Truyền Thống',
    costumeNameEn: 'Traditional Ao Dai',
    yearDisplay: '1930 - Đương Đại',
    yearDisplayEn: '1930 - Present',
    periodName: 'Canh Tân & Hội Nhập',
    periodNameEn: 'Modernization & Global Heritage',
    dynasty: 'Thế Kỷ XX - Thời Đại Mới',
    dynastyEn: '20th Century - Contemporary Era',
    orderYear: 1930,
    badge: 'Quốc Phục',
    badgeEn: 'National Costume',
    shortHighlight: 'Hai tà áo bay bổng thướt tha, cổ cao thanh nhã, tôn vinh vóc dáng người phụ nữ.',
    shortHighlightEn: 'Two sweeping graceful flaps, poised standing collar, accentuating feminine elegance.',
    historicalContext:
      'Từ áo ngũ thân, họa sĩ Cát Tường (Lemur 1930s) và Lê Phổ đã cách tân đường nét. Thập niên 1960 thêm tay ráp-lăng (raglan) hoàn thiện hình mẫu Quốc phục Việt Nam.',
    historicalContextEn:
      'Derived from Ao Ngu Than, modern painters Cat Tuong (Lemur 1930s) and Le Pho streamlined the silhouette. In the 1960s, the Raglan sleeve finalized Vietnam’s iconic national costume.',
    evolutionSummary:
      'Được vinh danh trên bản đồ văn hóa thế giới như biểu tượng bất diệt của vẻ đẹp Việt.',
    evolutionSummaryEn:
      'Celebrated globally as the timeless silhouette and pride of Vietnamese cultural identity.',
    accentColor: '#8B1528', // Deep lacquer red
  },
];
