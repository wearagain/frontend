export type MainCategory = "상의" | "하의" | "드레스" | "기타";

export type ClothingCategoryCode =
  // 상의
  | "JK"
  | "CT"
  | "OT"
  | "SS"
  | "LS"
  | "SL"
  //하의
  | "PT"
  | "SK"
  //드레스
  | "OP"
  | "TP"
  //기타
  | "SH"
  | "BG"
  | "HT"
  | "EW"
  | "AC";

export interface ClothingCategory {
  code: ClothingCategoryCode;
  mainCategory: MainCategory;
  subCategory: string;
  icon: string;
}

export interface ClothingCategoryGroup {
  mainCategory: MainCategory;
  categories: ClothingCategory[];
}

export interface SelectedItem {
  code: ClothingCategoryCode;
  mainCategory: MainCategory;
  subCategory: string;
  count: number;
}

export const CLOTHING_CATEGORIES: Record<MainCategory, ClothingCategoryGroup> = {
  상의: {
    mainCategory: "상의",
    categories: [
      { code: "JK", mainCategory: "상의", subCategory: "자켓", icon: "topJK.svg" },
      { code: "CT", mainCategory: "상의", subCategory: "코트", icon: "topCT.svg" },
      { code: "OT", mainCategory: "상의", subCategory: "아우터", icon: "topOT.svg" },
      { code: "SS", mainCategory: "상의", subCategory: "반소매", icon: "topSS.svg" },
      { code: "LS", mainCategory: "상의", subCategory: "긴소매", icon: "topLS.svg" },
      { code: "SL", mainCategory: "상의", subCategory: "민소매", icon: "topSL.svg" },
    ],
  },

  하의: {
    mainCategory: "하의",
    categories: [
      { code: "PT", mainCategory: "하의", subCategory: "바지", icon: "bottomPT.svg" },
      { code: "SK", mainCategory: "하의", subCategory: "치마", icon: "bottomSK.svg" },
    ],
  },

  드레스: {
    mainCategory: "드레스",
    categories: [
      { code: "OP", mainCategory: "드레스", subCategory: "원피스", icon: "dressOP.svg" },
      { code: "TP", mainCategory: "드레스", subCategory: "투피스", icon: "dressTP.svg" },
    ],
  },

  기타: {
    mainCategory: "기타",
    categories: [
      { code: "SH", mainCategory: "기타", subCategory: "신발", icon: "etcSH.svg" },
      { code: "BG", mainCategory: "기타", subCategory: "가방", icon: "etcBG.svg" },
      { code: "HT", mainCategory: "기타", subCategory: "모자", icon: "etcHT.svg" },
      { code: "EW", mainCategory: "기타", subCategory: "아이웨어", icon: "etcEW.svg" },
      { code: "AC", mainCategory: "기타", subCategory: "액세서리", icon: "etcAC.svg" },
    ],
  },
};
