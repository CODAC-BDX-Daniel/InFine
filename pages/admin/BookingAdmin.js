/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import SubNavBarAdmin from "../../component/common/SubNavbarAdmin";
import Footer from "../../component/common/Footer";
import { useEffect } from "react";
import { getCookies, checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import role from "../../component/auth/role";
export default function BookingAdmin() {
  const router = useRouter();
  useEffect(() => {
    if (checkCookies("access_token")) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const userRole = role(getCookies("access_token"));
    }
    if (userRole === "admin") {
    } else {
      alert("Espace Interdit");
      router.push("/auth/Login");
    }
  }, []);
  return (
    <div>
      <SubNavBarAdmin />
      <div>BOOKING ADMIN</div>
    </div>
  );
}
