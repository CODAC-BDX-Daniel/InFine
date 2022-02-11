/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import SubNavBarAdmin from "../../component/common/SubNavbarAdmin";
import { getCookies, checkCookies } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkIfAdmin } from "../../utils/utilities";
import Loader from "../../component/common/Loader";
import EventCard from "../../component/admin/Events/EventCard";
import SearchBar from "../../component/admin/Events/SearchBar";
import Link from "next/link";

export default function EventAdmin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [eventsList, setEventsList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    checkIfAdmin(router);
    const tokenFromCookie = getCookies("access_token");
    setUserToken(tokenFromCookie.access_token);
    const fetchEventsFromDb = async () => {
      setIsLoading(true);
      const endpoint = "/api/events";
      let config = {
        headers: {
          Authorization: `Bearer ${tokenFromCookie.access_token}`,
        },
      };
      const response = await axios.get(endpoint, config);
      if (response.status === 200 && response.statusText === "OK") {
        setEventsList(response.data.data);
      }
      setIsLoading(false);
    };
    fetchEventsFromDb();
  }, [refresh]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SubNavBarAdmin />
      <SearchBar
        eventsList={eventsList}
        setEventsList={setEventsList}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <Link href="/admin/CreateEvent">
        <button className="block bg-BluePrimary-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10">
          Créer un évènement
        </button>
      </Link>

      {eventsList.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          userToken={userToken}
          setIsLoading={setIsLoading}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ))}
    </div>
  );
}
