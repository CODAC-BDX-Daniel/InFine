import React from "react";
import Image from "next/image";

const TestPage = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-white-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h4 className="block mb-2 text-RedPrimary-1 ">Bienvenue Administrateur</h4>
        </div>
        <div>
          <Image
            className="object-contain h-48 w-96 object-right-bottom"
            src="/doglogin.png"
            alt="doglogin "
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
