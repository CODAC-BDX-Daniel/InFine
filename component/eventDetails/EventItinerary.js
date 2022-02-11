import React, {useEffect, useState, useRef, useCallback} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DirectionsRenderer,
    DirectionsService
} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {getCookies} from "cookies-next";
import Axios from "axios";
import {htmlToText} from "html-to-text";

const libraries = ["places"];
const mapContainerStyle = {
    width: '100%',
    height: '400px',
}

const EventItinerary = (eventDetails) => {

    const [direction, setDirection] = useState({
        lat: eventDetails.eventDetails.event.location[1],
        lng: eventDetails.eventDetails.event.location[0]
    });
    const [userMarker, setUserMarker] = useState(null);
   const [travelModeRadio, setTravelModeRadio] = useState('DRIVING');
    const [response, setResponse] = useState(null);
    const [isLoadingNav, setIsLoadingNav] = useState(true);
    const [eventMarker, setEventMarker] = useState(null);

    const token = getCookies("access_token").access_token;
    const [isLoading, setIsLoading] = useState(false);

    function getUserCoordinates() {
        Axios.get("../api/users/myProfile/myInfos", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
            .then((res) => {
                setUserMarker(res.data.data.coordinates);
                setIsLoading(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (userMarker == null) {
            getUserCoordinates()
        }
    }, [userMarker])

    useEffect(() => {
        setResponse(null)
    }, [travelModeRadio])

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, []);

    const resultSearch = useCallback(({lat, lng}) => {
        setUserMarker({lat: lat, lng: lng});
        setResponse(null)
    }, []);

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map";

    const directionsCallback = (apiResponse) => {
        if (apiResponse !== null) {
            if (apiResponse.status === 'OK') {
                setResponse(apiResponse);
                setIsLoadingNav(false);
            } else {
                console.log('response: ', apiResponse)
            }
        } else {
            console.log('direction callback else else')
        }
    }

    return (
        <div>
            <div  className={"auto-cols-auto"}>
                <div className={"inline-block h-1/2 w-1/2"}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        onLoad={onMapLoad}
                    >
                        <>
                            {response == null && (
                                <DirectionsService
                                    options={{
                                        destination: direction,
                                        origin: userMarker,
                                        travelMode: travelModeRadio
                                    }}
                                    callback={directionsCallback}
                                />
                            )}
                            {response !== null && (
                                <DirectionsRenderer
                                    options={{
                                        directions: response
                                    }}
                                />
                            )}
                        </>
                        <Marker
                            position={{
                                lat: eventDetails.eventDetails.event.location[1],
                                lng: eventDetails.eventDetails.event.location[0]
                            }}
                            key={"event"}
                            onClick={() => {
                                setEventMarker({
                                    lat: eventDetails.eventDetails.event.location[1],
                                    lng: eventDetails.eventDetails.event.location[0]
                                });
                            }}
                        />
                        {eventMarker ? (<InfoWindow
                            position={{
                                lat: eventDetails.eventDetails.event.location[1],
                                lng: eventDetails.eventDetails.event.location[0]
                            }}
                            onCloseClick={() => {
                                setEventMarker(null);
                            }}
                        >
                            <div>
                                <h2>{eventDetails.eventDetails.event.title}</h2>
                                <p>{eventDetails.eventDetails.event.date}</p>
                            </div>
                        </InfoWindow>) : null}
                    </GoogleMap>
                </div>
                <div  className={"inline-block h-1/2 w-1/2 pl-4"}>
                    <div className=''>
                        <div className='form-group custom-control custom-radio mr-4'>
                            <input
                                id='DRIVING'
                                className='custom-control-input'
                                name='travelModeRadio'
                                type='radio'
                                checked={travelModeRadio === 'DRIVING'}
                                onChange={() => {
                                    setTravelModeRadio('DRIVING')
                                }}
                            />
                            <label className='custom-control-label' htmlFor='DRIVING'>Voiture</label>
                        </div>

                        <div className='form-group custom-control custom-radio mr-4'>
                            <input
                                id='BICYCLING'
                                className='custom-control-input'
                                name='travelModeRadio'
                                type='radio'
                                checked={travelModeRadio === 'BICYCLING'}
                                onChange={() => {
                                    setTravelModeRadio('BICYCLING')
                                }}
                            />
                            <label className='custom-control-label' htmlFor='BICYCLING'>Vélo</label>
                        </div>

                        <div className='form-group custom-control custom-radio mr-4'>
                            <input
                                id='TRANSIT'
                                className='custom-control-input'
                                name='travelModeRadio'
                                type='radio'
                                checked={travelModeRadio === 'TRANSIT'}
                                onChange={() => {
                                    setTravelModeRadio('TRANSIT')
                                }}
                            />
                            <label className='custom-control-label' htmlFor='TRANSIT'>Transport en commun</label>
                        </div>

                        <div className='form-group custom-control custom-radio mr-4'>
                            <input
                                id='WALKING'
                                className='custom-control-input'
                                name='travelModeRadio'
                                type='radio'
                                checked={travelModeRadio === 'WALKING'}
                                onChange={() => {
                                    setTravelModeRadio('WALKING')
                                }}
                            />
                            <label className='custom-control-label' htmlFor='WALKING'>A pieds</label>
                        </div>
                    </div>
                    <div className={"pt-4 pb-4"}>
                        <Search panTo={panTo} resultSearch={resultSearch}/>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Informations</h3>
                        {(response !== null && response.request.travelMode !== 'TRANSIT') && (
                            <p>
                                Distance : {response.routes[0].legs[0].distance.text}<br/>
                                Durée : {response.routes[0].legs[0].duration.text}<br/>
                                Départ : {response.routes[0].legs[0].start_address}<br/>
                                Destination : {response.routes[0].legs[0].end_address}<br/>
                            </p>
                        )}
                        {(response !== null && response.request.travelMode === 'TRANSIT') && (
                            <p>
                                Distance : {response.routes[0].legs[0].distance.text}<br/>
                                Durée : {response.routes[0].legs[0].duration.text}<br/>
                                Départ : {response.routes[0].legs[0].start_address}<br/>
                                Destination : {response.routes[0].legs[0].end_address}<br/>
                                Tarif : {response.routes[0].fare.text}
                            </p>
                        )}

                    </div>
                </div>
            </div>
            <div>
                <h4 className="font-bold mt-4 mb-2 text-2xl">Itinéraire</h4>
                {(response !== null) && (
                    response.routes[0].legs[0].steps.map((steps, index) => {
                        return (
                            <p key={index}>Etape {index + 1} : {htmlToText(steps.instructions)}</p>
                        )
                    })
                )}
            </div>
        </div>
    )

    function Search({panTo, resultSearch}) {
        const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
            requestOptions: {
                location: {lat: () => eventDetails.eventDetails.event.lat, lng: () => eventDetails.eventDetails.event.lng},
                radius: 200 * 1000,
            }
        })
        return (
            <div className="search">
                <Combobox
                    onSelect={async (address) => {
                        setValue(address, false);
                        clearSuggestions();
                        try {
                            const results = await getGeocode({address});
                            const {lat, lng} = await getLatLng(results[0])
                            resultSearch({lat, lng})
                            panTo({lat, lng});
                        } catch (error) {
                            console.log("error!")
                        }
                    }}
                >
                    <ComboboxInput value={value} onChange={(e) => {
                        setValue(e.target.value);
                    }}
                                   placeholder="Entrez une adresse"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === "OK" && data.map(({id, description}) => <ComboboxOption key={id}
                                                                                                value={description}/>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        )
    }
}

export default EventItinerary;