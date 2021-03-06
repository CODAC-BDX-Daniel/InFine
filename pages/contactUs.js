import React, { useState } from "react";
import Axios from "axios";

export default function ContactUs() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullname,
      email,
      subject,
      message,
    };

    await Axios.post("./api/email/contactMail", {
      email: data.email,
      fullname: data.fullname,
      subject: data.subject,
      message: data.message,
    }).catch((error) => {
      console.error(error);
    });
    window.alert("Message bien envoyé");
    window.location.replace("/");
  };

  return (
    <main>
      <h2 className="mt-0 mb-2 text-5xl font-normal leading-normal text-red-800">
        CONTACTEZ-NOUS
      </h2>
      <form
        className="flex flex-col rounded-lg bg-white px-8 py-8 shadow-xl dark:bg-blue-500"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold dark:text-gray-50">
          Envoyer un message
        </h1>

        <label
          htmlFor="fullname"
          className="mt-8 font-light text-gray-500 dark:text-gray-50"
        >
          Nom<span className="text-red-500 dark:text-gray-50">*</span>
        </label>
        <input
          type="text"
          name="fullname"
          className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
          onChange={(e) => setFullname(e.target.value)}
        />

        <label
          htmlFor="email"
          className="mt-4 font-light text-gray-500 dark:text-gray-50"
        >
          E-mail<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label
          htmlFor="subject"
          className="mt-4 font-light text-gray-500 dark:text-gray-50"
        >
          Sujet<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
          onChange={(e) => setSubject(e.target.value)}
        />

        <label
          htmlFor="message"
          className="mt-4 font-light text-gray-500 dark:text-gray-50"
        >
          Message<span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          className="border-b bg-transparent py-2 pl-4 font-light text-gray-500 ring-green-500 focus:rounded-md focus:outline-none focus:ring-1"
          onChange={(e) => setMessage(e.target.value)}
        >
          *
        </textarea>
        <div className="flex flex-row items-center justify-start">
          <button
            type={"submit"}
            className="mt-8 flex flex-row items-center rounded-md bg-[#130F49] px-10 py-2 text-lg font-light text-gray-50"
          >
            Envoyer
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="ml-2 text-cyan-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </form>
    </main>
  );
}
