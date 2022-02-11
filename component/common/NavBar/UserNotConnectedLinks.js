import React from "react";
import Link from "next/link";

const UserNotConnectedLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center p-0 md:flex-row">
      <Link href="/contactUs">
        <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300 md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
          Contact
        </a>
      </Link>
      <Link href="/auth/Login">
        <a className="block mx-8  py-1">Connexion</a>
      </Link>
      <Link href="/auth/Register">
        <a className="block mx-8  py-1">S'enregister</a>
      </Link>
    </div>
  );
};

export default UserNotConnectedLinks;
