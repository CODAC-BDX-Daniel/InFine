import { getCookies, checkCookies } from "cookies-next";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function AddComment(id) {
  const router = useRouter();
  const token = getCookies("access_token").access_token;
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const [eventID, setEventID] = useState(id);

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const registerComment = async (event) => {
    event.preventDefault();

    const registerFormData = new FormData();
    registerFormData.append("content", content);
    registerFormData.append("pictures", image);

    const response = await axios({
      method: "post",
      url: "/api/comments/" + eventID.id,
      data: registerFormData,
      headers: { "Content-Type": "multipart/form-data", authorization: token },
    });
    alert("Commentaire ajouté avec succés");
    router.push("/profil/MyComments");
  };

  return (
    <form onSubmit={registerComment}>
      <input
        id="content"
        name="content"
        type="text"
        required
        placeholder="Votre commentaire"
        onChange={handleContent}
      />
      <input
        type="file"
        required
        className="file:text-red "
        onChange={handleFileSelect}
      />

      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        COMMENT
      </button>
    </form>
  );
}
