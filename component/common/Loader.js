import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        className="animate-spin h-20 block"
        src="/loader_spinner.png"
        alt="loader_spinner"
        width={100}
        height={100}
      />
      <div className="text-2xl">En cours de chargement...</div>
    </div>
  );
};

export default Loader;
