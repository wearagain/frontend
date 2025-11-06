import { useState } from "react";
import {
  CLOTHING_CATEGORIES,
  type MainCategory,
  type ClothingCategoryCode,
} from "@/types/clothingCategory";

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
    <div className='flex h-full overflow-hidden'>
      {/* 좌측 카테고리 */}
      <div className='w-24 bg-gray-50 flex-shrink-0'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className={`w-full py-5 text-md font-medium transition-colors ${
              activeCategory === category
                ? "bg-[var(--color-mint-light)] text-white font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 우측 카테고리 */}
      <div className='flex-1 overflow-y-auto'>
        {categories.map((category) => (
          <div key={category} id={`category-${category}`} className='px-5 py-5'>
            <h3 className='text-base font-bold mb-6'>{category}</h3>
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
                          ? "ring-2 ring-[var(--color-mint-light)]"
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
                    <span className='text-sm text-gray-700'>{item.subCategory}</span>
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
