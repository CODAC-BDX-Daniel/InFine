/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center py-200">
      <img className="w-2/5 md: w-1/5" src="/404.png" />
      <p className="text-2xl md:text-4xl">PAGE INEXISTANTE</p>
    </div>
  );
};

export default NotFound;
