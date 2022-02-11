import { getCookies, checkCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
export default function AddBooking(id) {
  const token = getCookies("access_token").access_token;
  const [event, setEvent] = useState(id);
  const router = useRouter();
  const Add = async () => {
    await axios({
      method: "post",
      url: "/api/bookings/" + event.id,
      headers: { "Content-Type": "multipart/form-data", authorization: token },
    }).catch((error) => {
      if (error.message == "Request failed with status code 401") {
        alert("Vous etez deja inscris a l'evenement");
      }
    });
    router.push("/profil/MyEvents");
  };

  return (
    <button
      onClick={Add}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      BOOK
    </button>
  );
}
