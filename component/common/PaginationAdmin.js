import React from "react";

const PaginationAdmin = (props) => {
  const { pageQtity, handleChangePage } = props;
  const { test, username } = props;
  // const pageQtity = 10;
  const pages = [];
  const pagination = () => {
    for (let i = 1; i < pageQtity; i++) {
      pages.push(i);
    }
  };
  pagination();

  return (
    <div className="mt-10 flex shrink-0   flex-row overflow-x-scroll border-4">
      {pages.map((page) => (
        <div
          className="bg-BluePrimary-1 flex h-10 w-10 items-center justify-center border-2 border-white p-5"
          key={page}
          onClick={() => handleChangePage(page)}
        >
          <span className="cursor-pointer font-bold text-white ">{page}</span>
        </div>
      ))}
    </div>
  );
};

export default PaginationAdmin;
