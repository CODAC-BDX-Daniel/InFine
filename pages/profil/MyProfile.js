import React, { useEffect, useState } from "react";
import { getCookies, checkCookies } from "cookies-next";
import Axios from "axios";
import User from "../../component/common/models/user";
import { useRouter } from "next/router";
import Footer from "../../component/common/Footer";
import TestPage from "../../component/TestPage";
import Loader from "../../component/common/Loader";

const MyProfile = () => {
  const router = useRouter();

  const token = getCookies("access_token").access_token;
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!checkCookies("access_token")) {
      router.push("/auth/Login");
    }
    Axios.get("../api/users/myProfile/myInfos", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-5xl font-normal leading-normal mt-0 mb-2 text-red-800">
        MON PROFIL
      </h2>
      <div className="w-full min-h-screen bg-white-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        {isLoading ? <User user={user} /> : <Loader />}
      </div>
    </div>
  );
};

export default MyProfile;
