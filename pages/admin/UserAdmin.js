/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getCookies, checkCookies } from "cookies-next";
import SubNavBarAdmin from "../../component/common/SubNavbarAdmin";

import Footer from "../../component/common/Footer";
import Loader from "../../component/common/Loader";

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const token = getCookies("access_token").access_token;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (!checkCookies("access_token")) {
      router.push("/Login");
    }
    axios
      .get("/api/users", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.data);
        setIsLoading(true);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <SubNavBarAdmin />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Date de création</th>
            <th>Détails utilisateur</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.label}</td>
              <td>{user.createdAt}</td>
              <td>
                <Link href={`/admin/UserDetailsAdmin/${user._id}`}>
                  <a className="bg-BluePrimary-1 text-yellow-100 ">
                    Détails utilisateur
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
