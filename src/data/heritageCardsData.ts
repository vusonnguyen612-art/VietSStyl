export interface CollectibleCardItem {
  id: string;
  cardNumber: string; // e.g. "NO. 01"
  name: string;
  gender: 'female' | 'male' | 'unisex';
  era: string;
  badge: string;
  description: string;
  culturalStory: string;
  image: string;
  tag?: string;
  defaultColors: {
    primary: string;
    pants: string;
    hat: string;
  };
}

export const HERITAGE_CARDS_DATA: CollectibleCardItem[] = [
  {
    id: 'ao-dai',
    cardNumber: 'NO. 01',
    name: 'Áo Dài',
    gender: 'female',
    era: 'Thế kỷ XVIII - Đương đại',
    badge: 'Quốc Phục',
    description: 'Quốc phục biểu tượng của người Việt với đường nét thanh tao, tôn vinh vóc dáng yêu kiều kín đáo.',
    culturalStory: 'Bắt nguồn từ áo ngũ thân thời chúa Nguyễn Phúc Khoát (1744), áo dài qua nhiều lần canh tân đã trở thành quốc phục di sản rạng danh thế giới.',
    image: '/src/assets/images/viet_phuc_aodai_card_1791472076112.jpg',
    defaultColors: {
      primary: '#E11048',
      pants: '#F8FAFC',
      hat: '#E11048',
    },
  },
  {
    id: 'ao-tu-than',
    cardNumber: 'NO. 02',
    name: 'Áo Tứ Thân',
    gender: 'female',
    era: 'Thế kỷ XII - Đầu thế kỷ XX',
    badge: 'Dân Gian',
    description: 'Trang phục dân gian duyên dáng của phụ nữ Kinh Bắc với 4 vạt áo rủ mềm, yếm đào và dải thắt lưng vàng nghệ.',
    culturalStory: 'Bốn vạt áo tượng trưng cho tứ thân phụ mẫu (cha mẹ mình và cha mẹ chồng), hai vạt trước buộc lại tượng trưng cho nghĩa tình vợ chồng bền chặt.',
    image: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
    tag: 'Ma-nơ-canh Áo Tứ Thân',
    defaultColors: {
      primary: '#9A3412',
      pants: '#1F2937',
      hat: '#1F2937',
    },
  },
  {
    id: 'ao-ba-ba',
    cardNumber: 'NO. 03',
    name: 'Áo Bà Ba',
    gender: 'female',
    era: 'Thế kỷ XIX - Miền Tây Nam Bộ',
    badge: 'Nam Bộ',
    description: 'Chiếc áo mộc mạc, phóng khoáng gắn liền với nét đẹp hiền hậu của người con gái sông nước phương Nam.',
    culturalStory: 'Áo có thân ngắn, chẻ tà hai bên hông tạo sự thoải mái khi bơi xuồng, lao động trên đồng nước phù sa.',
    image: '/src/assets/images/ao_ba_ba_doll_1791467911723.jpg',
    defaultColors: {
      primary: '#F87171',
      pants: '#1F2937',
      hat: '#EA8308',
    },
  },
  {
    id: 'ao-the',
    cardNumber: 'NO. 04',
    name: 'Áo The (Khăn Xếp)',
    gender: 'male',
    era: 'Thế kỷ XIX - Đầu thế kỷ XX',
    badge: 'Nho Phong',
    description: 'Trang phục truyền thống của nam giới Việt Nam, toát lên phong thái nho nhã, điềm đạm và học giả.',
    culturalStory: 'Áo the may bằng the hoặc gấm đen quý phái, mặc kèm khăn xếp đen và quần trắng, thể hiện tinh thần đĩnh đạc của bậc trượng phu.',
    image: '/src/assets/images/viet_phuc_aothe_card_1791472087678.jpg',
    defaultColors: {
      primary: '#1F2937',
      pants: '#F8FAFC',
      hat: '#1F2937',
    },
  },
  {
    id: 'ao-nhat-binh',
    cardNumber: 'NO. 05',
    name: 'Áo Nhật Bình',
    gender: 'female',
    era: 'Triều Nguyễn (1802 - 1945)',
    badge: 'Hoàng Tộc',
    description: 'Thường phục hoàng tộc của Hoàng hậu, Công chúa và Mệnh phụ triều Nguyễn với cổ bình lĩnh thêu ngũ sắc lộng lẫy.',
    culturalStory: 'Tên gọi Nhật Bình bắt nguồn từ cổ áo to bản ghép lại tạo thành hình chữ nhật trước ngực. Cửa tay phối dải ngũ sắc tượng trưng Ngũ hành tương sinh.',
    image: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
    defaultColors: {
      primary: '#E11048',
      pants: '#F8FAFC',
      hat: '#EA8308',
    },
  },
  {
    id: 'ao-tac',
    cardNumber: 'NO. 06',
    name: 'Áo Tấc (Áo Thụng)',
    gender: 'unisex',
    era: 'Thời Nguyễn & Đầu thế kỷ XX',
    badge: 'Lễ Phục',
    description: 'Lễ phục truyền thống tay thụng dài rộng, chuẩn mực điển lễ triều đình và cúng tế tổ tiên.',
    culturalStory: 'Là lễ phục trang trọng dùng trong các dịp đại lễ triều đình, cúng tế gia tiên và lễ cưới hỏi. Ống tay thụng rộng buông dài tạo vẻ uy nghiêm.',
    image: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
    defaultColors: {
      primary: '#B91C1C',
      pants: '#1F2937',
      hat: '#1F2937',
    },
  },
  {
    id: 'ao-ngu-than',
    cardNumber: 'NO. 07',
    name: 'Áo Ngũ Thân Tay Chẽn',
    gender: 'unisex',
    era: 'Chúa Nguyễn Phúc Khoát (1744)',
    badge: 'Kinh Kỳ',
    description: 'Tiền thân của áo dài hiện đại, dáng áo chữ A kín đáo với 5 hạt cúc khuy ngọc tượng trưng cho Ngũ Thường.',
    culturalStory: 'Được chúa Nguyễn Phúc Khoát định hình năm 1744. 5 thân áo tượng trưng tứ thân phụ mẫu và chính mình; 5 cúc khuy tượng trưng Nhân, Lễ, Nghĩa, Trí, Tín.',
    image: '/src/assets/images/ao_ngu_than_doll_1791469432477.jpg',
    defaultColors: {
      primary: '#78350F',
      pants: '#1F2937',
      hat: '#1F2937',
    },
  },
  {
    id: 'giao-linh',
    cardNumber: 'NO. 08',
    name: 'Giao Lĩnh Cổ Phong',
    gender: 'unisex',
    era: 'Thời Lý - Trần - Lê',
    badge: 'Cổ Kính',
    description: 'Trang phục cổ kính bậc nhất với cổ áo vạt chéo giao nhau, tay thụng bay bổng của nền văn minh Đại Việt ngàn năm.',
    culturalStory: 'Áo giao lĩnh là cổ phục lâu đời phổ biến dưới các triều đại Lý, Trần, Lê, mang vẻ đẹp phóng khoáng, cổ phong của tinh hoa phục sức phương Nam.',
    image: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
    defaultColors: {
      primary: '#059669',
      pants: '#F8FAFC',
      hat: '#1F2937',
    },
  },
];

export const TRADITIONAL_PALETTES = [
  { id: 'do-son', name: 'Đỏ Son (Chu Sa)', hex: '#E11048', sub: 'Xích Thao Hoàng Gia' },
  { id: 'vang-hoang-gia', name: 'Vàng Hoàng Gia', hex: '#EA8308', sub: 'Hoàng Kim Đế Thích' },
  { id: 'nau-dat', name: 'Nâu Đất Cổ Truyền', hex: '#78350F', sub: 'Cổ Mộc Thổ Hoàng' },
  { id: 'xanh-luc-bao', name: 'Xanh Lục Bảo', hex: '#059669', sub: 'Bích Ngọc Thủy Vũ' },
  { id: 'xanh-cham', name: 'Xanh Chàm', hex: '#1E3A8A', sub: 'Lam Thẩm Kinh Kỳ' },
  { id: 'den-tuyen', name: 'Đen Tuyền', hex: '#1F2937', sub: 'Huyền Sắc Quý Tộc' },
  { id: 'bach-ngoc', name: 'Bạch Ngọc', hex: '#F8FAFC', sub: 'Bạch Tố Khiết Trinh' },
  { id: 'tim-sen', name: 'Tím Cung Đình', hex: '#844C82', sub: 'Tử Hà Xứ Huế' },
  { id: 'hong-san-ho', name: 'Hồng San Hô', hex: '#F87171', sub: 'San Hô Đào Thắm' },
  { id: 'cam-dat', name: 'Cam Đất Phù Sa', hex: '#DF4526', sub: 'Hỏa Thổ Dân Gian' },
];
