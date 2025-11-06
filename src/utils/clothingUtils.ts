import {
  CLOTHING_CATEGORIES,
  type ClothingCategoryCode,
  type ClothingCategory,
} from "@/types/clothingCategory";

export const CLOTHING_MAP = new Map<ClothingCategoryCode, ClothingCategory>();
Object.values(CLOTHING_CATEGORIES).forEach((group) => {
  group.categories.forEach((category) => {
    CLOTHING_MAP.set(category.code, category);
  });
});

export const findCategoryByCode = (code: ClothingCategoryCode): ClothingCategory | undefined => {
  return CLOTHING_MAP.get(code);
};
