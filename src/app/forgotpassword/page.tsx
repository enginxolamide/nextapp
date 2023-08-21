"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  /* -------------------------------------------------------------------------- */
  const sendMeEmail = async () => {
    try {
      await axios.post("/api/users/resetpasswordlink", { email });

      console.log("👌🏽  success:");

      return NextResponse.json(
        {
          status: "Success",
          message: "email sent",
        },
        { status: 200 }
      );
    } catch (error: any) {
      console.log("failed", error.message);
      toast.error(error.message);
    }
  };

  /* -------------------------------------------------------------------------- */
  //NOTE: disable click
  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="flex absolute -z-10 w-screen min-h-screen bg-cover"
        style={{ backgroundImage: `url("/bg.png")` }}
      ></div>
      <Image className=" object-cover rounded-full mb-10 w-40 h-40" src="/mygif.gif" width={200} height={200} alt="img" />

      <input
        type="email"
        placeholder="Your email"
        className=" p-4 border w-2/12 hover:border-green-800  text-black border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <p className="p-2 text-sm w-[350px] text-center">
        If your email is valid you will receive a link to help you reset your
        password in email shortly
      </p>
      <button
        disabled={buttonDisabled}
        onClick={sendMeEmail}
        className="p-2 border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Rest my password
      </button>
      <Link href={"/login"}>Go back to <b>login</b></Link>
    </div>
  );
}
