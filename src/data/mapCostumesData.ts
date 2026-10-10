import { OutfitId } from '../types/costume';

export interface ProvinceCostumeInfo {
  outfitId: OutfitId;
  costumeName: string;
  badge: string;
  primaryColor: string;
  historicRole: string; // Vai trò lịch sử
  era: string; // Niên đại
  originAnalysis: string; // Phân tích nguồn gốc lịch sử & bối cảnh
  whyMostWornHere: string; // Vì sao thịnh hành nhất tại địa phương này
  landmarkSpots: string[]; // Các địa danh/di tích đặc trưng nhất
  culturalQuote: string; // Câu ca/câu thơ điển hình
}

export interface VietnamProvinceData {
  id: string;
  name: string;
  alias?: string;
  region: 'bac' | 'trung' | 'nam';
  mapX: number; // Tọa độ X trên bản đồ SVG (0..480)
  mapY: number; // Tọa độ Y trên bản đồ SVG (0..740)
  costumes: ProvinceCostumeInfo[];
  description: string;
}

export const VIETNAM_COSTUME_LOCATIONS: VietnamProvinceData[] = [
  // 1. THỪA THIÊN HUẾ (CỐ ĐÔ HUẾ - CÁI NÔI CỦA NHẬT BÌNH, ÁO TẤC, ÁO NGŨ THÂN)
  {
    id: 'hue',
    name: 'Thừa Thiên Huế',
    alias: 'Cố Đô Huế · Kinh Đô Triều Nguyễn',
    region: 'trung',
    mapX: 275,
    mapY: 375,
    description: 'Kinh đô của triều đại phong kiến cuối cùng Việt Nam, cái nôi gìn giữ chuẩn mực điển chế lễ phục cung đình và quốc phục ngũ thân.',
    costumes: [
      {
        outfitId: 'ao-nhat-binh',
        costumeName: 'Áo Nhật Bình',
        badge: 'Hoàng Tộc',
        primaryColor: '#E11048',
        historicRole: 'Thường lễ phục cao quý của Hoàng hậu, Công chúa, Phi tần và Mệnh phụ triều Nguyễn',
        era: 'Triều Nguyễn (1802 - 1945)',
        originAnalysis:
          'Khảo cứu từ Khâm Định Đại Nam Hội Điển Sự Lệ, Áo Nhật Bình bắt nguồn từ dạng áo Phi Phong đối khâm thời Minh, được các vị hoàng đế đầu triều Nguyễn định chế hóa lại mang đậm bản sắc thuần Việt. Điểm đặc trưng nhất là phần cổ áo to bản ghép lại tạo thành hình chữ nhật trước ngực, viền dải ngũ sắc ngũ hành ở cửa tay áo và thêu hoa văn phụng ổ, loan ổ lộng lẫy.',
        whyMostWornHere:
          'Huế là trung tâm quyền lực cung đình và nơi cư ngụ của hoàng gia triều Nguyễn trong suốt 143 năm. Tại đây, điển lễ nghiêm ngặt quy định y phục cho từng tước hiệu trong cung cấm. Sau năm 1945, áo Nhật Bình tiếp tục trở thành lễ phục cưới hỏi thiêng liêng lưu truyền trong các gia đình quý tộc và dân gian xứ Huế.',
        landmarkSpots: [
          'Đại Nội Huế & Cung Diên Thọ (Nơi ở của Hoàng Thái Hậu)',
          'Điện Thái Hòa & Cung An Định',
          'Lăng Tự Đức & Lăng Khải Định',
          'Chùa Thiên Mụ bên bờ Sông Hương',
        ],
        culturalQuote: 'Đất Thần Kinh dải ngũ sắc Nhật Bình, uy nghiêm cốt cách ngàn năm hoàng triều.',
      },
      {
        outfitId: 'ao-tac',
        costumeName: 'Áo Tấc (Tay Thụng)',
        badge: 'Đại Lễ',
        primaryColor: '#B91C1C',
        historicRole: 'Đại lễ phục trang trọng dùng trong tế tự, hôn lễ, yến tiệc và tiếp đãi khách quý',
        era: 'Triều Nguyễn (Thế kỷ XIX - XX)',
        originAnalysis:
          'Áo tấc (còn gọi là áo thụng hay áo lễ) thuộc hệ ngũ thân lập lĩnh nhưng phần tay áo được may thụng dài cực rộng (rộng từ 30-40cm, buông rủ ngang đầu gối khi hạ tay). Tên gọi "Áo Tấc" xuất phát từ phần viền tà áo rộng đúng một tấc ta theo thước đo cổ truyền.',
        whyMostWornHere:
          'Được mặc phổ biến nhất tại Huế vì mảnh đất kinh kỳ lưu giữ hệ thống nghi lễ Nho giáo nghiêm ngặt nhất. Dù là vua chúa, quan lại hay bách tính, khi bước vào không gian linh thiêng (đình làng, nhà thờ họ, lễ Tế Giao, đám cưới) đều phải mặc Áo Tấc và đội khăn đóng để thể hiện sự cung kính, đoan trang.',
        landmarkSpots: [
          'Văn Thánh Miếu Huế & Đàn Nam Giao',
          'Làng Cổ Phước Tích (Huyện Phong Điền)',
          'Nhà Thờ Tộc & Đình Làng Kim Long',
          'Điện Hòn Chén (Lễ hội Thánh Mẫu Thiên Y A Na)',
        ],
        culturalQuote: 'Chắp tay áo tấc khép vạt nghiêng mình, giữ trọn lễ nghĩa nho phong đất kinh kỳ.',
      },
      {
        outfitId: 'ao-ngu-than',
        costumeName: 'Áo Ngũ Thân Lập Lĩnh',
        badge: 'Kinh Kỳ',
        primaryColor: '#78350F',
        historicRole: 'Tiền thân của áo dài hiện đại, lễ phục hàng ngày của giới trí thức, nho sĩ và quan lại',
        era: 'Định hình 1744 - Thống nhất toàn quốc 1837',
        originAnalysis:
          'Năm 1744, Võ Vương Nguyễn Phúc Khoát ban sắc dụ cải cách trang phục Đàng Trong, chính thức khai sinh áo ngũ thân lập lĩnh 5 thân và 5 cúc (tượng trưng cho tứ thân phụ mẫu và bản thân người mặc, 5 hạt khuy đại diện cho ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín). Đến đời vua Minh Mạng (1837), triều đình ban sắc chỉ thống nhất áo ngũ thân làm quốc phục từ Bắc chí Nam.',
        whyMostWornHere:
          'Huế là nơi phát tích sắc dụ cải cách và là trung tâm may đo trang phục ngũ thân tinh xảo bậc nhất. Đàn ông và phụ nữ Huế xưa coi áo ngũ thân là chuẩn mực ăn mặc lịch sự tối thiểu khi ra khỏi nhà.',
        landmarkSpots: [
          'Quốc Tử Giám Huế (Trường đại học thời Nguyễn)',
          'Cầu Tràng Tiền & Bến Vân Lâu',
          'Làng nghề may đo cổ phục Kim Long',
        ],
        culturalQuote: 'Năm hạt cúc vàng năm nếp đạo, tà áo ngũ thân đĩnh đạc người quân tử.',
      },
    ],
  },

  // 2. HÀ NỘI (KINH THÀNH THĂNG LONG - NƠI HỘI TỤ GIAO LĨNH, VIÊN LĨNH, ÁO DÀI TÂN THỜI)
  {
    id: 'hanoi',
    name: 'Hà Nội',
    alias: 'Thăng Long · Đông Đô · Hà Thành Nghìn Năm Văn Hiến',
    region: 'bac',
    mapX: 236,
    mapY: 140,
    description: 'Trái tim của ngàn năm văn hiến Đại Việt, nơi khởi phát của các dòng trang phục triều nghi Giao Lĩnh, Viên Lĩnh và cuộc cách tân Áo Dài Lemur.',
    costumes: [
      {
        outfitId: 'ao-giao-linh',
        costumeName: 'Áo Giao Lĩnh (Đại Việt)',
        badge: 'Đại Việt',
        primaryColor: '#059669',
        historicRole: 'Y phục cổ phong trang nghiêm của quý tộc, mệnh phụ và quan lại triều đình Thăng Long',
        era: 'Thời Lý - Trần - Lê (TK XI - TK XVIII)',
        originAnalysis:
          'Áo giao lĩnh (còn gọi là trù đối khâm hay trực lĩnh) là một trong những y phục xuất hiện sớm nhất của người Việt, được ghi nhận qua các bức tượng đá thời Lý tại chùa Phật Tích và tranh khắc thời Hậu Lê. Cổ áo bắt chéo vạt chữ Y (vạt trái đè lên vạt phải), ống tay thụng rộng vừa, vạt dài lửng qua gối để lộ quần lụa trắng hoặc váy xếp ly thanh khiết.',
        whyMostWornHere:
          'Thăng Long là kinh đô thịnh trị qua các triều đại vàng son Lý, Trần, Hậu Lê. Văn hóa Nho lễ và mỹ học trang phục quý phái của đất Thăng Long đã đưa Áo Giao Lĩnh trở thành chuẩn mực thẩm mỹ đỉnh cao trong mọi nghi lễ và đời sống phong lưu kinh kỳ.',
        landmarkSpots: [
          'Hoàng Thành Thăng Long & Điện Kính Thiên',
          'Văn Miếu - Quốc Tử Giám Hà Nội',
          'Đền Ngọc Sơn & Quanh Hồ Gươm',
          'Chùa Trấn Quốc & Hồ Tây',
        ],
        culturalQuote: 'Giao lĩnh cổ chéo thắt đai, phong thái ung dung ngàn năm văn hiến Thăng Long.',
      },
      {
        outfitId: 'ao-vien-linh',
        costumeName: 'Áo Viên Lĩnh (Bào Phục)',
        badge: 'Quan Viên',
        primaryColor: '#1E3A8A',
        historicRole: 'Bào phục cổ tròn thêu bổ tử uy nghi của bậc quan viên, tể tướng và sứ thần Đại Việt',
        era: 'Thời Lý - Trần - Hậu Lê',
        originAnalysis:
          'Viên Lĩnh (còn gọi là đoàn lĩnh, cổ kiềng) có thiết kế cổ áo tròn khép kín, thân áo rộng xẻ tà hai bên. Dưới thời Lê Sơ tại kinh thành Thăng Long, áo được quy định làm quan phục thiết triều. Trước ngực và sau lưng áo đính tấm bổ tử vuông vức thêu hình chim muông (quan văn: hạc, ngỗng, trĩ) hoặc thú dữ (quan võ: kỳ lân, sư tử, hổ) để phân biệt phẩm hàm cửu phẩm.',
        whyMostWornHere:
          'Thăng Long là đầu não hành chính của cả nước, nơi các kỳ thi Đình được tổ chức tại Văn Miếu và triều thần hội họp thiết triều tại điện Cần Chánh và điện Kính Thiên.',
        landmarkSpots: [
          'Văn Miếu - Quốc Tử Giám (Khu bia tiến sĩ Thăng Long)',
          'Đền Bạch Mã & Khu phố cổ 36 phố phường',
          'Đền Quán Thánh & Thành Cổ Loa',
        ],
        culturalQuote: 'Áo tròn viên lĩnh thêu ngực bổ tử, rạng danh hiền tài đỗ đạt bảng vàng.',
      },
      {
        outfitId: 'ao-dai',
        costumeName: 'Áo Dài Tân Thời',
        badge: 'Quốc Phục',
        primaryColor: '#E11048',
        historicRole: 'Quốc phục biểu tượng của phụ nữ Việt Nam, bắt nguồn từ cuộc cách tân rực rỡ thập niên 1930',
        era: 'Hà Nội thập niên 1930 - Nay',
        originAnalysis:
          'Thập niên 1930 tại Hà Nội, họa sĩ Le Mur Nguyễn Cát Tường và nhóm Tự Lực Văn Đoàn tại Trường Cao đẳng Mỹ thuật Đông Dương đã thực hiện cuộc cách tân táo bạo: giản lược 5 thân của áo cổ truyền thành 2 tà trước sau, may ôm sát eo, nâng cao cổ áo và phối cùng quần trắng ống rộng, tạo nên tà Áo Dài tân thời kiều diễm.',
        whyMostWornHere:
          'Hà Nội là cái nôi ra đời của phong trào cách tân mỹ thuật và thời trang hiện đại Việt Nam. Hình ảnh nữ sinh Đồng Khánh, thiếu nữ Tràng An dạo bước thướt tha quanh Hồ Gươm mùa hoa cúc hoa đào đã đi vào thơ ca nhạc họa bất hủ.',
        landmarkSpots: [
          'Hồ Hoàn Kiếm & Cầu Thê Húc',
          'Đường Phan Đình Phùng & Hoàng Diệu mùa thu lá rụng',
          'Nhà Thờ Lớn Hà Nội & Ô Quan Chưởng',
          'Làng lụa Vạn Phúc (Hà Đông)',
        ],
        culturalQuote: 'Thoáng thấy áo dài bay trên phố nhẹ, bỗng thấy tâm hồn Hà Nội đượm nét thơ.',
      },
    ],
  },

  // 3. BẮC NINH (VÙNG ĐẤT KINH BẮC - ĐỊA BÀN THỊNH HÀNH NHẤT CỦA ÁO TỨ THÂN)
  {
    id: 'bacninh',
    name: 'Bắc Ninh',
    alias: 'Kinh Bắc Xưa · Cái Nôi Quan Họ',
    region: 'bac',
    mapX: 252,
    mapY: 130,
    description: 'Vùng đất địa linh nhân kiệt, nơi Áo Tứ Thân cùng chiếc nón quai thao và dải thắt lưng vàng trở thành linh hồn của các canh hát Quan họ.',
    costumes: [
      {
        outfitId: 'ao-tu-than',
        costumeName: 'Áo Tứ Thân',
        badge: 'Dân Gian',
        primaryColor: '#9A3412',
        historicRole: 'Trang phục dân gian mộc mạc mà duyên dáng của liền chị Quan họ và phụ nữ đồng bằng châu thổ',
        era: 'Thời Lý - Trần đến Đầu Thế Kỷ XX',
        originAnalysis:
          'Áo tứ thân gồm 4 thân vải: hai thân sau khâu ghép liền thành đường sống lưng, hai thân trước tách rời để buộc nơ trước bụng. Người phụ nữ mặc áo tứ thân bên ngoài yếm đào đỏ thắm hoặc trắng, khoác ngoài dải thắt lưng lụa vàng nghệ hoặc xanh biếc, đầu đội nón quai thao to bản.',
        whyMostWornHere:
          'Bắc Ninh là thủ phủ của 49 làng Quan họ cổ ven sông Cầu. Hình ảnh "Liền chị áo tứ thân nón ba tầm, quẩy gánh dạo hội xuân" đã trở thành biểu tượng văn hóa phi vật thể của nhân loại được UNESCO vinh danh.',
        landmarkSpots: [
          'Đồi Lim (Hội Lim mùng 13 tháng Giêng)',
          'Đền Đô (Khu lăng mộ 8 vị vua triều Lý)',
          'Làng Diềm (Thủy tổ quan họ Bắc Ninh)',
          'Chùa Dâu (Trung tâm Phật giáo cổ nhất Việt Nam)',
        ],
        culturalQuote: 'Mấy năm sông Cầu nước chảy lơ thơ, nhớ người liền chị áo tứ thân buộc dải yếm đào.',
      },
    ],
  },

  // 4. NINH BÌNH (CỐ ĐÔ HOA LƯ - ĐỊA DANH GIAO LĨNH & VIÊN LĨNH THỜI ĐINH - TIỀN LÊ)
  {
    id: 'ninhbinh',
    name: 'Ninh Bình',
    alias: 'Cố Đô Hoa Lư · Vùng Đất Di Sản Tràng An',
    region: 'bac',
    mapX: 238,
    mapY: 185,
    description: 'Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam dưới triều Đinh, Tiền Lê, lưu giữ kiến trúc cổ phong và phục sức thời sơ khởi.',
    costumes: [
      {
        outfitId: 'ao-giao-linh',
        costumeName: 'Áo Giao Lĩnh (Đại Việt)',
        badge: 'Đại Việt',
        primaryColor: '#059669',
        historicRole: 'Lễ phục trang trọng của sĩ phu và quý tộc tại kinh đô non nước Hoa Lư',
        era: 'Thế kỷ X - XI',
        originAnalysis:
          'Sau khi dẹp loạn 12 sứ quân năm 968, Đinh Bộ Lĩnh lên ngôi Hoàng đế đặt kinh đô tại Hoa Lư. Quy chế trang phục bắt đầu được định hình với áo giao vạt cài chéo thể hiện độc lập tự chủ với phương Bắc.',
        whyMostWornHere:
          'Là không gian non nước hữu tình với hàng trăm hang động và cung điện cổ. Du khách và các đoàn khảo cứu cổ phục ngày nay đặc biệt ưa chuộng mặc Áo Giao Lĩnh khi hành hương và chụp ảnh tại Tràng An, Bích Động và đền vua Đinh - vua Lê.',
        landmarkSpots: [
          'Cố Đô Hoa Lư (Đền vua Đinh Tiên Hoàng & vua Lê Đại Hành)',
          'Quần thể danh thắng Tràng An & Hang Múa',
          'Chùa Bái Đính cổ & Tam Cốc - Bích Động',
        ],
        culturalQuote: 'Non nước Hoa Lư ngàn năm vọng lại, tà áo giao lĩnh bóng cổ thạch trầm mặc.',
      },
    ],
  },

  // 5. QUẢNG NAM (PHỐ CỔ HỘI AN - TRUNG TÂM GIAO THƯƠNG ÁO TẤC & ÁO DÀI CỔ TRUYỀN)
  {
    id: 'quangnam',
    name: 'Quảng Nam',
    alias: 'Thương Cảng Hội An · Dinh Trấn Thanh Chiêm',
    region: 'trung',
    mapX: 310,
    mapY: 420,
    description: 'Thương cảng quốc tế sầm uất bậc nhất châu Á từ thế kỷ XVI - XIX, nơi các dòng lụa tơ tằm xứ Quảng may nên những bộ Áo Tấc và Áo Dài nức tiếng.',
    costumes: [
      {
        outfitId: 'ao-tac',
        costumeName: 'Áo Tấc Lễ Phục',
        badge: 'Đại Lễ',
        primaryColor: '#B91C1C',
        historicRole: 'Lễ phục truyền thống của tầng lớp thương gia và sĩ tộc xứ Đàng Trong',
        era: 'Thế kỷ XVII - XIX',
        originAnalysis:
          'Tại Dinh trấn Thanh Chiêm và đô thị cổ Hội An, lụa Mã Châu và lụa Duy Xuyên đã nuôi dưỡng nghề dệt may phát triển cực thịnh. Áo tấc tay thụng là trang phục không thể thiếu của các bang hội, dòng họ khi tế lễ tại các hội quán và nhà cổ.',
        whyMostWornHere:
          'Hội An bảo tồn gần như nguyên vẹn hơn 1.000 ngôi nhà cổ và hội quán. Áo tấc tay thụng với màu đỏ gụ, xanh chàm là phục trang kinh điển hòa quyện tuyệt mỹ với những bức tường vàng hoa giấy và đèn lồng lung linh.',
        landmarkSpots: [
          'Chùa Cầu Hội An & Phố Cổ Hội An',
          'Làng Lụa Hội An & Làng Gốm Thanh Hà',
          'Hội quán Phúc Kiến & Triều Châu',
        ],
        culturalQuote: 'Đèn lồng giăng lối bên sông Hoài, tà áo tấc thướt tha bóng xưa hoài niệm.',
      },
    ],
  },

  // 6. CẦN THƠ (THỦ PHỦ MIỀN TÂY - CÁI NÔI THỊNH HÀNH CỦA ÁO BÀ BA NAM BỘ)
  {
    id: 'cantho',
    name: 'Cần Thơ',
    alias: 'Tây Đô · Miền Sông Nước Cửu Long',
    region: 'nam',
    mapX: 220,
    mapY: 660,
    description: 'Trái tim của đồng bằng sông Cửu Long, thủ phủ nơi chiếc Áo Bà Ba hồng san hô và nón lá chèo xuồng trên chợ nổi trở thành biểu tượng bất tử.',
    costumes: [
      {
        outfitId: 'ao-ba-ba',
        costumeName: 'Áo Bà Ba Nam Bộ',
        badge: 'Nam Bộ',
        primaryColor: '#F87171',
        historicRole: 'Y phục lao động và sinh hoạt thường nhật gắn liền với tính cách phóng khoáng, chân chất của người Nam Bộ',
        era: 'Thế kỷ XIX - Nay',
        originAnalysis:
          'Theo nghiên cứu của nhà bác học Trương Vĩnh Ký, áo bà ba được du nhập và cách tân vào nửa cuối thế kỷ 19. Cổ áo tròn thanh thoát, thân trước xẻ tà đơm hàng nút dọc giữa, chít eo tôn dáng nhưng xẻ tà hai bên hông tạo sự linh hoạt tuyệt đối khi chèo đò, làm vườn.',
        whyMostWornHere:
          'Cần Thơ là trung tâm giao thương miệt vườn sông nước của 13 tỉnh Tây Nam Bộ. Người con gái Tây Đô "gạo trắng nước trong" với chiếc áo bà ba màu hồng phấn hay cánh sen, cổ quấn khăn rằn, tay chèo thuyền trên chợ nổi Cái Răng đã làm say đắm biết bao thi nhân.',
        landmarkSpots: [
          'Chợ nổi Cái Răng & Bến Ninh Kiều',
          'Nhà cổ Bình Thủy (Kiến trúc Đông Tây hòa hợp thế kỷ XIX)',
          'Cồn Sơn & Cù lao sông Hậu rợp bóng vườn cây ăn trái',
        ],
        culturalQuote: 'Cần Thơ gạo trắng nước trong, em đi áo vải bà ba má hồng duyên dáng.',
      },
    ],
  },

  // 7. BẾN TRE (XỨ DỪA NAM BỘ - BIỂU TƯỢNG ĐỒNG KHỞI ÁO BÀ BA)
  {
    id: 'bentre',
    name: 'Bến Tre',
    alias: 'Xứ Dừa · Vùng Đất Đồng Khởi Anh Hùng',
    region: 'nam',
    mapX: 248,
    mapY: 645,
    description: 'Quê hương của "Đội quân tóc dài", nơi chiếc Áo Bà Ba màu đen và màu nâu mộc mạc đã đi vào lịch sử đấu tranh kiên cường của dân tộc.',
    costumes: [
      {
        outfitId: 'ao-ba-ba',
        costumeName: 'Áo Bà Ba Nam Bộ',
        badge: 'Nam Bộ',
        primaryColor: '#F87171',
        historicRole: 'Trang phục mộc mạc của người phụ nữ nông thôn và chiến sĩ nữ đội quân tóc dài',
        era: 'Thế kỷ XIX - Nay',
        originAnalysis:
          'Chiếc áo bà ba ở Bến Tre thường được nhuộm bằng vỏ cây gáo, lá tràm hoặc màu bùn phù sa, tạo nên sắc đen hoặc nâu thẫm mộc mạc, bền bỉ với công việc đồng áng và len lỏi trong những rặng dừa nước rậm rạp.',
        whyMostWornHere:
          'Bến Tre nổi tiếng với hình tượng Nữ tướng Nguyễn Thị Định và phong trào Đồng Khởi năm 1960. Chiếc áo bà ba quàng khăn rằn sọc ca-rô đã trở thành biểu tượng tinh thần bất khuất của phụ nữ Nam Bộ.',
        landmarkSpots: [
          'Cồn Phụng & Cồn Quy trên sông Tiền',
          'Khu di tích Đồng Khởi (Định Thủy, Mỏ Cày Nam)',
          'Vườn dừa xanh bạt ngàn Giồng Trôm & Châu Thành',
        ],
        culturalQuote: 'Dáng đứng Bến Tre tà áo bà ba tung bay trước gió, ngàn năm dừa xanh đứng hiên ngang.',
      },
    ],
  },

  // 8. TP. HỒ CHÍ MINH (SÀI GÒN - TRUNG TÂM ÁO DÀI HIỆN ĐẠI & LỄ HỘI ÁO DÀI LỚN NHẤT VIỆT NAM)
  {
    id: 'saigon',
    name: 'TP. Hồ Chí Minh',
    alias: 'Sài Gòn · Hòn Ngọc Viễn Đông',
    region: 'nam',
    mapX: 255,
    mapY: 615,
    description: 'Đô thị năng động bậc nhất cả nước, nơi tổ chức Lễ hội Áo Dài thường niên lớn nhất Việt Nam và giao thoa của áo dài tân thời với áo bà ba phương Nam.',
    costumes: [
      {
        outfitId: 'ao-dai',
        costumeName: 'Áo Dài Sài Gòn',
        badge: 'Quốc Phục',
        primaryColor: '#E11048',
        historicRole: 'Biểu tượng thời trang thanh lịch, năng động của người phụ nữ đô thị phương Nam',
        era: 'Thập niên 1960 (Áo dài Raglan / Hippie) - Nay',
        originAnalysis:
          'Thập niên 1960 tại Sài Gòn, nhà may Dung ở Đakao đã phát minh ra kiểu tay Raglan nối chéo từ cổ áo xuống nách, giúp tà áo dài phẳng phiu không bị nhăn ở nách. Sau đó là trào lưu áo dài chít eo và áo dài mini phóng khoáng của thập niên 1970.',
        whyMostWornHere:
          'TP.HCM là trung tâm tổ chức Lễ hội Áo Dài thường niên vào tháng 3 với hàng chục ngàn người tham gia diễu hành tại phố đi bộ Nguyễn Huệ, thu hút bạn bè quốc tế.',
        landmarkSpots: [
          'Chợ Bến Thành & Bưu điện Trung tâm Thành phố',
          'Nhà hát Thành phố & Phố đi bộ Nguyễn Huệ',
          'Bảo tàng Mỹ thuật TP.HCM & Dinh Độc Lập',
        ],
        culturalQuote: 'Sài Gòn tấp nập hoa lệ, vương vấn tà áo dài bay trong nắng chiều phương Nam.',
      },
      {
        outfitId: 'ao-ba-ba',
        costumeName: 'Áo Bà Ba Nam Bộ',
        badge: 'Nam Bộ',
        primaryColor: '#F87171',
        historicRole: 'Trang phục đời thường của người dân miệt vườn vùng ven Sài Gòn - Chợ Lớn',
        era: 'Thế kỷ XIX - Nay',
        originAnalysis:
          'Cộng đồng người Việt và người Hoa ở Chợ Lớn, Gia Định đã sử dụng áo bà ba lụa là cao cấp (lụa Tân Châu, gấm Hải Triều) tạo nên phong cách áo bà ba thị thành sang trọng, thanh lịch.',
        whyMostWornHere:
          'Các khu du lịch sinh thái vùng ven như Củ Chi, Bình Quới, Cần Giờ là nơi người dân thành phố và du khách tìm về với tà áo bà ba mộc mạc để trải nghiệm nếp sống phương Nam xưa.',
        landmarkSpots: [
          'Khu du lịch Bình Quới & Làng du lịch Tre Việt',
          'Địa đạo Củ Chi & Chiến khu Rừng Sác Cần Giờ',
        ],
        culturalQuote: 'Giữa phố thị phồn hoa đô hội, áo bà ba vẫn đọng nét mộc mạc quê hương.',
      },
    ],
  },
];

// Danh sách tất cả 63 tỉnh thành Việt Nam để vẽ bản đồ chi tiết (các đỉnh không có cổ phục sẽ để trống/dấu chấm mộc mạc)
export const ALL_VIETNAM_PROVINCES: { id: string; name: string; x: number; y: number }[] = [
  // Miền Bắc
  { id: 'hagiang', name: 'Hà Giang', x: 200, y: 55 },
  { id: 'caobang', name: 'Cao Bằng', x: 250, y: 70 },
  { id: 'laocai', name: 'Lào Cai', x: 170, y: 75 },
  { id: 'tuyenquang', name: 'Tuyên Quang', x: 215, y: 95 },
  { id: 'langson', name: 'Lạng Sơn', x: 275, y: 100 },
  { id: 'laichau', name: 'Lai Châu', x: 135, y: 85 },
  { id: 'dienbien', name: 'Điện Biên', x: 120, y: 110 },
  { id: 'sonla', name: 'Sơn La', x: 155, y: 135 },
  { id: 'yenbai', name: 'Yên Bái', x: 185, y: 105 },
  { id: 'thainguyen', name: 'Thái Nguyên', x: 240, y: 112 },
  { id: 'bacgiang', name: 'Bắc Giang', x: 260, y: 118 },
  { id: 'phutho', name: 'Phú Thọ', x: 205, y: 125 },
  { id: 'vinhphuc', name: 'Vĩnh Phúc', x: 225, y: 128 },
  { id: 'quangninh', name: 'Quảng Ninh', x: 290, y: 130 },
  { id: 'bacninh', name: 'Bắc Ninh', x: 252, y: 130 },
  { id: 'hanoi', name: 'Hà Nội', x: 236, y: 140 },
  { id: 'haiduong', name: 'Hải Dương', x: 258, y: 146 },
  { id: 'haiphong', name: 'Hải Phòng', x: 275, y: 148 },
  { id: 'hungyen', name: 'Hưng Yên', x: 246, y: 150 },
  { id: 'hoabinh', name: 'Hòa Bình', x: 198, y: 155 },
  { id: 'hanam', name: 'Hà Nam', x: 242, y: 162 },
  { id: 'thaibinh', name: 'Thái Bình', x: 262, y: 162 },
  { id: 'namdinh', name: 'Nam Định', x: 252, y: 172 },
  { id: 'ninhbinh', name: 'Ninh Bình', x: 238, y: 185 },

  // Miền Trung
  { id: 'thanhhoa', name: 'Thanh Hóa', x: 228, y: 220 },
  { id: 'nghean', name: 'Nghệ An', x: 220, y: 260 },
  { id: 'hatinh', name: 'Hà Tĩnh', x: 242, y: 290 },
  { id: 'quangbinh', name: 'Quảng Bình', x: 255, y: 325 },
  { id: 'quangtri', name: 'Quảng Trị', x: 265, y: 350 },
  { id: 'hue', name: 'Thừa Thiên Huế', x: 275, y: 375 },
  { id: 'danang', name: 'Đà Nẵng', x: 298, y: 400 },
  { id: 'quangnam', name: 'Quảng Nam', x: 310, y: 420 },
  { id: 'quangngai', name: 'Quảng Ngãi', x: 325, y: 450 },
  { id: 'binhdinh', name: 'Bình Định', x: 338, y: 485 },
  { id: 'phuyen', name: 'Phú Yên', x: 345, y: 515 },
  { id: 'khanhhoa', name: 'Khánh Hòa', x: 348, y: 545 },
  { id: 'ninhthuan', name: 'Ninh Thuận', x: 338, y: 575 },
  { id: 'binhthuan', name: 'Bình Thuận', x: 325, y: 595 },
  { id: 'kontum', name: 'Kon Tum', x: 295, y: 455 },
  { id: 'gialai', name: 'Gia Lai', x: 300, y: 485 },
  { id: 'daklak', name: 'Đắk Lắk', x: 308, y: 520 },
  { id: 'daknong', name: 'Đắk Nông', x: 288, y: 550 },
  { id: 'lamdong', name: 'Lâm Đồng', x: 312, y: 565 },

  // Miền Nam
  { id: 'binhphuoc', name: 'Bình Phước', x: 275, y: 575 },
  { id: 'tayninh', name: 'Tây Ninh', x: 245, y: 590 },
  { id: 'binhduong', name: 'Bình Dương', x: 262, y: 600 },
  { id: 'dongnai', name: 'Đồng Nai', x: 275, y: 608 },
  { id: 'bariavungtau', name: 'Bà Rịa - Vũng Tàu', x: 280, y: 630 },
  { id: 'saigon', name: 'TP. Hồ Chí Minh', x: 255, y: 615 },
  { id: 'longan', name: 'Long An', x: 240, y: 625 },
  { id: 'tiengiang', name: 'Tiền Giang', x: 242, y: 636 },
  { id: 'dongthap', name: 'Đồng Tháp', x: 215, y: 635 },
  { id: 'angiang', name: 'An Giang', x: 195, y: 645 },
  { id: 'bentre', name: 'Bến Tre', x: 248, y: 645 },
  { id: 'vinhlong', name: 'Vĩnh Long', x: 232, y: 652 },
  { id: 'cantho', name: 'Cần Thơ', x: 220, y: 660 },
  { id: 'travinh', name: 'Trà Vinh', x: 245, y: 665 },
  { id: 'haugiang', name: 'Hậu Giang', x: 216, y: 672 },
  { id: 'soctrang', name: 'Sóc Trăng', x: 232, y: 678 },
  { id: 'kiengiang', name: 'Kiên Giang', x: 185, y: 665 },
  { id: 'baclieu', name: 'Bạc Liêu', x: 215, y: 692 },
  { id: 'camau', name: 'Cà Mau', x: 195, y: 710 },
];
