import React, { useState } from "react";
import axios from "axios";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Loader from "../common/Loader";

/*import Cookies from '/path/to/js.cookie.mjs'*/

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        // Cookies.set("access_token");
        setCookies("access_token", res.data.access_token);
        alert("CONNEXION SUCCESS");
        router.push("/");
      })
      .catch((err) => {
        alert("CONNEXION FAILED : username and/or password wrong");
      });
  };
  return (
    <div>
      <div className="w-full min-h-screen bg-white-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h4 className="block mb-2 text-RedPrimary-1 ">Bienvenue</h4>
          <h2 className="mb-5 text-left text-4xl font-bold text-RedPrimary-1">
            Connectez-vous
          </h2>
          <form onSubmit={handleLogin} id="sign-up-form">
            <div className="mb-4">
              <label
                className="block mb-1 text-RedPrimary-1"
                htmlFor="username"
              >
                Nom Utilisateur
              </label>
              <input
                id="username"
                type="text"
                name="username"
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none

                                   focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100
                                   mt-1 block w-full"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <div className="username error"></div>
              <br />
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-RedPrimary-1"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none
                                   focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100
                                    mt-1 block w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <a
                href="/password/lostPassword"
                className="text-sm text-RedPrimary-1"
              >
                {" "}
                Mot de passe oublié?{" "}
              </a>
            </div>
            <div className="mt-6">
              <button
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-RedPrimary-1 border

                                 border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700
                                  focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition rounded-full"
                type="submit"
              >
                Connexion
              </button>
            </div>
            <div className="mt-6 text-center">
              <a>Pas de compte ? </a>
              <Link className="text-RedPrimary-1" href="/auth/Register">
                <a>Inscris toi!</a>
              </Link>
            </div>
          </form>
        </div>
        <div>
          <Image
            className="object-contain h-48 w-96 object-right-bottom"
            src="/doglogin.png"
            alt="doglogin "
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
