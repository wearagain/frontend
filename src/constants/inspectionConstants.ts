import type { ClothingCategory } from "@/types/inspection";

// 카테고리 한글 변환 맵
export const CLOTHING_CATEGORY_MAP: Record<ClothingCategory, string> = {
  TOP_JACKET: "자켓",
  TOP_COAT: "코트",
  TOP_LONG_SLEEVE: "긴팔",
  TOP_SHORT_SLEEVE: "반팔",
  TOP_SLEEVELESS: "민소매",
  TOP_OTHER: "기타 상의",
  BOTTOM_PANTS: "바지",
  BOTTOM_SKIRT: "치마",
  DRESS_ONE_PIECE: "원피스",
  DRESS_TWO_PIECE: "투피스",
  ETC_SHOES: "신발",
  ETC_BAG: "가방",
  ETC_HAT: "모자",
  ETC_ACCESSORY: "액세서리",
  ETC_EYEWEAR: "안경",
};

// 카테고리 한글 변환 함수
export const getCategoryLabel = (category: string): string => {
  return CLOTHING_CATEGORY_MAP[category as ClothingCategory] || category;
};
