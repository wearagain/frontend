import { useState } from "react";
import {
  CLOTHING_CATEGORIES,
  type MainCategory,
  type ClothingCategoryCode,
} from "@/types/clothingCategory.ts";

const getIconPath = (icon: string) => `/images/${icon}`;

interface Props {
  selectedItems: Map<ClothingCategoryCode, number>;
  onItemToggle: (code: ClothingCategoryCode) => void;
}

export default function ClothingCategoryDisplay({ selectedItems, onItemToggle }: Props) {
  const [activeCategory, setActiveCategory] = useState<MainCategory>("상의");
  const categories = Object.keys(CLOTHING_CATEGORIES) as MainCategory[];

  const scrollToCategory = (category: MainCategory) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className='flex h-full'>
      {/* 좌측 카테고리 */}
      <div className='sticky top-0 self-start h-full overflow-y-auto w-24 bg-[#F4F5F6] flex-shrink-0'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className={`w-full py-5 text-md font-medium transition-colors ${
              activeCategory === category
                ? "bg-[var(--color-mint-light)] text-white font-semibold"
                : "text-[#222222] hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 우측 카테고리 */}
      <div className='flex-1 pb-[64px] overflow-y-auto custom-scroll'>
        {categories.map((category) => (
          <div key={category} id={`category-${category}`} className='px-5 py-5'>
            <h3 className='text-base text-[#222222] font-bold mb-6'>{category}</h3>
            <div className='grid grid-cols-3 gap-3'>
              {CLOTHING_CATEGORIES[category].categories.map((item) => {
                const isSelected = selectedItems.has(item.code);
                const count = selectedItems.get(item.code) || 0;

                return (
                  <button
                    key={item.code}
                    onClick={() => onItemToggle(item.code)}
                    className='flex flex-col items-center relative'
                  >
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl relative ${
                        isSelected
                          ? ""
                          : "hover:bg-[var(--color-mint-light)]"
                      }`}
                    >
                      <img src={getIconPath(item.icon)} alt={item.subCategory} />
                      {isSelected && count > 0 && (
                        <div className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-mint-light)] text-white text-xs font-bold flex items-center justify-center'>
                          {count}
                        </div>
                      )}
                    </div>
                    <span className='text-sm text-[#222222]'>{item.subCategory}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
