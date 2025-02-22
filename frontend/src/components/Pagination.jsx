import React from "react";
import Button from "./Button";

const Pagination = ({ page, setPage, length }) => {
  return (
    <div className="flex justify-center items-center gap-4 my-5">
      <Button
        heading="Previous"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
      />
      <span className="font-semibold">Page {page}</span>
      <Button
        heading="Next"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!length < 20}
      />
    </div>
  );
};

export default Pagination;
