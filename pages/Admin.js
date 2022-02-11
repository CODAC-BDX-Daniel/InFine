/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import role from "../component/auth/role";
import { useRouter } from "next/router";
import { getCookies, checkCookies } from "cookies-next";
import Footer from "../component/common/Footer";

import TestPage from "../component/TestPage";
import SubNavBarAdmin from "../component/common/SubNavbarAdmin";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (checkCookies("access_token")) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const userRole = role(getCookies("access_token"));
    }
    if (userRole === "admin") {
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <SubNavBarAdmin />
      <TestPage />
    </div>
  );
}
