/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from "next/router";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { checkCookies, getCookies } from "cookies-next";
import SubNavBarAdmin from "../../../component/common/SubNavbarAdmin";

import DeleteUser from "../../../component/Admin /DeleteUser";
import Loader from "../../../component/common/Loader";

export default function UserDetailsAdmin() {
  const [user, setUser] = useState([]);
  const token = getCookies("access_token").access_token;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    setId(router.query.id);
    // codes using router.query
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!checkCookies("access_token")) {
      useRouter.push("/Login");
    }
    axios
      .get(`/api/users/${id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })

      .then((response) => {
        setUser(response.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refresh]);

  const UpdateUs = (e) => {
    e.preventDefault();
    axios
      .put(`/api/users/${id}`, {
        headers: {
          authorization: `token ${token}`,
        },
        username,
        email,
        role,
      })
      .then((response) => {
        if (response.status === 200) {
          setRefresh(!refresh);
        } else {
          throw new Error("Mise à jour KO");
        }
        setShowModal(false);
      })
      .catch((err) => {
        alert(err.message);
        setShowModal(false);
        /*setIsLoading(false);*/
      });

    alert("Vous avez mis à jour l'utilisateur.");
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="bg-gray-100">
          <SubNavBarAdmin />
          <div className="container mx-auto my-5 p-5">
            <div className="no-wrap md:-mx-2 md:flex ">
              <div className="w-full md:mx-2 md:w-3/12">
                <div className="border-BluePrimary-1 border-t-4 bg-white p-3">
                  <div className="image overflow-hidden"></div>
                  <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">
                    PROFIL UTILISATEUR
                  </h1>
                  <Image
                    className="mx-auto h-auto w-full"
                    src={user.imageAvatar}
                    width={200}
                    height={200}
                  />
                  <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">
                    {user.username}
                  </h1>
                  <h3 className="font-lg text-semibold leading-6 text-gray-600">
                    {user.email}
                  </h3>
                  <p className="text-sm leading-6 text-gray-500 hover:text-gray-600">
                    {user.address?.label}
                  </p>
                  <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li className="flex items-center py-3">
                      <span>Statut</span>
                      <span className="ml-auto">
                        <span className="bg-BluePrimary-1 rounded py-1 px-2 text-sm text-white">
                          {user.role}
                        </span>
                      </span>
                    </li>
                    <button
                      className="bg-BluePrimary-1 mr-1 mb-1
                rounded px-6 py-3 text-sm font-bold uppercase text-white shadow
                outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-pink-600"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Modification Utilisateur
                    </button>
                    {showModal ? (
                      <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                          <div className="relative my-6 mx-auto w-auto max-w-3xl">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                              <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                                <h3 className="text-3xl font-semibold">
                                  Mise à jour utilisateur
                                </h3>
                                <button
                                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                                  onClick={() => setShowModal(false)}
                                >
                                  <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none"></span>
                                </button>
                              </div>

                              <div
                                className="relative flex-auto p-6"
                                onSubmit={UpdateUs}
                              >
                                <p className="text-blueGray-500 my-4 text-lg leading-relaxed">
                                  Nom utilisateur :
                                  <input
                                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3
                                        leading-tight text-gray-700 shadow focus:outline-none"
                                    /*placeholder={user.username}*/
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                    defaultValue={user.username}
                                  />
                                  Email:{" "}
                                  <input
                                    type="email"
                                    className="focus:shadow-outline w-full appearance-none rounded border
                                         py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                                    /* placeholder={user.email}*/
                                    onChange={(e) => setEmail(e.target.value)}
                                    defaultValue={user.email}
                                  />
                                  Role:{" "}
                                  <select
                                    defaultValue={user.role}
                                    onChange={(e) => setRole(e.target.value)}
                                  >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                </p>
                              </div>

                              <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                                <button
                                  className="text-BluePrimary-1 background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Fermer
                                </button>
                                <button
                                  className="bg-YellowPrimary-1 mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-white shadow
                                        outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                  type="button"
                                  onClick={UpdateUs}
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                      </>
                    ) : null}
                    <DeleteUser />
                  </ul>
                </div>

                <div className="my-4"></div>
              </div>

              <div className="mx-2 h-64 w-full md:w-9/12">
                <div className="rounded-sm bg-white p-3 shadow-sm">
                  <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                    <span className="text-BluePrimary-1"></span>
                    <span className="my-1 text-xl font-bold leading-8 text-gray-900">
                      EVENEMENTS
                    </span>
                  </div>
                  <div className="text-gray-700">
                    <ul className="container mx-auto grid grid-cols-2 gap-1">
                      {user.myEvents.map((event) => (
                        <li key={event._id}>
                          <h3>{event.title}</h3>
                          <h3>{event.description}</h3>
                          <h3>{event.address}</h3>
                          <h3>{event.date}</h3>
                          {event.picture ? (
                            <Image
                              src={event.picture}
                              width={100}
                              height={100}
                            />
                          ) : null}

                          <br />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="my-4"></div>

                <div className="rounded-sm bg-white p-3 shadow-sm">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="mb-3 flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                        <span className="my-1 text-xl font-bold leading-8 text-gray-900">
                          COMMENTAIRES
                        </span>
                      </div>
                      <ul className="container mx-auto grid grid-cols-2 gap-1">
                        {user.myComments.map((comment) => (
                          <li key={comment._id}>
                            <div className="w-full rounded">
                              {comment.content}
                              {comment.pictures.map((picture) => (
                                <li key={picture._id}>
                                  <div className="UserAdmin">
                                    <div>
                                      {picture.url ? (
                                        <Image
                                          src={picture.url}
                                          width={100}
                                          height={100}
                                        />
                                      ) : null}
                                      <br />
                                    </div>
                                  </div>
                                </li>
                              ))}
                              <br />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
