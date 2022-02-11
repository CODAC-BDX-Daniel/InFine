import React, { useEffect, useState } from "react";
import { getCookies, checkCookies } from "cookies-next";

import Event from "../../component/common/models/event";
import { useRouter } from "next/router";
import Footer from "../../component/common/Footer";
import Loader from "../../component/common/Loader";

import axios from "axios";

import Link from "next/link";

const MyProfile = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState();
  const token = getCookies("access_token").access_token;
  const [MyEvents, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Delete = async (id) => {
    await axios({
      method: "delete",

      url: "/api/bookings/" + id,
      headers: { "Content-Type": "multipart/form-data", authorization: token },
    }).then(alert("EVENEMENT SUPPRIME"));
    setRefresh(Math.random());
  };

  //x
  useEffect(() => {
    if (!checkCookies("access_token")) {
      router.push("/auth/Login");
    }

    axios
      .get("../api/users/myProfile/myEvents", {
        headers: {
          Authorization: `token ${token}`,
        },
      })

      .then((res) => {
        setEvents(res.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h2 className="mt-0 mb-2 text-5xl font-normal leading-normal text-red-800">
            MES EVENEMENTS
          </h2>
          {MyEvents.length === 0 ? (
            <div className="bg-white-50 flex min-h-screen w-full flex-col items-center pt-6 sm:justify-center sm:pt-0">
              No Events...
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {MyEvents.map((event) => (
                <div className="h-full rounded bg-slate-50" key={event._id}>
                  <Event event={event} />{" "}
                  <button
                    onClick={() => Delete(event._id)}
                    className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  >
                    SUPPRIMER
                  </button>
                  <Link href={`/eventDetails/${event._id}`}>
                    <a>DETAILS</a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white-50 flex min-h-screen w-full flex-col items-center pt-6 sm:justify-center sm:pt-0">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
