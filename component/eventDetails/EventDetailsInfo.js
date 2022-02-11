import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";
import Comment from "../common/models/comment";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const EventDetailsInfo = (eventDetails) => {
  const [eventMarker, setEventMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map";

  return (
    <div className={"mt-6 auto-cols-auto"}>
      <div className={"inline-block h-1/2 w-1/2"}>
        <p className={"flex justify-center p-4 text-2xl font-bold"}>
          Titre : {eventDetails.eventDetails.event.title}
        </p>
        <p>
          Description : <br /> {eventDetails.eventDetails.event.description}
        </p>
        <p>Date : {eventDetails.eventDetails.event.date}</p>
        <p>Adresse : {eventDetails.eventDetails.event.address}</p>
        <p>Mots clefs : {eventDetails.eventDetails.event.keywords}</p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className={"flex justify-center pt-4"}>
          Nombre d&apos;inscrits à l&apos;événement :{" "}
          {eventDetails.eventDetails.event.users.length}
        </p>
        {eventDetails.eventDetails.moyenne !== null ? (
          <p className={"flex justify-center"}>
            Note : {eventDetails.eventDetails.moyenne}/5
          </p>
        ) : (
          <p className={"flex justify-center"}>Note : Pas encore de note</p>
        )}
        {eventDetails.eventDetails.event.picture ? (
          <Image
            className="h-48 w-96 object-contain object-right-bottom object-center"
            src={eventDetails.eventDetails.event.picture}
            alt={eventDetails.eventDetails.event.title}
            width={200}
            height={200}
          />
        ) : null}
        <p className={"flex justify-center p-4 text-2xl font-bold"}>
          Commentaires de l&apos;évenement :
        </p>
        {eventDetails.eventDetails.event.comments ? (
          eventDetails.eventDetails.event.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No Comments</p>
        )}
      </div>
      <div className={"inline-block h-1/2 w-1/2"}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={{
            lat: eventDetails.eventDetails.event.location[1],
            lng: eventDetails.eventDetails.event.location[0],
          }}
          options={options}
        >
          <Marker
            position={{
              lat: eventDetails.eventDetails.event.location[1],
              lng: eventDetails.eventDetails.event.location[0],
            }}
            key={"event"}
            onClick={() => {
              setEventMarker({
                lat: eventDetails.eventDetails.event.location[1],
                lng: eventDetails.eventDetails.event.location[0],
              });
            }}
          />
          {eventMarker ? (
            <InfoWindow
              position={{
                lat: eventDetails.eventDetails.event.location[1],
                lng: eventDetails.eventDetails.event.location[0],
              }}
              onCloseClick={() => {
                setEventMarker(null);
              }}
            >
              <div className={"text-center"}>
                <h2 className={"font-bold"}>
                  {eventDetails.eventDetails.event.title}
                </h2>
                <p>Date : {eventDetails.eventDetails.event.date}</p>
                <p>{eventDetails.eventDetails.event.address}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </div>
  );
};

export default EventDetailsInfo;
