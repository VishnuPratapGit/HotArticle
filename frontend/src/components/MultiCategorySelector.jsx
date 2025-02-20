import { useState } from "react";

const MultiCategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Sports",
    "Fashion",
    "Health",
  ];

  const selectedCategoryHandler = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const removeCategoryHandler = (category) => {
    let temp = [...selectedCategory].filter((item) => item !== category);
    setSelectedCategory(temp);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => selectedCategoryHandler(category)}
            className="border p-2 px-5 rounded-4xl border-neutral-700 hover:bg-neutral-800 cursor-pointer transition-colors select-none"
          >
            {category}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-neutral-600">
        {selectedCategory.map((category) => (
          <div
            key={category}
            onClick={() => removeCategoryHandler(category)}
            className="border p-2 px-5 rounded-4xl border-neutral-700 hover:bg-neutral-800 cursor-pointer transition-colors select-none"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCategorySelector;
