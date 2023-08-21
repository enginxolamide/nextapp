"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { NextResponse } from "next/server";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      await axios.post("/api/users/resetpassword", { input, token });
      router.push("/login");

      return NextResponse.json(
        {
          status: "Success",
          message: "Successfully signed up",
        },
        { status: 200 }
      );
    } catch (error: any) {
      // console.log("failed on signup page", error.message)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokenURL = window.location.search.split("=")[1];
    console.log(tokenURL);
    setToken(tokenURL);
  }, []);

  useEffect(() => {
    if (input.password.length > 0 && input.confirmPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [input]);

  useEffect(() => {
    if (input.password !== input.confirmPassword) {
      console.log("Passwords do not match");
      setPasswordMatch(true);
    } else {
      console.log("Passwords match");
      setPasswordMatch(false);
    }
  }, [input.confirmPassword, input.password]);

  /* -------------------------------------------------------------------------- */

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-white text-2xl">
        {loading ? "Processing..." : "Reset your password"}
      </h1>
      <hr />

      <label htmlFor="password">password</label>
      <input
        className="p-4 border  text-black font-bold border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="inputName"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
        placeholder="password"
      />

      <label htmlFor="password">Confirm password</label>
      <input
        className="p-4 border  text-black font-bold border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="inputName"
        value={input.confirmPassword}
        onChange={(e) =>
          setInput({ ...input, confirmPassword: e.target.value })
        }
        placeholder="password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className="p-2 border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {passwordMatch ? "Passwords do not match" : "Reset password"}
      </button>
      <Link href={"/login"}>Back to login</Link>
    </div>

    /* -------------------------------------------------------------------------- */
  );
}
