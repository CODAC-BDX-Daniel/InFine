/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import role from "../../component/auth/role";
import { useRouter } from "next/router";
import { getCookies, checkCookies } from "cookies-next";
import Footer from "../../component/common/Footer";
import SignInForm from "../../component/auth/SignInForm";
import TestPage from "../../component/TestPage";
import SubNavBarAdmin from "../../component/common/SubNavbarAdmin";
import Link from "next/link";
import { checkIfAdmin } from "../../utils/utilities";
import Loader from "../../component/common/Loader";

export default function Admin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    checkIfAdmin(router);
    setUserToken(getCookies("access_token"));
    setIsLoading(false);
  }, []);

  //Use utils to get token from cookie et settoken -> this token is used for event deletion

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <SubNavBarAdmin />
      <TestPage />
    </div>
  );
}
