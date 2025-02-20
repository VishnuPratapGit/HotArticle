import React from "react";
import Category from "../components/Category";

const Categories = () => {
  const categories = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
    "category6",
  ];
  return (
    <div className="p-3 rounded-2xl border border-neutral-700">
      {categories.map((cat, index) => (
        <Category key={index} category={cat} />
      ))}
    </div>
  );
};

export default Categories;
