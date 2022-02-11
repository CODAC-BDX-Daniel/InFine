import React, {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import Axios from "axios";

const libraries = ["places"];
const mapContainerStyle = {
    width: '100%',
    height: '100%',
}
const center = {
    lat: 44.8333,
    lng: -0.5667,
}

const EventDetailsInfo = () => {

    const [eventsMarkers, setEventsMarkers] = useState(null);
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        libraries,
    });

    function getAllEventAxios() {
        Axios.get(`../api/events/`, {})
            .then((res) => {
                setEventsMarkers(res.data.data);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (eventsMarkers == null) {
            getAllEventAxios()
        }
    }, [eventsMarkers])

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map";

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
            >
                {(eventsMarkers !== null) && (
                    eventsMarkers.map((eventsMarkers, index) => {
                        return (
                            <>
                                <Marker
                                    position={{
                                        lat: eventsMarkers.location[1],
                                        lng: eventsMarkers.location[0]
                                    }}
                                    key={index}
                                    onClick={() => {
                                        setSelected({
                                            lat: eventsMarkers.location[1],
                                            lng: eventsMarkers.location[0],
                                            title: eventsMarkers.title,
                                            date: eventsMarkers.date,
                                            address: eventsMarkers.address
                                        });
                                    }}
                                />
                                {selected ? (<InfoWindow
                                    position={{
                                        lat: selected.lat,
                                        lng: selected.lng
                                    }}
                                    onCloseClick={() => {
                                        setSelected(null);
                                    }}
                                >
                                    <div className={"text-center"}>
                                        <h2 className={"font-bold"}>{selected.title}</h2>
                                        <p>{selected.date}</p>
                                        <p>{selected.address}</p>
                                    </div>
                                </InfoWindow>) : null}
                            </>
                        )
                    })
                )}
            </GoogleMap>
        </div>
    )
};

export default EventDetailsInfo;
