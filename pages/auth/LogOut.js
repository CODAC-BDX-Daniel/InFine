import React from "react";
import { checkCookies, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LogOut = () => {
  const router = useRouter();
  useEffect(() => {
    if (checkCookies("access_token")) {
      removeCookies("access_token");
      alert("DECONNEXION SUCCESS");
      router.push("/");
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default LogOut;
