import { getCookies, checkCookies } from "cookies-next";
import axios from "axios";
import { useState } from "react";
import { format } from "util";
import { useRouter } from "next/router";
export default function AddNote(id) {
  const token = getCookies("access_token").access_token;
  const router = useRouter();
  const [event, setEvent] = useState(id);
  const [num, setNum] = useState(0);
  const Add = async () => {
    await axios({
      method: "post",
      data: {
        note: num,
      },

      url: "/api/events/" + event.id,
      headers: { "Content-Type": "multipart/form-data", authorization: token },
    }).catch((error) => {
      if (error.message == "Request failed with status code 400") {
        alert("Vous avez deja noté l'evenement");
      }
    });
    router.push("/profil/MyComments");
  };

  return (
    <div>
      <input
        type="number"
        required
        min="1"
        max="5"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />

      <button
        onClick={Add}
        className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        NOTE
      </button>
    </div>
  );
}
