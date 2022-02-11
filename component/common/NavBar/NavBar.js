import React, { useState } from "react";
import UserConnectedLinks from "./UserConnectedLinks";
import Link from "next/link";
import UserNotConnectedLinks from "./UserNotConnectedLinks";
import { getCookies, checkCookies } from "cookies-next";
import Image from "next/image";

const NavBar = () => {
  const [displayMobileNavButtons, setDisplayMobileNavButtons] = useState(true);
  const handleBurgerMenuClick = () => {
    setDisplayMobileNavButtons(!displayMobileNavButtons);
  };
  return (
    <>
      <div className="bg-RedPrimary-1 flex justify-between items-center  text-white px-2 py-2 md:hidden">
        <img src="/public/logo.infine.png"/>
        <Link className="cursor-pointer" href="/">
          <img src="/public/logo.infine.png"/>
        </Link>
        <div className="flex justify-between items-center">
          <Image
            src="/burger_menu.png"
            className="inline-block h-10"
            alt="burger_menu"
            onClick={handleBurgerMenuClick}
            width={50}
            height={50}
          />
        </div>

      </div>
      <nav className="block bg-BluePrimary-1 text-white md:flex md:items-center md:py-2 md:px-2 h-30">
        <Link href="/">
          <h3 className="hidden md:block grow text-left cursor-pointer">
            <img src="/logo.infine.png" className="h30 w-20"/>
          </h3>
        </Link>
        {displayMobileNavButtons && (
          <div className="block md:hidden">
            {checkCookies("access_token") ? (
              <UserConnectedLinks />
            ) : (
              <UserNotConnectedLinks />
            )}

            {/**/}
          </div>
        )}

        {!checkCookies("access_token")}
        <div className="hidden md:block">
          {checkCookies("access_token") ? (
            <UserConnectedLinks />
          ) : (
            <UserNotConnectedLinks />
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
