import React, { useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
import StreetsList from "../StreetsList";
import { useRouter } from "next/router";
import Image from "next/image";

import { data } from "autoprefixer";

const SignUpForm = () => {
  const router = useRouter();
  const [displayRegisterBtn1, setDisplayRegisterBtn1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [displayStreetsList, setDisplayStreetsList] = useState(false);
  const [addressesList, setAddressesList] = useState([]);
  const [selectedGeocodedAddress, setSelectedGeocodedAddress] =
    useState("tata");

  const [formValue, setformValue] = React.useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    imageAvatar: "",
    street: "",
    zipCode: "",
    city: "",
    addressGeocoded: {},
  });

  const [imageAvatar, setImageAvatar] = React.useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addressInfo = {
      label: selectedGeocodedAddress.properties.label,
      name: selectedGeocodedAddress.properties.name,
      postcode: selectedGeocodedAddress.properties.postcode,
      city: selectedGeocodedAddress.properties.city,
      long: selectedGeocodedAddress.geometry.coordinates[0],
      lat: selectedGeocodedAddress.geometry.coordinates[1],
    };

    const registerFormData = new FormData();
    registerFormData.append("username", formValue.username);
    registerFormData.append("email", formValue.email);
    registerFormData.append("password", formValue.password);
    registerFormData.append(
      "password_confirmation",
      formValue.password_confirmation
    );
    registerFormData.append("address", JSON.stringify(addressInfo));
    registerFormData.append("imageAvatar", imageAvatar);

    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: "/api/auth/register",
        data: registerFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsLoading(false);
      alert("REGISTRATION SUCCESS");
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      alert("REGISTRATION FAILED :", error.message);
      router.push("/Register");
    }
  };
  const handleFileSelect = (event) => {
    setImageAvatar(event.target.files[0]);
  };

  const handleAdressGeocoding = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { street, city, zipCode } = formValue;
    const adressToGeocode = street + city;
    const endPoint = `https://api-adresse.data.gouv.fr/search/?q=${adressToGeocode}=${zipCode}`;
    const response = await axios.get(endPoint);

    // check status code
    if (response.status !== 200) {
      setIsLoading(false);
      alert("Geocoding request failed!");
      return;
    } else {
      // if status code ok and result > 0 -> store the streets list in the component displaying adresses choices
      setAddressesList(response.data.features);
      setDisplayStreetsList(true);
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {displayStreetsList && (
        <StreetsList
          data={addressesList}
          setDisplayStreetsList={setDisplayStreetsList}
          setSelectedGeocodedAddress={setSelectedGeocodedAddress}
          setDisplayRegisterBtn1={setDisplayRegisterBtn1}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="bg-white-50 flex min-h-screen w-full flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div className="mx-auto w-full p-5 sm:max-w-md">
          <h2 className="text-RedPrimary-1 mb-5 text-left text-4xl font-bold">
            Inscriptions
          </h2>

          <form onSubmit={handleAdressGeocoding}>
            <div className="mb-4">
              <div className="center mx-auto py-3">
                <div className="w-48 rounded-lg bg-white px-4 py-5 text-center shadow-lg">
                  <div className="mb-4">
                    <Image
                      src="/dogavatar.png"
                      className="inline-block h-8 rounded-full  object-contain  "
                      alt="Johnny"
                      width={100}
                      height={100}
                    />
                  </div>
                  <label className="mt-6 cursor-pointer">
                    <input
                      required
                      type="file"
                      className="file:bg-RedPrimary-1 rounded-md
                                            rounded-full border border-transparent font-semibold capitalize text-white transition file:text-white
                                            hover:bg-red-700 focus:border-red-700 focus:outline-none focus:ring focus:ring-red-200 active:bg-red-700 disabled:opacity-25"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>
              <label
                className="text-RedPrimary-1 mb-1 block"
                htmlFor="username"
              >
                Nom d&apos;utilisateur
              </label>
              <input
                id="username"
                required
                type="text"
                name="username"
                value={formValue.username}
                className="mt-1 block w-full rounded-md border
                                       border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                onChange={handleChange}
                placeholder="Votre nom"
              />

              <label className="text-RedPrimary-1 mb-1 block" htmlFor="address">
                Adresse
              </label>
              <input
                id="street"
                required
                type="text"
                name="street"
                value={formValue.address}
                className="mt-1 block w-full rounded-md border
                                       border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                onChange={handleChange}
              />

              <div className="mb-4 flex">
                <div className="mr-1 w-1/2">
                  <label
                    className="text-RedPrimary-1 mb-1 block"
                    htmlFor="postal"
                  >
                    Code Postal
                  </label>
                  <input
                    id="zipCode"
                    required
                    type="text"
                    name="zipCode"
                    className="mt-1 block w-full rounded-md border
                                                border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                    value={formValue.postal}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-1 w-1/2">
                  <label
                    className="text-RedPrimary-1 mb-1 block"
                    htmlFor="city"
                  >
                    Ville
                  </label>
                  <input
                    id="city"
                    required
                    type="text"
                    name="city"
                    className="mt-1 block w-full rounded-md border
                            border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100 "
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label className="text-RedPrimary-1 mb-1 block" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                required
                type="text"
                name="email"
                className="mt-1 block w-full rounded-md border
                                    border-gray-300 py-2 px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                value={formValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="text-RedPrimary-1 mb-1 block"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                id="password"
                required
                type="password"
                name="password"
                minLength="5"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2
                                    px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                value={formValue.password}
                onChange={handleChange}
              />

              <label
                className="text-RedPrimary-1 mb-1 block"
                htmlFor="password_confirmation"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="password_confirmation"
                required
                type="password"
                name="password_confirmation"
                minLength="5"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2
                                        px-3 shadow-sm focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:bg-gray-100"
                value={formValue.password_confirmation}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="bg-RedPrimary-1 inline-flex w-full items-center justify-center rounded-md rounded-full
                                border border-transparent px-4 py-2 font-semibold capitalize text-white transition
                                hover:bg-red-700 focus:border-red-700 focus:outline-none focus:ring focus:ring-red-200 active:bg-red-700 disabled:opacity-25"
            >
              S&apos;enregistrer
            </button>
            {/*<div className="flex items-center my-3">*/}
            {/*    <input id="terms"*/}
            {/*           type="checkbox"*/}
            {/*           className="border border-gray-300 text-red-600 shadow-sm*/}
            {/*               focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"*/}
            {/*    />*/}
            {/*    <label htmlFor="terms"*/}
            {/*           className="ml-2 block text-sm leading-5 text-RedPrimary-1">*/}
            {/*        Veuillez accepter les conditions générales*/}
            {/*    </label>*/}

            {/*</div>*/}
          </form>
        </div>
        <div>
          <Image
            className="h-48 w-96 object-contain object-right-bottom"
            src="/doglogin.png"
            alt="doglogin"
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
