import { useEffect, useState } from "react";
import databaseServices from "../services/DatabaseServices";
import { X } from "lucide-react";

const MultiCategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState(["trending"]);
  const [loading, setLoading] = useState(true);

  const selectedCategoryHandler = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const removeCategoryHandler = (category) => {
    let temp = [...selectedCategory].filter((item) => item !== category);
    setSelectedCategory(temp);
  };

  useEffect(() => {
    databaseServices
      .getAllCategories()
      .then((data) => {
        if (data) {
          setCategories(data);
          setLoading(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1 className="text-center">Loading...</h1>;

  return (
    <div className="mt-4 max-w-md mx-auto">
      <div className="flex flex-wrap gap-4">
        {categories.map(({ id, name }) => (
          <div
            key={id}
            onClick={() => selectedCategoryHandler(name)}
            className="border text-sm p-2 px-5 rounded-4xl border-neutral-700 hover:bg-neutral-800 cursor-pointer transition-colors select-none"
          >
            {name}
          </div>
        ))}
      </div>
      <hr className="my-5 border-neutral-700" />
      <div className="flex flex-wrap gap-4 font">
        {selectedCategory.map((category) => (
          <div
            key={category}
            className="flex items-center justify-center gap-1 border p-2 px-5 rounded-4xl border-neutral-700 hover:bg-neutral-800 transition-colors select-none"
          >
            <span className="text-sm">{category}</span>
            <span
              onClick={() => removeCategoryHandler(category)}
              className="cursor-pointer"
            >
              <X className="hover:text-rose-400 transition-colors" size={20} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCategorySelector;
