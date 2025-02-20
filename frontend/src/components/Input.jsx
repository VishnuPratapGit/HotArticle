import React from "react";

const Input = ({ changeInputs = null, ...props }) => {
  return (
    <div>
      <input
        className="w-full px-4 py-2 border border-neutral-700 outline-none focus:border-rose-500"
        placeholder="Enter your password"
        onChange={changeInputs}
        autoComplete="off"
        {...props}
      />
    </div>
  );
};

export default Input;
