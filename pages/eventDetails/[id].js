import EventItinerary from "../../component/eventDetails/EventItinerary";
import EventDetailsInfo from "../../component/eventDetails/EventDetailsInfo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkCookies, getCookies } from "cookies-next";
import Axios from "axios";
import Loader from "../../component/common/Loader";
import AddComment from "../../component/common/AddComment";

import AddBooking from "../../component/common/AddBooking";
import AddNote from "../../component/common/AddNote";

const EventDetails = () => {
  const router = useRouter();
  const token = getCookies("access_token").access_token;
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  function getEventAxios() {
    Axios.get(`../api/events/${id}`, {})
      .then((res) => {
        setEventDetails(res.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!router.isReady) return;
    setId(router.query.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (id) {
      getEventAxios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div>
          <h1 className="text-center text-5xl font-normal leading-normal mt-0 mb-2 text-red-800">
            INFORMATIONS SUR L&apos;EVENEMENT
          </h1>
          <div className={"m-5"}>
            <EventDetailsInfo eventDetails={eventDetails} />
          </div>
          {checkCookies("access_token") ? (
            <div className={"m-5"}>
              <div className={"m-5"}>
                <AddBooking id={id} />
              </div>
              <div className={"m-5"}>
                <AddComment id={id} />
              </div>
              <div className={"m-5"}>
                <AddNote id={id} />
              </div>
              <EventItinerary eventDetails={eventDetails} />
            </div>
          ) : (
            <p className={"font-semibold text-center p-5"}>
              Vous devez être connecté pour voir l&apos;itinéraire
            </p>
          )}
          <div>{/*<EventPictures/>*/}</div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EventDetails;
