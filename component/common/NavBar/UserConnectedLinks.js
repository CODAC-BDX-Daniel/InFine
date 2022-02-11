import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookies, checkCookies } from "cookies-next";
import role from "../../auth/role";

const UserConnectedLinks = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (checkCookies("access_token")) {
      const connecte = role(getCookies("access_token"));
      if (connecte === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    // <div className='w-full flex justify-between items-center'>
    <div className="flex flex-col items-center justify-center p-0 md:flex-row">
      <Link href="/contactUs">
        <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300 md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
          Contact
        </a>
      </Link>
      <Link href="/profil/MyProfile">
        <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300 md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
          Mon Profil
        </a>
      </Link>
      <Link href="/profil/MyEvents">
        <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300  md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
          Mes Évènements
        </a>
      </Link>

      <Link href="/profil/MyComments">
        <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300  md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
          Mes Commentaires
        </a>
      </Link>
      {isAdmin && (
        <Link href="/admin/Admin">
          <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300  md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
            Admin
          </a>
        </Link>
      )}
      <Link href="/auth/LogOut">
        <a className="w-screen block mx-8 py-1 text-center  hover:bg-RedPrimary-1 transition ease-linear duration-300  md:w-auto md:hover:bg-transparent md:hover:text-RedPrimary-1">
          Déconnexion
        </a>
      </Link>
    </div>
  );
};

export default UserConnectedLinks;
