import React from "react";

const Button = ({ heading = "Continue", nextStep = () => {}, ...props }) => {
  return (
    <div>
      <button
        onClick={nextStep}
        {...props}
        className="text-white w-ful py-2 px-4 rounded-sm hover:bg-rose-600 bg-rose-500 w-full transition-colors font-medium"
      >
        {heading}
      </button>
    </div>
  );
};

export default Button;
