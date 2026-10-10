// Dữ liệu nguồn gốc lịch sử & địa danh đặc trưng gắn liền với các loại Cổ phục Việt Nam
// Tổng hợp từ nghiên cứu lịch sử trang phục, Đại Việt Sử Ký Toàn Thư, Khâm định Đại Nam Hội điển Sự lệ, và tư liệu văn hóa dân gian.

export interface RegionalOriginLocation {
  id: string;
  name: string; // Tên địa điểm / Tỉnh thành
  province: string;
  region: 'Bắc Bộ' | 'Trung Bộ' | 'Nam Bộ';
  coordinates: { x: number; y: number }; // Tọa độ tương đối trên bản đồ SVG Việt Nam chuẩn (viewBox 0 0 500 900)
  description: string;
  historicalContext: string;
  prominentCostumes: {
    costumeId: string;
    costumeName: string;
    era: string;
    role: string; // Vai trò: Cung đình, Lễ hội, Đời sống thường nhật, Văn sĩ...
    historicalSignificance: string;
    badge: string;
    cardImage: string;
  }[];
}

export interface CostumeOriginResearch {
  id: string;
  costumeName: string;
  era: string;
  originSummary: string;
  primaryLocations: string[]; // Các địa danh tiêu biểu
  culturalFeature: string;
}

export const COSTUME_ORIGIN_RESEARCH: Record<string, CostumeOriginResearch> = {
  'ao-ba-ba': {
    id: 'ao-ba-ba',
    costumeName: 'Áo Bà Ba',
    era: 'Thế kỷ XIX - Nay',
    originSummary: 'Xuất phát từ trang phục của người Baba-Nyonya ở Penang và được Trương Vĩnh Ký cùng cư dân phương Nam cải tiến, hòa hợp tuyệt vời với khí hậu và lối sống sông nước miền Tây.',
    primaryLocations: ['Cần Thơ', 'Đồng Tháp - Tây Nam Bộ', 'Bến Tre', 'TP. Hồ Chí Minh (Gia Định xưa)'],
    culturalFeature: 'Áo xẻ tà hai bên hông, không có cổ hoặc cổ tròn thấp, hai túi vạt trước tiện lợi, đi cùng nón lá và khăn rằn mộc mạc.',
  },
  'ao-dai': {
    id: 'ao-dai',
    costumeName: 'Áo Dài Truyền Thống',
    era: '1744 (Chúa Nguyễn Phúc Khoát) - Thế kỷ XX (Le Mur & Lê Phổ)',
    originSummary: 'Bắt nguồn từ cuộc cải cách y phục năm 1744 của Vũ Vương Nguyễn Phúc Khoát tại Đàng Trong, sau đó lan tỏa ra Thăng Long - Hà Nội và khắp cả nước.',
    primaryLocations: ['Thừa Thiên Huế (Phú Xuân)', 'Hà Nội (Thăng Long)', 'TP. Hồ Chí Minh'],
    culturalFeature: 'Quốc phục biểu tượng với thân áo ôm sát, hai tà bay bổng, cổ cao thanh tao, thể hiện trọn vẹn nét duyên dáng người phụ nữ Việt.',
  },
  'ao-tu-than': {
    id: 'ao-tu-than',
    costumeName: 'Áo Tứ Thân',
    era: 'Thế kỷ XII (Thời Lý) - Đầu thế kỷ XX',
    originSummary: 'Gắn liền với cái nôi văn hiến Kinh Bắc, đồng bằng châu thổ sông Hồng. Bốn vạt áo tượng trưng tứ thân phụ mẫu, yếm đào và thắt lưng vàng nghệ.',
    primaryLocations: ['Bắc Ninh (Kinh Bắc)', 'Hà Nội (Vùng ven đồng bằng Sông Hồng)', 'Phú Thọ'],
    culturalFeature: 'Thịnh hành trong các lễ hội dân gian miền Bắc như Lễ hội Lim, hội Chùa Hương, hát Dân ca Quan họ.',
  },
  'ao-nhat-binh': {
    id: 'ao-nhat-binh',
    costumeName: 'Áo Nhật Bình',
    era: 'Triều Nguyễn (1802 - 1945)',
    originSummary: 'Cải biến từ dạng áo Phi phong thời Minh, quy định thành thường triều phục tối cao của Hoàng hậu, Công chúa và Mệnh phụ triều đình Huế.',
    primaryLocations: ['Thừa Thiên Huế (Đại Nội Cố Đô)'],
    culturalFeature: 'Cổ áo ghép thành hình chữ nhật trước ngực, viền tay ngũ sắc biểu trưng cho Ngũ hành tương sinh và uy nghi hoàng gia.',
  },
  'ao-tac': {
    id: 'ao-tac',
    costumeName: 'Áo Tấc (Áo Thụng)',
    era: 'Thời Nguyễn (Thế kỷ XVIII - XX)',
    originSummary: 'Lễ phục trang trọng của giới quý tộc lẫn thứ dân thời Nguyễn trong các nghi lễ lớn, tế tự tổ tiên, hôn lễ và hội làng.',
    primaryLocations: ['Thừa Thiên Huế', 'Quảng Nam (Hội An)', 'Hà Nội'],
    culturalFeature: 'Ống tay thụng rộng buông dài đúng 1 tấc vải viền mép, toát lên phong thái trang trọng, tề chỉnh, lễ nghi.',
  },
  'ao-giao-linh': {
    id: 'ao-giao-linh',
    costumeName: 'Áo Giao Lĩnh (Đại Việt)',
    era: 'Thời Lý - Trần - Hậu Lê (Thế kỷ XI - XVIII)',
    originSummary: 'Dạng thức cổ phục lâu đời bậc nhất của người Việt với cổ áo giao chéo chữ Y, thịnh hành từ chốn cung đình đến dân gian suốt ngàn năm độc lập.',
    primaryLocations: ['Hà Nội (Hoàng thành Thăng Long)', 'Ninh Bình (Cố đô Hoa Lư)', 'Bắc Ninh'],
    culturalFeature: 'Vạt cổ giao nhau, thắt đai lưng bản rộng, ống tay áo mở rộng buông rủ bay bổng mang phong vị hào sảng Đại Việt.',
  },
  'ao-vien-linh': {
    id: 'ao-vien-linh',
    costumeName: 'Áo Viên Lĩnh (Bào Phục)',
    era: 'Thời Lý - Trần - Lê - Nguyễn',
    originSummary: 'Bào phục cổ tròn dành riêng cho vua quan, quan viên triều nghi và các bậc đại thần trong chốn cung đình.',
    primaryLocations: ['Hà Nội (Thăng Long)', 'Thừa Thiên Huế'],
    culturalFeature: 'Cổ tròn ôm sát khép kín cài khuy vai phải, ngực thêu Bổ tử quy định phẩm hàm và đai quan chức uy nghiêm.',
  },
  'ao-ngu-than': {
    id: 'ao-ngu-than',
    costumeName: 'Áo Ngũ Thân Tay Chẽn',
    era: '1744 - Đầu thế kỷ XX',
    originSummary: 'Tiền thân trực tiếp của Áo Dài, đại diện cho tính cách khiêm cung, hòa nhã của người Việt thời phong kiến cận đại.',
    primaryLocations: ['Thừa Thiên Huế', 'Hà Nội', 'Đà Nẵng - Quảng Nam'],
    culturalFeature: 'Năm thân áo tượng trưng tứ thân phụ mẫu và bản thân, năm hạt ngọc cúc cài tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín).',
  },
};

// Danh sách các địa điểm/tỉnh thành trên Bản đồ Việt Nam với tọa độ chuẩn hóa (x: 0-500, y: 0-900)
// Kèm theo danh sách trang phục thịnh hành tương ứng.
// Nếu địa phương không có trang phục thịnh hành đặc trưng riêng biệt thì để danh sách rỗng (`prominentCostumes: []`).
export const VIETNAM_MAP_LOCATIONS: RegionalOriginLocation[] = [
  {
    id: 'ha-noi',
    name: 'Hà Nội (Thăng Long Kinh Kỳ)',
    province: 'Hà Nội',
    region: 'Bắc Bộ',
    coordinates: { x: 275, y: 172 },
    description: 'Thủ đô ngàn năm văn hiến, nơi hội tụ tinh hoa lễ nghi phục sức của các triều đại Lý, Trần, Lê.',
    historicalContext: 'Hoàng thành Thăng Long là trung tâm văn hóa nơi áo Giao Lĩnh cổ phong và áo Viên Lĩnh của triều thần phát triển rực rỡ nhất trong lịch sử Đại Việt.',
    prominentCostumes: [
      {
        costumeId: 'ao-giao-linh',
        costumeName: 'Áo Giao Lĩnh Cổ Phong',
        era: 'Thời Lý - Trần - Lê',
        role: 'Lễ nghi Cung đình & Văn sĩ Thăng Long',
        historicalSignificance: 'Cổ phục biểu trưng cho nền văn minh Đại Việt ngàn năm với cổ chéo chữ Y và tà buông tự nhiên.',
        badge: 'Cổ Kính',
        cardImage: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
      },
      {
        costumeId: 'ao-vien-linh',
        costumeName: 'Áo Viên Lĩnh (Bào Phục)',
        era: 'Thời Lê - Triều nghi Thăng Long',
        role: 'Triều phục quan viên và đại thần',
        historicalSignificance: 'Cổ tròn bổ tử uy nghi của bậc sĩ phu rường cột nước nhà tại kinh thành Thăng Long.',
        badge: 'Quan Viên',
        cardImage: '/src/assets/images/ao_ngu_than_doll_1791469432477.jpg',
      },
      {
        costumeId: 'ao-the',
        costumeName: 'Áo The (Khăn Xếp)',
        era: 'Thế kỷ XIX - XX',
        role: 'Nho sinh, học giả, sĩ phu kinh kỳ',
        historicalSignificance: 'Phong thái nho nhã, lịch thiệp của người Hà Nội nghìn năm văn vật.',
        badge: 'Nho Phong',
        cardImage: '/src/assets/images/viet_phuc_aothe_card_1791472087678.jpg',
      },
    ],
  },
  {
    id: 'bac-ninh',
    name: 'Bắc Ninh (Vùng Đất Kinh Bắc)',
    province: 'Bắc Ninh',
    region: 'Bắc Bộ',
    coordinates: { x: 295, y: 160 },
    description: 'Chiếc nôi dân ca Quan họ, cội nguồn văn hóa dân gian đồng bằng Bắc Bộ.',
    historicalContext: 'Nơi phụ nữ Kinh Bắc diện áo Tứ Thân, chít khăn mỏ quạ, đội nón quai thao đi trẩy hội Lim và trao nhau những làn điệu quan họ nghĩa tình.',
    prominentCostumes: [
      {
        costumeId: 'ao-tu-than',
        costumeName: 'Áo Tứ Thân Kinh Bắc',
        era: 'Thế kỷ XII - Đầu thế kỷ XX',
        role: 'Trang phục thiếu nữ Quan Họ & Lễ hội miền Bắc',
        historicalSignificance: 'Biểu tượng của nét đẹp đoan trang, chịu thương chịu khó và hiếu nghĩa vẹn tròn.',
        badge: 'Dân Gian',
        cardImage: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
      },
    ],
  },
  {
    id: 'ninh-binh',
    name: 'Ninh Bình (Cố Đô Hoa Lư)',
    province: 'Ninh Bình',
    region: 'Bắc Bộ',
    coordinates: { x: 280, y: 232 },
    description: 'Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam thời Đinh - Tiền Lê.',
    historicalContext: 'Cố đô Hoa Lư ghi dấu ấn thuở sơ khai định hình y phục cung đình người Việt sau thời kỳ Bắc thuộc.',
    prominentCostumes: [
      {
        costumeId: 'ao-giao-linh',
        costumeName: 'Áo Giao Lĩnh Khởi Nguyên',
        era: 'Thời Đinh - Tiền Lê',
        role: 'Phục sức vương triều buổi đầu độc lập',
        historicalSignificance: 'Khẳng định nền độc lập, tự chủ về phong hóa lễ nghi và trang phục phương Nam.',
        badge: 'Cổ Kính',
        cardImage: '/src/assets/images/five_traditional_outfits_1791467923646.jpg',
      },
    ],
  },
  {
    id: 'ha-giang',
    name: 'Hà Giang (Địa Đầu Cực Bắc)',
    province: 'Hà Giang',
    region: 'Bắc Bộ',
    coordinates: { x: 270, y: 80 },
    description: 'Miền cao nguyên đá hùng vĩ nơi địa đầu Tổ quốc, sắc màu văn hóa các dân tộc vùng cao.',
    historicalContext: 'Khu vực đặc trưng với trang phục thổ cẩm các dân tộc H’Mông, Dao; không thịnh hành dòng cổ phục người Kinh truyền thống trong hệ thống thẻ bài.',
    prominentCostumes: [], // Không có trang phục trong hệ thống thẻ cổ phục người Kinh
  },
  {
    id: 'thua-thien-hue',
    name: 'Thừa Thiên Huế (Cố Đô Phú Xuân)',
    province: 'Thừa Thiên Huế',
    region: 'Trung Bộ',
    coordinates: { x: 345, y: 435 },
    description: 'Cố đô của triều Nguyễn (1802 - 1945), nơi hội tụ đỉnh cao nghệ thuật may mặc và lễ điển cung đình.',
    historicalContext: 'Nơi chúa Nguyễn Phúc Khoát đặt nền móng cho áo Ngũ Thân (1744), khởi sinh Áo Dài, và là cái nôi ra đời của Áo Nhật Bình và Áo Tấc hoàng tộc.',
    prominentCostumes: [
      {
        costumeId: 'ao-nhat-binh',
        costumeName: 'Áo Nhật Bình Hoàng Tộc',
        era: 'Triều Nguyễn (1802 - 1945)',
        role: 'Thường phục Hoàng hậu, Công chúa và Quý phi',
        historicalSignificance: 'Tuyệt phẩm hoàng cung với cổ bình lĩnh thêu phụng hoàng và tay áo ngũ sắc lộng lẫy.',
        badge: 'Hoàng Tộc',
        cardImage: '/src/assets/images/viet_phuc_nhatbinh_card_1791472278674.jpg',
      },
      {
        costumeId: 'ao-tac',
        costumeName: 'Áo Tấc (Áo Thụng)',
        era: 'Triều Nguyễn',
        role: 'Lễ phục đại lễ triều đình và cúng tế',
        historicalSignificance: 'Chuẩn mực lễ nghi trang nghiêm thời Nguyễn với tay thụng dài rộng một tấc viền.',
        badge: 'Lễ Phục',
        cardImage: '/src/assets/images/viet_phuc_aotac_card_1791472373358.jpg',
      },
      {
        costumeId: 'ao-ngu-than',
        costumeName: 'Áo Ngũ Thân Tay Chẽn',
        era: '1744 - Thời Nguyễn',
        role: 'Trang phục phổ biến của mọi tầng lớp xứ Huế',
        historicalSignificance: 'Tiền thân của áo dài, định hình tính cách khiêm hòa và chuẩn mực Nho giáo xứ Huế.',
        badge: 'Kinh Kỳ',
        cardImage: '/src/assets/images/ao_ngu_than_doll_1791469432477.jpg',
      },
      {
        costumeId: 'ao-dai',
        costumeName: 'Áo Dài Huế (Tím Xứ Huế)',
        era: 'Thời Nguyễn - Đương đại',
        role: 'Biểu tượng thiếu nữ và phụ nữ Cố đô',
        historicalSignificance: 'Màu tím xứ Huế và tà áo dài thướt tha bên dòng sông Hương thơ mộng.',
        badge: 'Quốc Phục',
        cardImage: '/src/assets/images/viet_phuc_aodai_card_1791472076112.jpg',
      },
    ],
  },
  {
    id: 'quang-nam',
    name: 'Quảng Nam - Hội An (Đô Thị Cổ)',
    province: 'Quảng Nam',
    region: 'Trung Bộ',
    coordinates: { x: 375, y: 485 },
    description: 'Thương cảng quốc tế sầm uất thế kỷ XVII-XVIII, nơi giao lưu tơ lụa và văn hóa phục sức phương Đông.',
    historicalContext: 'Làng lụa Mã Châu và phố cổ Hội An từng là trung tâm dệt may tơ lụa cung cấp vải vóc thượng hạng may Áo Tấc và Áo Dài.',
    prominentCostumes: [
      {
        costumeId: 'ao-tac',
        costumeName: 'Áo Tấc Tế Lễ Hội An',
        era: 'Thế kỷ XVIII - XIX',
        role: 'Lễ phục gia tiên và hội đồng hương đình miếu',
        historicalSignificance: 'Gìn giữ nếp xưa kính trọng tiền nhân trong các hội quán và nhà cổ Hội An.',
        badge: 'Lễ Phục',
        cardImage: '/src/assets/images/viet_phuc_aotac_card_1791472373358.jpg',
      },
    ],
  },
  {
    id: 'dak-lak',
    name: 'Đắk Lắk (Tây Nguyên Đại Ngàn)',
    province: 'Đắk Lắk',
    region: 'Trung Bộ',
    coordinates: { x: 315, y: 590 },
    description: 'Vùng đất cồng chiêng và văn hóa mẫu hệ của đồng bào Ê Đê, M’Nông.',
    historicalContext: 'Đặc trưng với trang phục dệt thổ cẩm váy tấm, áo chui đầu thổ cẩm Tây Nguyên.',
    prominentCostumes: [], // Không có trang phục trong hệ thống thẻ cổ phục người Kinh
  },
  {
    id: 'tp-ho-chi-minh',
    name: 'TP. Hồ Chí Minh (Gia Định Xưa)',
    province: 'TP. Hồ Chí Minh',
    region: 'Nam Bộ',
    coordinates: { x: 325, y: 725 },
    description: 'Đô hội phồn hoa phương Nam, nơi giao thoa giữa truyền thống và cách tân hiện đại.',
    historicalContext: 'Nơi phát triển mạnh mẽ chiếc Áo Dài tân thời qua các thời kỳ và là cái nôi của lối sống phóng khoáng áo bà ba Nam Bộ.',
    prominentCostumes: [
      {
        costumeId: 'ao-dai',
        costumeName: 'Áo Dài Sài Gòn Năng Động',
        era: 'Thế kỷ XX - Hiện đại',
        role: 'Thời trang thanh lịch chốn đô thị phương Nam',
        historicalSignificance: 'Tôn vinh vẻ đẹp tự tin, hiện đại của người phụ nữ phương Nam qua các thập niên.',
        badge: 'Quốc Phục',
        cardImage: '/src/assets/images/viet_phuc_aodai_card_1791472076112.jpg',
      },
      {
        costumeId: 'ao-ba-ba',
        costumeName: 'Áo Bà Ba Nam Bộ',
        era: 'Thế kỷ XIX - Hiện đại',
        role: 'Trang phục thường nhật phố thị và ngoại thành Gia Định',
        historicalSignificance: 'Mộc mạc, gần gũi, gắn liền với nhịp sống nghĩa tình của người Sài Gòn - Nam Bộ.',
        badge: 'Nam Bộ',
        cardImage: '/src/assets/images/ao_ba_ba_doll_1791467911723.jpg',
      },
    ],
  },
  {
    id: 'can-tho',
    name: 'Cần Thơ (Tây Đô Sông Nước)',
    province: 'Cần Thơ',
    region: 'Nam Bộ',
    coordinates: { x: 260, y: 785 },
    description: 'Thủ phủ miền Tây Nam Bộ với chợ nổi Cái Răng và miệt vườn trù phú phù sa.',
    historicalContext: 'Cái nôi thịnh hành nhất của Áo Bà Ba Nam Bộ, nơi hình ảnh chiếc áo bà ba cùng chiếc nón lá bơi xuồng trên sông nước trở thành huyền thoại văn hóa.',
    prominentCostumes: [
      {
        costumeId: 'ao-ba-ba',
        costumeName: 'Áo Bà Ba Miền Sông Nước',
        era: 'Thế kỷ XIX - Nay',
        role: 'Trang phục đời sống bơi xuồng, miệt vườn trù phú',
        historicalSignificance: 'Biểu tượng tinh túy của vẻ đẹp duyên dáng, chịu thương chịu khó miền Tây Đô.',
        badge: 'Nam Bộ',
        cardImage: '/src/assets/images/ao_ba_ba_doll_1791467911723.jpg',
      },
    ],
  },
  {
    id: 'ca-mau',
    name: 'Cà Mau (Mũi Tàu Đất Mũi)',
    province: 'Cà Mau',
    region: 'Nam Bộ',
    coordinates: { x: 238, y: 855 },
    description: 'Cực Nam Tổ quốc với rừng ngập mặn U Minh và phù sa lấn biển quanh năm.',
    historicalContext: 'Nơi người dân khai hoang mở cõi gắn liền với áo bà ba đen mộc mạc và khăn rằn quàng cổ chống nắng gió.',
    prominentCostumes: [
      {
        costumeId: 'ao-ba-ba',
        costumeName: 'Áo Bà Ba Rừng Đước Đất Mũi',
        era: 'Thời mở cõi phương Nam - Nay',
        role: 'Trang phục khai hoang và lao động miền biển rừng',
        historicalSignificance: 'Sức sống kiên cường, khoáng đạt của người con đất Mũi Cà Mau.',
        badge: 'Nam Bộ',
        cardImage: '/src/assets/images/ao_ba_ba_doll_1791467911723.jpg',
      },
    ],
  },
  {
    id: 'hoang-sa',
    name: 'Quần đảo Hoàng Sa (TP. Đà Nẵng)',
    province: 'Q.Đ Hoàng Sa',
    region: 'Trung Bộ',
    coordinates: { x: 485, y: 435 },
    description: 'Quần đảo thiêng liêng trực thuộc TP. Đà Nẵng, cương vực biển đảo nghìn đời của Tổ quốc Việt Nam.',
    historicalContext: 'Từ thời Chúa Nguyễn đến triều Nguyễn, triều đình đã liên tục cử Đội Hoàng Sa kiêm quản Bắc Hải ra cắm mốc, đo đạc hải trình và khai thác hải sản. Gắn liền với Lễ Khao lề thế lính Hoàng Sa hào hùng.',
    prominentCostumes: [],
  },
  {
    id: 'truong-sa',
    name: 'Quần đảo Trường Sa (Tỉnh Khánh Hòa)',
    province: 'Q.Đ Trường Sa',
    region: 'Trung Bộ',
    coordinates: { x: 475, y: 790 },
    description: 'Huyện đảo Trường Sa trực thuộc tỉnh Khánh Hòa, thành đồng kiên trung canh giữ biển trời Tổ quốc.',
    historicalContext: 'Địa bàn chiến lược phòng thủ và phát triển kinh tế biển đảo của dân tộc, nơi quân dân ta kiên cường bám đảo, gìn giữ chủ quyền thiêng liêng.',
    prominentCostumes: [],
  },
  {
    id: 'phu-quoc',
    name: 'Đảo Phú Quốc (Tỉnh Kiên Giang)',
    province: 'Đảo Phú Quốc',
    region: 'Nam Bộ',
    coordinates: { x: 190, y: 790 },
    description: 'Đảo ngọc lớn nhất Việt Nam nằm trong vịnh Thái Lan, trù phú tơ lụa và nước mắm truyền thống.',
    historicalContext: 'Gắn liền với công cuộc mở cõi phương Nam thời họ Mạc và sự giao thoa trang phục áo bà ba biển đảo.',
    prominentCostumes: [],
  },
  {
    id: 'con-dao',
    name: 'Côn Đảo (Tỉnh Bà Rịa - Vũng Tàu)',
    province: 'Côn Đảo',
    region: 'Nam Bộ',
    coordinates: { x: 325, y: 865 },
    description: 'Quần đảo tiền tiêu phía Đông Nam Tổ quốc, di tích lịch sử quốc gia đặc biệt.',
    historicalContext: 'Cứ điểm hàng hải huyết mạch trên Biển Đông, ghi dấu ý chí quật cường bất khuất của dân tộc Việt Nam.',
    prominentCostumes: [],
  },
];
