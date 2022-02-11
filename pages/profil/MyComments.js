import React, { useEffect, useState } from "react";
import { getCookies, checkCookies } from "cookies-next";
import Axios from "axios";
import Comment from "../../component/common/models/comment";
import { useRouter } from "next/router";
import Footer from "../../component/common/Footer";
import Loader from "../../component/common/Loader";
import Link from "next/link";

const MyProfile = () => {
  const router = useRouter();

  const token = getCookies("access_token").access_token;
  const [MyComments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const bodyParameters = {
    key: "value",
  };

  useEffect(() => {
    if (!checkCookies("access_token")) {
      router.push("/auth/Login");
    }
    Axios.get("../api/users/myProfile/myComments", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => {
        setComments(res.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <h2 className="text-5xl font-normal leading-normal mt-0 mb-2 text-red-800">
            MES COMMENTAIRES
          </h2>
          {MyComments.length === 0 ? (
            <div className="w-full min-h-screen bg-white-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
              No Comments...
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {MyComments.map((comment) => (
                <div className="h-full bg-slate-50 rounded" key={comment._id}>
                  <Comment comment={comment} />
                  <Link href={`/eventDetails/${comment.event}`}>
                    <a>Détails de l&apos;évenement</a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full min-h-screen bg-white-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
