/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/common/Loader";
import { eventsExample } from "../../utils/events";
import PaginationAdmin from "../../component/common/PaginationAdmin";
import { getUserToken } from "../../utils/utilities";
import { useRouter } from "next/router";
import { getCookies, checkCookies } from "cookies-next";
import role from "../../component/auth/role";
import SubNavBarAdmin from "../../component/common/SubNavbarAdmin";
import Image from "next/image";

const CreateEvent = () => {
  const router = useRouter();
  const [pageQtity, setPageQtity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [start, setStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [eventsList, setEventsList] = useState(eventsExample);

  const handleChangePage = (targetPage) => {
    setCurrentPage(targetPage);
    const newStartValue = (targetPage - 1) * rows;
    setStart(newStartValue);
  };

  //ENDPOINT
  const endpoint = `https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=met_agenda&q=lastdate>= %23now()&facet=location_city&facet=origin_title&refine.location_region=Nouvelle-Aquitaine&rows=${rows}&start=${start}`;

  useEffect(() => {
    setIsLoading(true);
    //get User Token
    const tokenFromCookie = getUserToken();
    //if no token, redirect to home page
    if (!tokenFromCookie) {
      router.push("/");
      setIsLoading(false);
      return;
    } else {
      setUserToken(tokenFromCookie);
    }

    //Check if role admin ok
    if (checkCookies("access_token")) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const userRole = role(getCookies("access_token"));
    }

    if (userRole !== "admin") {
      setIsLoading(false);
      alert("Espace Interdit");
      router.push("/auth/Login");
    }

    //fetch events from 3rd party API
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(endpoint);
        setEventsList(response.data.records);
        //Set page qty
        const pageQty = Math.ceil(response.data.nhits / rows);
        setPageQtity(pageQty);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [start]);

  //HANDLE FUNCTIONS
  const handleAddEvent = async (event) => {
    setIsLoading(true);
    try {
      const token = userToken;
      const endPoint = "/api/events/";
      const payload = {
        location_image: event.fields.location_image ?? null,
        title_fr: event.fields.title_fr,
        description_fr: event.fields.description_fr,
        keywords_fr: event.fields.keywords_fr,
        location_address: event.fields.location_address,
        location_coordinates: [
          event.fields.location_coordinates[1],
          event.fields.location_coordinates[0],
        ],
        lastdate: event.fields.lastdate,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(endPoint, payload, config);
      if (response.status === 201 && response.data.success) {
        alert("Event created with success");
        setIsLoading(false);
      } else {
        throw new Error("Event creation failed");
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <SubNavBarAdmin />
      <div className="grid grid-cols-2 gap-4 border-2 p-20">
        {eventsList?.map((event) => (
          <div
            key={event.recordid}
            className="bg-GrayPrimary-1 shadow-BluePrimary-1  mt-10 flex rounded border-2 p-5 shadow-lg "
          >
            {event.fields.location_image ? (
              <Image
                alt={event.fields.title_fr}
                src={event.fields.location_image}
                className="mr-5 block h-40 w-40"
                width={400}
                height={50}
              />
            ) : (
              <Image
                src="/no-photo.png"
                alt="No Image"
                className="mr-5 block h-40 w-40"
                width={400}
                height={50}
              />
            )}
            <div className="ml-10 w-full flex-col">
              <div className="mb-5 flex justify-end">
                <button
                  onClick={() => handleAddEvent(event)}
                  className="w-30 block h-10 rounded border bg-blue-500 p-2  font-bold  text-white hover:bg-blue-700"
                >
                  Ajouter cet évènement
                </button>
              </div>
              <div className="w-full">
                <p>
                  <span>Commune:</span> {event.fields.location_city}
                </p>
                <p>
                  <span>Date:</span>
                  {event.fields.firstdate}
                </p>
                <p>Description: {event.fields.description_fr}</p>
                <p>Adresse: {event.fields.location_address}</p>
              </div>
            </div>
          </div>
        ))}
        <PaginationAdmin
          pageQtity={pageQtity}
          handleChangePage={handleChangePage}
        />
      </div>
    </>
  );
};

export default CreateEvent;
