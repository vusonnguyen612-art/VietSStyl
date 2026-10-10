export type OutfitId = 'ao-ba-ba' | 'ao-dai' | 'ao-tu-than' | 'ao-ngu-than' | 'ao-nhat-binh' | 'ao-tac' | 'ao-giao-linh' | 'ao-vien-linh';

export type HairStyleId = 'braids' | 'bun' | 'low-tie' | 'short';

export type HatId = 'non-la' | 'non-quai-thao' | 'khan-van-hoang-gia' | 'khan-dong' | 'khan-mo-qua';

export type AccessoryId = 'non-la' | 'khan-mo-qua' | 'khan-van' | 'khan-ran' | 'non-quai-thao' | 'nhat-binh-crown' | 'tram-cai' | 'that-lung-vang' | 'none';

export type FootwearId = 'guoc-moc' | 'hai-theu' | 'dep-quai';

export type CardRarity = 'SSR' | 'SR' | 'R';

export interface CardStats {
  elegance: number;     // Độ tao nhã / Phẩm vị (0-100)
  solemnity: number;    // Độ uy nghiêm / Điển lễ (0-100)
  versatility: number;  // Độ linh hoạt / Đời sống (0-100)
  culturePower: number; // Điểm Cổ Phong (0-9999)
}

export interface OutfitDefinition {
  id: OutfitId;
  name: string;
  subTitle: string;
  era: string;
  region: string;
  badge: string;
  gender?: 'female' | 'male' | 'all';
  description: string;
  historyNote: string;
  // Thuộc tính thẻ bài sưu tầm
  cardCode: string;
  rarity: CardRarity;
  rarityLabel: string;
  cardImage: string;
  dollImage?: string;
  element: string;
  specialSkill: string;
  collectorQuote: string;
  stats: CardStats;
  structure: {
    flaps: string;
    collar: string;
    sleeves: string;
    buttons: string;
    undergarment: string;
    bottom: string;
  };
  defaultColors: {
    primary: string; // Outer shirt/robe
    secondary?: string; // Collar/accent/sash
    inner?: string; // Halter yếm or inner collar
    pants: string;
    hat?: string;
  };
  defaultAccessory: AccessoryId;
  recommendedHair: HairStyleId;
  colorPalettes: {
    name: string;
    hex: string;
    meaning: string;
  }[];
}

export interface AiEvaluationResult {
  overallScore: number;
  colorHarmonyScore: number;
  colorHarmonyComment: string;
  eventSuitabilityScore: number;
  eventSuitabilityComment: string;
  title: string;
  overallVerdict: string;
  suggestions: string[];
}

export interface SavedOutfitCard {
  id: string;
  cardCode: string;
  name: string;
  outfitId: OutfitId;
  outfitName: string;
  shirtColor: string;
  shirtColorName?: string;
  pantsColor: string;
  pantsColorName?: string;
  bottomId?: string;
  hatId: string;
  hatName?: string;
  hatColor: string;
  hasSilverNecklace: boolean;
  selectedAccessories?: string[];
  shoeId?: string;
  shoesName?: string;
  skinColor?: string;
  hairStyle?: string;
  dollImage?: string;
  eventName: string;
  rarity: CardRarity;
  createdAt: string;
  aiEvaluation?: AiEvaluationResult;
}

export interface TeamMember {
  id: string;
  name: string;
  roleTitle?: string;
  gender: 'female' | 'male';
  outfitId: OutfitId;
  outfitName: string;
  shirtColor: string;
  shirtColorName?: string;
  pantsColor: string;
  pantsColorName?: string;
  bottomId?: string;
  hatId?: string;
  hatName?: string;
  hasSilverNecklace: boolean;
}

export interface TeamAiEvaluationResult {
  overallScore: number;
  colorHarmonyScore: number;
  colorHarmonyComment: string;
  eventSuitabilityScore: number;
  eventSuitabilityComment: string;
  styleCompatibilityScore: number;
  styleCompatibilityComment: string;
  title: string;
  overallVerdict: string;
  suggestions: string[];
}

