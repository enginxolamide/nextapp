"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const verifyemail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    };

    if (token.length > 0) {
      verifyemail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="flex absolute -z-10 w-screen min-h-screen bg-cover"
        style={{ backgroundImage: `url("/bg.png")` }}
      ></div>
      <h1 className="text-center w-full text-white font-semibold text-2xl">Verify Me {verified && ": Success"} </h1>
      <h2 className="p-2">{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div className="flex flex-col items-center justify-center  py-2">
          <h2 className="p-2 bg-green-500 mb-10 text-center text-white">Email verified 😊</h2>
          <Link className="px-4 py-2 border rounded" href="/login">login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="p-2 bg-red-500 mb-10 text-center text-white">
            Email verification token expired 😔
          </h2>
          <div>
            <Link className=" text-white" href="/forgotpassword">
              try <b>Forgot password</b> again?
            </Link> <span className="mx-2 text-gray-400">|</span>
            <Link className="font-bold text-white" href="/login">
              Go back to Login
            </Link>
                   </div>
        </div>
      )}
    </div>
  );
}
