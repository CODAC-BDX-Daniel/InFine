/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Event from "../common/models/event";
import AddBooking from "../common/AddBooking";
import AddComment from "./AddComment";
import AddNote from "./AddNote";
import { getCookies, checkCookies } from "cookies-next";
import Link from "next/link";
import Map from "../Map";

export default function Search() {
  const [query, setQuery] = useState();

  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => `./api/search/events?query=${query}`;
  useEffect(() => {
    axios.get("../api/events").then((res) => {
      setResults(res.data.data);
      setActive(true);
    });
  }, [active]);
  const onChange = useCallback((event) => {
    const query = event.target.value;
    if (query == null) {
      setActive(false);
    }
    setQuery(query);

    if (query.length > 0) {
      axios
        .get(searchEndpoint(query))
        .then((res) => {
          setResults([]);
          setResults(res.data.data);
          setActive(true);
        })
        .catch((err) => {
          setActive(false);
          setResults([]);
        });
    } else {
      setActive(false);
      setResults([]);
    }
  }, []);

  return (
    <div>
      <body className="bg-white text-gray-900 antialiased  ">
        <img className="max-h-80 w-full" src="/bordeaux.background.jpg" />
        <div className="from-YellowPrimary-1 via-RedPrimary-1 ... bg-gradient-to-r">
          <div className="mx-auto mb-10 h-20 max-w-md p-2">
            <div className="relative flex h-full w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
              <div className="h-18 grid w-12 place-items-center text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full pr-2 text-lg text-gray-700 outline-none "
                onChange={onChange}
                placeholder="Rechercher un évenement"
                type="search"
                value={query}
              />
            </div>
          </div>
        </div>
        <div className="mx-4">
          {active ? (
            <div className="grid grid-cols-5 gap-10 px-5">
              <Map className="w-full rounded " />
              {results.map((event) => (
                <div key={event._id}>
                  <Event event={event} />
                  <Link href={`/eventDetails/${event._id}`}>
                    <button
                      className="from-BluePrimary-1 via-BluePrimary-1 ... inline-flex w-full
                   items-center bg-gradient-to-r py-2 px-4 font-bold  text-white hover:bg-gray-400"
                    >
                      DETAILS
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No Events</p>
          )}
        </div>
      </body>
    </div>
  );
}
