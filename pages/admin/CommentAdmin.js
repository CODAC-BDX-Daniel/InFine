/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import SubNavBarAdmin from "../../component/common/SubNavbarAdmin";
import Footer from "../../component/common/Footer";
import { getCookies, checkCookies } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import role from "../../component/auth/role";
import { checkIfAdmin } from "../../utils/utilities";
import Loader from "../../component/common/Loader";
import CommentCard from "../../component/admin/Comments/CommentCard";

export default function CommentAdmin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    checkIfAdmin(router);
    //fetch all comments
    try {
      const fetchComments = async () => {
        const endpoint = "/api/comments";
        const response = await axios.get(endpoint);
        if (response.status === 200 && response.statusText === "OK") {
          setCommentsList(response.data.data);
        } else {
          throw new Error("Erreur lors de l'appel des évènements");
        }
      };
      fetchComments();
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <SubNavBarAdmin />
      <div className="flex justify-center p-10 font-bold">
        <p>COMMENTAIRES</p>
      </div>
      <div className="grid grid-cols-2">
        {commentsList.map((comment) => {
          return (
            <CommentCard
              key={comment._id}
              comment={comment}
              setIsLoading={setIsLoading}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          );
        })}
      </div>
    </>
  );
}
